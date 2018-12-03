import * as utils from 'utils/util.js';
import { validatenull } from 'utils/validate.js';
import Input from 'components/input/';
import Select from 'components/select/';
import Radio from 'components/radio/';
import Checkbox from 'components/checkbox/';
import Cascader from 'components/cascader/';
import Date from 'components/date/';
import Time from 'components/time/';
import InputNumber from 'components/input-number/';
import Switch from 'components/switch/';
import Rate from 'components/rate/';
import Upload from 'components/upload/';
import Silder from 'components/silder/';
import Img from 'components/crud-img/';
export default function() {
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
      Input,
      Select,
      Radio,
      Checkbox,
      Date,
      Time,
      Cascader,
      InputNumber,
      Switch,
      Rate,
      Upload,
      Silder,
      Img
    },
    watch: {
      tableForm: {
        handler() {
          this.$emit('input', this.tableForm);
        },
        deep: true
      },
      form: {
        handler() {
          this.$emit('input', this.form);
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
      init() {
        // 初始化工具
        this.initFun();
        this.tableOption = this.option;
        const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
        // 规则初始化
        this.rulesInit();

        // 初始化字典
        if (dicFlag) this.dicInit();
        else this.DIC = this.tableOption.dicData;
        // 初始化表单formInitVal
        this.formInit();
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
