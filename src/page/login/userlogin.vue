<template>
   <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0" >
        <el-form-item prop="username">
        <el-input @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
        <el-input @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
            <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click.native.prevent="handleLogin"  class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { isvalidUsername } from "@/util/validate";
export default {
  name: "userlogin",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入大于6位数的密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then(res => {
            this.$store.commit("ADD_TAG", {
              label: "欢迎页面",
              value: "/wel/"
            });
            this.$router.push({ path: "/" });
          });
        }
      });
    }
  }
};
</script>

<style>

</style>
