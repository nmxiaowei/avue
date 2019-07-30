<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <el-carousel :type="type"
                 :indicator-position="indicator"
                 :interval="interval"
                 :height="height">
      <el-carousel-item v-for="item in dataChart"
                        :key="item"
                        @click="handleClick(item,index)">
        <img :src="item.value"
             draggable="false"
             :style="styleName" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "swiper",
  data () {
    return {};
  },
  computed: {
    styleName () {
      return {
        opacity: this.opacity
      };
    },
    indicator () {
      return this.opacity.indicator || "none";
    },
    opacity () {
      return (this.option.opacity || 100) * 0.01;
    },
    type () {
      return this.option.type || "";
    },
    interval () {
      return this.option.interval || 5000;
    }
  },
  created () { },
  mounted () { },
  methods: {
    handleClick (item, index) {
      this.clickFormatter({
        type: index,
        value: item,
        data: this.dataChart
      });
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


