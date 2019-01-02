<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :filterable="remote?true:filterable"
             :remote="remote"
             :readonly="readonly"
             :remote-method="handleRemoteMethod"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder?placeholder:`请选择${label}`"
             @change="handleChange"
             :multiple-limit="limit"
             @click.native="handleClick"
             :disabled="disabled">
    <el-option v-for="(item,index) in remote?netDic:dic"
               :key="index"
               :disabled="item[disabledKey]"
               :label="item[labelKey]"
               :value="item[valueKey]">
    </el-option>
  </el-select>

</template>

<script>
import create from "../../utils/create";
import crudCompoents from "../../mixins/crud-compoents.js";
import crudFun from "../../mixins/crud-fun.js";
export default create({
  name: "crud-select",
  mixins: [crudCompoents(), crudFun()],
  data() {
    return {
      netDic: []
    };
  },
  props: {
    value: {},
    remote: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 99
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getDicData(res) {
      return (
        (Array.isArray((res.data || {}).data) ? res.data.data : res.data) || []
      );
    },
    handleRemoteMethod(query) {
      this.$http.get(this.dicUrl.replace("{{key}}", query)).then(res => {
        this.netDic = this.getDicData(res);
      });
    }
  }
});
</script>