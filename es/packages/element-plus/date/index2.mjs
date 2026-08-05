/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
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
    defaultTime: [String, Array],
    type: {
      type: String,
      default: "date",
    },
    valueFormat: String,
    format: String,
  },
});

export { script as default };
