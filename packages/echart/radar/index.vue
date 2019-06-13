<template>
  <div class="avue-echart avue-echart-radar"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";

export default create({
  name: "radar",
  x2 () {
    return this.option.gridX2 || '80%';
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
              backgroundColor: this.option.tipBackgroundColor || 'rgba(50,50,50,0.7)',
              textStyle: {
                fontSize: this.option.tipFontSize || 14,
                color: this.option.tipColor || "#fff"
              }
            }
          );
        })(),

        grid: {
          left: this.option.gridX || 20,
          top: this.option.gridY || 60,
          right: this.x2,
          bottom: this.option.gridY2 || 60
        },
        legend: {//雷达的legend是单系列的和其他不一样,不能合并
          show: this.vaildData(this.option.legend, false),
          top: 0,
          x: this.option.legendPostion || "right",
          right: this.x2,
          textStyle: {
            fontSize: this.option.legendFontSize || 12
          },
          data: (() => {
            return (optionData.series[0].data || []).map((ele, index) => {
              return {
                name: ele.name,
                textStyle: this.ishasprop(!this.option.switchTheme, {
                  color: this.getColor(index, true)
                }, {})
              };
            });
          })()
        },
        radar: {
          name: {
            fontSize: this.option.radarNameSize || 12,
            color: this.option.radarNameColor || '#333'
          },
          indicator: optionData.indicator || [],
          shape: this.option.shape || 'polygon',
          radius: this.option.radius || '75%',

        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "radar",
              barWidth: this.option.barWidth || 16,
              barMinHeight: this.option.barMinHeight || 0,
              itemStyle: {
                barBorderRadius: this.option.barRadius || 0
              },
              data: (() => {
                return (optionData.series[0].data || []).map((ele, index) => {
                  return {
                    name: ele.name,
                    value: ele.value,
                    label: {
                      show: this.vaildData(this.option.labelShow, false), //开启显示
                      textStyle: {
                        fontSize: this.option.fontSize || 14,
                        color: this.getColor(index),
                        fontWeight: this.option.labelShowFontWeight || 500
                      }
                    },
                    areaStyle: {
                      color: this.getColor(index),
                      opacity: this.option.areaOpacity || 0.9,
                    }
                  };
                });
              })()
            }
          ];
          return list;
        })()
      }
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});

</script>



