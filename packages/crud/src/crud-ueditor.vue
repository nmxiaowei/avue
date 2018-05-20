<template>
  <quill-editor v-model="text" ref="myQuillEditor" :options="options">
  </quill-editor>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AvueCrudUeditor',
  components: {
    quillEditor
  },
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    options:{
      default:()=>{},
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
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
