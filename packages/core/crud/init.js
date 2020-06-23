import { loadDic, loadCascaderDic } from 'core/dic';
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
      resultOption () {
        return Object.assign(this.deepClone(this.tableOption), {
          column: this.propOption
        })
      },
      formRules () {
        let result = {};
        this.propOption.forEach(ele => {
          if (ele.rules && ele.display !== false)
            result[ele.prop] = ele.rules
        });
        return result;
      },
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
        this.handleLoadDic().then(() => {
          this.forEachLabel && this.forEachLabel()
        });
      },
      // 网络字典加载
      handleLoadDic () {
        return new Promise((resolve) => {
          loadDic(this.resultOption).then((res = {}) => {
            Object.keys(res).forEach(ele => {
              this.$set(this.DIC, ele, res[ele])
            });
            resolve();
          });
        })
      },
      //级联字典加载
      handleLoadCascaderDic () {
        loadCascaderDic(this.propOption, this.data).then(res => {
          Object.keys(res).forEach(ele => {
            this.$set(this.cascaderDIC, ele, res[ele])
          });
        });
      }
    }
  };
}
