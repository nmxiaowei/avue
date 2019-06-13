<template>
  <div class="avue-data-rotate">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item"
             :style="{backgroundColor:item.color}">
          <div class="item-box">
            <avue-count-up class="item-count"
                           :animation="animation"
                           :end="item.count"></avue-count-up>
            <span class="item-title">{{item.title}}</span>
            <i class="item-icon"
               :class="item.icon"></i>
          </div>
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''">
            <p class="item-more">更多<i class="el-icon-arrow-right"></i></p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import create from "core/create";
export default create({
  name: "data-rotate",
  data () {
    return {};
  },
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
      return this.option.span || 8;
    },
    data () {
      return this.option.data || [];
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});
</script>