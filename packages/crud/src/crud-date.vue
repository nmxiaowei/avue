<template>
  <el-date-picker :type="type"
                  v-model="text"
                  :size="size"
                  range-separator="至"
                  :start-placeholder="startPlaceholder"
                  :end-placeholder="endPlaceholder"
                  :format="format"
                  :picker-options="pickerOptions"
                  :value-format="valueFormat"
                  :default-time="defaultTime"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  :disabled="disabled"> </el-date-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudDate",
  mixins: [crudCompoents()],
  data () {
    return {
      text: ""
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
      default: '结束日期',
    },
    defaultTime: {
      type: String,
    },
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    type: {
      default: "date"
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
    handleChange (value) {
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

