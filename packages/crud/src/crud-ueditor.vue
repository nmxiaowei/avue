<template>
  <quill-editor :style="{height:`${minRows*40+100}px`,maxHeight:`${maxRows*40+100}px`}"
                v-model="text"
                class="avue-editor"
                :placeholder="placeholder ? placeholder : `请输入${label}`"
                @change="handleChange"
                ref="myQuillEditor"
                :options="options">
  </quill-editor>

</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudUeditor",
  mixins: [crudCompoents()],
  components: {
    quillEditor
  },
  data () {
    return {

    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    height: {
      default: ""
    },
    options: {
      default: () => { }
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
  mounted () {

  },
  methods: {
    handleChange (value) {
      this.$emit('input', value.html)
      this.$emit("change", value.html);
    }
  },
};
</script>

