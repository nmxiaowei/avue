<template>
  <div :class="b()">
    <el-checkbox-group v-model="text"
                       @change="handleChange"
                       :disabled="disabled"
                       :size="size"
                       @click.native="handleClick">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :min="min"
                 :size="size"
                 :readonly="readonly"
                 :max="max"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
  mixins: [props(), event()],
  data () {
    return {
      name: 'checkbox',
    };
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

