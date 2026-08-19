/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: 'login',
  mixins: [locale],
  emits: ['update:modelValue', 'send', 'refresh', 'submit', 'invalid'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    codesrc: String,
    option: {
      type: Object,
      default: () => ({})
    },
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    formLabelWidth () {
      return this.setPx(this.option.labelWidth || 88)
    },
    time () {
      return Number(this.option.time) || 60
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
      return this.option.column || {}
    },
    sendDisabled () {
      return this.nowtime > 0 || this.sending
    },
    sendText () {
      return this.nowtime > 0
        ? this.t('login.resendCode', { time: this.nowtime })
        : this.t('login.sendCode')
    },
    submitText () {
      return this.option.submitText || this.t('login.submitBtn')
    }
  },
  watch: {
    modelValue: {
      handler (value) {
        const nextForm = {
          username: '',
          password: '',
          code: '',
          ...(value || {})
        };
        const same = Object.keys(nextForm).length === Object.keys(this.form).length &&
          Object.keys(nextForm).every((key) => nextForm[key] === this.form[key]);
        if (same) return;
        this.syncing = true;
        this.form = nextForm;
        this.$nextTick(() => {
          this.syncing = false;
        });
      },
      deep: true,
      immediate: true
    },
    form: {
      handler (value) {
        if (!this.syncing) this.$emit('update:modelValue', { ...value });
      },
      deep: true
    }
  },
  data () {
    return {
      nowtime: 0,
      check: null,
      form: {},
      sending: false,
      syncing: false
    }
  },
  beforeUnmount () {
    this.clearTimer();
  },
  methods: {
    onSend () {
      if (this.sendDisabled || this.disabled || this.loading) return;
      this.sending = true;
      let completed = false;
      const done = () => {
        if (completed) return;
        completed = true;
        this.sending = false;
        this.clearTimer();
        this.nowtime = this.time;
        this.check = setInterval(() => {
          this.nowtime -= 1;
          if (this.nowtime <= 0) this.clearTimer();
        }, 1000);
      };
      this.$emit('send', done, { ...this.form });
      this.$nextTick(() => {
        if (!completed) this.sending = false;
      });
    },
    onRefresh () {
      if (!this.disabled && !this.loading) this.$emit('refresh');
    },
    clearTimer () {
      if (this.check) {
        clearInterval(this.check);
        this.check = null;
      }
      this.nowtime = 0;
    },
    onSubmit () {
      if (this.disabled || this.loading || !this.$refs.form) return;
      this.$refs.form.validate((valid, fields) => {
        if (!valid) {
          this.$emit('invalid', fields);
          return;
        }
        const result = {};
        Object.keys(this.form).forEach((key) => {
          const column = this[key] || {};
          result[column.prop || key] = this.form[key];
        });
        this.$emit('submit', result);
      });
    }
  }
});

export { script as default };
