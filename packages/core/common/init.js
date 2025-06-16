import {
  sendDic,
  loadDic,
  loadCascaderDic,
  loadLocalDic
} from 'core/dic';
import {
  DIC_PROPS
} from 'global/variable';
import slot from 'core/slot'
export default function (name) {
  return {
    mixins: [slot],
    emits: ['update:modelValue', 'change'],
    props: {
      tableData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      option: {
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      }
    },
    watch: {
      propOption: {
        handler (list) {
          list.forEach(ele => this.objectOption[ele.prop] = ele);
        },
        deep: true,
      },
      option: {
        handler () {
          this.init(false);
        },
        deep: true,
      },
    },
    data () {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        objectOption: {}
      };
    },
    mounted () {
      this.init();
    },
    computed: {
      isMobile () {
        return document.body.clientWidth <= 768;
      },
      resultOption () {
        return {
          ...this.tableOption,
          ...{
            column: this.propOption || []
          }
        }
      },
      rowKey () {
        return this.tableOption.rowKey || DIC_PROPS.rowKey;
      },
      formRules () {
        let result = {};
        this.propOption.forEach(ele => {
          if (ele.rules && ele.display !== false)
            result[ele.prop] = ele.rules
        });
        return result;
      }
    },
    methods: {
      init (type) {
        let globOption = this.deepClone(this.$AVUE[`${name}Option`])
        let option = {
          ...globOption,
          ...this.option
        }
        this.tableOption = option;
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
      updateDic (prop, list) {
        let column = this.findObject(this.propOption, prop);
        let formatter = column.dicFormatter
        const callback = (list) => {
          if (typeof formatter === 'function') {
            this.DIC[prop] = formatter(list, this.tableForm || this.form);
          } else {
            this.DIC[prop] = list;
          }
        }
        let dic = [];
        if (this.validatenull(list) && this.validatenull(prop)) {
          this.handleLoadDic();
          reutrn
        } else if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
          sendDic({
            column: column
          }, this).then(list => {
            dic = callback(list)
          });
        } else {
          dic = callback(list)
        }

      },
      handleSetDic (list, res = {}) {
        Object.keys(res).forEach(ele => {
          list[ele] = res[ele]
        });
      },
      //本地字典
      handleLocalDic () {
        loadLocalDic(this.resultOption, this)
      },
      // 网络字典加载
      handleLoadDic () {
        loadDic(this.resultOption, this)
      },
      //级联字典加载
      handleLoadCascaderDic () {
        loadCascaderDic(this.propOption, this)
      }
    }
  };
}
