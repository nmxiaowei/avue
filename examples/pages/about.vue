<template>
  <div class="about">
    <div class="header__main">
      <div class="header__main-box">
        <div class="header__main-info">
          <div class="header__main-title">联系我们</div>
          <div class="header__main-subtitle">CONTACT</div>
        </div>
      </div>
    </div>
    <el-row :span="24"
            class="about__content">
      <el-col :span="12">
        <p class="about__title">avue 项目相关</p>
        <p class="about__item"> 交流群:606410437 </p>
        <p class="about__item">wechat:1634566606 </p>
        <p class="about__item">QQ:1634566606 </p>
        <p class="about__item">Email:1634566606@qq.com</p>
        <p class="about__item">
          后台模版1.x
          <a href="https://cli1.avue.top"
             target="_blank">avue-cli1</a>
        </p>
        <p class="about__item">
          后台模版2.x
          <a href="https://cli2.avue.top"
             target="_blank">avue-cli2</a>
        </p>
        <p class="about__item">
          表单拖拽工具
          <a href="https://form.avue.top"
             target="_blank">avue-form</a>
        </p>
        <p class="about__item">
          简单的后台模版2.x
          <a href="https://temp.avue.top"
             target="_blank">avue-temp</a>
        </p>
        <p class="about__item">
          后台模版2.x对接pig和pigx
          <a href="https://form.avue.top"
             target="_blank">avue-pig</a>
        </p>
        <p class="about__item">
          后台模版例子
          <a href="https://house.avue.top"
             target="_blank">house-pig</a>
        </p>
      </el-col>
      <el-col :span="12">
        <p class="about__title">avue 会员说明</p>
        <p class="about__item">
          <a href="https://git.avue.top"
             target="_blank">git私服</a>
          账号：你的QQ号，密码：123456，进去后看到avue组织(有pigx账号可直接登录)
        </p>
        <p class="about__item">
          avue——核心代码
        </p>
        <p class="about__item">
          avue-cli——后台模板
        </p>
        <p class="about__item">
          avue-house——房屋采集后台模板案例
        </p>
        <p class="about__item">
          avue-pig——完美对接pigx的前端采用avue2+avue-cli2
        </p>
        <p class="about__item">
          avue-templte——简易后台模板
        </p>
        <p class="about__item">
          avue-api——API管理平台
        </p>
        <p class="about__item">
          avue-form——表单拖拽工具
        </p>
        <p class="about__item">
          avue-plugs——常用插件
        </p>
        <p class="about__item">
          avue-plugin-tranzsfer——自定义第三方插件
        </p>
        <p class="about__item">
          官网 https://avue.top有属性文档
          群文件有crud系列视频和框架原理讲解文档
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.about {
  &__content {
    width: 1000px;
    margin: 0 auto;
    color: #999;
    text-align: left;
    font-size: 14px;
    margin-top: 20px;
    padding-right: 30px;
    margin-bottom: 30px;
  }
  &__title {
    margin-bottom: 15px;
    font-size: 20px;
  }
}
</style>
