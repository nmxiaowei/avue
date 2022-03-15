import Main from './index.vue';
import { createVNode, render } from 'vue';
export default (function () {
  return (datas = [], index = 0, ops = {}) => {
    let options = {
      datas: datas,
      index: index,
      ops: Object.assign({
        closeOnClickModal: false,
        beforeClose: null,
        modal: true
      }, ops),
    }
    let appendTo = ops.appendTo
    if (ops.appendTo) {
      appendTo = document.querySelector(ops.appendTo)
    } else {
      appendTo = document.body
    }
    const parent = document.createElement('div')
    let instance = createVNode(Main, options)
    instance.props.onDestroy = () => {
      render(null, parent)
    }
    render(instance, parent)
    appendTo.appendChild(parent.firstElementChild);
    return instance;
  }
})()
