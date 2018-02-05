<template>
<div class="header">
		<div class="header-button is-left">
		  <h3 style="letter-spacing: 1px;">Avue 通用管理系统快速开发框架</h3>
		</div>
		<h1 class="header-title"></h1>
		<div class="header-button is-right">
        <small>{{time | dateFormat}}</small>&nbsp;
        <span>欢迎使用 ,&nbsp;</span>
        <small>{{userInfo.username}}</small>
        <span style="padding:0 5px 0 8px">
            <i class="el-icon-my-out" @click="logout"></i>
        </span>
		</div>
	</div>
</template>

<script>
import logoSrc from "@/assets/img/logo.png";
import { mapState } from "vuex";
export default {
  name: "header",
  data() {
    return {
      logoSrc: logoSrc,
      time: new Date()
    };
  },
  filters: {},
  created() {
    this.initDate();
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  methods: {
    initDate() {
      setInterval(() => {
        this.time = new Date();
      }, 1000);
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #409eff;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 18px;
  height: 60px;
  line-height: 1;
  padding: 0 10px;
  text-align: center;
  white-space: nowrap;
}

.header-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: inherit;
  font-weight: 400;
  flex: 1;
}

.header-button.is-left {
  text-align: left;
}

.header-button.is-right {
  text-align: right;
}

.header-button {
  flex: 0.5;
}
</style>

