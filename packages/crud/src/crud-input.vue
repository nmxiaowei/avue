<template>
  <el-input :size="size" :clearable="clearable" v-model="text" :type="typeParam" :autosize="{ minRows: minRows, maxRows: maxRows}" :placeholder="placeholder?placeholder:`请输入${label}`" @change="handleChange" :disabled="disabled"></el-input>
</template>

<script>
export default {
  name: 'AvueCrudInput',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
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
    type: {
      type: String,
      default: ''
    },
    minRows: {
      type: String,
      default: '3'
    },
    maxRows: {
      type: String,
      default: '4'
    }
  },
  watch: {
    value: function(n, o) {
      this.text = this.value
    }
  },
  computed: {
    typeParam: function() {
      if (this.type == 'textarea') {
        return 'textarea'
      } else if (this.type == 'password') {
        return 'password'
      } else {
        return 'text'
      }
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
