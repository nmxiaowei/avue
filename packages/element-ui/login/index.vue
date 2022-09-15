<template>
  <div :class="b()"
       :style="{width:setPx(width)}">
    <el-form :model="form"
             ref="form"
             label-suffix=":"
             :label-width="setPx(labelWidth)">
      <el-form-item :label="username.label || '用户名'"
                    :rules="username.rules"
                    :label-width="setPx(username.labelWidth)"
                    v-if="!username.hide"
                    prop="username">
        <el-tooltip :content="username.tip"
                    :disabled="username.tip===undefined"
                    placement="top-start">
          <el-input v-model="form.username"
                    size="small"
                    :prefix-icon="username.prefixIcon || 'el-icon-user'"
                    :placeholder="username.placeholder || '请输入用户名'"
                    :autocomplete="username.autocomplete"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="password.label || '密码'"
                    :rules="password.rules"
                    :label-width="setPx(password.labelWidth)"
                    v-if="!password.hide"
                    prop="password">
        <el-tooltip :content="password.tip"
                    :disabled="password.tip===undefined"
                    placement="top-start">
          <el-input type="password"
                    size="small"
                    :prefix-icon="password.prefixIcon || 'el-icon-unlock'"
                    :placeholder="password.placeholder || '请输入密码'"
                    show-password
                    v-model="form.password"
                    :autocomplete="password.autocomplete"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="code.label || '验证码'"
                    :rules="code.rules"
                    v-if="!code.hide"
                    :label-width="setPx(code.labelWidth)"
                    prop="code">
        <el-tooltip :content="code.tip"
                    :disabled="code.tip===undefined"
                    placement="top-start">
          <el-input v-model="form.code"
                    size="small"
                    :prefix-icon="code.prefixIcon || 'el-icon-c-scale-to-original'"
                    :placeholder="code.placeholder || '请输入验证码'"
                    :autocomplete="code.autocomplete">

            <template slot="append">
              <el-button type="primary"
                         :class="b('send')"
                         v-if="isPhone"
                         :disabled="sendDisabled"
                         @click="onSend">{{text}}</el-button>
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
                   :class="b('submit')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const INIT_TEXT = '发送验证码'
const TIP_TEXT = '{{time}}s后重获取'
import create from "core/create";
export default create({
  name: 'login',
  props: {
    value: {
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
    form: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    },
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
    }

  },
  data () {
    return {
      text: INIT_TEXT,
      nowtime: '',
      check: {},
      flag: false
    }
  },
  methods: {
    onSend () {
      const callback = () => {
        this.nowtime = this.time;
        this.text = TIP_TEXT.replace('{{time}}', this.nowtime);
        this.check = setInterval(() => {
          this.nowtime--
          if (this.nowtime === 0) {
            this.text = INIT_TEXT;
            clearInterval(this.check);
            this.check = null;
          } else {
            this.text = TIP_TEXT.replace('{{time}}', this.nowtime);
          }
        }, 1000)
      }
      if (this.sendDisabled) return
      this.$emit('send', callback)
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
