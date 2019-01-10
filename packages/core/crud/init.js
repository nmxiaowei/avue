import { vaildData, setPx } from 'utils/util.js';
import { getComponent, getPlaceholder } from 'core/dataformat';
import { loadDic, loadCascaderDic } from 'core/dic';
import { detail } from 'core/detail';
export default function () {
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
        handler() {
          this.init();
        },
        deep: true
      }
    },
    data() {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        isMobile: ''
      };
    },
    created() {
      this.init();
    },
    computed: {
      menuType() {
        return this.tableOption.menuType || this.$AVUE.menuType || 'button';
      },
      isMediumSize() {
        return this.controlSize === 'medium' ? 'small' : this.controlSize;
      },
      controlSize() {
        return this.tableOption.size || (this.$AVUE || {}).size || 'medium';
      }
    },
    methods: {
      getKey(item = {}, props = {}, key) {
        return item[
          props[key] || (this.parentOption.props || {})[key] || key
        ];
      },
      getIsMobile() {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      init() {
        // 工具初始化
        this.vaildData = vaildData;
        this.setPx = setPx;
        this.getComponent = getComponent;
        this.detail = detail;
        this.getPlaceholder = getPlaceholder;
        this.tableOption = this.option;
        this.getIsMobile();
        window.onresize = () => {
          this.getIsMobile();
        };
        setTimeout(() => {
          this.initDic();
        }, 0);
      },
      //检测本地字典
      initDic() {
        //表单赋值
        this.columnOption.forEach(ele => {
          (ele.column || []).forEach(item => {
            if (!this.validatenull(item.dicData)) {
              this.DIC[item.prop] = item.dicData;
            }
          })
        })
        // 表格赋值
        this.columnOption.forEach(ele => {
          if (!this.validatenull(ele.dicData)) {
            this.DIC[ele.prop] = ele.dicData;
          }
        })
      },
      // 加载字典
      handleLoadDic(option) {
        const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
        // 初始化字典
        if (dicFlag) {
          loadDic(option || this.tableOption).then((res = {}) => {
            Object.keys(res).forEach(ele => {
              this.$set(this.DIC, ele, res[ele])
            });
          });
          // 加载传进来的字典
        } else {
          const dicData = this.tableOption.dicData || [];
          this.DIC = this.deepClone(dicData);
        }
      },
      handleLoadCascaderDic(option, data) {
        loadCascaderDic(option || this.columnOption, this.data || [data]).then(res => {
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
