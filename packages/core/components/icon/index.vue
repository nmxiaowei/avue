<template>
  <span class="avue-icon"
        :class="{'avue-icon--small':small}">
    <svg v-if="text.includes('#')"
         aria-hidden="true">
      <use :xlink:href="text"></use>
    </svg>
    <i v-else
       :class="text"></i>
  </span>
</template>

<script>
export default {
  name: 'icon-temp',
  props: {
    small: Boolean,
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>