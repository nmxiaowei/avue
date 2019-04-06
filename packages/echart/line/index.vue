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
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: {},
        grid: {
          x: this.option.gridX || 65,
          y: this.option.gridY || 20,
          x2: this.option.gridX2 || 20,
          y2: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legendShow, false),
          bottom: 0,
          textStyle: {
            color: this.option.nameColor || "#333"
          },
          data: (() => {
            return (optionData.series || []).map(ele => {
              return ele.name;
            });
          })()
        },
        xAxis: {
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
          const barColor = this.option.barColor || [];

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
                color: (() => {
                  if (barColor[index]) {
                    const color1 = barColor[index].color1;
                    const color2 = barColor[index].color2;
                    const postion = (barColor[index].postion || 0.9) * 0.01;
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
                })()
              },
              lineStyle: {
                width: this.option.lineWidth
              },
              label: {
                show: this.vaildData(this.option.labelShow, false), //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  fontSize: this.option.labelShowFontSize || 14,
                  color: this.option.labelShowColor || "#333",
                  fontWeight: this.option.labelShowFontWeight || 500
                }
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

