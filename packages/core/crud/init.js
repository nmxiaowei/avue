import { vaildData, setPx } from 'utils/util.js';
import { getComponent } from 'core/dataformat';
import { loadDic } from 'core/dic';
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
        tableOption: {}
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
        // 工具初始化
        this.vaildData = vaildData;
        this.setPx = setPx;
        this.getComponent = getComponent;
        this.tableOption = this.option;
        const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
        // 初始化字典
        if (dicFlag) {
          loadDic(this.tableOption).then(res => {
            this.DIC = this.deepClone(res);
          });
        } else {
          const dicData = this.tableOption.dicData || [];
          this.DIC = this.deepClone(dicData);
        }
        // 初始化表单
        this.dataformat();
      }
    }
  };
}
