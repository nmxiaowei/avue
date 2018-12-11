import { vaildData, setPx } from 'utils/util.js';
import { getComponent, getPlaceholder } from 'core/dataformat';
import { loadDic, loadCascaderDic } from 'core/dic';
import { detail } from 'core/detail';
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
        cascaderDIC: {},
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
        this.detail = detail;
        this.getPlaceholder = getPlaceholder;
        this.tableOption = this.option;
      },
      // 加载字典
      handleLoadDic() {
        const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
        // 初始化字典
        if (dicFlag) {
          loadDic(this.tableOption).then(res => {
            this.DIC = this.deepClone(res);
          });
          // 加载传进来的字典
        } else {
          const dicData = this.tableOption.dicData || [];
          this.DIC = this.deepClone(dicData);
        }
      },
      handleLoadCascaderDic() {
        loadCascaderDic(this.columnOption, this.data).then(res => {
          this.cascaderDIC = this.deepClone(res);
        });
      }
    }
  };
}
