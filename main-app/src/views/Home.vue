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
