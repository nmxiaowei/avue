<template>
  <div class="avue-echart avue-echart-pie"
       :style="styleSizeName">
    <div :class="b('title')"
         v-html="titleFormatter && titleFormatter(dataChart)">
    </div>
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "pie",
  computed: {
    labelShow() {
      return this.vaildData(this.option.labelShow, false);
    },
    fontSize() {
      return this.option.fontSize || 14;
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
                color: this.option.tipColor || "#fff"
              }
            }
          );
        })(),
        grid: {
          x: this.option.gridX || 65,
          y: this.option.gridY || 20,
          x2: this.option.gridX2 || 20,
          y2: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legendShow, false),
          orient: "vertical",
          left: "left",
          textStyle: {
            fontSize: this.option.legendShowFontSize || 12
          },
          data: (() => {
            return optionData.map((ele, index) => {
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
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "pie",
              roseType: this.option.roseType ? "radius" : "",
              radius: this.option.radius ? ["50%", "70%"] : "50%",
              center: ["50%", "60%"],
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              },
              label: {
                show: this.labelShow,
                fontSize: this.fontSize
              },
              data: (() => {
                let list = optionData;
                if (this.option.notCount) {
                  list = list.filter(ele => {
                    if (ele.value !== 0 && ele.value) {
                      return true;
                    }
                  });
                }
                if (this.option.sort) {
                  list.sort(function(a, b) {
                    return a.value - b.value;
                  });
                }
                return list;
              })(),
              itemStyle: (() => {
                return {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    color: params => this.getColor(params.dataIndex)
                  }
                };
              })()
            }
          ];
          return list;
        })()
      };
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>



