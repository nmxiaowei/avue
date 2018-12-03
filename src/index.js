import components from './components/';

function install(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'button'
  };
}

if (window.Vue) {
  install(window.Vue);
}

export default install;
