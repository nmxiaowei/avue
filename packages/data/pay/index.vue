<template>
  <div :class="b()">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <div class="top"
               :style="{backgroundColor:item.color}"></div>
          <div class="header">
            <p class="title">{{item.title}}</p>
            <img :src="item.src"
                 alt=""
                 class="img">
            <template v-if="item.subtitle">
              <p class="subtitle"
                 :style="{color:item.color}">{{item.subtitle}}</p>
            </template>
            <template v-if="item.money || item.dismoney">
              <p class="money"
                 :style="{color:item.color}">
                <span>¥</span>
                <avue-count-up class="b"
                               :animation="animation"
                               :end="item.dismoney"></avue-count-up>
                <s>{{item.money}}</s>
                <em>{{item.tip}}</em>
              </p>
            </template>
            <div class="line"></div>
            <a class="btn"
               :href="item.href?item.href:'javascript:void(0);'"
               @click="item.click?item.click(item):''"
               :style="{backgroundColor:item.color}">{{item.subtext}}</a>
          </div>
          <div class="list">
            <div class="list-item"
                 v-for="(citem,cindex) in item.list">
              <i class="list-item-icon list-item--check"
                 :style="{color:item.color}"
                 v-if="citem.check">√</i>
              <i class="list-item-icon list-item--no"
                 v-else>x</i>
              <a :href="citem.href?citem.href:'javascript:void(0);'">
                <span :class="{'list-item--link':citem.href}">{{citem.title}}</span>
              </a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-pay",
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    animation () {
      return this.option.animation
    },
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    }
  }
});
</script>