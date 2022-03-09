import DialogComponent from './index.vue';
import Vue from 'vue';

let Plugin = function () {
  this.$root = {};
};

Plugin.prototype.initMounted = function () {
  this.$root = (() => {
    let DialogConstructor = Vue.extend(DialogComponent);
    let instance = new DialogConstructor();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;
    return instance.vm
  })();

};

Plugin.prototype.show = function (opt) {
  this.initMounted();
  return new Promise(resolve => {
    this.$root.show(opt, resolve);
  });
};
export default new Plugin();
