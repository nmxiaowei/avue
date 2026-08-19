/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: "data-operatext",
  data () {
    return {};
  },
  computed: {
    span () {
      return this.option.span || 6;
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
  },
  created () { },
  methods: {}
});

export { script as default };
