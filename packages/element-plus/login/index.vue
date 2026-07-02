<template>
  <div :class="b()"
       :style="{width:setPx(width)}">
    <el-form :model="form"
             ref="form"
             :size="$AVUE.size"
             label-suffix=":"
             :label-width="setPx(labelWidth)">
      <el-form-item :label="username.label || t('login.usernameLabel')"
                    :rules="username.rules"
                    :label-width="setPx(username.labelWidth)"
                    v-if="!username.hide"
                    prop="username">
        <el-tooltip :content="username.tip"
                    :disabled="username.tip===undefined"
                    placement="top-start">
          <el-input v-model="form.username"
                    :prefix-icon="username.prefixIcon || 'el-icon-user'"
                    :placeholder="username.placeholder || t('login.usernamePlaceholder')"
                    :autocomplete="username.autocomplete"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="password.label || t('login.passwordLabel')"
                    :rules="password.rules"
                    :label-width="setPx(password.labelWidth)"
                    v-if="!password.hide"
                    prop="password">
        <el-tooltip :content="password.tip"
                    :disabled="password.tip===undefined"
                    placement="top-start">
          <el-input type="password"
                    :prefix-icon="password.prefixIcon || 'el-icon-unlock'"
                    :placeholder="password.placeholder || t('login.passwordPlaceholder')"
                    show-password
                    v-model="form.password"
                    :autocomplete="password.autocomplete"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="code.label || t('login.codeLabel')"
                    :rules="code.rules"
                    v-if="!code.hide"
                    :label-width="setPx(code.labelWidth)"
                    prop="code">
        <el-tooltip :content="code.tip"
                    :disabled="code.tip===undefined"
                    placement="top-start">
          <el-input v-model="form.code"
                    :prefix-icon="code.prefixIcon || 'el-icon-c-scale-to-original'"
                    :placeholder="code.placeholder || t('login.codePlaceholder')"
                    :autocomplete="code.autocomplete">

            <template #append>
              <el-button type="primary"
                         :class="b('send')"
                         v-if="isPhone"
                         :disabled="sendDisabled"
                         @click="onSend">{{sendText}}</el-button>
              <span v-if="isImg">
                <img :src="codesrc"
                     alt=""
                     @click="onRefresh"
                     width="80"
                     height="25">
              </span>
            </template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit"
                   :class="b('submit')">{{t('login.submitBtn')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
export default create({
  name: 'login',
  mixins: [locale],
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
        this.form = this.modelValue
      },
      deep: true
    },
    form: {
      handler () {
        this.$emit('update:modelValue', this.form)
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
  beforeUnmount () {
    this.clearTimer();
  },
  methods: {
    onSend () {
      const callback = () => {
        this.clearTimer();
        this.nowtime = this.time;
        this.check = setInterval(() => {
          this.nowtime--
          if (this.nowtime <= 0) {
            this.clearTimer();
          }
        }, 1000)
      }
      if (this.sendDisabled) return
      this.$emit('send', callback)
    },
    onRefresh () {
      this.$emit('refresh');
    },
    clearTimer () {
      if (this.check) {
        clearInterval(this.check);
        this.check = null;
      }
    },
    onSubmit () {
      const onCover = () => {
        const form = {};
        for (let o in this.form) {
          let key = o;
          if (this[o].prop) {
            key = this[o].prop
          }
          form[key] = this.form[o]
        }
        return form;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', onCover())
        }
      });
    }
  }
});
</script>
