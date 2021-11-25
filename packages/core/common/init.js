import { sendDic, loadDic, loadCascaderDic, loadLocalDic } from 'core/dic';
import slot from 'core/slot'
export default function () {
  return {
    mixins: [slot],
    emits: ['update:modelValue', 'update:defaults', 'change'],
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
        handler (val) {
          this.objectOption = val;
        },
        deep: true
      },
      objectOption: {
        handler (val) {
          this.$emit('update:defaults', val)
        },
        deep: true
      },
      propOption: {
        handler (val) {
          this.objectOption = {};
          val.forEach(ele => this.objectOption[ele.prop] = ele);
          this.columnInit && this.columnInit();
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
        isMobile: '',
        objectOption: {}
      };
    },
    mounted () {
      this.getIsMobile();
      this.init();
    },
    computed: {
      resultOption () {
        return Object.assign(this.deepClone(this.tableOption), {
          column: this.propOption || []
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
            this.DIC[prop] = list;
          });
        } else {
          this.DIC[prop] = list;
        }
      },
      handleSetDic (list, res = {}) {
        Object.keys(res).forEach(ele => {
          list[ele] = res[ele]
        });
        this.forEachLabel && this.forEachLabel()
      },
      //本地字典
      handleLocalDic () {
        this.handleSetDic(this.DIC, loadLocalDic(this.resultOption));
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
