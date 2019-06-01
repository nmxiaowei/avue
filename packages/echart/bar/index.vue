<template>
  <div class="avue-echart avue-echart-bar"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "bar",
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
              textStyle: {
                fontSize: this.option.tipFontSize,
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
              };
            });
          })()
        },
        xAxis: {
          type: this.option.category ? "value" : "category",
          data: optionData.categories || [],
          inverse: this.vaildData(this.option.xAxisInverse, false),
          show: this.vaildData(this.option.xAxisShow, true),
          splitLine: {
            show: this.vaildData(this.option.xAxisSplitLineShow, false)
          },
          axisLabel: {
            textStyle: {
              fontSize: this.option.xNameFontSize || 14
            }
          }
        },
        yAxis: {
          type: this.option.category ? "category" : "value",
          data: optionData.categories || [],
          axisLabel: {
            textStyle: {
              fontSize: this.option.yNameFontSize || 14
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
              type: "bar",
              stack: ele.stack,
              barWidth: this.option.barWidth || 16,
              barMinHeight: this.option.barMinHeight || 0,
              itemStyle: {
                barBorderRadius: this.option.barRadius || 0
              },
              label: {
                show: this.vaildData(this.option.labelShow, false), //开启显示
                position: "top", //在上方显示,
                formatter: name => {
                  if (this.labelFormatter) {
                    return this.labelFormatter(name);
                  }
                  return name.value;
                },
                textStyle: {
                  //数值样式
                  fontSize: this.option.labelShowFontSize || 14,
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

