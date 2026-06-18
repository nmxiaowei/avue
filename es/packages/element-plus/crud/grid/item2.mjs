/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
var script = {
  props: {
    className: String,
    labeClassName: String,
    showOverflowTooltip: Boolean,
    gridRow: Boolean,
    prop: String,
    type: String,
    label: String,
  },
  computed: {
    parent() {
      let parent = this.$parent;
      while (parent.$parent && !parent.id) {
        parent = parent.$parent;
      }
      return parent;
    },
  },
  mounted() {
    this.parent.column.push({
      className: this.className,
      labeClassName: this.labeClassName,
      showOverflowTooltip: this.showOverflowTooltip,
      row: this.gridRow,
      label: this.label,
      prop: this.prop,
      type: this.type,
      header: this.$slots.header,
      default: this.$slots.default,
    });
  },
};

export { script as default };
