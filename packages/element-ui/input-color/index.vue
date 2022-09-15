<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              v-model="text"
              :size="size"
              ref="main"
              :readonly="readonly"
              @click.native="handleClick"
              :clearable="clearableVal"
              :disabled="disabled">
      <template slot="append">
        <el-color-picker size="mini"
                         v-model="text"
                         :popper-class="popperClass"
                         :color-format="colorFormat"
                         :disabled="disabled"
                         :show-alpha="showAlpha"
                         :predefine="predefine"></el-color-picker>
      </template>
    </el-input>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-color",
  mixins: [props(), event()],
  props: {
    colorFormat: String,
    predefine: {
      type: Array,
      default: () => {
        return [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)"
        ]
      }
    },
    showAlpha: {
      type: Boolean,
      default: true
    }
  }
});
</script>


