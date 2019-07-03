import { initVal } from 'core/dataformat';
export default function () {
  // props配置
  const propsDefault = {
    id: 'id',
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled'
  };
  // httpProps配置
  const propsHttpDefault = {
    name: 'name',
    url: 'url',
    fileName: 'file',
    res: ''
  };
  return {
    data () {
      return {
        text: undefined,
        propsHttpDefault: propsHttpDefault,
        propsDefault: propsDefault
      };
    },
    props: {
      blur: Function,
      focus: Function,
      change: Function,
      click: Function,
      tpyeformat: Function,
      listType: {
        type: String,
        default: ''
      },
      value: {},
      column: {
        type: Object,
        default: () => { }
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
        default: () => propsHttpDefault
      },
      props: {
        type: Object,
        default: () => propsDefault
      }
    },
    watch: {
      value: {
        handler () {
          this.initVal();
        },
        immediate: true
      }
    },
    computed: {
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
      valueKey: function () {
        return this.props.value || this.propsDefault.value;
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
    created () { },
    methods: {
      initVal () {
        this.text = initVal({
          type: this.type,
          listType: this.listType,
          multiple: this.multiple,
          dataType: this.dataType,
          value: this.value
        });
      }
    }
  };
}
