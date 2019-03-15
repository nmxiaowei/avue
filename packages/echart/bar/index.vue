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
        tooltip: {},
        legend: {
          data: (() => {
            return (this.option.series || []).map(ele => {
              return ele.name;
            });
          })()
        },
        xAxis: {
          nameTextStyle: {
            color: "bule"
          },
          axisLine: {
            lineStyle: {
              color: "red"
            }
          },
          data: this.option.categories,
          inverse: this.vaildData(this.option.xAxisInverse, false),
          show: this.vaildData(this.option.xAxisShow, true),
          splitLine: {
            show: this.vaildData(this.option.xAxisSplitLineShow, false)
          }
        },
        yAxis: {
          inverse: this.vaildData(this.option.yAxisInverse, false),
          show: this.vaildData(this.option.yAxisShow, true),
          splitLine: {
            show: this.vaildData(this.option.yAxisSplitLineShow, true)
          }
        },
        series: (() => {
          const list = (this.option.series || []).map(ele => {
            return Object.assign(
              {
                type: "bar"
              },
              ele,
              {
                label: {
                  show: this.vaildData(this.option.labelShow, false), //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    fontSize: 16,
                    fontWeight: 500
                  }
                }
              }
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

