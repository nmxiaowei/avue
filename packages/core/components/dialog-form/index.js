import DialogComponent from './index.vue';
import { createVNode, render } from 'vue';

let Plugin = function () {
  this.$root = {};
};

Plugin.prototype.initMounted = function (ops) {
  this.$root = (() => {
    let appendTo = ops.appendTo
    if (ops.appendTo) {
      appendTo = document.querySelector(ops.appendTo)
    } else {
      appendTo = document.body
    }
    const parent = document.createElement('div')
    let instance = createVNode(DialogComponent, {})
    instance.props.onDestroy = () => {
      render(null, parent)
    }
    render(instance, parent)
    appendTo.appendChild(parent);
    return instance.component
  })();

};

Plugin.prototype.show = function (opt) {
  this.initMounted(opt);
  let data = this.$root.data;
  data.opt = opt;
  data.dialog = Object.assign(data.dialog, opt);
  ['callback', 'option', 'data'].forEach(ele => delete dialog[ele])
  data.dialog = Object.assign(data.dialog, dialog);
  data.option = Object.assign(data.option, opt.option);
  data.data = opt.data;
  data.visible = true;
};
export default new Plugin();