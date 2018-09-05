<template>
  <el-date-picker :type="type"
                  v-model="text"
                  :size="size"
                  :readonly="readonly"
                  range-separator="至"
                  :start-placeholder="startPlaceholder"
                  :end-placeholder="endPlaceholder"
                  :format="format"
                  :picker-options="pickerOptions"
                  :value-format="valueFormat"
                  :default-time="defaultTime"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  @click.native="handleClick"
                  :disabled="disabled"> </el-date-picker>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-date',
  mixins: [crudCompoents()],
  data () {
    return {
      text: ''
    };
  },
  props: {
    value: {
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    defaultTime: {
      type: String
    },
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    type: {
      default: 'date'
    },
    valueFormat: {
    },
    format: {
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleClick () {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.column });
    },
    handleChange (value) {
      if (typeof this.change === 'function') this.change({ value: value, column: this.column });
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
});
</script>

