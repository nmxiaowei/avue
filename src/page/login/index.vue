<template>
	<div class="login-container pull-height pull-overflow" @keyup.enter.native="handleLogin">
    <div class="login-info text-white animated fadeInLeft">
      <h2>Avue 通用管理系统快速开发框架</h2>
      <ul>
        <li><i class="el-icon-check"></i> Avue 是一个基于vue+vuex+vue-router快速后台管理模板，采用token交互验证方式。</li>
        <li><i class="el-icon-check"></i> 您可以 Avue 为基础，不只限制于vue的页面，你可以嵌入任意第三方网站，基于iframe框架。</li>
        <li><i class="el-icon-check"></i> Avue 构建简单上手快，最大程度上帮助企业节省时间成本和费用开支。 </li>
      </ul>
    </div>
		<div class="login-main pull-height animated fadeIn">
        <h2>登录 Avue</h2>
        <p>Avue 在线演示系统</p>
        <el-form  class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0" >
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
    </div>
	</div>
</template>

<script>
import { isvalidUsername } from "@/util/validate";
export default {
  name: "login",
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
            this.$router.push({ path: "/" });
          });
        }
      });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info > ul {
  padding: 20px 0;
}
.login-info > ul > li {
  font-size: 14px;
}
.login-main {
  padding: 180px 60px;
  width: 450px;
  height: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-submit {
  width: 100%;
}
.login-form {
  margin: 20px 0;
}
</style>