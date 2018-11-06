<template>
  <header class="header">
    <div class="header__container">
      <p class="header__logo">
        Avue 官方网站
      </p>
      <!-- nav -->
      <ul class="header__nav">
        <li class="header__nav-item">
          <router-link :to="{path:'/'}">主页
          </router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/component'}">文档
          </router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/about'}">联系我们
          </router-link>
        </li>
        <li class="header__nav-item">
          <a href="https://m.aliyun.com/act/team1111/#/share?params=N.EN2hxhpNQG.vqed4m0j"
             target="_blank">阿里云双十一大促销</a>
        </li>
        <li class="header__nav-item">
          <a href="https://github.com/nmxiaowei/avue"
             target="_blank">github</a>
        </li>
        <li class="header__nav-item">
          <a href="https://gitee.com/smallweigit/avue"
             target="_blank">码云</a>
        </li>
        <li class="header__nav-item">
          <a href="https://www.kancloud.cn/smallwei/avue"
             target="_blank">看云文档</a>
        </li>
      </ul>
    </div>
    <!-- <div class="header__main">
      <div class="haeder__main-box">
        <div class="header__main-title">微服务</div>
        <div class="header__main-subtitle">RENREN-CLOUD</div>
      </div>
    </div> -->
  </header>
</template>
<script>

export default {
  data () {
    return {

    };
  },

  computed: {
  },

  methods: {
  },

  created () {

  }
};
</script>
<style  lang="scss">
.header {
  $width: 1000px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #47aca1;
  color: #fff;
  z-index: 1024;
  & + div {
    padding-top: 50px;
  }
  &__container {
    margin: 0 auto;
    width: $width;
    height: 80px;
    display: flex;
    align-items: center;
  }
  &__logo {
    margin-right: 50px;
    font-size: 22px;
  }
  &__nav {
    list-style: none;
    display: flex;
    &-item {
      margin: 0 5px;
      font-size: 14px;
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
      a {
        padding: 10px 12px;
        display: block;
        color: #fff;
      }
    }
  }
  &__main {
    background-color: #47aca1;
    &-box {
      position: relative;
      margin: 0 auto;
      width: $width;
      height: 220px;
    }
    &-info {
      position: absolute;
      bottom: 60px;
      left: 30px;
    }
    &-title {
      color: #ffffff;
      font-weight: 400;
      font-size: 28px;
      letter-spacing: 3px;
      line-height: 1.6;
    }
    &-subtitle {
      color: #ffffff;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 1.6;
    }
  }
}
</style>
