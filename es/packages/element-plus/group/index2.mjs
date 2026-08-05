/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import '../../core/components/icon/index.mjs';
import script$1 from '../../core/components/icon/index2.mjs';

var script = create({
  name: "group",
  components: {
    iconTemp: script$1
  },
  empit: ['change'],
  data () {
    return {
      activeName: '',
    }
  },
  props: {
    arrow: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  watch: {
    text (val) {
      this.activeName = [val];
    },
  },
  computed: {
    text () {
      return this.collapse ? 1 : 0
    },
    isHeader () {
      return this.$slots.header && this.header || ((this.label || this.icon) && this.header)
    }
  },
  created () {
    this.activeName = [this.text];
  },
  methods: {
    handleChange (activeNames) {
      this.$emit('change', activeNames);
    },
  }
});

export { script as default };
