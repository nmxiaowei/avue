import Main from './index.vue';
import { createVNode, render } from 'vue';

export default function (_context: any) {
  const defaultContext = _context;
  return (datas: any[] = [], index = 0, ops: Record<string, any> = {}) => {
    const options = {
      datas,
      index,
      ops: Object.assign(
        {
          closeOnClickModal: false,
          beforeClose: null,
          click: null,
          modal: true,
        },
        ops
      ),
    };
    let appendTo: Element | HTMLElement | null = ops.appendTo;
    if (ops.appendTo) {
      appendTo = document.querySelector(ops.appendTo);
    } else {
      appendTo = document.body;
    }
    const parent = document.createElement('div');
    const instance: any = createVNode(Main, options);
    instance.appContext = defaultContext;
    instance.props.onDestroy = () => {
      render(null, parent);
      parent.remove();
    };
    render(instance, parent);
    appendTo?.appendChild(parent.firstElementChild as Node);
    return instance;
  };
}
