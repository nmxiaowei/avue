<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :filterable="filterable"
             :readonly="readonly"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder?placeholder:`请选择${label}`"
             @change="handleChange"
             @click.native="handleClick"
             :disabled="disabled">
    <el-option v-for="(item,index) in dic"
               :key="index"
               :disabled="item[disabledKey]"
               :label="item[labelKey]"
               :value="item[valueKey]">
    </el-option>
  </el-select>

</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
import crudFun from '../../mixins/crud-fun.js';
export default create({
  name: 'crud-select',
  mixins: [crudCompoents(), crudFun()],
  data () {
    return {};
  },
  props: {
    value: {
    },
    filterable: {
      type: Boolean,
      default: false
    },
  },
  watch: {
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>