<template>
  <div :ref="id"
       :style="styleName"></div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "line",
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
                type: "line",
                smooth: this.option.smooth,
                areaStyle: (() => {
                  if (this.option.areaStyle) {
                    return {
                      opacity: 0.7
                    };
                  }
                })()
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

