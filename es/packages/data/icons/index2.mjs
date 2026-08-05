/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-icons",
  data () {
    return {};
  },
  computed: {
    animation () {
      return this.option.animation
    },
    decimals () {
      return this.option.decimals || 0
    },
    span () {
      return this.option.span || 4;
    },
    data () {
      return this.option.data;
    },
    color () {
      return this.option.color || "rgb(63, 161, 255)";
    },
    discount () {
      return this.option.discount || false;
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  }
});

export { script as default };
