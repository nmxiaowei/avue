/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-cardtext",
  data () {
    return {};
  },
  computed: {
    icon () {
      return this.option.icon;
    },
    color () {
      return this.option.color || "#333";
    },
    span () {
      return this.option.span || 8;
    },
    data () {
      return this.option.data || [];
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
