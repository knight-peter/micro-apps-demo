## 父子应用通讯方案

我们先介绍官方提供的应用间通信方式 - `Actions` 通信，这种通信方式比较适合业务划分清晰，应用间通信较少的微前端应用场景。

### 通信原理
`qiankun` 内部提供了 `initGlobalState` 方法用于注册 `MicroAppStateActions` 实例用于通信，该实例有三个方法，分别是：

- `setGlobalState`：设置 `globalState` - 设置新的值时，内部将执行 浅检查，如果检查到 globalState 发生改变则触发通知，通知到所有的 观察者 函数。
- `onGlobalStateChange`：注册 观察者 函数 - 响应 `globalState` 变化，在 `globalState` 发生改变时触发该 观察者 函数。
- `offGlobalStateChange`：取消 观察者 函数 - 该实例不再响应 `globalState` 变化。(会默认执行，不用关注)

### 主应用的工作
首先，我们在主应用中注册一个 `MicroAppStateActions` 实例并导出，代码实现如下：
```
// main-app/src/shared/actions.js
import { initGlobalState } from "qiankun";

const initialState = {};
const actions = initGlobalState(initialState);

export default actions;
```
在注册 `MicroAppStateActions` 实例后，我们在需要通信的组件中使用该实例，并注册 **观察者** 函数，实现如下
```
// main-app/src/views/Home.vue
<template>
  <div class="home">
    <p>这里是主应用</p>
    <p>父子应用通讯：{{ state }}</p>
  </div>
</template>

<script>
import actions from "../shared/actions";
export default {
  name: "Home",
  data() {
    return {
      state: null,
    };
  },
  mounted() {
    // 注册一个观察者函数, 第二个参数为 true，表示立即执行一次观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：改变前的值为", prevState);
      console.log("主应用观察者：改变后的值为 ", state);
      this.$set(this, "state", state);
    }, true);
  },
};
</script>

```
在主应用更改全局状态
```
handleGlobalState() {
  actions.setGlobalState({ token: (this.token += 1) });
},
```
### 子应用的工作
现在已经在主应用中更改了全局状态，将 `token` 信息记录在了 `globalState` 中。现在，我们进入子应用，使用 `token` 获取用户信息并展示在页面中
我们首先来改造我们的 `Vue` 子应用，首先我们设置一个 `Actions` 实例，代码实现如下：
```
// micro-app/src/shared/actions.js
function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn('目前全局状态为空!');
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions,在render函数中实现
   */
  setActions(actions) {
    this.actions = actions;
  }

  /**
   * 注册观察者函数，获取微前端全局状态globalState
   */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 修改globalState
   */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;
```
我们创建 `actions` 实例后，我们需要为其注入真实 `Actions`。我们在入口文件 `main.js` 的 `render` 函数中注入，代码实现如下：
```
// micro-app/entry/main.js
async function render(props) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  ...
  // 挂载应用
  const { container } = props || {}; // 为了避免根 id #app 与其他的 DOM 冲突，需要限制查找范围
  instance = new Vue({
        ...vueConfig,
      }).$mount(container ? container.querySelector('#selfApp') : '#selfApp');
    }
}
```
最后我们在子应用 获取 `globalState` 中的 `token`，使用 `token` 来获取用户信息，最后在页面中显示用户信息。代码实现如下：
```
// micro-app/src/view/index.vue
<template>
  <div>
    <com-test msg="这里是子应用"></com-test>
    <p>父子应用通讯：{{ state }}</p>
  </div>
</template>

<script>
import { ComTest } from '../components';
// 微前端全局状态操作
import actions from '../shared/actions';

export default {
  name: 'Test',
  components: { ComTest },
  data() {
    return {
      state: null,
    };
  },

  methods: {},

  mounted() {
    /**
     * 微前端qiankun框架,非微前端项目可删除
     * 注册观察者函数
     * onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
     * state是全局数据
     */
    actions.onGlobalStateChange((state) => {
      // eslint-disable-next-line no-console
      console.log(`子应用：${state}`);
      this.$set(this, 'state', state);
    }, true);
  },
};
</script>
```
从上面的代码可以看到，我们在组件挂载时注册了一个 **观察者** 函数并立即执行，从 `globalState/state` 中获取 `token`，然后使用 `token` 获取用户信息，最终渲染在页面中。

### 小结
我们在主应用中实现了登录功能(虚拟)，登录拿到 `token` 后存入 `globalState` 状态池中。在进入子应用时，我们使用 `actions` 获取 `token`，再使用 `token` 进行其他操作，完成页面数据渲染！