import * as utils from '../utils/util.js';
import {
  validatenull
} from '../utils/validate.js';
import crudInput from '../crud/src/crud-input';
import crudSelect from '../crud/src/crud-select';
import crudRadio from '../crud/src/crud-radio';
import crudCheckbox from '../crud/src/crud-checkbox';
import crudCascader from '../crud/src/crud-cascader';
import crudDate from '../crud/src/crud-date';
import crudTime from '../crud/src/crud-time';
import crudInputNumber from '../crud/src/crud-input-number';
import crudUeditor from '../crud/src/crud-ueditor';
import crudSwitch from '../crud/src/crud-switch';
import crudRate from '../crud/src/crud-rate';
import crudUpload from '../crud/src/crud-upload';
import crudSilder from '../crud/src/crud-silder';
export default function() {
  return {
    props: {
      option: {
        type: Object,
        required: true,
        default: () => {}
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
      crudUeditor,
      crudSwitch,
      crudRate,
      crudUpload,
      crudSilder
    },
    watch: {
      tableForm: {
        handler(n) {
          this.$emit('input', n);
        },
        deep: true
      },
      value: {
        handler() {
          this.formVal();
        },
        deep: true
      },
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
        dicList: [],
        dicCascaderList: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        // 初始化工具
        this.initFun();
        // 规则初始化
        this.rulesInit();
        // 初始化字典
        this.dicInit();
        // 初始化表单formInitVal
        this.formInit();

      },
      dicInit() {
        this.option.column.forEach(ele => {
          if (!validatenull(ele.dicUrl) && this.vaildData(ele.dicFlag, true)) {
            this.dicCascaderList.push({
              dicUrl: ele.dicUrl,
              dicData: ele.dicData
            });
          } else if (!validatenull(ele.dicData) && typeof ele.dicData === 'string') {
            this.dicList.push(ele.dicData);
          }
        });
        this.GetDic().then(data => {
          this.DIC = data;
        });
      },
      vaildData(val, dafult) {
        if (typeof val === 'boolean') {
          return val;
        }
        return !validatenull(val) ? val : dafult;
      },
      GetDicByType(href) {
        return new Promise((resolve) => {
          this.$http.get(href).then(function(res) {
            // 降级处理
            const list = res.data;
            if (!validatenull(list.data)) {
              resolve(list.data instanceof Array ? list.data : []);
            } else if (!validatenull(list)) {
              resolve(list instanceof Array ? list : []);
            } else {
              resolve([]);
            }
          });
        });
      },
      GetDic() {
        return new Promise((resolve) => {
          let result = [];
          let dicData = {};
          let locaDic = this.option.dicData || [];
          let list = this.dicList;
          let cascaderList = this.dicCascaderList;
          if (validatenull(list) && validatenull(cascaderList)) {
            return;
          }
          list.forEach(ele => {
            result.push(new Promise((resolve) => {
              if (validatenull(this.option.dicUrl)) {
                resolve(locaDic[ele]);
              } else {
                this.GetDicByType(`${this.option.dicUrl.replace('{{key}}', ele)}`).then(function(res) {
                  resolve(res);
                });
              }
            }));
          });
          cascaderList.forEach(ele => {
            result.push(new Promise((resolve) => {
              this.GetDicByType(`${ele.dicUrl.replace('{{key}}', ele)}`).then(function(res) {
                list.push(ele.dicData);
                resolve(res);
              });
            }));
          });
          Promise.all(result).then(data => {
            list.forEach((ele, index) => {
              dicData[ele] = data[index];
            });
            if (validatenull(this.option.dicUrl)) {
              dicData = Object.assign({}, dicData, locaDic);
            }
            resolve(dicData);
          });
        });

      },
      initFun() {
        Object.keys(utils).forEach(key => {
          this[key] = utils[key];
        });
      }
    }
  };
}
