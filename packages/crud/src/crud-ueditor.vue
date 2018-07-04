<template>
  <div ref="editor"></div>
</template>
<script>
import Quill from 'quill'
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudUeditor",
  mixins: [crudCompoents()],
  data () {
    return {
      Quill: undefined,
      defaultOptions: {
        theme: 'snow',
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image']
          ]
        },
        placeholder: this.placeholder ? this.placeholder : `请输入${this.label}`,
        readOnly: false
      }
    }
  },
  props: {
    height: {
      default: ""
    },
    options: {
      default: () => { }
    },
    minRows: {
      type: String,
      default: "3"
    },
    maxRows: {
      type: String,
      default: "4"
    }
  },
  watch: {
    value: function (n, o) {
      this.Quill.pasteHTML(n)
    },
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const editor = this.$refs.editor

      this.Quill = new Quill(editor, this.defaultOptions)
      // 默认值
      this.Quill.pasteHTML(this.value)
      // 绑定事件
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        const text = this.Quill.getText()
        const quill = this.Quill
        this.$emit('input', html)
        this.$emit('change', { html, text, quill })
      })
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('editor-change', eventName, ...args)
      })
    },
  }
};
</script>


<style scoped>
</style>
