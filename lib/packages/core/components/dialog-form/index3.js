/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_locale = require('../../../../src/core/locale.js');

var script = {
  mixins: [src_core_locale.default],
  props: {
    opt: Object,
    onDestroy: Function
  },
  data () {
    return {
      disabled: false,
      callback: null,
      visible: true,
      dialog: {
        closeOnClickModal: false
      },
      isDrawer: false,
      option: {
        submitText: this.t('form.submitBtn'),
        emptyText: this.t('common.closeBtn'),
        submitIcon: 'el-icon-check',
        emptyIcon: 'el-icon-close',
        column: []
      },
      data: {}
    };
  },
  created () {
    this.show();
  },
  computed: {
    dialogType () {
      return this.isDrawer ? 'elDrawer' : 'elDialog'
    },
    menuPosition () {
      return this.opt.menuPosition || 'center'
    }
  },
  methods: {
    submit () {
      this.$refs.form.submit();
    },
    reset () {
      this.$refs.form.resetForm();
    },
    beforeClose (done) {
      done();
      this.close();
    },
    show () {
      let opt = this.opt;
      this.callback = opt.callback;
      let dialog = this.deepClone(opt);
      ['callback', 'option', 'data'].forEach(ele => delete dialog[ele]);
      this.dialog = Object.assign(this.dialog, dialog);
      this.dialog.size = this.dialog.width;
      this.isDrawer = this.dialog.type === 'drawer';
      this.option = Object.assign(this.option, opt.option);
      this.data = opt.data;
      this.visible = true;
    },
    close () {
      const callback = () => {
        this.visible = false;
        this.onDestroy();
      };
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose(callback);
      } else {
        callback();
      }
    },
    handleSubmit (data, done) {
      this.callback && this.callback({ data: data, close: this.close, done: done });
    }
  }
};

exports.default = script;
