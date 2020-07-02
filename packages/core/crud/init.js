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
        deep: true,
      }
    },
    data () {
      return {
        DIC: {},
        dicCreate: false,
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
      init () {
        this.tableOption = this.option;
        this.getIsMobile();
        this.handleLoadDic().then(() => {
          this.forEachLabel && this.forEachLabel()
        });
      },
      getIsMobile () {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      // 网络字典加载
      handleLoadDic () {
        return new Promise((resolve) => {
          loadDic(this.resultOption, this.dicCreate).then((res = {}) => {
            Object.keys(res).forEach(ele => {
              this.$set(this.DIC, ele, res[ele])
            });
            this.dicCreate = true;
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
