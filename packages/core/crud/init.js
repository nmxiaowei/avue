import { loadDic, loadCascaderDic } from 'core/dic';
export default function (type) {
  const isCrud = type === 'crud'
  return {
    props: {
      option: {
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      }
    },
    watch: {
      option: {
        handler () {
          this.init();
        },
        deep: true
      },
      //检测本地字典随时赋值
      'option.dicData': {
        handler (val) {
          this.DIC = Object.assign(this.DIC, val);
        },
        deep: true,
        immediate: true
      },
    },
    data () {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        isMobile: ''
      };
    },
    created () {
      this.init();
    },
    computed: {
      menuType () {
        return this.tableOption.menuType || this.$AVUE.menuType || 'button';
      },
      isMediumSize () {
        return this.controlSize;
      },
      controlSize () {
        return this.tableOption.size || this.$AVUE.size || 'small';
      }
    },
    methods: {
      getKey (item = {}, props = {}, key) {
        return item[
          props[key] || (this.parentOption.props || {})[key] || key
        ];
      },
      getIsMobile () {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      init () {
        this.tableOption = this.option;
        this.getIsMobile();
        window.onresize = () => {
          this.getIsMobile();
        };
        // 规则初始化
        if (this.rulesInit) {
          (isCrud ? this.propOption : this.columnOption).forEach(ele => {
            this.rulesInit(ele.column);
          });
        }
        setTimeout(() => {
          this.initDic();
        }, 0);
      },
      //检测本地字典
      initDic () {
        if (isCrud) {
          // 表格赋值
          this.propOption.forEach(ele => {
            if (Array.isArray(ele.dicData)) {
              this.$set(this.DIC, ele.prop, ele.dicData)
            }
          })
        } else {
          //表单赋值
          this.columnOption.forEach(ele => {
            (ele.column || []).forEach(item => {
              if (Array.isArray(item.dicData)) {
                this.$set(this.DIC, item.prop, item.dicData)
              }
            })
          })
        }
      },
      // 加载字典
      handleLoadDic (option) {
        return new Promise((resolve) => {
          const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
          // 初始化字典
          if (dicFlag) {
            loadDic(option || this.tableOption).then((res = {}) => {
              Object.keys(res).forEach(ele => {
                this.$set(this.DIC, ele, res[ele])
              });
              resolve();
            });
          }
          resolve();
        })
      },
      handleLoadCascaderDic (option, data) {
        loadCascaderDic(option || (isCrud ? this.propOption : this.columnOption), this.data || [data]).then(res => {
          if (option) {
            Object.keys(res).forEach(ele => {
              this.$set(this.cascaderDIC, ele, res)
            });
          } else {
            this.cascaderDIC = this.deepClone(res);
          }
        });
      }
    }
  };
}
