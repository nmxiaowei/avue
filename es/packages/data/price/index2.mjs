/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-price",
  data () {
    return {};
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data;
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
