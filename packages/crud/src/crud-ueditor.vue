<template>
  <quill-editor :style="{height:`${minRows*40+100}px`,maxHeight:`${maxRows*40+100}px`}"
                v-model="text"
                :class="b()"
                @change="handleChange"
                @click.native="handleClick"
                ref="myQuillEditor"
                :options="options">
  </quill-editor>

</template>
<script>
import create from '../../utils/create';
import { quillEditor } from 'vue-quill-editor';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-ueditor',
  mixins: [crudCompoents()],
  components: {
    quillEditor
  },
  data () {
    return {
      options: {
        placeholder: '请输入',
        readonly: false,
      }
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      default: ''
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 5
    }
  },
  watch: {
  },
  created () {
    this.init();
  },
  mounted () {

  },
  methods: {
    init () {
      this.options.placeholder = this.placeholder ? this.placeholder : `请输入${this.label}`;
      this.options.readonly = this.readonly
    },
    handleClick () {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.column });
    },
    handleChange (value) {
      if (typeof this.change === 'function') this.change({ value: value.html, column: this.column });
      this.$emit('input', value.html);
      this.$emit('change', value.html);
    }
  }
});
</script>

