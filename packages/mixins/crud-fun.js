export default function () {
    return {
        methods: {
            handleClick() {
                const result = (this.isString && this.multiple) ? this.text.join(',') : this.text;
                if (typeof this.click === 'function') this.click({ value: result, column: this.column });
            },
            handleChange(value) {
                const result = (this.isString && this.multiple) ? value.join(',') : value;
                if (typeof this.change === 'function') this.change({ value: result, column: this.column });
                this.$emit('input', result);
                this.$emit('change', result);
            }
        }
    }
}