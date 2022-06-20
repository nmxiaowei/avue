import Main from './index.vue';
import Vue from 'vue'

export default function (datas = [], index = 0, ops = {}) {
  let MessageConstructor = Vue.extend(Main);
  let options = {
    datas: datas,
    index: index,
    ops: Object.assign({
      closeOnClickModal: false,
      beforeClose: null,
      click: null,
      modal: true
    }, ops)
  }
  let instance = new MessageConstructor({
    data: options
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.isShow = true;
  instance.dom = instance.vm.$el;
  return instance.vm;
}