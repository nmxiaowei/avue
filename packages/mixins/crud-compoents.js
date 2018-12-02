import { initVal } from '../utils/util';
export default function() {
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
    url: 'url'
  };
  return {
    data() {
      return {
        text: undefined,
        propsHttpDefault: propsHttpDefault,
        propsDefault: propsDefault
      };
    },
    props: {
      change: Function,
      click: Function,
      column: {
        type: Object,
        default: () => {}
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
      value() {
        this.initVal();
      }
    },
    computed: {
      isArray() {
        return this.dataType === 'array';
      },
      isString() {
        return this.dataType === 'string';
      },
      nameKey: function() {
        return this.propsHttp.name || this.propsHttpDefault.name;
      },
      urlKey: function() {
        return this.propsHttp.url || this.propsHttpDefault.url;
      },
      valueKey: function() {
        return this.props.value || this.propsDefault.value;
      },
      labelKey: function() {
        return this.props.label || this.propsDefault.label;
      },
      childrenKey: function() {
        return this.props.children || this.propsDefault.children;
      },
      disabledKey: function() {
        return this.props.disabled || this.propsDefault.disabled;
      },
      idKey: function() {
        return this.props.id || this.propsDefault.id;
      }
    },
    created() {
      this.initVal();
    },
    methods: {
      initVal() {
        this.text = initVal({
          type: this.type,
          multiple: this.multiple,
          value: this.value,
          listType: list.listType
        });
      }
    }
  };
}
