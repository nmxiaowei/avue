<template>
  <el-dialog :visible.sync="visible"
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
export default {
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
    show (opt, resolve) {
      this.resolve = resolve;
      this.dialog = Object.assign(this.dialog, opt);
      this.form.option = Object.assign(this.form.option, opt.option);
      this.form.data = opt.data;
      this.visible = true;
    },
    submit (data, done) {
      this.resolve({ data: data, close: this.close, done: done });
    },
    close () {
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose();
      }
      this.visible = false;
      this.$destroy();
      this.$el.remove();
    }
  }
};
</script>