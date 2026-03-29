import { sendDic, loadDic, loadCascaderDic, loadLocalDic } from 'core/dic';
import { DIC_PROPS } from 'global/variable';
import slot from 'core/slot';

export default function (name: string) {
  return {
    mixins: [slot],
    emits: ['update:modelValue', 'change'],
    props: {
      tableData: {
        type: Object,
        default: () => {
          return {};
        },
      },
      option: {
        type: Object,
        required: true,
        default: () => {
          return {};
        },
      },
    },
    watch: {
      propOption: {
        handler(list: any[]) {
          list.forEach((ele) => (this.objectOption[ele.prop] = ele));
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
        objectOption: {},
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      isMobile() {
        return document.body.clientWidth <= 768;
      },
      resultOption() {
        return {
          ...this.tableOption,
          ...{
            column: this.propOption || [],
          },
        };
      },
      rowKey() {
        return this.tableOption.rowKey || DIC_PROPS.rowKey;
      },
      formRules() {
        const result: Record<string, any> = {};
        this.propOption.forEach((ele: any) => {
          if (ele.rules && ele.display !== false) result[ele.prop] = ele.rules;
        });
        return result;
      },
    },
    methods: {
      init(this: any, type?: boolean) {
        const globOption = this.deepClone(this.$AVUE[`${name}Option`]);
        const option = {
          ...globOption,
          ...this.option,
        };
        this.tableOption = option;
        this.handleLocalDic();
        if (type !== false) this.handleLoadDic();
      },
      dicInit(this: any, type: string) {
        if (type === 'cascader') {
          this.handleLoadCascaderDic();
        } else {
          this.handleLoadDic();
        }
      },
      updateDic(this: any, prop: string, list?: any[]) {
        const column = this.findObject(this.propOption, prop);
        const formatter = column.dicFormatter;
        const callback = (currentList: any[], useFormatter = true) => {
          if (useFormatter && typeof formatter === 'function') {
            this.DIC[prop] = formatter(currentList, this.tableForm || this.form);
          } else {
            this.DIC[prop] = currentList;
          }
        };
        if (this.validatenull(list) && this.validatenull(prop)) {
          this.handleLoadDic();
          return;
        }
        if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
          sendDic(
            {
              column,
            },
            this
          ).then((currentList: any[]) => {
            callback(currentList, false);
          });
        } else {
          callback(list || []);
        }
      },
      handleSetDic(list: Record<string, any>, res: Record<string, any> = {}) {
        Object.keys(res).forEach((ele) => {
          list[ele] = res[ele];
        });
      },
      handleLocalDic(this: any) {
        loadLocalDic(this.resultOption, this);
      },
      handleLoadDic(this: any) {
        loadDic(this.resultOption, this);
      },
      handleLoadCascaderDic(this: any) {
        loadCascaderDic(this.propOption, this);
      },
    },
  };
}
