import { initVal } from 'core/dataformat';
import { DIC_SPLIT } from 'global/variable';
function bindEvent (safe, name, event) {
  typeof safe[name] === 'function' && safe[name]({ value: safe.value, column: safe.column })
  safe.$emit(name, safe.value, event)
}
export default function () {
  return {
    methods: {
      initVal () {
        this.stringMode = typeof (this.value) == 'string'
        this.text = initVal(this.value, this.column);
      },
      getLabelText (item) {
        if (this.validatenull(item)) return ''
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleFocus (event) {
        bindEvent(this, 'focus', event)
      },
      handleBlur (event) {
        bindEvent(this, 'blur', event)
      },
      handleClick (event) {
        bindEvent(this, 'click', event)
      },
      handleChange (value) {
        let result = value;
        let flag = this.isString || this.isNumber || this.stringMode || this.listType === "picture-img";
        if (flag && Array.isArray(value)) {
          result = value.join(this.separator || DIC_SPLIT)
        }
        if (typeof this.change === 'function' && this.column.cell !== true) {
          this.change({ value: result, column: this.column });
        }
        this.$emit('input', result);
        this.$emit('change', result);
      }
    }
  };
}
