import { initVal } from 'core/dataformat';
import { findNode } from 'utils/util'
export default function () {
  return {
    methods: {
      bindEvent (name, params) {
        let item = findNode(this.dic, this.props, this.text)
        params = Object.assign(params, { column: this.column, dic: this.dic, item }, this.tableData)
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
        this.stringMode = typeof (this.value) == 'string'
        this.text = initVal(this.value, this);
      },
      getLabelText (item) {
        if (this.validatenull(item)) return ''
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleFocus (event) {
        this.bindEvent('focus', { value: this.value, event })
      },
      handleBlur (event) {
        this.bindEvent('blur', { value: this.value, event })
      },
      handleClick (event) {
        this.bindEvent('click', { value: this.value, event })
      },
      handleChange (value) {
        let result = value;
        if (this.isJson) {
          result = JSON.stringify(value);
        } else {
          let flag = this.isString || this.isNumber || this.stringMode || this.listType === "picture-img";
          if (flag && Array.isArray(value)) {
            result = value.join(this.separator)
          }
        }
        this.bindEvent("change", { value: result });
        this.$emit("input", result);
      }
    }
  };
}
