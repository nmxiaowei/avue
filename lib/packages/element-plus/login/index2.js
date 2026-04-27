/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

var script = src_core_create.default({
  name: 'login',
  mixins: [src_core_locale.default],
  emits: ['update:modelValue','send','refresh','submit'],
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {}
      }
    },
    codesrc: {
      type: String,
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    labelWidth () {
      return this.option.labelWidth || 80
    },
    time () {
      return this.option.time || 60
    },
    isImg () {
      return this.codeType === 'img'
    },
    isPhone () {
      return this.codeType === 'phone'
    },
    codeType () {
      return this.option.codeType || 'img'
    },
    width () {
      return this.option.width || '100%'
    },
    username () {
      return this.column.username || {}
    },
    password () {
      return this.column.password || {}
    },
    code () {
      return this.column.code || {}
    },
    column () {
      return this.option.column || {};
    },
    sendDisabled () {
      return !this.validatenull(this.check)
    },
    sendText () {
      return this.nowtime > 0
        ? this.t('login.resendCode', { time: this.nowtime })
        : this.t('login.sendCode');
    }

  },
  watch: {
    modelValue: {
      handler () {
        this.form = this.modelValue;
      },
      deep: true
    },
    form: {
      handler () {
        this.$emit('update:modelValue', this.form);
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      nowtime: 0,
      check: null,
      form: {}
    }
  },
  methods: {
    onSend () {
      const callback = () => {
        this.nowtime = this.time;
        this.check = setInterval(() => {
          this.nowtime--;
          if (this.nowtime === 0) {
            clearInterval(this.check);
            this.check = null;
          }
        }, 1000);
      };
      if (this.sendDisabled) return
      this.$emit('send', callback);
    },
    onRefresh () {
      this.$emit('refresh');
    },
    onSubmit () {
      const onCover = () => {
        const form = {};
        for (let o in this.form) {
          let key = o;
          if (this[o].prop) {
            key = this[o].prop;
          }
          form[key] = this.form[o];
        }
        return form;
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', onCover());
        }
      });
    }
  }
});

exports.default = script;
