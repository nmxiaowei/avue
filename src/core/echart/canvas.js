import { setPx } from 'utils/util'
import echartList from './list'
export default (function () {
  return {
    props: {
      time: {
        type: Number,
        default: 0,
      },
      url: {
        type: String,
      },
      dataType: {
        type: Number,
        default: 0,
      },
      id: {
        type: String,
        default: 'main_' + new Date()
      },
      data: {
        type: [Object, String, Array]
      },
      component: {
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
        headerHeight: '',
        checkChart: '',
        myChart: "",
        dataChart: '',
        key: false,
        isChart: true,
      };
    },
    watch: {
      styleChartName() {
        this.updateData();
      },
      time() {
        this.updateData();
      },
      url() {
        this.updateData();
      },
      dataType() {
        this.updateData();
      },
      data: {
        handler() {
          this.updateData();

        },
        deep: true,
        immediate: true
      },

      option: {
        handler() {
          if (this.myChart && this.isChart) {
            this.updateData();
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      isApi() {
        return this.dataType === 1;
      },
      width() {
        return this.component.width || 600
      },
      height() {
        return this.component.height || 400
      },
      style() {
        return this.component.style || {}
      },
      styleChartName() {
        const obj = {
          width: setPx(this.width),
          height: setPx(this.height)
        };
        return obj
      },
      styleSizeName() {
        return {
          width: setPx((this.width)),
          height: setPx((this.height))
        };
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        if (this.$refs[this.id]) {
          const className = this.$el.className.replace('avue-echart ', '')
          if (echartList.includes(className.replace('avue-echart-', ''))) {
            this.isChart = true;
          } else {
            this.isChart = false;
          }
          if (this.isChart) {
            this.myChart = window.echarts.init(this.$refs[this.id]);
          }
        }
      },
      updateData() {
        if (this.key) return
        this.key = true;
        const callback = () => {
          this.key = false;
          if (this.isApi) {
            this.$httpajax.get(this.url, {
              params: this.query
            }).then(res => {
              const data = res.data
              this.dataChart = data.data || {};
              if (this.isChart && this.myChart) {
                this.myChart.clear();
                this.updateChart();
              }
            })
          } else {
            this.dataChart = this.data || {};
            if (this.isChart && this.myChart) {
              this.myChart.clear();
              this.updateChart();
            }
          }
        }
        this.$nextTick(() => {
          callback();
          clearInterval(this.checkChart);
          if (this.time !== 0) {
            this.checkChart = setInterval(() => {
              callback();
            }, this.time);
          }
        })
      },
    }
  }
})()