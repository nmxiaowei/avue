<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <video controls=""
           autoplay=""
           loop=""
           :width="width"
           :height="height"
           style="object-fit: fill">
      <source :src="dataChart.value" />
    </video>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "video",
  data () {
    return {};
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    handleClick () {
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


