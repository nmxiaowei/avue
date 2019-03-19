import { setPx } from 'utils/util'
export default (function (sfc) {
  return {
    props: {
      id: {
        type: String,
        default: 'main_' + new Date()
      },
      data: {
        type: Object,
        default: () => {
          return {};
        }
      },
      option: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        myChart: "",
      };
    },
    watch: {
      data: {
        handler() {
          if (this.myChart) {
            this.myChart.clear();
            this.updateChart();
          }
        },
        deep: true,
        immediate: true
      },
      option: {
        handler() {
          //样式动态调整
          const main = this.$refs[this.id];
          if (main) {
            main.style.width = this.setPx(this.option.width);
            main.style.height = this.setPx(this.option.height);
          }
          if (this.myChart) {
            this.updateChart();
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      styleName() {
        return {
          width: setPx((this.option.width || 600)),
          height: setPx((this.option.height || 400))
        };
      }
    },
    mounted() {
      if (this.$refs[this.id]) {
        this.myChart = window.echarts.init(this.$refs[this.id]);
        this.updateChart();
      }

    },
    methods: {
    }
  }
})()