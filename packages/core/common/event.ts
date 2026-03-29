import { initVal } from 'core/dataformat';
import { findNode } from 'utils/util';

export default function () {
  return {
    methods: {
      bindEvent(this: any, name: string, params: Record<string, any>) {
        const item = findNode(this.dic, this.props, this.text);
        params = Object.assign(params, { column: this.column, dic: this.dic, item }, this.tableData);
        if (typeof this[name] === 'function') {
          if (name == 'change') {
            if (this.column.cell != true) {
              this[name](params);
            }
          } else {
            this[name](params);
          }
        }
        this.$emit(name, params);
      },
      initVal(this: any) {
        this.stringMode = typeof this.modelValue == 'string';
        this.text = initVal(this.modelValue, this);
      },
      getLabelText(this: any, item: any) {
        if (this.validatenull(item)) return '';
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey];
      },
      handleFocus(this: any, event: Event) {
        this.bindEvent('focus', { value: this.modelValue, event });
      },
      handleBlur(this: any, event: Event) {
        this.bindEvent('blur', { value: this.modelValue, event });
      },
      handleClick(this: any, event: Event) {
        this.bindEvent('click', { value: this.modelValue, event });
      },
      handleChange(this: any, value: any) {
        let result = value;
        if (this.isJson) {
          result = JSON.stringify(value);
        } else {
          const flag = this.isString || this.isNumber || this.stringMode || this.listType === 'picture-img';
          if (flag && Array.isArray(value)) {
            result = value.join(this.separator);
          }
        }
        this.bindEvent('change', { value: result });
        this.$emit('update:modelValue', result);
      },
    },
  };
}
