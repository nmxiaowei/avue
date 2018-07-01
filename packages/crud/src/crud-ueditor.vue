<template>
  <div>
    <quill-editor v-model="text"
                  @change="handleChange"
                  ref="myQuillEditor"
                  :options="options"
                  :style="{height:`calc(${height} - 80px)`}">
    </quill-editor>
  </div>
</template>
<script>
import crudCompoents from "../../mixins/crud-compoents.js";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "AvueCrudUeditor",
  mixins: [crudCompoents()],
  components: {
    quillEditor
  },
  data() {},
  props: {
    height: {
      default: ""
    },
    options: {
      default: () => {}
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
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit("input", value.html);
    }
  }
};
</script>


<style scoped>
</style>
