import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";
// 子应用注册信息
import apps from "./apps";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ parent: ".cns-frame-wrapper" });
import { message } from "ant-design-vue";

registerMicroApps(apps, {
  beforeLoad: (app) => {
    // 加载微应用前，加载进度条
    NProgress.start();
    console.log("before load", app.name);

    return Promise.resolve();
  },
  afterMount: (app) => {
    NProgress.done();
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

addGlobalUncaughtErrorHandler((event) => {
  const { msg } = event;
  NProgress.done();
  // 加载失败时提示
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    message.error("微应用加载失败，请检查应用是否可运行");
  }
});

// 导出 qiankun 的启动函数
export default start;
