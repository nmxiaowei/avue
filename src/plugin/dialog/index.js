import DialogComponent from './main.vue';
const registeredViews = {};

let Plugin = function(Vue) {
  this.Vue = Vue;
  this.mounted = false;
  this.$root = {}; // The root component
};

Plugin.prototype.mountIfNotMounted = function() {
  if (this.mounted === true) {
    return;
  }

  this.$root = (() => {
    let DialogConstructor = this.Vue.extend(DialogComponent);
    let node = document.createElement('div');
    document.querySelector('body').appendChild(node);

    let Vm = new DialogConstructor();

    Vm.registeredViews = this.registeredComponents();

    return Vm.$mount(node);
  })();

  this.mounted = true;
};

Plugin.prototype.registeredComponents = function() {
  return registeredViews;
};

Plugin.prototype.registerComponent = function(name, definition) {
  if (this.mounted) {
    this.destroy();
  }

  // registeredViews[name] = this.Vue.extend(definition)
  registeredViews[name] = definition;
};

Plugin.prototype.destroy = function() {
  if (this.mounted === true) {
    this.$root.forceCloseAll();

    let elem = this.$root.$el;
    this.$root.$destroy();
    this.$root.$off();
    elem.remove();
    this.mounted = false;
  }
};

Plugin.prototype.show = function(formoption, formdata, dialogoption) {
  this.mountIfNotMounted();
  return new Promise(resolve => {
    this.$root.show(formoption, formdata || {}, dialogoption || {}, resolve);
  });
};

Plugin.install = function(Vue, options) {

  Vue.dialog = new Plugin(Vue, options);
  Object.defineProperties(Vue.prototype, {
    $dialog: {
      get() {
        return Vue.dialog;
      }
    }
  });
};

export default Plugin;
