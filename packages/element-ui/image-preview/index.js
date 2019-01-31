import Main from './index.vue';
import Vue from 'vue';
import { isVNode } from 'utils/vdom';
let instance;
let instances = [];
let seed = 1;
let MessageConstructor = Vue.extend(Main);
const ImagePreview = function (datas = [], index = 0) {
  let id = 'imagePreview_' + seed++;
  let options = {
    datas: datas,
    index: index
  }
  let userOnClose = options.onClose;
  instance = new MessageConstructor({
    data: options
  });
  options.onClose = function () {
    ImagePreview.close(id, userOnClose);
  };
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.isShow = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
}
ImagePreview.close = function (id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

export default ImagePreview;