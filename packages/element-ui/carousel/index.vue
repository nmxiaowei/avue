<template>
  <div :class="[b(),{'avue-carousel--fullscreen':option.fullscreen}]">
    <el-carousel
      :type="option.type"
      :height="option.height+'px'"
      :autoplay="option.autoplay"
      :interval="option.interval"
      indicator-position="outside"
    >
      <el-carousel-item v-for="(item,index) in data" :key="index">
        <div :class="b('item')">
          <a :href="item.href?item.href:'javascript:void(0);'" :target="item.target">
            <div :class="b('img')" :style="{backgroundImage:'url('+item.src+')'}"></div>
            <div :class="b('title')" v-if="item.title">{{ item.title }}</div>
          </a>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "carousel",
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    data() {
      return this.option.data || [];
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
});
</script>