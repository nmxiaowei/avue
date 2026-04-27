/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-pay",
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    animation () {
      return this.option.animation
    },
    decimals () {
      return this.option.decimals || 0
    },
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    }
  }
});

export { script as default };
