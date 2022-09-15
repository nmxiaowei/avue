import { DIC_PROPS, DIC_SPLIT, DIC_HTTP_PROPS } from 'global/variable';
import slot from 'core/slot'
export default function () {
  return {
    mixins: [slot],
    data () {
      return {
        stringMode: false,
        name: '',
        text: undefined,
        propsHttpDefault: DIC_HTTP_PROPS,
        propsDefault: DIC_PROPS
      };
    },
    props: {
      blur: Function,
      focus: Function,
      change: Function,
      click: Function,
      typeformat: Function,
      control: Function,
      separator: {
        type: String,
        default: DIC_SPLIT
      },
      params: {
        type: Object,
        default: () => {
          return {}
        }
      },
      listType: {
        type: String,
      },
      tableData: {
        type: Object
      },
      value: {},
      column: {
        type: Object,
        default: () => {
          return {}
        }
      },
      label: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      dataType: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: ''
      },
      dicUrl: {
        type: String,
        default: ''
      },
      dicMethod: {
        type: String,
        default: ''
      },
      dicFormatter: Function,
      dicQuery: {
        type: Object,
        default: () => {
          return {}
        }
      },
      dic: {
        type: Array,
        default: () => {
          return [];
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      rules: {
        type: Array
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      multiple: {
        type: Boolean,
        default: false
      },
      button: {
        type: Boolean,
        default: false
      },
      group: {
        type: Boolean,
        default: false
      },
      row: {
        type: Boolean,
        default: false
      },
      prop: {
        type: String,
        default: ''
      },
      border: {
        type: Boolean,
        default: false
      },
      popperClass: {
        type: String,
      },
      propsHttp: {
        type: Object,
        default: () => DIC_HTTP_PROPS
      },
      props: {
        type: Object,
        default: () => DIC_PROPS
      }
    },
    watch: {
      text: {
        handler (n) {
          this.handleChange(n)
        }
      },
      value: {
        handler () {
          this.initVal();
        }
      }
    },
    computed: {
      clearableVal () {
        return this.disabled ? false : this.clearable
      },
      componentName () {
        const type = 'el'
        const result = `${type}-${this.name}${this.button ? '-button' : ''}`
        return result
      },
      required () {
        return !this.validatenull(this.rules);
      },
      isArray () {
        return this.dataType === 'array';
      },
      isString () {
        return this.dataType === 'string';
      },
      isNumber () {
        return this.dataType === 'number';
      },
      nameKey () {
        return this.propsHttp.name || this.propsHttpDefault.name;
      },
      urlKey () {
        return this.propsHttp.url || this.propsHttpDefault.url;
      },
      resKey () {
        return this.propsHttp.res || this.propsHttpDefault.res;
      },
      groupsKey () {
        return this.props.groups || this.propsDefault.groups;
      },
      valueKey () {
        return this.props.value || this.propsDefault.value;
      },
      descKey () {
        return this.props.desc || this.propsDefault.desc;
      },
      leafKey () {
        return this.props.leaf || this.propsDefault.leaf;
      },
      labelKey () {
        return this.props.label || this.propsDefault.label;
      },
      childrenKey () {
        return this.props.children || this.propsDefault.children;
      },
      disabledKey () {
        return this.props.disabled || this.propsDefault.disabled;
      },
      idKey () {
        return this.props.id || this.propsDefault.id;
      }
    },
    created () {
      this.initVal()
    }
  };
}
