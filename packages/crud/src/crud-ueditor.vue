<template>
  <quill-editor :style="{height:`${minRows*40+100}px`,maxHeight:`${maxRows*40+100}px`}"
                v-model="text"
                class="avue-editor"
                @change="handleChange"
                ref="myQuillEditor"
                :options="options">
  </quill-editor>

</template>
<script>
import { quillEditor } from 'vue-quill-editor';
import crudCompoents from '../../mixins/crud-compoents.js';
export default {
  name: 'AvueCrudUeditor',
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
    handleChange (value) {
      this.$emit('input', value.html);
      this.$emit('change', value.html);
    }
  }
};
</script>

