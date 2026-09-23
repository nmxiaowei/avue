/*! Avue.js v3.9.5 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "date",
  mixins: [props(), event(), locale],
  props: {
    cellClassName: String,
    prefixIcon: String,
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    showNow: Boolean,
    shortcuts: [Array, Function],
    editable: {
      type: Boolean,
      default: true,
    },
    unlinkPanels: Boolean,
    singlePanel: {
      type: Boolean,
      default: undefined,
    },
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    defaultTime: [String, Date, Array],
    type: {
      type: String,
      default: "date",
    },
    valueFormat: String,
    format: String,
  },
  computed: {
    defaultTimeVal() {
      const normalizeTime = (time) => {
        if (typeof time !== "string") return time;
        const match = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.exec(time);
        if (!match) return time;
        const [, hours, minutes, seconds] = match.map(Number);
        // Element Plus requires a Date and only uses its local time fields.
        return new Date(2000, 0, 1, hours, minutes, seconds);
      };
      return Array.isArray(this.defaultTime)
        ? this.defaultTime.map(normalizeTime)
        : normalizeTime(this.defaultTime);
    },
  },
});

export { script as default };
