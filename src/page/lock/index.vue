<template>
    <div class="lock-container pull-height">
      <div class="lock-form  animated bounceInDown">
            <h3 class="text-white">{{userInfo.username}}</h3>
           <el-input placeholder="请输入登录密码"  class="input-with-select">
             <el-button slot="append" icon="icon-bofangqi-suoping" @click="handleLogin" ></el-button>
           </el-input>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "lock",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["tag"])
  },
  props: [],
  methods: {
    handleLogin() {
      this.$store.commit("CLEAR_LOCK");
      this.$router.push({ path: this.tag.value || "/" });
    }
  },
  components: {}
};
</script>

<style lang="scss">
.lock-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
}
.lock-container::before {
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
.lock-form {
  width: 300px;
}
</style>