<template>
  <div class="avue-echart avue-echart-line" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "line",
  computed: {
    x2() {
      return this.option.gridX2 || 20;
    }
  },
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: (() => {
          return Object.assign(
            (() => {
              if (this.formatter) {
                return {
                  formatter: name => {
                    return this.formatter(name, this.dataChart);
                  }
                };
              }
              return {};
            })(),
            {
              backgroundColor: "rgba(0,0,0,1)",
              trigger: "axis",
              textStyle: {
                fontSize: this.option.tipFontSize,
                color: this.option.tipColor || "#fff"
              }
            }
          );
        })(),
        grid: {
          x: this.option.gridX || 65,
          y: this.option.gridY || 20,
          x2: this.x2,
          y2: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legend, false),
          orient: this.option.legendOrient || "horizontal",
          x: this.option.legendPostion || "right",
          top: 0,
          right: this.x2,
          textStyle: {
            fontSize: this.option.legendFontSize || 12
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
              symbolSize: this.option.symbolSize || 10,
              areaStyle: (() => {
                if (this.option.areaStyle) {
                  return {
                    opacity: 0.7
                  };
                }
              })(),
              lineStyle: {
                width: this.option.lineWidth || 1
              },
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

