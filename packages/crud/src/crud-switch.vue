<template>
  <div>
    <el-switch v-model="text"
               @change="handleChange"
               @click.native="handleClick"
               :active-text="getDic(0)[labelKey]"
               :active-value="getDic(0)[valueKey]"
               :inactive-value="getDic(1)[valueKey]"
               :inactive-text="getDic(1)[labelKey]"
               :disabled="disabled"
               :readonly="readonly"
               :size="size">
    </el-switch>
  </div>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
import crudFun from '../../mixins/crud-fun.js';
export default create({
  name: 'crud-switch',
  mixins: [crudCompoents(), crudFun()],
  props: {
    value: {

    }
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    getDic (index) {
      return this.dic[index] ? this.dic[index] : {};
    }
  }
});
</script>

