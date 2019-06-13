<template>
  <div class="data-icons">
    <el-row :span="24">
      <template v-for="(item,index) in data">
        <el-col :xs="12"
                :sm="6"
                :md="span"
                :key="index">
          <div class="item"
               :class="[{'item--easy':discount}]">
            <a :href="item.href?item.href:'javascript:void(0);'"
               @click="item.click?item.click(item):''"
               :target="item.target">
              <div class="item-icon"
                   :style="{color:color}">
                <i :class="item.icon"></i>
              </div>
              <div class="item-info">
                <span>{{item.title}}</span>
                <avue-count-up :animation="animation"
                               :style="{color:color}"
                               class="count"
                               :end="item.count"></avue-count-up>
              </div>
            </a>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-icons",
  data () {
    return {};
  },
  computed: {
    animation () {
      return this.option.animation
    },
    span () {
      return this.option.span || 4;
    },
    data () {
      return this.option.data;
    },
    color () {
      return this.option.color || "rgb(63, 161, 255)";
    },
    discount () {
      return this.option.discount || false;
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  }
});
</script>