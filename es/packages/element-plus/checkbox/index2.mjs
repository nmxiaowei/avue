/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import locale from '../../../src/core/locale.mjs';
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "checkbox",
  props: {
    fill: String,
    textColor: String,
    all: {
      type: Boolean,
      default: false
    }
  },
  mixins: [props(), event(), locale],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      name: 'checkbox',
    };
  },
  watch: {
    dic () {
      this.handleCheckChange();
    },
    text: {
      handler (val) {
        this.handleCheckChange();
      }
    },
  },
  created () { },
  mounted () { },
  methods: {
    handleCheckAll (val) {
      if (!this.all) return
      const availableOptions = this.dic.filter(item => !item[this.disabledKey]);
      this.text = val ? availableOptions.map(ele => ele[this.valueKey]) : [];
      this.isIndeterminate = false;
    },
    handleCheckChange () {
      let value = this.text;
      if (!this.all) return
      const availableCount = this.dic.filter(item => !item[this.disabledKey]).length;
      let checkedCount = value.length;
      this.checkAll = checkedCount === availableCount;
      this.isIndeterminate = checkedCount > 0 && checkedCount < availableCount;
    }
  }
});

export { script as default };
