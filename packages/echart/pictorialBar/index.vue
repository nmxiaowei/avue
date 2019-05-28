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
  name: "pictorialbar",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const symbol = this.validatenull(this.option.symbol)
        ? ""
        : "image://" + this.option.symbol;
      const color = this.option.color || "#fff";
      const fontSize = this.option.fontSize || 20;
      var maxData = 0;
      optionData.forEach(ele => {
        if (ele.value > maxData) maxData = ele.value;
      });
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
        xAxis: {
          show: this.vaildData(this.option.xAxisShow, true),
          max: maxData,
          splitLine: { show: false },
          offset: 10,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: this.option.nameColor || "#333",
              fontSize: this.option.xNameFontSize || 14
            }
          }
        },
        yAxis: {
          data: (() => {
            return optionData.map(ele => {
              return ele.name;
            });
          })(),
          show: this.vaildData(this.option.yAxisShow, true),
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: this.option.nameColor || "#333",
              fontSize: this.option.yNameFontSize || 14
            }
          }
        },
        grid: {
          top: "center",
          height: Number(this.option.split) * 10,
          left: this.option.gridX || 70,
          right: this.option.gridX2 || 100
        },
        series: [
          {
            type: "pictorialBar",
            symbol: symbol,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolClip: true,
            symbolSize: this.option.symbolSize || 30,
            symbolBoundingData: maxData,
            data: (() => {
              return optionData.map(ele => {
                return ele.value;
              });
            })()
          },
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.2
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [10, 0],
                textStyle: {
                  color: color,
                  fontSize: fontSize
                }
              }
            },
            animationDuration: 0,
            symbol: symbol,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: (() => {
              return optionData.map(ele => {
                return ele.value;
              });
            })()
          }
        ]
      };

      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>

