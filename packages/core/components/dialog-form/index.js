import {
  createVNode,
  render
} from 'vue';
import Main from './index.vue';
export default function (app) {
  let defaultContext = app._context
  return (opt) => {
    let options = {
      opt
    }
    let appendTo = opt.appendTo
    if (opt.appendTo) {
      appendTo = document.querySelector(opt.appendTo)
    } else {
      appendTo = document.body
    }
    const parent = document.createElement('div')
    options.onDestroy = () => {
      render(null, parent)
    }
    let instance = createVNode(Main, options)
    instance.appContext = defaultContext;
    render(instance, parent)
    appendTo.appendChild(parent.firstElementChild);
    return instance;
  }
}
