/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';
import '../../core/components/icon/index.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import script$1 from '../../core/components/icon/index2.mjs';

var script = create({
  name: "input-icon",
  components: {
    iconTemp: script$1
  },
  mixins: [props(), event(), locale],
  props: {
    beforeClose: Function,
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    dialogWidth: {
      type: String,
      default: '80%'
    },
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      filterText: '',
      box: false,
      tabs: {}
    };
  },
  computed: {
    list () {
      let list = this.tabs.list.map(ele => {
        if (!ele.value && !ele.label) {
          return {
            label: ele,
            value: ele
          }
        }
        return ele
      });
      if (this.filterText) {
        list = list.filter(ele => ele.label.indexOf(this.filterText) !== -1);
      }
      return list
    },
    option () {
      return {
        column: this.iconList
      };
    }
  },
  created () {
    this.tabs = this.iconList[0];
  },
  methods: {
    handleClear () {
      setTimeout(() => {
        this.box = false;
      }, 0);
    },
    handleTabs (tabs) {
      this.tabs = tabs;
    },
    handleSubmit (item) {
      this.box = false;
      this.text = item;
      this.handleChange(item);
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.tabs = this.iconList[0];
      this.box = true;
    }
  }
});

export { script as default };
