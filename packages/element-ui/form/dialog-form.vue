<template>
  <el-dialog v-model="visible"
             destroy-on-close
             class="avue-dialog"
             :beforeClose="beforeClose"
             v-bind="dialog">
    <avue-form ref="form"
               :option="{...deepClone(option),...{menuBtn: false}}"
               v-model="data"
               @submit="handleSubmit"
               @reset-change="close"></avue-form>
    <span class="avue-dialog__footer"
          v-if="this.validData(option.menuBtn,true)"
          :class="'avue-dialog__footer--'+menuPosition">
      <el-button @click="submit"
                 v-if="this.validData(option.submitBtn,true)"
                 :size="$AVUE.size"
                 :icon="option.submitIcon"
                 type="primary">{{option.submitText}}</el-button>
      <el-button @click="reset"
                 v-if="this.validData(option.emptyBtn,true)"
                 :size="$AVUE.size"
                 :icon="option.emptyIcon ">{{option.emptyText}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import create from "core/create";
export default create({
  name: 'dialog-form',
  data () {
    return {
      opt: {},
      callback: null,
      visible: false,
      dialog: {
        closeOnClickModal: false
      },
      option: {
        submitText: '提交',
        emptyText: '关闭',
        submitIcon: 'el-icon-check',
        emptyIcon: 'el-icon-close',
        column: []
      },
      data: {}
    };
  },
  computed: {
    menuPosition () {
      return this.opt.menuPosition || 'center'
    }
  },
  methods: {
    show (opt) {
      this.opt = opt;
      this.callback = opt.callback;
      let dialog = this.deepClone(opt);
      ['callback', 'option', 'data'].forEach(ele => delete dialog[ele])
      this.dialog = Object.assign(this.dialog, dialog);
      this.option = Object.assign(this.option, opt.option);
      this.data = opt.data;
      this.visible = true;
    },
    submit () {
      this.$refs.form.submit()
    },
    reset () {
      this.$refs.form.resetForm()
    },
    beforeClose (done) {
      done()
      this.close()
    },
    close () {
      const callback = () => {
        this.visible = false;
      }
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose(callback);
      } else {
        callback()
      }
    },
    handleSubmit (data, done) {
      this.callback && this.callback({ data: data, close: this.close, done: done });
    }
  }
});
</script>