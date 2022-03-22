<template>
  <el-dialog v-model="visible"
             destroy-on-close
             :beforeClose="beforeClose"
             v-bind="dialog">
    <avue-form :option="form.option"
               v-model="form.data"
               @submit="submit"
               @reset-change="close"></avue-form>
    <span class="avue-dialog__footer"
          :class="'avue-dialog__footer--'+menuPosition">
      <el-button @click="submit"
                 :size="$AVUE.size"
                 :icon="option.submitIcon"
                 type="primary">{{option.submitText}}</el-button>
      <el-button @click="reset"
                 :size="$AVUE.size"
                 :icon="option.emptyIcon ">{{option.emptyText}}</el-button>
    </span>
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
      opt: {},
      callback: null,
      visible: false,
      dialog: {
        closeOnClickModal: false
      },
      option: {
        menuBtn: false,
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
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose();
      }
      this.visible = false;
      this.onDestroy();
    },
    handleSubmit (data, done) {
      this.callback && this.callback({ data: data, close: this.close, done: done });
    }
  }
};
</script>