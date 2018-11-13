<template>
  <header class="header"
          :class="{'header--index':$route.path==='/'}">
    <div class="header__container">
      <p class="header__logo">
        <router-link :to="{path:'/'}">Avue</router-link>
      </p>
      <!-- nav -->
      <ul class="header__nav">
        <li class="header__nav-item">
          <router-link :to="{path:'/component'}">文档
          </router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/pay'}">企业版
          </router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/extend'}">第三方扩展
          </router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:'/about'}">联系我们
          </router-link>
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
  background-image: linear-gradient(
    -90deg,
    #03dde4 0%,
    #30afed 51%,
    #8755ff 100%
  );
  color: #fff;
  z-index: 1024;
  & + div {
    padding-top: 80px;
  }
  &--index {
    position: relative;
    background-image: none;
    & + div {
      padding-top: 0;
    }
  }
  &__container {
    margin: 0 auto;
    width: $width;
    height: 80px;
    display: flex;
    align-items: center;
  }
  &__logo {
    margin-right: 100px;
    font-weight: 300;
    font-size: 32px;
    a {
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
    background-image: linear-gradient(
      -90deg,
      #03dde4 0%,
      #30afed 51%,
      #8755ff 100%
    );
    &-box {
      position: relative;
      margin: 0 auto;
      width: $width;
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
    }
  }
}
</style>
