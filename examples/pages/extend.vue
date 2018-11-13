<template>
  <div class="extend">
    <div class="header__main">
      <div class="header__main-box">
        <div class="header__main-info">
          <div class="header__main-title">第三方插件扩展</div>
          <div class="header__main-subtitle">EXTEND</div>
          <div class="header__main-detail">
            随着业务各行各业的需求不同，avue很难满足各种多样化的需求，很多avue第三方开发者提供了很好的插件，但是都加入到avue底层包
            中会增大代码的冗余，因此开放了avue插件平台，将更多好的插件收集起来，代码规范参考ueditor和transfer为准,请加QQ群提供你的插件606410437
          </div>
        </div>
      </div>
    </div>
    <div class="avue-tip extend__tip">
      <h4 class="avue-tip__title">
        <h2>2种使用方式</h2>
        <p>
          <h3>1.npm(以富文本编辑器为例)</h3>
          安装你的npm上面的包名 npm install avue-plugin-ueditor --save</br>
          main.js导入主函数文件,import 'avue-plugin-ueditor/packages'</br>
          crud和form组件中column列的属性配置"component": "AvueUeditor" 你插件的全局名字</br>
        </p>
        <p>
          <h3> 2.源码包(以富文本编辑器为例)</h3>
          将源码包复制到你的项目中，例如ueditor文件夹</br>
          main.js导入主函数文件,import '/ueditor/'</br>
          crud和form组件中column列的属性配置"component": "AvueUeditor" 你插件的全局名字</br>
        </p>
      </h4>
    </div>
    <fieldset>
      <legend align="center">第三方扩展组件</legend>
    </fieldset>
    <div class="extend__list">
      <div class="extend__box"
           v-for="(item,index) in extend"
           :key="index">

        <div class="extend__item">
          <div class="extend__header">
            <span class="extend__title">{{item.title}}</span>
            <span class="extend__tags">{{item.tags || '暂无介绍'}}</span>
            <span class="extend__author">{{item.author || '暂无作者'}}</span>
          </div>
          <p class="extend__info">
            {{item.info || '暂无介绍'}}
          </p>
          <div class="extend__menu">
            <a :href="item.git"
               v-if="item.git"
               class="extend__menu-item"
               target="_blank">code</a>
            <a :href="item.npm"
               v-if="item.npm"
               class="extend__menu-item"
               target="_blank">npm</a>
            <span @click="open(item)"
                  v-if="item.demo"
                  class="extend__menu-item">demo</span>
          </div>

        </div>
      </div>

    </div>
    <el-dialog :visible.sync="box"
               width="100%"
               title="按esc或者点击x关闭"
               modal-append-to-body
               append-to-body
               fullscreen>
      <component :is="item.demo"></component>
    </el-dialog>
  </div>
</template>

<script>
import { extend } from './config';
import transfer from '../extend/transfer'
import dynamicquery from '../extend/dynamicquery'
import ueditor from '../extend/ueditor'
export default {
  components: {
    transfer, dynamicquery, ueditor
  },
  data () {
    return {
      extend: extend,
      item: {},
      box: false,
    }
  },
  methods: {
    open (item) {
      if (['http', 'https'].includes(item.demo)) {
        window.open(item.demo)
      } else if (item.demo) {
        this.item = item;
        this.box = true;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.extend {
  background-color: #eee;
  &__list {
    margin: 0 auto;
    width: 1170px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  &__box {
    width: 50%;
    padding: 10px 10px;
    box-sizing: border-box;
  }
  &__item {
    padding: 30px 30px 20px 30px;
    box-sizing: border-box;
    position: relative;
    line-height: 24px;
    color: #999;
    transition: all 0.3s;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    &:hover {
      box-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
    }
  }
  &__tip {
    padding: 0 20px;
    margin: 40px auto;
    width: 1170px;
  }
  &__header {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__tags {
    position: relative;
    display: inline-block;
    padding: 0 6px;
    font-size: 12px;
    text-align: center;
    background-color: #009688;
    color: #fff;
    border-radius: 2px;
  }
  &__title {
    color: #000;
    font-size: 20px;
    padding-right: 10px;
  }
  &__demo {
    margin-right: 10px;
  }
  &__author {
    position: absolute;
    right: 0;
    padding: 0 3px;
    color: #999;
  }
  &__info {
    height: 48px;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
    color: #999;
    word-wrap: break-word;
    text-indent: 2em;
  }
  &__menu {
    display: flex;
    align-items: center;
    &-item {
      margin-right: 10px;
      font-size: 14px;
      color: #666;
      &:hover {
        color: #47aca1;
      }
    }
  }
}
</style>

