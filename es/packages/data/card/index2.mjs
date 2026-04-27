/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-card",
  data () {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    },
    colorText () {
      return this.option.colorText || "#fff";
    },
    bgText () {
      return this.option.bgText || "#2e323f";
    },
    borderColor () {
      return this.option.borderColor || "#2e323f";
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});

export { script as default };
