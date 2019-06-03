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
    }
  },
  methods: {
    updateChart () {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: this.ishasprop(this.formatter, {
          formatter: name => { return this.formatter(name, this.dataChart) }
        }, {
            textStyle: {
              fontSize: this.option.tipFontSize,
              color: this.option.tipColor || "#fff"
            }
          }),
        grid: {
          x: this.option.gridX || 65,
          y: this.option.gridY || 20,
          x2: this.x2,
          y2: this.option.gridY2 || 60
        },
        legend: {
          show: this.vaildData(this.option.legendShow, false),
          top: this.option.legendaline.top || 0,
          left: this.option.legendaline.left || center,
          orient: this.option.orient || 'horizontal',
          textStyle: {
            fontSize: this.option.legendShowFontSize || 12
          },
          data: (() => {
            return (optionData.series || []).map((ele, index) => {
              return {
                name: ele.name,
                textStyle: this.ishasprop(!this.option.switchTheme, {
                  color: this.getColor(index, true)
                }, {})
              };
            });
          })()
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "funnel",
              width: '80%',
              animationDelay: function (idx) {
                return Math.random() * 200;
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
                  color: this.option.labelShowColor || "#333",
                  fontWeight: this.option.labelShowFontWeight || 500
                }
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



