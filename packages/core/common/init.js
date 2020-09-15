import { sendDic, loadDic, loadCascaderDic, loadLocalDic } from 'core/dic';
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
        cascaderDIC: {},
        tableOption: {},
        isMobile: ''
      };
    },
    created () {
      this.init();
      this.handleLoadDic()
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
        this.handleLocalDic();
      },
      getIsMobile () {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      updateDic (prop, list) {
        let column = this.findObject(this.propOption, prop);
        if (this.validatenull(list) && this.validatenull(prop)) {
          this.handleLoadDic();
        } else if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
          sendDic({
            column: column
          }).then(list => {
            this.$set(this.DIC, prop, list);
          });
        } else {
          this.$set(this.DIC, prop, list);
        }
      },
      handleSetDic (list, res = {}) {
        Object.keys(res).forEach(ele => {
          this.$set(list, ele, res[ele])
        });
        this.forEachLabel && this.forEachLabel()
      },
      //本地字典
      handleLocalDic () {
        let res = loadLocalDic(this.resultOption)
        this.handleSetDic(this.DIC, res);
      },
      // 网络字典加载
      handleLoadDic () {
        return new Promise((resolve) => {
          loadDic(this.resultOption).then(res => {
            this.handleSetDic(this.DIC, res);
            resolve();
          });
        })
      },
      //级联字典加载
      handleLoadCascaderDic () {
        loadCascaderDic(this.propOption, this.data).then(res => this.handleSetDic(this.cascaderDIC, res));
      }
    }
  };
}
