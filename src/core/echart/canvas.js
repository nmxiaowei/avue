import { setPx } from 'utils/util'
export default (function (sfc) {
  return {
    props: {
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
        myChart: ""
      };
    },
    watch: {
      data: {
        handler() {
          if (this.myChart) {
            this.updateChart();
          }
        },
        deep: true,
        immediate: true
      },
      option: {
        handler() {
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
      this.myChart = window.echarts.init(window.document.getElementById("main"));
      this.updateChart();
    },
  }
})()