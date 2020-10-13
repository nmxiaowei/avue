import dayjs from 'dayjs';
import { initVal } from 'core/dataformat';
export default function () {
  return {
    methods: {
      initVal () {
        this.text = initVal({
          type: this.type,
          multiple: this.multiple,
          dataType: this.dataType,
          value: this.value,
          separator: this.separator,
          callback: (result) => {
            this.stringMode = result;
          }
        });
      },
      getLabelText (item) {
        if (this.validatenull(item)) return ''
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleFocus (event) {
        typeof this.focus === 'function' && this.focus({ value: this.value, column: this.column })
        this.$emit('focus', this.value, event)
      },
      handleBlur (event) {
        typeof this.blur === 'function' && this.blur({ value: this.value, column: this.column })
        this.$emit('blur', this.value, event)
      },
      handleClick (event) {
        typeof this.click === 'function' && this.click({ value: this.value, column: this.column });
        this.$emit('click', this.value, event)
      },
      handleChange (value) {
        let result = value;
        if (this.$AVUE.ui.name == 'antd') {
          if (['date', 'time'].includes(this.type)) {
            const format = this.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
            result = dayjs(value._d).format(format);
          } else if (['radio'].includes(this.type)) {
            result = value.target.value;
          }
        }
        if (this.isString || this.isNumber || this.stringMode || this.listType === "picture-img") {
          if (Array.isArray(value)) result = value.join(',')
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
