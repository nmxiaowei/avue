<template>
  <div class="avue-echart avue-echart-line"
       :style="styleSizeName">
    <echart-title ref="header"
                  :title="option.title"
                  :color="option.titleColor"
                  :info="option.info"
                  :font-size="option.titleFontSize"
                  :link="option.titleLink"
                  :show="option.titleShow"
                  :postion="option.titlePostion"></echart-title>
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
import echartTitle from "../title";
export default create({
  name: "line",
  components: {
    echartTitle
  },
  computed: {
    x2() {
      return this.option.gridX2 || 20;
    }
  },
  methods: {
    getColor(index, first) {
      const barColor = this.option.barColor || [];
      if (barColor[index]) {
        const color1 = barColor[index].color1;
        const color2 = barColor[index].color2;
        const postion = (barColor[index].postion || 0.9) * 0.01;
        if (first) return color1;
        if (color2) {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1
            },
            {
              offset: postion,
              color: color2
            }
          ]);
        }
        return color1;
      }
    },
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: {
          formatter: this.formatter,
          textStyle: {
            fontSize: this.option.tipFontSize,
            color: this.option.tipColor || "#fff"
          }
        },
        grid: {
          x: this.option.gridX || 65,
          y: this.option.gridY || 20,
          x2: this.x2,
          y2: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legendShow, false),
          top: 0,
          right: this.x2,
          textStyle: {
            fontSize: this.option.legendShowFontSize || 12
          },
          data: (() => {
            return (optionData.series || []).map((ele, index) => {
              return {
                name: ele.name,
                textStyle: {
                  borderColor: this.getColor(index, true),
                  color: this.getColor(index, true)
                }
              };
            });
          })()
        },
        xAxis: {
          type: this.option.category ? "value" : "category",
          axisLine: {
            lineStyle: {
              color: this.option.lineColor || "#333"
            }
          },
          data: optionData.categories || [],
          inverse: this.vaildData(this.option.xAxisInverse, false),
          show: this.vaildData(this.option.xAxisShow, true),
          splitLine: {
            show: this.vaildData(this.option.xAxisSplitLineShow, false)
          },
          axisLabel: {
            textStyle: {
              color: this.option.nameColor || "#333",
              fontSize: this.option.xNameFontSize || 14
            }
          }
        },
        yAxis: {
          type: this.option.category ? "category" : "value",
          data: optionData.categories || [],
          axisLabel: {
            textStyle: {
              color: this.option.nameColor || "#333",
              fontSize: this.option.yNameFontSize || 14
            }
          },
          axisLine: {
            lineStyle: {
              color: this.option.lineColor || "#333"
            }
          },
          inverse: this.vaildData(this.option.yAxisInverse, false),
          show: this.vaildData(this.option.yAxisShow, true),
          splitLine: {
            show: this.vaildData(this.option.yAxisSplitLineShow, true)
          }
        },
        series: (() => {
          const list = (optionData.series || []).map((ele, index) => {
            return Object.assign(ele, {
              type: "line",
              smooth: true,
              areaStyle: (() => {
                if (this.option.areaStyle) {
                  return {
                    opacity: 0.7
                  };
                }
              })(),
              itemStyle: {
                color: this.getColor(index)
              }
            });
          });
          return list;
        })()
      };
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>

