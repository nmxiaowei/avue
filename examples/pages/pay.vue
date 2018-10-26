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
                  v-for="(item,index) in config"
                  :key="index">
            <el-card>
              <div slot="header"
                   class="pay__content-title">
                {{item.title}}
              </div>
              <ul class="pay__content-text">
                <li v-for="(citem,cindex) in item.list"
                    :key="cindex"
                    :class="{'pay__content-text--bold':citem.bold}"
                    v-html="citem.title"></li>
              </ul>
              <h2 class="pay__content-money">￥&nbsp;{{item.money}}</h2>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
    custormAnchor (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
}
</script>

<style lang="scss">
.main-cnt {
  padding: 0;
}
.pay {
  padding-top: 100px;
  &__banner {
    padding: 20px 0 50px 0;
    background-color: #24262f;
    text-align: center;
    color: #fff;
    h1 {
      padding-top: 60px;
      padding-bottom: 10px;
      line-height: 32px;
      font-size: 36px;
      font-weight: 300;
    }
    p {
      color: rgba(255, 255, 255, 0.8);
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
    &-list {
      width: 1200px;
      margin: 30px auto;
    }
    &-item {
      margin-bottom: 20px;
    }
    &-title {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
    &-money {
      text-align: center;
      font-size: 52px;
      color: #409eff;
      font-weight: 300;
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
