<template>
  <div class="pay">
    <div class="header__main">
      <div class="header__main-box">
        <div class="header__main-info">
          <div class="header__main-title">企业版</div>
          <div class="header__main-subtitle">AVUE-SECURITY</div>
          <div class="header__main-detail">
            为企业源码完全开放，自由修改核心随心所欲，完善的企业级后台模版，兼容所有主流浏览器（包括ie8+），响应式布局
            跨多终端适配，释放大量表单表格等其他组件的重复劳动，提供远程技术支持，授权后完后可以商用，无任何限制。
            <a href="https://cli2.avue.top"
               target="_blank">点击体验avue-cli</a>
          </div>
        </div>
      </div>
    </div>
    <fieldset>
      <legend align="center">AvueX发布计划</legend>
    </fieldset>
    <div class="pay__x">
      <h3>为了追求更好的极简化配置思想和一套代码多终端适配原则，来降低企业开发的周期和开发成本，让系统变得易维护，高效率开发的宗旨</h3>
      <p class="pay__x-list">
        1.底层代码将全部重构,顶级API进行重大的修整,但依然会保持与现有版本的兼容，现有项目无缝升级</br>
        2.增添手机版本（vant作为UI组件底层），一套代码多个终端自适应</br>
        3.crud的主-子的表格和批量（增删改查功能）的支持</br>
        4.内部功能分解为单独的包，方便企业二次开发和维护</br>
        5.多种扁平化风格随意切换更加符合企业风格</br>
        6.一键集成表格的导出excel，打印，等常用功能</br>
        7.丰富的数据展示组件，一键配置即可生成</br>
        8.底层更加完善的开发错误调试机制，轻量级的自动构建脚手架上手更容易</br>
        9.更多组件一键配置即可生成</br>
        10.详细的开发文档和源码讲解文档</br>
        11.购买后可用于商业化开发，永久更新授权使用</br>
        12.开放核心代码自行div开发</br>
        13.更多彩蛋等着你。。。</br>
      </p>
      <p>
        为了更好的认识avuex，放出一小部分demo测评（缩小浏览器即可体验适配模式）</br>
        <a target="_blank"
           href="https://sandbox.runjs.cn/show/g3tvedbg">avuex-crud（表格）</a>&nbsp;&nbsp;
        <a target="_blank"
           href="https://sandbox.runjs.cn/show/q3h1ytwb">avuex-form（表单）</a>&nbsp;&nbsp;
        <a target="_blank"
           href="https://sandbox.runjs.cn/show/suarwlhf">avuex-form-vant（手机版表单）</a>&nbsp;&nbsp;
        <a target="_blank"
           href="https://sandbox.runjs.cn/show/tacp12ya">avuex-form-group（分组表单）</a>&nbsp;&nbsp;
      </p>
      <p>发布时间：2019-01-01</p>
      <p>售价：999（现购企业版全家桶套餐，avuex将免费升级）</p>
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
                  <span v-if="item.money"
                        class="pay__content-money pay__content-money--line">￥&nbsp;{{item.money}}</span>
                </p>
                <div>
                  <p class="pay__content-subtitle">
                    {{item.subtitle}}
                  </p>
                </div>
                <span class="pay__content-money"><span class="pay__content-money--zhe"> ￥{{item.nowmoney}}</span></span>
              </div>
              <ul class="pay__content-text">
                <li v-for="(citem,cindex) in item.list"
                    :key="cindex"
                    :class="{'pay__content-text--bold':citem.bold}"
                    v-html="citem.title"></li>
              </ul>
              <div class="pay__content-submit">
                <a :href="item.lz[1]"
                   target="_blank"
                   v-if="item.lz">
                  <el-button>{{item.lz[0]}}</el-button>
                </a>
                <router-link :to="{path:'/component/avue2.x'}">
                  <el-button type="primary">获取授权</el-button>
                </router-link>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <fieldset>
      <legend align="center">avue-cli后台模版</legend>
    </fieldset>
    <div class="pay__detail">
      <div class="pay__detail-item">
        <div class="pay__detail-header">
          <span class="pay__detail-title">功能特权</span>
        </div>
        <div class="pay__detail-list">
          <div class="pay__detail-li"
               v-for="(item,index) in list"
               :key="index">
            {{item.title}}
          </div>
        </div>
      </div>
      <div class="pay__detail-item">
        <div class="pay__detail-header">
          <span class="pay__detail-title">开源版</span>
        </div>
        <div class="pay__detail-list">
          <div class="pay__detail-li"
               v-for="(item,index) in list"
               :key="index">
            <i class="pay__detail-icon"
               :class="item.first?'pay__detail-icon--pass':'pay__detail-icon--error'"></i>
          </div>
        </div>
      </div>
      <div class="pay__detail-item">
        <div class="pay__detail-header">
          <span class="pay__detail-title">企业版</span>
        </div>
        <div class="pay__detail-list">
          <div class="pay__detail-li"
               v-for="(item,index) in list"
               :key="index">
            <i class="pay__detail-icon"
               :class="item.second?'pay__detail-icon--pass':'pay__detail-icon--error'"></i>
          </div>
        </div>
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
import { pay, list } from "./config";
export default {
  data() {
    return {
      list: list,
      config: pay
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.main-cnt {
  padding: 0;
}
.pay {
  &__x {
    padding: 10px 30px;
    margin: 0 auto 20px auto;
    box-sizing: border-box;
    width: 1100px;
    line-height: 30px;
    color: #333;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 10px #ccc;
    &-list {
      font-size: 14px;
    }
  }
  &__detail {
    display: flex;
    align-items: flex-start;
    margin: 0 auto 50px auto;
    padding: 10px 20px;
    width: 1100px;
    &-header {
      padding-top: 20px;
      height: 80px;
      text-align: center;
      background-color: #fff;
    }
    &-title {
      color: #666;
      font-size: 22px;
    }
    &-item {
      width: 33.33%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      &:nth-child(1) {
        border-right: none;
      }
      &:nth-child(3) {
        border-left: none;
      }
    }
    &-li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      color: #666;
      text-align: center;
      background-color: #fff;
      &:nth-child(odd) {
        background-color: #fbf9f8;
      }
    }
    &-icon {
      display: block;
      margin: 0 auto;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: center;
      &--pass {
        background-image: url("https://wangpan.bdstatic.com/n/box-static/pan-center-cdn/widget/components/privilegeCompare/images/right_6472607.png");
      }
      &--error {
        background-image: url("https://wangpan.bdstatic.com/n/box-static/pan-center-cdn/widget/components/privilegeCompare/images/error_f2a16b2.png");
      }
    }
  }
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
    &-submit {
      margin-top: 30px;
      text-align: center;
      .el-button {
        width: 98%;
        margin-bottom: 10px;
      }
    }
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
      background-color: #fbf9f8;
    }
    &-title {
      margin: 0;
      margin-bottom: 10px;
      font-size: 24px;
      word-wrap: break-word;
      letter-spacing: 2px;
      font-weight: 400;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-subtitle {
      position: relative;
      display: inline-block;
      border: 1px solid #ccc;
      line-height: 28px;
      padding: 0 15px;
      border-radius: 5px;
      margin-top: 5px;
      color: #666;
      font-weight: 300;
      font-size: 14px;
    }
    &-money {
      text-align: center;
      font-size: 16px;
      color: #ff5722;
      font-weight: 400;
      &--line {
        text-decoration: line-through;
      }
      &--zhe {
        color: #ff5722;
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
