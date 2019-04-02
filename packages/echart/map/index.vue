<<template>
  <div class="avue-echart avue-echart-map"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "map",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      window.echarts.registerMap("HK", this.dataChart);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (p / km2)"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        series: [
          {
            type: "map",
            mapType: "HK", // 自定义扩展图表类型
            itemStyle: {
              normal: {
                label: { show: true },
                borderColor: "#389BB7",
                areaColor: "#0c162f"
              }
            }
          }
        ]
      };
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>



