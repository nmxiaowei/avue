<template>
  <div class="avue-data-panel">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="24"
              :sm="12">
        <a :href="item.href?item.href:'javascript:void(0);'"
           @click="item.click?item.click(item):''">
          <div class="item">
            <div class="item-icon">
              <i :class="item.icon"
                 :style="{color:item.color}"></i>
            </div>
            <div class="item-info">
              <div class="item-title">{{item.title}}</div>
              <avue-count-up :animation="animation"
                             class="item-count"
                             :end="item.count"></avue-count-up>
            </div>

          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-panel",
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