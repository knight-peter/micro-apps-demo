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

<style lang="scss" module>
</style>
