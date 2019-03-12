export default function () {
  return {
    methods: {
      handleFocus() {
        typeof this.focus === 'function' && this.focus()
      },
      handleBlur() {
        typeof this.blur === 'function' && this.blur()
      },
      getLabelText(item) {
        if (typeof this.tpyeformat === 'function') {
          return this.tpyeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleClick() {
        const result =
          this.isString && this.multiple ? this.text.join(',') : this.text;
        if (typeof this.click === 'function') {
          this.click({ value: result, column: this.column });
        }
      },
      handleChange(value) {
        let result = value;
        if ((this.isString || this.isNumber) && (this.multiple || ['checkbox', 'cascader', 'dynamic'].includes(this.type))) {
          result = value.join(',')
        }

        if (typeof this.change === 'function') {
          this.change({ value: result, column: this.column });
        }
        this.$emit('input', result);
        this.$emit('change', result);
      }
    }
  };
}
