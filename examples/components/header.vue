<template>
  <header class="header"
          :class="{'header--index':$route.path==='/'}">
    <div class="header__container">
      <p class="header__logo">
        <router-link :to="{path:'/'}">
          <img alt="logo"
               src="/static/images/logo.png">
          <span>AVUE</span>
        </router-link>
      </p>
      <!-- nav -->
      <ul class="header__nav">
        <li class="header__nav-item">
          <router-link :to="{path:'/component'}">文档
          </router-link>
        </li>
        <li class="header__nav-item">
          <a href="https://avuex.avue.top/#/vip"
             target="_blank">企业版</a>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/extend'}">第三方扩展
          </router-link>
        </li>

        <li class="header__nav-item">
          <a href="https://promotion.aliyun.com/ntms/act/qwbk.html?userCode=vqed4m0j"
             target="_blank">阿里云服务器1折起</a>
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
  data() {
    return {};
  },

  computed: {},

  methods: {},

  created() {}
};
</script>
<style  lang="scss">
.header {
  $width: 100%;
  padding: 0 80px;
  margin: 0 auto;
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  background-color: #2f54eb;
  color: #fff;
  z-index: 1024;
  transition: all 0.5s;
  box-sizing: border-box;
  &--active {
    width: 100%;
  }
  & + div {
    padding-top: 80px;
  }
  &--index {
    width: 1200px;
    position: relative;
    background-image: none;
    & + div {
      padding-top: 0;
    }
  }
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    img {
      margin-right: 10px;
      width: 28px;
    }
    a {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 16px;
      color: #fff;
    }
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
    margin-bottom: 40px;
    height: auto;
    overflow: hidden;
    background-color: #2f54eb;
    &-box {
      padding: 0 80px;
      position: relative;
      margin: 0 auto;
      min-height: 100px;
      height: auto;
      overflow: hidden;
    }
    &-info {
      padding: 40px 0 50px 0;
      height: auto;
      overflow: hidden;
    }
    &-title {
      color: #ffffff;
      font-weight: 400;
      font-size: 28px;
      letter-spacing: 3px;
      line-height: 1.6;
    }
    &-subtitle {
      margin-bottom: 30px;
      color: #ffffff;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 1.6;
    }
    &-detail {
      color: #eee;
      font-size: 14px;
      line-height: 25px;
      text-indent: 2em;
      a {
        margin: 0 5px;
        color: #eee;
        text-decoration: underline;
      }
    }
  }
}
</style>
