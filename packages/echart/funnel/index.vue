<template>
  <div class="avue-echart avue-echart-funnel"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "funnel",
  computed: {
    x2 () {
      return this.option.gridX2 || 20;
    },
    fontSize () {
      return this.option.fontSize || 14;
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
        tooltip: this.ishasprop(this.formatter, {
          formatter: name => { return this.formatter(name, this.dataChart) }
        }, {
            backgroundColor: this.option.tipBackgroundColor || 'rgba(50,50,50,0.7)',
            textStyle: {
              fontSize: this.option.tipFontSize,
              color: this.option.tipColor || "#fff"
            }
          }),
        grid: {
          left: this.option.gridX || 20,
          top: this.option.gridY || 60,
          right: this.x2,
          bottom: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legend, false),
          orient: this.option.legendOrient || "horizontal",
          top: 0,
          x: this.option.legendPostion || "right",
          right: this.x2,
          textStyle: {
            fontSize: this.option.legendFontSize || 12
          },
          data: (() => {
            return optionData.map((ele, index) => ele.name);
          })()
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "funnel",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
              label: {
                show: this.vaildData(this.option.labelShow, false),
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
                  list.sort(function (a, b) {
                    return a.value - b.value;
                  });
                }
                return list;
              })(),
              itemStyle: this.ishasprop(!this.switchTheme, {
                normal: {
                  color:
                    params => this.getColor(params.dataIndex)
                }
              }, {                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }                })
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



