<template>
  <el-dialog v-model="visible"
             destroy-on-close
             :beforeClose="beforeClose"
             v-bind="dialog">
    <avue-form :option="form.option"
               v-model="form.data"
               @submit="submit"
               @reset-change="close"></avue-form>
  </el-dialog>
</template>
<script>
import { ElDialog } from 'element-plus'
import AvueForm from 'packages/element-ui/form';
export default {
  name: 'dialog-form',
  components: {
    ElDialog,
    AvueForm
  },
  props: {
    onDestroy: Function
  },
  data () {
    return {
      resolve: null,
      visible: false,
      dialog: {
        closeOnClickModal: false
      },
      form: {
        option: {
          submitText: '提交',
          emptyText: '关闭',
          emptyIcon: 'el-icon-close',
          column: []
        },
        data: {}
      }
    };
  },
  methods: {
    beforeClose (done) {
      done()
      this.close()
    },
    submit (data, done) {
      this.resolve({ data: data, close: this.close, done: done });
    },
    close () {
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose();
      }
      this.visible = false;
      this.onDestroy();
    }
  }
};
</script>