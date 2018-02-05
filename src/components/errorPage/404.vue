<template>
  <div class="error404-container pull-height">
    <div class="error404-image">
      <img :src="img_404" />
    </div>
    <router-link to="/"><el-button class="error404-btn" type="primary">返回主页</el-button></router-link>
  </div>
</template>

<script>
import img_404 from "@/assets/img/404_images/404_bg.jpg";

export default {
  data() {
    return {
      img_404
    };
  },
  computed: {
    message() {
      return "特朗普说这个页面你不能进......";
    }
  }
};
</script>

<style lang="scss" scoped>
.error404-container {
  width: 100%;
  margin-top: -20px;
  background-color: #fff;
  text-align: center;
}
.error404-image {
  margin-top: 120px;
}
</style>
