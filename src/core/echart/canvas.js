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
        checkRefreshTime: '',
      };
    },
    watch: {
      'option.refreshTime'() {
        this.refreshData();
      },
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
      },
      refreshTime() {
        return Number(this.option.refreshTime) || 0;
      }
    },
    mounted() {
      this.myChart = window.echarts.init(this.$refs[this.id]);
      this.updateChart();
      this.refreshData();
    },
    methods: {
      refreshData() {
        if (this.refreshTime === 0) {
          clearInterval(this.checkRefreshTime);
        } else {
          this.checkRefreshTime = setInterval(() => {
            if (this.myChart) {
              this.myChart.clear();
              this.updateChart();
            }
          }, this.refreshTime);
        }

      }
    }
  }
})()