/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "input-number",
  mixins: [props(), event()],
  data() {
    return {};
  },
  props: {
    align: String,
    disabledScientific: Boolean,
    stepStrictly: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    controlsPosition: {
      type: String,
      default: "right",
    },
    precision: {
      type: Number,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    prefix: {
      type: String,
    },
    prefixClick: {
      type: Function,
      default: () => {},
    },
    suffix: {
      type: String,
    },
    suffixClick: {
      type: Function,
      default: () => {},
    },
  },
  created() {},
  mounted() {},
  methods: {},
});

export { script as default };
