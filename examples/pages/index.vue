<template>
  <div class="pay">
    <div class="pay__banner">
      <h1>Avue 一款神奇的vue组件框架</h1>
      <p>完全由数据驱动视图，基于可配置化方式完成大量重复的curd和form等功能</p>
      <div class="pay__menu">
        <a href="https://cli2.avue.top"
           target="_blank">
          <el-button class="pay__menu-btn pay__menu-btn--download"
                     type="primary">在线体验</el-button>
        </a>
        <a href="https://avue.top/#/component/avue2.x"
           target="_blank">
          <el-button class="pay__menu-btn pay__menu-btn--get">获取授权</el-button>
        </a>
      </div>
    </div>
    <div class="pay__title">
      <h2>为用户定制的前端脚手架框架，搬砖神器，接私私货利器，拯救后台开发不开心</h2>
      <p>Avue可以省去大量编写重复crud和form的工具，复用性高（瞬间完成表单与表格的相互转换）并且含有基于json驱动的UI的大量丰富组件，前端界的搬砖神器，具体demo可以
        <a href="/#/component/installation">查看文档</a>
      </p>
    </div>
    <fieldset>
      <legend align="center">获取授权</legend>
    </fieldset>
    <div class="pay__content"
         id="list"
         name="list">
      <div class="pay__content-list">
        <el-row :span="24"
                :gutter="30">
          <el-col :md="item.span || 8"
                  :sm="24"
                  :xs="24"
                  class="pay__content-item"
                  :class="{'pay__content-v':item.v}"
                  v-for="(item,index) in config"
                  :key="index">
            <el-card>
              <div slot="header"
                   class="pay__content-header">
                <img v-if="item.v"
                     src="../assets/images/vip.png"
                     class="pay__content-vip" />
                <p class="pay__content-title">
                  <img v-if="item.vip===1"
                       class="pay__content-tip"
                       src="../assets/images/vip1.png"
                       alt="">
                  <img v-else
                       class="pay__content-tip"
                       src="../assets/images/vip2.png"
                       alt="">
                  {{item.title}}
                  <span class="pay__content-money pay__content-money--line">￥&nbsp;{{item.money}}</span>
                </p>
                <div>
                  <p class="pay__content-subtitle">
                    {{item.subtitle}}
                  </p>
                </div>
                <span class="pay__content-money"><span class="pay__content-money--zhe"> ￥{{item.nowmoney}}</span>（双11限时特惠）</span>
              </div>
              <ul class="pay__content-text">
                <li v-for="(citem,cindex) in item.list"
                    :key="cindex"
                    :class="{'pay__content-text--bold':citem.bold}"
                    v-html="citem.title"></li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="avue-tip pay__tip">
      <h4 class="avue-tip__title">
        如果购买过程中或者使用过程中，如有疑问？请咨询
        作者，发送邮件，在交流群里提问或者点击<a href="/#/about">联系我们</a>
      </h4>
    </div>
    <div class="pay__silder">
      <el-carousel height="500px"
                   :interval="3000"
                   type="card">
        <el-carousel-item>
          <h2 class="pay__silder-title">登录页</h2>
          <img class="pay__silder-img"
               src="../assets/images/avue3.png"
               alt="">
        </el-carousel-item>
        <el-carousel-item>
          <h2 class="pay__silder-title">电脑页</h2>
          <img class="pay__silder-img"
               src="../assets/images/avue1.png"
               alt="">
        </el-carousel-item>
        <el-carousel-item>
          <h2 class="pay__silder-title">手机页</h2>
          <img class="pay__silder-img"
               src="../assets/images/avue2.png"
               alt="">
        </el-carousel-item>
        <el-carousel-item>
          <h2 class="pay__silder-title">炫彩主题</h2>
          <img class="pay__silder-img"
               src="../assets/images/avue4.png"
               alt="">
        </el-carousel-item>

      </el-carousel>
    </div>
  </div>
</template>

<script>
import config from './config';
export default {
  data () {
    return {
      config: config,
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.main-cnt {
  padding: 0;
}
.pay {
  .el-card__header {
    padding: 0;
  }
  &__banner {
    padding: 20px 0 40px 0;
    margin-bottom: 60px;
    background-color: #47aca1;
    text-align: center;
    color: #fff;
    h1 {
      padding-top: 60px;
      padding-bottom: 10px;
      line-height: 34px;
      font-size: 36px;
      font-weight: 300;
    }
    p {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  &__tip {
    width: 1100px;
    margin: 10px auto 40px auto;
  }
  &__title {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 50px;
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
    margin-top: 50px;
    text-align: center;
    &-btn {
      margin-right: 20px;
      margin-bottom: 10px;
      width: 206px;
      height: 60px;
      font-size: 26px;
      font-weight: 300;
      border-radius: 3px;
      &--download {
        background-color: rgba(255, 255, 255, 0.5);
        border-color: #fff;
        color: #fff;
        &:hover,
        &:focus,
        &:active {
          color: #fff;
          border-color: #fff;
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
      &--get {
        background-color: transparent;
        color: #fff;
        &:hover,
        &:focus,
        &:active {
          color: #fff;
          border-color: #fff;
          background-color: transparent;
        }
      }
    }
  }
  &__content {
    margin-bottom: 30px;
    &-vip {
      position: absolute;
      left: 0;
      top: 0;
    }
    &-v {
      .el-card {
        border-color: #f2ddaf;
        background-color: #fffaeb;
        border-width: 2px;
      }
    }
    &-tip {
      margin-right: 5px;
      width: 25px;
      height: 25px;
    }
    &-list {
      width: 1100px;
      margin: 30px auto;
    }
    &-item {
      margin-bottom: 20px;
    }
    &-header {
      position: relative;
      padding: 40px 0 20px 0;
      text-align: center;
      background-color: #49a0f5;
    }
    &-title {
      margin: 0;
      margin-bottom: 10px;
      font-size: 24px;
      word-wrap: break-word;
      letter-spacing: 2px;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-subtitle {
      position: relative;
      display: inline-block;
      border: 1px solid #e4d5d5;
      line-height: 28px;
      padding: 0 15px;
      border-radius: 5px;
      margin-top: 5px;
      color: #ddd;
      font-weight: 300;
      font-size: 14px;
    }
    &-money {
      text-align: center;
      font-size: 16px;
      color: #fff;
      font-weight: 400;
      &--line {
        text-decoration: line-through;
      }
      &--zhe {
        color: #fe1e53;
        font-weight: 700;
        font-size: 32px;
      }
    }
    &-text {
      height: 350px;
      margin-top: 15px;
      margin-left: 20px;
      text-align: left;
      padding: 5px 0 5px 15px;
      &--bold {
        color: #ff5722;
      }
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
  &__silder {
    padding: 30px 0;
    background-color: #24262f;
    &-title {
      margin-bottom: 10px;
      color: #fff;
      text-align: center;
      font-weight: 300;
    }
    &-img {
      padding: 5px;
      width: 100%;
    }
  }
}
</style>
