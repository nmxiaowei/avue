<template>
  <div class="404-container">
    <img :src="img_404" />
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
.404-container {
  width: 100%;
  margin-top: -20px;
  background-color: #f0f2f5;
  & > img {
    width: 100%;
  }
}
</style>
