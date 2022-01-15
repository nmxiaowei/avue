<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="visible"
    :width="dialog.width"
    :top="dialog.top"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <avue-form
      ref="form1"
      :option="form.option"
      v-model="form.data"
      @submit="submit"
      @reset-change="visible=false"
    ></avue-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      done: null,
      resolve: null,
      visible: false,
      dialog: {
        title: '',
        width: '30%',
        top: '15vh'
      },
      form: {
        option: {
          size: 'mini',
          submitText: '提交',
          emptyText: '关闭',
          printBtn: false,

          column: []
        },
        data: {}
      }
    };
  },
  methods: {
    show(formoption, formdata, dialogoption, resolve) {
      this.resolve = resolve;
      this.dialog = Object.assign(this.dialog, dialogoption);
      this.form.option = Object.assign(this.form.option, formoption);
      this.form.data = JSON.parse(JSON.stringify(formdata));
      this.visible = true;
    },
    submit(data, done) {
      this.done = done;
      this.resolve({ data: data, close: this.close, done: done });
    },
    close() {
      this.done();
      this.visible = false;
    }
  }
};
</script>