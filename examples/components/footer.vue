<template>
  <div class="footer">
    <el-row :span="24"
            class="footer__row">
      <el-col :span="6"
              class="footer__item">
        <p class="footer__title">项目简介</p>
        <p class="footer__text">
          Avue是基于vue和element-ui的快速开发框架 它的核心是数据驱动UI的思想，
          让我们从繁琐的crud开发中解脱出来，同时不知局限于crud，它还有我们经常用的一些组件例如，
          表单，数据展示卡，人物展示卡等，更多的组件还在开发
        </p>
      </el-col>
      <el-col :span="6"
              class="footer__item">
        <p class="footer__title">联系方式</p>
        <p class="footer__product">交流群:606410437</p>
        <p class="footer__product">wechat:1634566606</p>
        <p class="footer__product">QQ:1634566606</p>
        <p class="footer__product">Email:1634566606@qq.com</p>
      </el-col>
      <el-col :span="6"
              class="footer__item">
        <p class="footer__title">友情链接</p>
        <p class="footer__product"><a href="https://pig4cloud.com/"
             target="_blank">pig官网</a></p>
        <p class="footer__product"><a href="https://gitee.com/log4j/pig-ui"
             target="_blank">pig-ui(pig的前台页面)</a></p>
        <p class="footer__product"><a href="https://gitee.com/log4j/pig"
             target="_blank">pig(spring cloud)</a></p>
        <p class="footer__product"><a href="https://gitee.com/log4j/pig"
             target="_blank">pigx(全网最新的Cloud权限系统)</a></p>
      </el-col>
      <el-col :span="6"
              class="footer__item">
        <p class="footer__title">更新日志</p>
        <p class="footer__product"></p>
        <p class="footer__product">avue(v1.4.0) 更新日期：2018-11-16</p>
        <p class="footer__product">avue-cli 更新日期：2018-11-11</p>
      </el-col>
    </el-row>
    <div class="footer__copyright">
      版权所有 ©2018 By smallwei
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 80px;
  padding: 50px 0 20px 0;
  background: #3e4049 none repeat center top;
  &__row {
    margin: 0 auto 20px auto;
    width: 1000px;
  }
  &__title {
    margin: 0;
    font-size: 18px;
    font-family: 微软雅黑, sans-serif;
    color: rgb(169, 169, 169);
    font-weight: bold;
  }
  &__item {
    padding-left: 20px;
  }
  &__text {
    text-indent: 30px;
    color: rgb(128, 128, 128);
    font-size: 12px;
    font-family: 微软雅黑, sans-serif;
    display: table-cell;
    line-height: 2em;
    padding-top: 10px;
    padding-right: 20px;
  }
  &__product {
    color: rgb(128, 128, 128);
    font-size: 12px;
    font-family: 微软雅黑, sans-serif;
    margin-bottom: 5px;
  }
  &__copyright {
    padding: 30px 0;
    text-align: center;
    color: #808080;
    font-size: 14px;
  }
}
</style>

