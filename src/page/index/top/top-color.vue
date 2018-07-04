<template>
  <el-color-picker size="small"
                   class="theme-picker"
                   popper-class="theme-picker-dropdown"
                   v-model="themeVal"></el-color-picker>
</template>

<script>
import color from "@/mixins/color";

export default {
  name: "topColor",
  mixins: [color()],
  data () {
    return {
      chalk: ""
    };
  }
};
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
