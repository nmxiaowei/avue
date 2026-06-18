/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "input-tag",
  mixins: [props(), event()],
  data() {
    return {};
  },
  props: {
    clearValidate: Function,
    drag: Boolean,
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
  methods: {
    handleValueChange(val) {
      setTimeout(() => {
        if (!this.validatenull(val) && this.rules && this.clearValidate) {
          this.clearValidate(this.prop);
        }
      });
    },
  },
});

export { script as default };
