<template>
  <div :class="b()"
       :style="styleSizeName">
    <component :is="option.is"
               :ref="id"
               v-if="reload"
               :config="config"
               :style="styleChartName"
               v-bind="option.bind"></component>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "datav",
  data () {
    return {
      reload: true,
      config: {}
    }
  },
  methods: {
    updateChart () {
      const optionData = this.deepClone(this.dataChart) || [];
      this.config = this.echartFormatter(optionData);
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      })
    }
  }
});
</script>



