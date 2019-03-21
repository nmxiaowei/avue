import { setPx } from 'utils/util'
export default (function (sfc) {
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
        checkChart: '',
        myChart: "",
        dataChart: '',
        isChart: true,
      };
    },
    watch: {
      time() {
        this.$nextTick(() => {
          this.updateData();
        })
      },
      url() {
        this.$nextTick(() => {
          this.updateData();
        })
      },
      dataType() {
        this.$nextTick(() => {
          this.updateData();
        });
      },
      data: {
        handler() {
          this.$nextTick(() => {
            this.updateData();
          })
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
          if (this.myChart && this.isChart) {
            this.updateChart();
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
      styleName() {
        return {
          width: setPx((this.option.width || 600)),
          height: setPx((this.option.height || 400))
        };
      }
    },
    mounted() {
      if (this.$refs[this.id]) {
        const className = this.$el.className.replace('avue-echart ', '')
        if (['avue-echart-bar'].includes(className)) {
          this.isChart = true;
        } else {
          this.isChart = false;
        }
        if (this.isChart) {
          this.myChart = window.echarts.init(this.$refs[this.id]);
        }
        this.$nextTick(() => {
          this.updateData();
        })
      }
    },
    methods: {
      updateData() {
        const callback = () => {
          if (this.isApi) {
            this.$httpajax(this.url).then(res => {
              const data = res.data
              this.dataChart = data.data;
              if (this.isChart && this.myChart) {
                this.myChart.clear();
                this.updateChart();
              }
            })
          } else {
            this.dataChart = this.data;
            if (this.isChart && this.myChart) {
              this.myChart.clear();
              this.updateChart();
            }
          }
        }
        if (this.time === 0) {
          callback();
          clearInterval(this.checkChart);
        } else {
          callback();
          this.checkChart = setInterval(() => {
            callback();
          }, this.time);
        }

      },
    }
  }
})()