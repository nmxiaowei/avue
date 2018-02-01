<template>
    <Header title="">
        <div slot="left"style="display: flex;align-items: center;">
            <img :src="logoSrc" width="40px" />&nbsp;
            <h3 style="letter-spacing: 1px;">新疆库尔勒农商行-快宜贷采集系统</h3>
        </div>
        <div slot="right">
            <small>{{this.time}}</small>&nbsp;
            <span>欢迎使用,</span>
            <small>{{user==null?'':user.userName||'本地用户'}}</small>
            <span style="padding:0 5px 0 8px">
                <i class="el-icon-my-out" @click="logout"></i>
            </span>
        </div>
    </Header>
</template>

<script>
import Header from "@/components/header/Header";
import logoSrc from "@/assets/img/logo.png";
import { mapState } from "vuex";
import { dateFormat } from "@/util/yun";
export default {
  name: "header",
  data() {
    return {
      logoSrc: logoSrc,
      time: dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
    };
  },
  created() {
    setInterval(() => {
      this.time = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
    }, 1000);
  },
  components: {
    Header
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    logout() {
      this.$confirm("是否退出快贷信息管理系统", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(data => {
            this.$store.commit("DEL_ALL");
            this.$router.isBack = true;
            this.$router.push({
              path: "/login"
            });
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

