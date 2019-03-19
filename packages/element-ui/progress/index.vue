<template>
  <div :class="b()">
    <el-progress :type="type"
                 :color="color"
                 :width="width"
                 text-inside
                 :show-text="showText"
                 :stroke-width="strokeWidth"
                 :percentage="percentage"></el-progress>
  </div>

</template>

<script>
import create from "core/create";
export default create({
  name: "progress",
  props: {
    showText: {
      type: Boolean
    },
    width: {
      type: [Number, String]
    },
    strokeWidth: {
      type: [Number, String]
    },
    type: {
      type: String
    },
    color: {
      type: String
    },
    percentage: {
      type: [Number]
    }
  }
});
</script>
