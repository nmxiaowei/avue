<template>
  <div class="avue-echart avue-echart-gauge"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "gauge",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              fontSize: this.option.valueFontSize || 30,
              formatter: "{value}" + optionData.unit
            },
            min: optionData.min,
            max: optionData.max,
            axisLine: {
              lineStyle: {
                color: (() => {
                  let list = [];
                  (this.option.barColor || []).forEach(ele => {
                    list.push([ele.postion, ele.color1]);
                  });
                  return list;
                })(),
                width: this.option.lineSize || 5
              }
            },
            axisLabel: {
              show: this.vaildData(this.option.axisLabelShow, true),
              fontSize: this.option.axisLabelFontSize || 25
            },
            axisTick: {
              lineStyle: {
                color: this.option.lineColor || "#eee"
              }
            },
            title: {
              color: this.option.nameColor,
              fontSize: this.option.nameFontSize || 20
            },
            data: [optionData]
          }
        ]
      };
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>

