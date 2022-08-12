import DialogComponent from './index.vue';

let Plugin = function () {
  this.$root = {};
};

Plugin.prototype.initMounted = function () {
  this.$root = (() => {
    let DialogConstructor = window.Vue.extend(DialogComponent);
    let instance = new DialogConstructor();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;
    return instance.vm
  })();

};

Plugin.prototype.show = function (opt) {
  this.initMounted();
  this.$root.show(opt);
};
export default new Plugin();
