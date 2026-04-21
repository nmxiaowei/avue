/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-imgtext",
  data () {
    return {};
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    },
    color () {
      return this.option.color || "rgb(63, 161, 255)";
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  created () { },
  methods: {}
});

export { script as default };
