import {
  createVNode,
  render
} from 'vue';
import Main from './index.vue';
export default function (_context) {
  let defaultContext = _context
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
    let instance = createVNode(Main, options)
    instance.appContext = defaultContext;
    const onDestroy = () => {
      render(null, parent)
      parent.remove();
    }
    instance.props.onDestroy = onDestroy;
    instance.close = onDestroy;
    render(instance, parent)
    appendTo.appendChild(parent);
    return instance;
  }
}
