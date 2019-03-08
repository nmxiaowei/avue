<template>
  <div id="main"
       :style="styleName"></div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "pie",
  methods: {
    updateChart() {
      const option = {
        title: {
          text: this.option.title,
          subtext: this.option.subtitle,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: (() => {
            return this.option.data.map(ele => {
              return ele.name;
            });
          })()
        },
        series: [
          {
            type: "pie",
            radius: this.option.radius || "50%",
            center: ["50%", "60%"],
            data: this.option.data
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
});
</script>

