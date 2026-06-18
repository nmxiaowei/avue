/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "rate",
  mixins: [props(), event()],
  props: {
    colors: {
      type: Array
    },
    max: {
      type: Number,
      default: 5
    },
    iconClasses: {
      type: Array
    },
    texts: {
      type: Array
    },
    showText: {
      type: Boolean,
      default: false
    },
    voidIconClass: {
      type: String
    }
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});

export { script as default };
