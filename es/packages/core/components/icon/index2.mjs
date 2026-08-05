/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
var script = {
  name: 'icon-temp',
  props: {
    small: Boolean,
    color: String,
    iconStyle: {
      type: [String, Object, Array],
      default: ''
    },
    size: {
      type: [String, Number],
      default: 32
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    customIconStyle () {
      return [
        this.color ? { color: this.color } : {},
        this.iconStyle
      ]
    },
    iconSize () {
      return this.small ? 15 : this.size
    },
    isSvgIcon () {
      return this.text.includes('#')
    },
    isElementIcon () {
      return this.text.indexOf('el-') === 0
    }
  }
};

export { script as default };
