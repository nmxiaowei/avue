import Main from './index.vue';
import { isVNode } from 'utils/vdom';
import { createApp } from 'vue';
let instance;
let instances = [];
let seed = 1;
const ImagePreview = (function () {
  let MessageConstructor = Main;
  const obj = function (datas = [], index = 0, ops = {}) {
    let id = 'imagePreview_' + seed++;
    let options = {
      datas: datas,
      index: index,
      ops: Object.assign({
        closeOnClickModal: false,
        beforeClose: null,
        modal: true
      }, ops)
    }
    let userOnClose = options.onClose;
    const parent = document.createElement('div')
    let app = createApp(MessageConstructor)
    app.component(ElCarousel.name, ElCarousel);
    app.component(ElCarouselItem.name, ElCarouselItem);
    instance = app.mount(parent);
    Object.keys(options).forEach(ele => {
      instance[ele] = options[ele]
    })
    options.onClose = function () {
      obj.close(id, userOnClose);
    };
    instance.id = id;
    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message];
      instance.message = null;
    }
    document.body.appendChild(instance.$el);
    instance.isShow = true;
    instance.dom = instance.$el;
    instances.push(instance);
    return instance;
  }
  obj.close = function (id, userOnClose) {
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
  return obj
})()

export default ImagePreview;