import * as utils from '../utils/util.js';
import { validatenull } from '../utils/validate.js';
import { loadDic } from '../utils/dic.js';
import crudInput from '../crud/src/crud-input';
import crudSelect from '../crud/src/crud-select';
import crudRadio from '../crud/src/crud-radio';
import crudCheckbox from '../crud/src/crud-checkbox';
import crudCascader from '../crud/src/crud-cascader';
import crudDate from '../crud/src/crud-date';
import crudTime from '../crud/src/crud-time';
import crudInputNumber from '../crud/src/crud-input-number';
import crudSwitch from '../crud/src/crud-switch';
import crudRate from '../crud/src/crud-rate';
import crudUpload from '../crud/src/crud-upload';
import crudSilder from '../crud/src/crud-silder';
import crudImg from '../crud/src/crud-img';
import crudIconSelect from '../crud/src/crud-icon-select';
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
    components: {
      crudInput,
      crudSelect,
      crudRadio,
      crudCheckbox,
      crudDate,
      crudTime,
      crudCascader,
      crudInputNumber,
      crudSwitch,
      crudRate,
      crudUpload,
      crudSilder,
      crudImg,
      crudIconSelect
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
        dicCascaderList: []
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
      init() {
        // 初始化工具
        this.initFun();
        this.tableOption = this.option;
        // 规则初始化
        this.rulesInit();
        setTimeout(() => {
          this.initDic();
        }, 0);
      },
      //检测本地字典
      initDic() {
        // 表格赋值
        this.columnOption.forEach(ele => {
          if (Array.isArray(ele.dicData)) {
            this.$set(this.DIC, ele.prop, ele.dicData)
          }
        })
      },
      handleLoadDic(option) {
        return new Promise((resolve) => {
          const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
          // 初始化字典
          if (dicFlag) {
            loadDic(option || this.tableOption).then((res = {}) => {
              Object.keys(res).forEach(ele => {
                this.$set(this.DIC, ele, res[ele])
              });
              resolve();
            });
            // 加载传进来的字典
          } else {
            const dicData = this.tableOption.dicData || [];
            this.DIC = this.deepClone(dicData);
            resolve();
          }
        })
      },
      vaildData(val, dafult) {
        if (typeof val === 'boolean') {
          return val;
        }
        return !validatenull(val) ? val : dafult;
      },
      initFun() {
        Object.keys(utils).forEach(key => {
          this[key] = utils[key];
        });
      }
    }
  };
}
