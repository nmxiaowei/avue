<template>
  <div id="main"
       :style="styleName"></div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "bar",
  methods: {
    updateChart() {
      const option = {
        title: {
          text: this.option.title
        },
        tooltip: {},
        legend: {
          data: (() => {
            return (this.option.series || []).map(ele => {
              return ele.name;
            });
          })()
        },
        xAxis: {
          data: this.option.categories
        },
        yAxis: {},
        series: (() => {
          const list = (this.option.series || []).map(ele => {
            return Object.assign(
              {
                type: "bar"
              },
              ele
            );
          });
          return list;
        })()
      };
      this.myChart.setOption(option);
    }
  }
});
</script>

