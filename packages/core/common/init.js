import { sendDic, loadDic, loadCascaderDic, loadLocalDic } from 'core/dic';
import slot from 'core/slot'
import { detailDic } from 'utils/util';
export default function () {
  return {
    mixins: [slot],
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
          this.init(false);
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
    },
    computed: {
      objectOption () {
        let obj = {};
        this.propOption.forEach(ele => obj[ele.prop] = ele);
        return obj;
      },
      resultOption () {
        return Object.assign(this.deepClone(this.tableOption), {
          column: this.propOption
        })
      },
      rowKey () {
        return this.tableOption.rowKey || "id";
      },
      formRules () {
        let result = {};
        this.propOption.forEach(ele => {
          if (ele.rules && ele.display !== false)
            result[ele.prop] = ele.rules
        });
        return result;
      },
      isMediumSize () {
        return this.controlSize;
      },
      controlSize () {
        return this.tableOption.size || this.$AVUE.size || 'small';
      }
    },
    methods: {
      init (type) {
        this.tableOption = this.option;
        this.getIsMobile();
        this.columnInit && this.columnInit();
        this.handleLocalDic();
        if (type !== false) this.handleLoadDic()
      },
      dicInit (type) {
        if (type === 'cascader') {
          this.handleLoadCascaderDic()
        } else {
          this.handleLoadDic();
        }
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
          let obj = this.objectOption[ele]
          this.$set(list, ele, detailDic(res[ele], obj.props || this.tableOption.props, obj.dataType))
        });
        ;
        this.forEachLabel && this.forEachLabel()
      },
      //本地字典
      handleLocalDic () {
        let res = loadLocalDic(this.resultOption)
        this.handleSetDic(this.DIC, res);
      },
      // 网络字典加载
      handleLoadDic () {
        loadDic(this.resultOption).then(res => this.handleSetDic(this.DIC, res))
      },
      //级联字典加载
      handleLoadCascaderDic () {
        loadCascaderDic(this.propOption, this.data).then(res => this.handleSetDic(this.cascaderDIC, res));
      }
    }
  };
}
