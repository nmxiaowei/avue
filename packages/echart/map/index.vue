<<template>
  <div class="avue-echart avue-echart-map"
       :style="styleSizeName" @mousewheel.prevent="handleMousewheel">
    <div :ref="id" :style="styleChartName" v-if="type===0"></div>
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
    scale: {
      handler(val) {
        this.baseScale = val;
      },
      immediate: true
    }
  },
  computed: {
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
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      window.echarts.registerMap("HK", this.dataChart);
      const option = {
        series: [
          {
            type: "map",
            mapType: "HK", // 自定义扩展图表类型
            label: {
              show: true,
              color: "#fff"
            },
            itemStyle: {
              borderColor: "#389BB7",
              areaColor: "#0c162f"
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



