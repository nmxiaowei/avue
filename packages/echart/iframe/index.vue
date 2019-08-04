<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <iframe :src="dataChart.value"
            draggable="false"></iframe>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "iframe",
  data () {
    return {};
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    handleClick () {
      this.clickFormatter({
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


