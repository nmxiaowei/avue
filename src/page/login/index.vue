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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户密码" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
             <codeLogin></codeLogin>
          </el-tab-pane>
          <el-tab-pane label="第三方授权登录" name="third">
            <thirdLogin></thirdLogin>
          </el-tab-pane>
        </el-tabs>
        
    </div>
	</div>
</template>
<script>
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
export default {
  name: "login",
  data() {
    return {
      activeName: "user"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    handleClick() {}
  },
  components: {
    userLogin,
    codeLogin,
    thirdLogin
  }
};
</script>

<style lang="scss">
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
  padding: 140px 60px;
  width: 450px;
  height: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
  & > .el-tabs {
    margin-top: 30px;
  }
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