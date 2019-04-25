<<template>
  <div class="avue-echart avue-echart-map"
       :style="styleSizeName" @mousewheel.prevent="handleMousewheel">
    <div :ref="id" :style="styleChartName" v-if="isEchart"></div>
      <div :class="b('map')" v-else >
        <div :class="b('box')" 
          :style="styleImgName"
          @mousedown="disabled?false:handleMouseDown($event)"
          @mousemove="disabled?false:handleMouseMove($event)"
          @mouseup="disabled?false:handleMouseUp($event)">
          <img :class="b('bg')" :src="img" ref="img" draggable="false" />
          <span :class="b('location')" v-for="(item,index) in location" :style="{left:setPx(item.x),top:setPx(item.y)}"></span>
        </div>
      </div> 
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "map",
  data() {
    return {
      bannerCount: 0,
      bannerCheck: "",
      move: false,
      step: 1,
      startLeft: 0,
      startTop: 0,
      baseScale: 0,
      left: 0,
      top: 0
    };
  },
  watch: {
    mapList() {
      this.updateChart();
    },
    mapListLen() {
      this.setBanner();
    },
    bannerTime() {
      this.setBanner();
    },
    banner: {
      handler() {
        this.setBanner();
      },
      immediate: true
    },
    type() {
      if (this.isEchart) {
        this.$nextTick(() => {
          this.init();
          this.updateData();
        });
      }
    },
    width() {
      this.updateData();
    },
    height() {
      this.updateData();
    },
    scale: {
      handler(val) {
        this.baseScale = val;
      },
      immediate: true
    }
  },
  computed: {
    zoom() {
      return this.option.zoom || 1;
    },
    borderWidth() {
      return this.option.borderWidth || 3;
    },
    borderColor() {
      return this.option.borderColor || "#389BB7";
    },
    areaColor() {
      return this.option.areaColor || "#0c162f";
    },
    empColor() {
      return this.option.empColor || "#fff";
    },
    empAreaColor() {
      return this.option.empAreaColor || "yellow";
    },
    color() {
      return this.option.color || "#fff";
    },
    fontSize() {
      return this.option.fontSize || 14;
    },
    mapList() {
      return this.option.mapList || {};
    },
    mapListLen() {
      return this.mapList.features.length;
    },
    isEchart() {
      return this.type === 0;
    },
    bannerTime() {
      return this.option.bannerTime || 3000;
    },
    banner() {
      return this.option.banner;
    },
    formatter() {
      return this.option.formatter;
    },
    scale() {
      return this.option.scale || 100;
    },
    styleImgName() {
      return {
        marginLeft: this.setPx(this.left),
        marginTop: this.setPx(this.top),
        transform: `scale(${this.baseScale / 100}, ${this.baseScale / 100})`
      };
    },
    location() {
      return this.option.location || [];
    },
    img() {
      return this.option.img;
    },
    type() {
      return this.option.type;
    }
  },
  methods: {
    docMouseUp() {
      window.document.onmouseup = e => {
        window.document.onmousemove = undefined;
        this.move = false;
      };
    },
    handleMouseDown(e) {
      this.move = true;
      this.startLeft = e.clientX;
      this.startTop = e.clientY;
      this.docMouseUp();
    },
    handleMouseMove(e) {
      if (this.move) {
        window.document.onmousemove = e => {
          const startX = e.clientX;
          const startY = e.clientY;
          this.left = this.left + (startX - this.startLeft) * this.step;
          this.top = this.top + (startY - this.startTop) * this.step;
          this.startLeft = startX;
          this.startTop = startY;
        };
      }
    },
    handleMouseUp() {
      this.move = false;
    },
    handleMousewheel(e) {
      const type = e.deltaY;
      if (type > 0) {
        this.baseScale = this.baseScale + 10;
      } else {
        this.baseScale = this.baseScale - 10;
      }
    },
    resetBanner() {
      this.$nextTick(() => {
        this.myChart.dispatchAction({
          type: "hideTip"
        });
        this.myChart.dispatchAction({
          type: "downplay"
        });
      });
    },
    setBanner() {
      clearInterval(this.bannerCheck);
      if (this.banner) {
        this.bannerCheck = setInterval(() => {
          const curr = this.bannerCount % this.mapListLen;
          this.myChart.dispatchAction({
            type: "showTip",
            seriesIndex: "0",
            dataIndex: curr
          });
          this.myChart.dispatchAction({
            type: "downplay"
          });
          this.myChart.dispatchAction({
            type: "highlight",
            dataIndex: curr
          });
          this.bannerCount += 1;
        }, this.bannerTime);
      }
    },
    updateChart() {
      const optionData = this.deepClone(this.mapList);
      window.echarts.registerMap("HK", optionData);
      const option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255,255,255,0)",
          formatter: this.formatter
        },

        series: [
          {
            type: "map",
            mapType: "HK", // 自定义扩展图表类型
            zoom: this.zoom,
            roam: true,
            label: {
              show: true,
              fontSize: this.fontSize,
              color: this.color
            },
            left: this.option.gridX,
            top: this.option.gridY,
            right: this.option.gridX2,
            bottom: this.option.gridY2,
            emphasis: {
              label: {
                color: this.empColor
              },
              itemStyle: {
                areaColor: this.empAreaColor
              }
            },
            itemStyle: {
              borderWidth: this.borderWidth,
              borderColor: this.borderColor,
              areaColor: this.areaColor
            }
          }
        ]
      };
      this.myChart.on("mouseover", () => {
        clearInterval(this.bannerCheck);
        this.resetBanner();
      });

      this.myChart.on("mouseout", () => {
        this.bannerCount = 0;
        this.setBanner();
      });

      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>



