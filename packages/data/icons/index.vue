<template>
  <div class="data-icons">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :xs="12"
              :sm="6"
              :md="span"
              :key="index">
        <div class="item"
             :class="[{'item--easy':discount}]">
          <a :href="item.href"
             @click="item.click&&item.click(item)"
             :target="item.target">
            <div class="item-icon">
              <el-icon :color="item.color">
                <component :is="item.icon"></component>
              </el-icon>
            </div>
            <div class="item-info">
              <span>{{item.title}}</span>
              <avue-count-up :animation="item.animation || animation"
                             :decimals="item.decimals || decimals"
                             :style="{color:color}"
                             class="count"
                             :end="item.count"></avue-count-up>
            </div>
          </a>
        </div>
      </el-col>
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
    decimals () {
      return this.option.decimals || 0
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
