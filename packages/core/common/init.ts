import { sendDic, loadDic, loadCascaderDic, loadLocalDic } from 'core/dic';
import { DIC_PROPS } from 'global/variable';
import slot from 'core/slot';
import { validateOption, warnOption } from 'core/option';

interface DicRequestState {
  active: Set<string>;
  sequence: Record<string, number>;
  unmounted: boolean;
}

const dicRequestStates = new WeakMap<object, DicRequestState>();

const getDicRequestState = (safe: object) => {
  let state = dicRequestStates.get(safe);
  if (!state) {
    state = {
      active: new Set(),
      sequence: {},
      unmounted: false,
    };
    dicRequestStates.set(safe, state);
  }
  return state;
};

export default function (name: string) {
  return {
    mixins: [slot],
    emits: ['update:modelValue', 'change', 'dic-error'],
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
        dicLoading: false,
        dicError: null,
      };
    },
    mounted() {
      getDicRequestState(this).unmounted = false;
      this.init();
    },
    beforeUnmount() {
      const state = getDicRequestState(this);
      state.unmounted = true;
      state.active.clear();
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
        const componentName =
          name || (this.$options.name || '').replace(/^avue-/, '') || 'component';
        if (
          this.$AVUE.optionValidate !== false &&
          option.optionValidate !== false
        ) {
          warnOption(validateOption(option, componentName), componentName);
        }
        if (name === 'crud' && typeof this.restoreColumnState === 'function') {
          this.restoreColumnState();
        }
        this.handleLocalDic();
        if (type !== false) this.handleLoadDic();
      },
      dicInit(this: any, type: string) {
        if (type === 'cascader') {
          return this.handleLoadCascaderDic();
        } else {
          return this.handleLoadDic();
        }
      },
      updateDic(this: any, prop: string, list?: any[]) {
        const column = this.findObject(this.propOption, prop);
        if (!column) return Promise.resolve(null);
        const formatter = column.dicFormatter;
        const callback = (currentList: any[], useFormatter = true) => {
          if (useFormatter && typeof formatter === 'function') {
            this.DIC[prop] = formatter(currentList, this.tableForm || this.form);
          } else {
            this.DIC[prop] = currentList;
          }
        };
        if (this.validatenull(list) && this.validatenull(prop)) {
          return this.handleLoadDic();
        }
        if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
          return this.requestDic(
            {
              column,
            },
            `update:${prop}`,
          ).then((currentList: any[]) => {
            if (currentList) callback(currentList, false);
            return currentList;
          });
        } else {
          callback(list || []);
          return Promise.resolve(list || []);
        }
      },
      handleSetDic(list: Record<string, any>, res: Record<string, any> = {}) {
        Object.keys(res).forEach((ele) => {
          list[ele] = res[ele];
        });
      },
      handleLocalDic(this: any) {
        const localDic = loadLocalDic(this.resultOption);
        this.handleSetDic(this.DIC, localDic.data);
        return this.runDicRequest(
          'local-dic',
          () => localDic.pending,
          (result: Record<string, any>) => {
            this.handleSetDic(this.DIC, result);
          },
        );
      },
      handleLoadDic(this: any) {
        return this.runDicRequest(
          'dic',
          () => loadDic(this.resultOption, this),
          (result: Record<string, any>) => {
            this.handleSetDic(this.DIC, result);
          },
        );
      },
      handleLoadCascaderDic(this: any) {
        return this.runDicRequest(
          'cascader',
          () => loadCascaderDic(this.propOption, this),
          (result: Record<string, any>) => {
            Object.keys(result).forEach((index) => {
              if (!this.cascaderDIC[index]) this.cascaderDIC[index] = {};
              this.handleSetDic(this.cascaderDIC[index], result[index]);
            });
          },
        );
      },
      requestDic(
        this: any,
        params: Record<string, any>,
        requestType = 'manual',
      ) {
        return this.runDicRequest(requestType, () => sendDic(params, this));
      },
      runDicRequest(
        this: any,
        requestType: string,
        request: () => Promise<any>,
        apply?: (result: any) => void,
      ) {
        const state = getDicRequestState(this);
        const requestId = (state.sequence[requestType] || 0) + 1;
        const token = `${requestType}:${requestId}`;
        state.sequence[requestType] = requestId;
        state.active.add(token);
        this.dicLoading = true;
        this.dicError = null;

        const isCurrent = () =>
          !state.unmounted && state.sequence[requestType] === requestId;

        return Promise.resolve()
          .then(request)
          .then((result) => {
            if (!isCurrent()) return null;
            if (apply) apply(result);
            return result;
          })
          .catch((error) => {
            if (isCurrent()) {
              this.dicError = error;
              this.$emit('dic-error', {
                type: requestType,
                error,
              });
            }
            return null;
          })
          .finally(() => {
            state.active.delete(token);
            if (!state.unmounted) {
              this.dicLoading = state.active.size > 0;
            }
          });
      },
    },
  };
}
