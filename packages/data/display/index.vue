<template>
  <div class="avue-data-display">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="12"
              :sm="12">
        <div class="item"
             :style="{color:color}">
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''"
             :target="item.target">
            <avue-count-up :animation="animation"
                           class="count"
                           :end="item.count"></avue-count-up>
            <span class="splitLine" />
            <div class="title">{{item.title}}</div>
          </a>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-display",
  data () {
    return {};
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
    },
    color () {
      return this.option.color || "rgb(63, 161, 255)";
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  created () { },
  methods: {}
});
</script>