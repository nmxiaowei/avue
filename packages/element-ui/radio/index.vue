<template>
  <div :class="b()">
    <el-radio-group v-model="text"
                    :size="size"
                    @click.native="handleClick"
                    :disabled="disabled">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :readonly="readonly"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}</component>
    </el-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "radio",
  mixins: [props(), event()],
  data () {
    return {
      name: 'radio',
    };
  },
  props: {
    value: {}
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>