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
  name: "scatter",//散点图
  computed: {
    x2 () {
      return this.option.gridX2 || 20;
    }
  },
  methods: {
    updateChart () {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        title: this.ishasprop(this.option.titleShow, {
          text: this.option.title,
          subtext: this.option.subtext || '',
          textStyle: {
            color: this.option.titleColor || '#333',
            fontSize: this.option.titleFontSize || 16
          },
          left: this.option.titlePostion || 'auto',
          subtextStyle: {
            color: this.option.subTitleColor || '#aaa',
            fontSize: this.option.subTitleFontSize || 14
          }
        }, {}),
        tooltip: {
          formatter: this.option.formatter || '',
          backgroundColor: this.option.tipBackgroundColor || 'rgba(50,50,50,0.7)',
          textStyle: {
            fontSize: this.option.tipFontSize,
            color: this.option.tipColor || "#fff"
          }
        },
        grid: {
          left: this.option.gridX || 20,
          top: this.option.gridY || 60,
          right: this.x2,
          bottom: this.option.gridY2 || 60
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = (optionData || []).map((ele, index) => {
            return Object.assign(ele, {
              type: "scatter",
              itemStyle: {
                color: this.getColor(index)
              },
              label: {
                show: this.vaildData(this.option.labelShow, false), //开启显示
                position: "top",
                textStyle: {
                  fontSize: this.option.fontSize || 14,
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

