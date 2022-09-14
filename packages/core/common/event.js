import { initVal } from 'core/dataformat';
export default function () {
  return {
    methods: {
      bindEvent (name, params) {
        params = Object.assign(params, { column: this.column }, this.tableData)
        if (typeof this[name] === 'function') {
          if (name == 'change') {
            if (this.column.cell != true) {
              this[name](params)
            }
          } else {
            this[name](params)
          }
        }
        this.$emit(name, params)
      },
      initVal () {
        this.stringMode = typeof (this.modelValue) == 'string'
        this.text = initVal(this.modelValue, this.column);
      },
      getLabelText (item) {
        if (this.validatenull(item)) return ''
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleFocus (event) {
        this.bindEvent('focus', { value: this.modelValue, event })
      },
      handleBlur (event) {
        this.bindEvent('blur', { value: this.modelValue, event })
      },
      handleClick (event) {
        this.bindEvent('click', { value: this.modelValue, event })
      },
      handleChange (value) {
        let result = value;
        let flag = this.isString || this.isNumber || this.stringMode || this.listType === "picture-img";
        if (flag && Array.isArray(value)) result = value.join(this.separator)
        this.bindEvent('change', { value: result })
        this.$emit('update:modelValue', result);
      }
    }
  };
}
