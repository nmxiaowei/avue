<template>
  <el-cascader :options="dic" v-model="text" :placeholder="placeholder?placeholder:`请选择${label}`" :disabled="disabled" @change="handleChange">
  </el-cascader>
</template>

<script>
export default {
  name: 'AvueCrudCascader',
  data() {
    return {
      text: []
    }
  },
  props: {
    value: {
      default: () => {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
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
    }
  }
}
</script>

<style>
</style>
