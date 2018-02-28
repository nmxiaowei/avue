<template>
<div class="header">
		<div class="header-button is-left">
		  <h3 style="letter-spacing: 1px;">Avue 通用管理系统快速开发框架</h3>
		</div>
		<h1 class="header-title"></h1>
		<div class="header-button is-right">
        <i class="icon-bofangqi-suoping header-item"></i>
        <i class="icon-quanping header-item" @click="handleScreen"></i>
         <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { fullscreenToggel } from "@/util/util";
export default {
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

