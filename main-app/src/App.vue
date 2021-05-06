<template>
  <section id="cns-main-app">
    <section class="cns-menu-wrapper">
      <router-link to="/">Home</router-link>
      <br />
      <router-link to="/test">demo</router-link>
      <br />
      <a-button type="primary" @click="handleGlobalState"
        >变更全局状态</a-button
      >
    </section>
    <section class="cns-frame-wrapper">
      <router-view v-show="$route.name" />

      <section v-show="!$route.name" id="frame"></section>
    </section>
  </section>
</template>

<script>
import actions from "./shared/actions";
export default {
  data() {
    return {
      token: 0,
    };
  },
  mounted() {},
  methods: {
    handleGlobalState() {
      actions.setGlobalState({ token: (this.token += 1) });
    },
  },
};
</script>

<style lang="scss" scope>
.Root {
  height: 100%;
}
.Logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.Container {
  height: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
}
#cns-main-app {
  height: 100%;
  position: relative;
  .cns-menu-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 40;
    width: 172px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .cns-nav-wrapper {
    position: fixed;
    width: 100%;
    min-width: 1060px;
    padding-left: 172px;
    left: 0;
    top: 0;
    z-index: 30;
  }
}

.cns-frame-wrapper {
  padding-left: 172px;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
}

#cns-frame {
  width: 100%;
  height: 100%;
  > :first-child {
    height: 100%;
  }
}
#frame {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
