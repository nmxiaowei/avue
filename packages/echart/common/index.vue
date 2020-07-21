<template>
  <div :class="b()"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "common",
  methods: {
    updateChart () {
      const optionData = this.deepClone(this.dataChart) || [];
      const option = this.echartFormatter(optionData);
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>



