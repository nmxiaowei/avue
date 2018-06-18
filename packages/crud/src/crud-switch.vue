<template>
  <el-switch v-model="text" :active-text="getDic(0).label" :active-value="getDic(0).value" :inactive-value="getDic(1).value" :inactive-text="getDic(1).label" :disabled="disabled" :size="size">
  </el-switch>
</template>

<script>
export default {
  name: 'AvueCrudSwitch',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dic: {
      default: () => {
        return []
      }
    }
  },
  watch: {
    value: function(n, o) {
      this.text = this.value
    }
  },
  created() {
    this.text = this.value
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit('input', value)
    },
    getDic(index) {
      return this.dic[index] ? this.dic[index] : {}
    }
  }
}
</script>

<style>
</style>
