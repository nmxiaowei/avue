<template>
  <div class="avue-echart avue-echart-pie"
       :style="styleSizeName">
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
          orient: "vertical",
          left: "left",
          data: (() => {
            return optionData.map(ele => {
              return ele.name;
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
                    color: params => {
                      const barColor = this.option.barColor || [];
                      return (barColor[params.dataIndex] || {}).color1;
                    }
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



