import { setPx } from 'utils/util'
export default (function (sfc) {
  return {
    props: {
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
      option: {
        handler() {
          if (this.myChart) {
            this.updateChart();
          }
        },
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