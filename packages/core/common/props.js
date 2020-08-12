import { DIC_PROPS, DIC_SPLIT, DIC_HTTP_PROPS } from 'global/variable';
export default function () {

  return {
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
      typeslot: {
        type: Boolean,
        default: false
      },
      separator: {
        type: String,
        default: DIC_SPLIT
      },
      formslot: {
        type: Boolean,
        default: false
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
      value: {},
      column: {
        type: Object,
        default: () => {
          return {}
        }
      },
      typeslot: {
        type: Boolean,
        default: false
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
        handler (n, o) {
          this.handleChange(n)
        }
      },
      value: {
        handler (n, o) {
          this.initVal();
        }
      }
    },
    computed: {
      componentName () {
        const type = this.$AVUE.ui.type;
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
      nameKey: function () {
        return this.propsHttp.name || this.propsHttpDefault.name;
      },
      urlKey: function () {
        return this.propsHttp.url || this.propsHttpDefault.url;
      },
      resKey: function () {
        return this.propsHttp.res || this.propsHttpDefault.res;
      },
      groupsKey: function () {
        return this.props.groups || this.propsDefault.groups;
      },
      valueKey: function () {
        return this.props.value || this.propsDefault.value;
      },
      leafKey: function () {
        return this.props.leaf || this.propsDefault.leaf;
      },
      labelKey: function () {
        return this.props.label || this.propsDefault.label;
      },
      childrenKey: function () {
        return this.props.children || this.propsDefault.children;
      },
      disabledKey: function () {
        return this.props.disabled || this.propsDefault.disabled;
      },
      idKey: function () {
        return this.props.id || this.propsDefault.id;
      }
    },
    created () {
      this.initVal();
    }
  };
}
