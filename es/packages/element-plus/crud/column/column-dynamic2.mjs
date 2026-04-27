/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import './column-slot.mjs';
import '../grid/item.mjs';
import script$1 from '../grid/item2.mjs';
import script$2 from './column-slot2.mjs';

var script = {
  name: "column-dynamic",
  components: {
    columnSlot: script$2,
    tableItemCard: script$1,
  },
  inject: ["dynamic", "crud"],
  props: {
    columnOption: Object,
  },
  created() {
    const list = ["getColumnProp"];
    list.forEach((ele) => {
      if (this.dynamic) this[ele] = this.dynamic[ele];
    });
  },
};

export { script as default };
