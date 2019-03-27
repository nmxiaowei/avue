<template>
  <div :class="b([postion])"
       v-if="!show">
    <a :href="link"
       :class="b('title')"
       :style="{color:color,fontSize:setPx(fontSize)}"
       v-if="!validatenull(link)">{{title}}</a>
    <span v-else
          :class="b('title')"
          :style="{color:color,fontSize:setPx(fontSize)}">{{title}}</span>
    <div :class="b('info')"
         v-if="info">
      <el-tooltip class="item"
                  effect="dark"
                  :content="info"
                  placement="bottom">
        <i class="el-icon-info"
           :style="{color:color,fontSize:setPx(fontSize)}"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "echart-header",
  props: {
    fontSize: {
      type: Number
    },
    color: {
      type: String
    },
    info: {
      type: String
    },
    title: {
      type: String
    },
    link: {
      type: String
    },
    postion: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    }
  }
});
</script>