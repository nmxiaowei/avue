<template>
  <el-checkbox-group v-model="text"
                     @change="handleChange"
                     :disabled="disabled"
                     @click.native="handleClick">
    <el-checkbox v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :min="min"
                 :readonly="readonly"
                 :max="max"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
import crudFun from '../../mixins/crud-fun.js';
export default create({
  name: 'crud-checkbox',
  mixins: [crudCompoents(), crudFun()],
  data () {
    return {};
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

