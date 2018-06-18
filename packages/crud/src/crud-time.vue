<template>
  <el-time-picker v-model="text" type="date" :size="size" :format="format" :value-format="valueFormat" :placeholder="placeholder?placeholder:`请输入${label}`" @change="handleChange" :disabled="disabled"> </el-time-picker>
</template>

<script>
export default {
  name: 'AvueCrudTime',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    valueFormat: {
      default: ''
    },
    format: {
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
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
    }
  }
}
</script>

<style scoped>
</style>

