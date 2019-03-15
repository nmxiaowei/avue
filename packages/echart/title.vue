<template>
  <div :class="b([postion])"
       v-if="show">
    <a :href="link"
       :class="b('title')"
       v-if="!validatenull(link)">{{title}}</a>
    <span v-else
          :class="b('title')">{{title}}</span>
    <div :class="b('info')"
         v-if="info">
      <el-tooltip class="item"
                  effect="dark"
                  :content="info"
                  placement="bottom">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "echart-header",
  props: {
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
      type: String
    },
    show: {
      type: Boolean,
      default: true
    }
  }
});
</script>