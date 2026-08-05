/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import '../../core/components/icon/index.mjs';
import script$1 from '../../core/components/icon/index2.mjs';

var script = create({
  name: "data-statistic",
  components: {
    iconTemp: script$1
  },
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    span() {
      return this.option.span || 6;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getIconStyle(item) {
      const size = (item.iconSize || 40) + 'px';
      return {
        color: item.iconColor || '#409eff',
        fontSize: size,
        width: size,
        height: size
      };
    },
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff',
        borderColor: item.borderColor || '#ebeef5'
      };
    }
  }
});

export { script as default };
