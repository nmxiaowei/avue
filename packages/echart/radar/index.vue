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
    return this.option.gridX2 || 20;
  },
  methods: {

    updateChart () {
      console.log("我更新了");

      const optionData = this.deepClone(this.dataChart);
      const option = {
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
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: optionData.indicator || [
            { name: '销售（sales）', max: 6500 },
            { name: '管理（Administration）', max: 16000 },
            { name: '信息技术（Information Techology）', max: 30000 },
            { name: '客服（Customer Support）', max: 38000 },
            { name: '研发（Development）', max: 52000 },
            { name: '市场（Marketing）', max: 25000 }
          ]
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = (optionData.series ||
            [{
              type: 'radar',
              data: [
                {
                  value: [4300, 10000, 28000, 35000, 50000, 19000],
                  name: '预算分配（Allocated Budget）'
                },
                {
                  value: [5000, 14000, 28000, 31000, 42000, 21000],
                  name: '实际开销（Actual Spending）'
                }
              ]
            }]
          ).map((ele, index) => {
            return Object.assign(ele, {
              type: "radar",
              barWidth: this.option.barWidth || 16,
              barMinHeight: this.option.barMinHeight || 0,
              itemStyle: {
                color: this.getColor(index),
                barBorderRadius: this.option.barRadius || 0
              },
              label: {
                show: this.vaildData(this.option.labelShow, false), //开启显示
                // position: "top", //在上方显示
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
      }
      console.log('雷达', this.radar.indicator)
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});

</script>



