<template>
  <div :class="b()">
    <el-radio-group v-model="text"
                    :size="size"
                    @change="handleChange"
                    @click.native="handleClick"
                    :disabled="disabled">
      <el-radio v-for="(item,index) in dic"
                :label="item[valueKey]"
                :border="border"
                :readonly="readonly"
                :disabled="item[disabledKey]"
                :key="index">{{item[labelKey]}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "radio",
  mixins: [props(), event()],
  data() {
    return {};
  },
  props: {
    value: {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>