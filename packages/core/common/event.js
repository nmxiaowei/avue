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
          callback: () => {
            this.stringMode = true;
          }
        });
      },
      handleFocus (event) {
        typeof this.focus === 'function' && this.focus({ value: this.text, column: this.column })
        this.$emit('focus', event)
      },
      handleBlur (event) {
        typeof this.blur === 'function' && this.blur({ value: this.text, column: this.column })
        this.$emit('blur', event)
      },
      getLabelText (item) {
        if (this.validatenull(item)) return ''
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      },
      handleClick () {
        const result =
          this.isString && this.multiple ? this.text.join(',') : this.text;
        if (typeof this.click === 'function') {
          this.click({ value: result, column: this.column });
        }
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
