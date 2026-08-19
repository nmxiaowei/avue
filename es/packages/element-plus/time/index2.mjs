/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: "time",
  mixins: [props(), event(), locale],
  data () {
    return {};
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    maxTime: String,
    minTime: String,
    start: String,
    end: String,
    step: String,
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    valueFormat: String,
    arrowControl: Boolean,
    type: String,
    format: String,
    visibleChange: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function
  },
  computed: {
    componentName () {
      if (this.start || this.end || this.step || this.maxTime || this.minTime) {
        return "elTimeSelect"
      } else {
        return "elTimePicker"
      }
    },
    isRange () {
      return this.type === "timerange";
    }
  }
});

export { script as default };
