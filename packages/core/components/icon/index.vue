<template>
  <span v-if="text"
        class="avue-icon"
        :class="{'avue-icon--small':small}">
    <svg v-if="isSvgIcon"
         :style="customIconStyle"
         aria-hidden="true">
      <use :xlink:href="text"></use>
    </svg>
    <el-icon v-else-if="isElementIcon"
             :size="iconSize"
             :color="color"
             :style="iconStyle">
      <component :is="text" />
    </el-icon>
    <i v-else
       :class="[text, 'avue-icon__font']"
       :style="customIconStyle"></i>
  </span>
</template>

<script>
export default {
  name: 'icon-temp',
  props: {
    small: Boolean,
    color: String,
    iconStyle: {
      type: [String, Object, Array],
      default: ''
    },
    size: {
      type: [String, Number],
      default: 32
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    customIconStyle () {
      return [
        this.color ? { color: this.color } : {},
        this.iconStyle
      ]
    },
    iconSize () {
      return this.small ? 15 : this.size
    },
    isSvgIcon () {
      return this.text.includes('#')
    },
    isElementIcon () {
      return this.text.indexOf('el-') === 0
    }
  }
}
</script>

<style>
</style>
