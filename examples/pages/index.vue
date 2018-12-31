<template>
  <div class="index">
    <div class="index__bg"></div>
    <div class="animation animation1"></div>
    <div class="animation animation2"></div>
    <div class="animation animation3"></div>
    <div class="animation animation4"></div>
    <div class="animation animation5"></div>
    <div class="index__banner">
      <img src="/static/images/logo.png"
           class="logo-wepper" />
      <p class="index__banner-title">Avue是一款神奇的配置化前端框架，让数据驱动视图，减去繁琐的操作，集成多种企业常用的功能，更加贴合企业的开发</h1>
        <div class="index__menu">
          <router-link :to="{path:'/component'}">
            <el-button class="index__menu-btn index__menu-btn--get">开始学习</el-button>
          </router-link>
        </div>
        <div class="index__banner-version">
          <span>当前版本：<cite>{{version}}</cite></span>
          <span>
            <router-link :to="{path:'/component/changelog'}">更新日志</router-link>
          </span>
        </div>

    </div>
    <div class="index__title">
      <h2>为用户定制的前端脚手架框架，搬砖神器，接私活利器，拯救后台开发不开心</h2>
      <p>Avue可以省去大量编写重复crud和form的工具，复用性高（瞬间完成表单与表格的相互转换）并且含有基于json驱动的UI的大量丰富组件，前端界的搬砖神器，具体demo可以
        <a href="/#/component/installation">查看文档</a>
      </p>
    </div>
    <fieldset>
      <legend align="center">avue的神奇</legend>
    </fieldset>
    <div class="index__ys">
      <div class="index__ys-item">
        <img class="index__ys-img"
             src="/static/images/icon1.png"
             alt="">
        <p class="index__ys-title">快速开发</p>
        <p class="index__ys-info">只要根据文档属性，即可配置开发快速打造出表格，表单等其他数据展示交互页面</p>
      </div>
      <div class="index__ys-item">
        <img class="index__ys-img"
             src="/static/images/icon2.png"
             alt="">
        <p class="index__ys-title">兼容性</p>
        <p class="index__ys-info">完美的兼容各大支流浏览器（包括ie8+以上），并且底层做了跨屏终端适配，完美实现一套代码多终端显示</p>
      </div>
      <div class="index__ys-item">
        <img class="index__ys-img"
             src="/static/images/icon3.png"
             alt="">
        <p class="index__ys-title">复用性高</p>
        <p class="index__ys-info">基于配置化驱动视图，一套配置即可完成表格和表单的全部操作，同时支持表格和表单的相互转换</p>
      </div>
      <div class="index__ys-item">
        <img class="index__ys-img"
             src="/static/images/icon4.png"
             alt="">
        <p class="index__ys-title">版本更新</p>
        <p class="index__ys-info">产品将不断根据需求和参考issuse反馈的意见迭代更新，同时提供了全面的文档学习研究，上手更加容易</p>
      </div>
    </div>
  </div>
</template>

<script>
import packages from "../../package.json";
export default {
  data() {
    return {
      version: packages.version
    };
  },
  methods: {}
};
</script>

<style lang="scss">
@import url("../assets/styles/animation.scss");
.main-cnt {
  padding: 0;
}
.logo-wepper {
  width: 160px;
  height: 160px;
  margin: 0 auto 20px 0;
  position: relative;
}
.index {
  .el-card__header {
    padding: 0;
  }
  &__bg {
    background-color: #2f54eb;
    background-size: cover;
    background-position: center 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 620px;
    z-index: -2;
  }
  &__banner {
    padding: 80px 0 40px 0;
    margin-bottom: 60px;
    text-align: center;
    color: #fff;
    &-title {
      width: 500px;
      margin: 0 auto;
      line-height: 30px;
      padding: 0;
      font-size: 16px;
    }

    &-version {
      margin-bottom: 30px;
      font-size: 12px;
      span {
        margin: 0 5px;
      }
      cite,
      em {
        font-style: normal;
      }
      a {
        color: #fff;
        text-decoration: underline;
      }
    }
    &-other {
      text-align: center;
      a {
        display: inline-block;
        vertical-align: middle;
        height: 28px;
        line-height: 28px;
        margin: 0 5px;
        padding: 0 8px;
        border-radius: 2px;
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid #c2c2c2;
        border-color: rgba(255, 255, 255, 0.2);
        font-size: 14px;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        &:hover,
        &:focus,
        &:active {
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }
  &__tip {
    width: 1100px;
    margin: 10px auto 40px auto;
  }
  &__title {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 100px;
    h2 {
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
      text-indent: 35px;
      line-height: 30px;
    }
  }
  &__menu {
    margin-top: 60px;
    margin-bottom: 5px;
    text-align: center;
    &-btn {
      margin-right: 20px;
      margin-bottom: 10px;
      width: 233px;
      height: 62px;
      font-size: 24px;
      font-weight: 400;
      border-radius: 3px;
      transition: all 0.5s;
      &--get {
        background-color: transparent;
        border-color: #fff;
        color: #fff;
        &:hover,
        &:focus,
        &:active {
          border-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 30px;
        }
      }
    }
  }
  &__ys {
    margin: 50px auto 0 auto;
    width: 1100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    &-item {
      padding: 40px 30px 10px 30px;
      width: 220px;
      min-height: 330px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      &:hover {
        box-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
      }
    }
    &-img {
      width: 80px;
    }
    &-title {
      font-size: 18px;
      font-weight: 500;
    }
    &-info {
      color: #666;
      font-size: 13px;
      line-height: 25px;
      text-align: left;
      text-indent: 2em;
    }
  }
}
</style>
