import 'element-ui/lib/theme-chalk/index.css';
import { tools } from '@biaodian-web/basic';
import component from './view';
import * as selfComponents from './components';

export * from './components';

const { returnRegister } = tools;

const importPackages = [
  /* import("npm包名") */
];
export async function registerComponent() {
  const components = {
    ElementUI: {
      component: await import('element-ui'),
      options: [{ size: 'small' }],
    },
  };
  const ret = await returnRegister({
    importPackages,
    registerType: 'registerComponent',
    defaultRegister: components,
  });
  return ret;
}

export async function registerStore() {
  const store = {
    // test: (await import("./store")).default
  };
  const ret = await returnRegister({
    importPackages,
    registerType: 'registerStore',
    defaultRegister: store,
  });
  return ret;
}

export async function registerRoute() {
  const routes = {
    test: {
      path: '/test',
      name: 'test',
      component,
    },
  };
  const ret = await returnRegister({
    importPackages,
    registerType: 'registerRoute',
    defaultRegister: routes,
  });
  return ret;
}

export default selfComponents;
