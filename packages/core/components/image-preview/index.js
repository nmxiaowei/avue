import Main from './index.vue';
import { createVNode, render } from 'vue';
let instances = [];
let seed = 1;
const ImagePreview = (function () {
  let MessageConstructor = Main;
  const obj = function (datas = [], index = 0, ops = {}) {
    let id = 'imagePreview_' + seed++;
    const userOnClose = ops.onClose
    let options = {
      datas: datas,
      index: index,
      ops: Object.assign({
        closeOnClickModal: false,
        beforeClose: null,
        modal: true
      }, ops),
      onClose: () => {
        obj.close(id, userOnClose);
      }
    }
    const parent = document.createElement('div')
    parent.id = id;
    let instance = createVNode(MessageConstructor, options)
    instance.id = id;
    render(instance, parent)
    document.body.appendChild(parent);
    instances.push(instance);
    return instance;
  }
  obj.close = function (id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
      if (id === instances[i].id) {
        if (typeof userOnClose === 'function') userOnClose(instances[i]);
        instances.splice(i, 1);
        document.getElementById(id).remove()
        break;
      }
    }
  };
  return obj
})()

export default ImagePreview;