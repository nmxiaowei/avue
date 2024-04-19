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
    props: {
      defaults: {
        type: Object,
        default () {
          return {};
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
      defaults: {
        handler(val) {
          this.objectOption = val;
        },
        deep: true
      },
      objectOption: {
        handler(val) {
          this.$emit('update:defaults', val)
        },
        deep: true
      },
      propOption: {
        handler(list) {
          let result = {}
          list.forEach(ele => {
            result[ele.prop] = ele

          });
          this.$set(this, 'objectOption', result)
        },
        deep: true,
      },
      option: {
        handler() {
          this.init(false);
        },
        deep: true,
      },
    },
    data() {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        isMobile: '',
        objectOption: {}
      };
    },
    created() {
      this.init();
    },
    computed: {
      resultOption() {
        return {
          ...this.tableOption,
          ...{
            column: this.propOption
          }
        }
      },
      rowKey() {
        return this.tableOption.rowKey || DIC_PROPS.rowKey;
      },
      formRules() {
        let result = {};
        this.propOption.forEach(ele => {
          if (ele.rules && ele.display !== false)
            result[ele.prop] = ele.rules
        });
        return result;
      },
      isMediumSize() {
        return this.controlSize;
      },
      controlSize() {
        return this.tableOption.size || this.$AVUE.size;
      }
    },
    methods: {
      init(type) {
        let globOption = this.deepClone(this.$AVUE[`${name}Option`])
        let option = {
          ...globOption,
          ...this.option
        }
        this.tableOption = option;
        this.getIsMobile();
        this.handleLocalDic();
        if (type !== false) this.handleLoadDic()
      },
      dicInit(type) {
        if (type === 'cascader') {
          this.handleLoadCascaderDic()
        } else {
          this.handleLoadDic();
        }
      },
      getIsMobile() {
        this.isMobile = document.body.clientWidth <= 768;
      },
      updateDic(prop, list) {
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
      //本地字典
      handleLocalDic() {
        loadLocalDic(this.resultOption, this)
      },
      // 网络字典加载
      handleLoadDic() {
        loadDic(this.resultOption, this)
      },
      //级联字典加载
      handleLoadCascaderDic() {
        loadCascaderDic(this.propOption, this)
      }
    }
  };
}
