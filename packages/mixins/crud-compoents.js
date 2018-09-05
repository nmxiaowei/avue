export default function() {
    //props配置
    const propsDefault = {
        id: 'id',
        label: 'label',
        value: 'value',
        children: 'children',
        disabled: 'disabled'
    }
    return {
        data() {
            return {
                text: undefined,
                propsDefault: propsDefault
            }
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
                default: () => []
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
            border: {
                type: Boolean,
                default: false
            },
            props: {
                type: Object,
                default: () => propsDefault
            }
        },
        watch: {
            value() {
                this.text = this.value;
            }
        },
        computed: {
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
            this.text = this.value;
        }
    };
}