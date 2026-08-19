<template>
  <div :class="b()"
       :style="{ width: setPx(width) }">
    <el-form ref="form"
             :model="form"
             :size="$AVUE.size"
             :label-width="formLabelWidth"
             label-suffix=":"
             @keyup.enter="onSubmit">
      <el-form-item v-if="!username.hide"
                    :label="username.label || t('login.usernameLabel')"
                    :rules="username.rules"
                    prop="username">
        <el-tooltip :content="username.tip"
                    :disabled="username.tip === undefined"
                    placement="top-start">
          <el-input v-model="form.username"
                    :prefix-icon="username.prefixIcon || 'el-icon-user'"
                    :placeholder="username.placeholder || t('login.usernamePlaceholder')"
                    :autocomplete="username.autocomplete || 'username'"
                    :disabled="disabled || loading"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-if="!password.hide"
                    :label="password.label || t('login.passwordLabel')"
                    :rules="password.rules"
                    prop="password">
        <el-tooltip :content="password.tip"
                    :disabled="password.tip === undefined"
                    placement="top-start">
          <el-input v-model="form.password"
                    type="password"
                    show-password
                    :prefix-icon="password.prefixIcon || 'el-icon-unlock'"
                    :placeholder="password.placeholder || t('login.passwordPlaceholder')"
                    :autocomplete="password.autocomplete || 'current-password'"
                    :disabled="disabled || loading"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-if="!code.hide"
                    :label="code.label || t('login.codeLabel')"
                    :rules="code.rules"
                    prop="code">
        <el-tooltip :content="code.tip"
                    :disabled="code.tip === undefined"
                    placement="top-start">
          <el-input v-model="form.code"
                    :prefix-icon="code.prefixIcon || 'el-icon-c-scale-to-original'"
                    :placeholder="code.placeholder || t('login.codePlaceholder')"
                    :autocomplete="code.autocomplete || 'one-time-code'"
                    :disabled="disabled || loading">
            <template #append>
              <el-button v-if="isPhone"
                         type="primary"
                         :class="b('send')"
                         :disabled="sendDisabled || disabled || loading"
                         :loading="sending"
                         @click="onSend">{{ sendText }}</el-button>
              <button v-else-if="isImg"
                      type="button"
                      :class="b('captcha')"
                      :disabled="disabled || loading"
                      aria-label="刷新验证码"
                      @click="onRefresh">
                <img :src="codesrc"
                     alt="验证码">
              </button>
            </template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item :class="b('actions')">
        <el-button type="primary"
                   native-type="button"
                   :class="b('submit')"
                   :disabled="disabled"
                   :loading="loading"
                   @click="onSubmit">{{ submitText }}</el-button>
      </el-form-item>
      <slot name="footer"
            :form="form"></slot>
    </el-form>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";

export default create({
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
        if (!this.syncing) this.$emit('update:modelValue', { ...value })
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
</script>
