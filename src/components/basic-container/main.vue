<template>
  <div class="basic-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer"
};
</script>

<style lang="scss">
.basic-container {
  padding: 20px;
  border-radius: 6px;
}
</style>
