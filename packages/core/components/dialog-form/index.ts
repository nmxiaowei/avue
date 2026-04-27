import { createVNode, render } from 'vue';
import Main from './index.vue';

export default function (_context: any) {
  const defaultContext = _context;
  return (opt: Record<string, any>) => {
    const options = {
      opt,
    };
    let appendTo: Element | HTMLElement | null = opt.appendTo;
    if (opt.appendTo) {
      appendTo = document.querySelector(opt.appendTo);
    } else {
      appendTo = document.body;
    }
    const parent = document.createElement('div');
    const instance: any = createVNode(Main, options);
    instance.appContext = defaultContext;
    const onDestroy = () => {
      render(null, parent);
      parent.remove();
    };
    instance.props.onDestroy = onDestroy;
    instance.close = onDestroy;
    render(instance, parent);
    appendTo?.appendChild(parent);
    return instance;
  };
}
