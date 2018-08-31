<template>
  <div>
    <span>自定义组件:{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
  data () {
    return {
      text: undefined
    }
  },
  watch: {
    value () {
      this.text = this.value;
    }
  },
  created () {
    this.text = this.value;
  }
}
</script>

<style>
</style>
