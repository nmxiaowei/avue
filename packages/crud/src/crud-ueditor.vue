<template>
  <div>
    <quill-editor v-model="text" @change="handleChange" ref="myQuillEditor" :options="options" :style="{height:`calc(${height} - 80px)`}">
    </quill-editor>
  </div>
</template>
<script>
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
    height: {
      default: ''
    },
    options: {
      default: () => {}
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
  created() {
    this.text = this.value
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit('input', value.html)
    }
  }
}
</script>


<style scoped>
</style>
