<template>
  <span v-if="text" class="avue-icon"
        :class="{'avue-icon--small':small}">
    <svg v-if="text.includes('#')"
         aria-hidden="true">
      <use :xlink:href="text"></use>
    </svg>
    <el-icon v-else-if="text.indexOf('el-') == 0"
             :size="size"
             :color="color">
      <component :is="text" />
    </el-icon>
    <i v-else
       :class="text"></i>
  </span>
</template>

<script>
export default {
  name: 'icon-temp',
  props: {
    small: Boolean,
    color: String,
    size: {
      type: [String, Number],
      default: 32
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>