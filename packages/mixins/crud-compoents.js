export default function() {
    return {
        props: {
            value: {
                default () {
                    return this.multiple ? [] : "";
                }
            },
            label: {
                type: String,
                default: ''
            },
            size: {
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
                default: ""
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
                type: Number,
            },
            max: {
                type: Number,
            },
            border: {
                type: Boolean,
                default: false
            },
            props: {
                type: Object,
                default () {
                    return {
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    };
                }
            }
        },
        data() {
            return {
                text: undefined
            };
        },
        watch: {
            value: function(n, o) {
                this.text = this.value;
            }
        },
        computed: {
            valueKey: function() {
                return this.props.value || 'value';
            },
            labelKey: function() {
                return this.props.label || 'label';
            },
            childrenKey: function() {
                return this.props.children || 'children';
            }
        },
        created() {
            this.text = this.value;
        }
    }
}