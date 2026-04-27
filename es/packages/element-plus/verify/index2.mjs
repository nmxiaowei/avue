/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

var script = create({
  name: 'verify',
  props: {
    size: {
      type: [Number, String],
      default: 50,
    },
    modelValue: [Number, String],
    len: {
      type: [Number, String],
      default: 6,
    }
  },
  computed: {
    data: {
      get () {
        return this.modelValue || ''
      },
      set (val) {
        let value = val + '';
        this.$emit('update:modelValue', value);
        this.$emit('change', value);
      }
    },
    styleName () {
      return {
        padding: `${this.setPx(this.size / 7)} ${this.setPx(this.size / 4)}`,
        fontSize: this.setPx(this.size)
      }
    },
    list () {
      return this.data.split('');
    }
  },
  created () {
    this.randomn();
  },
  methods: {
    randomn () {
      var n = this.len;
      if (n > 21) return null
      var re = new RegExp("(\\d{" + n + "})(\\.|$)");
      var num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(re)[1];
      this.data = num;
    }
  }
});

export { script as default };
