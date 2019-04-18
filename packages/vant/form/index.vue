<template>
  <div :class="b('mobile')"
       :style="{width:setPx(tableOption.formWidth,'100%')}">
    <van-cell-group class="avue-cell-group">
      <template v-for="(column,index) in columnOption">
        <component :key="index"
                   v-model="form[column.prop]"
                   :class="{'avue-cell--row':column.row}"
                   :is="getComponent(column.type,column.component)"
                   :label="column.label"
                   :placeholder="getPlaceholder(column)"
                   :dataType="column.dataType"
                   :action="column.action"
                   :limit='column.limit'
                   :listType="column.listType"
                   :prefixIcon="column.prefixIcon"
                   :suffixIcon="column.suffixIcon"
                   :oss="column.oss"
                   :type="column.type"
                   :readonly="column.readonly"
                   :tip="column.tip"
                   :disabled="column.disabled || tableOption.disabled"
                   :minRows="column.minRows"
                   :rules="column.rules"
                   :tags="column.tags"
                   :valueFormat="column.valueFormat"
                   :format="column.format"
                   :propsHttp="column.propsHttp"
                   :canvasOption="column.canvasOption"
                   :maxRows="column.maxRows"
                   :props="column.props || tableOption.props"
                   :dic="DIC[column.prop]"
                   :clearable="column.clearable"
                   @change="column.cascader?handleChange(columnOption,index):''"></component>
      </template>
      <div :class="b('mobile-menu')">
        <van-button block
                    type="primary"
                    v-if="tableOption.submitBtn"
                    @click="submit">{{vaildData(tableOption.submitText,'提 交')}}</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import create from "core/create";
import init from "../../core/crud/init";
import { getComponent, getPlaceholder } from "core/dataformat";
import { formInitVal, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import { getObjType } from "utils/util";
export default create({
  name: "form",
  mixins: [init(), locale],
  data() {
    return {
      form: {},
      formList: [],
      formDefault: {},
      formCreate: true,
      formCascaderInit: false,
      formCascaderList: []
    };
  },
  watch: {
    form: {
      handler() {
        if (!this.formCreate) {
          this.$emit("input", this.form);
          this.$emit("change", this.form);
        } else {
          this.formCreate = false;
        }
      },
      deep: true
    },
    value: {
      handler() {
        this.formOld = this.deepClone(this.value);
        if (!this.formCreate) {
          this.formVal();
        }
      },
      deep: true
    }
  },
  computed: {
    columnOption() {
      let list = calcCascader([...this.tableOption.column] || []);
      return list;
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  created() {
    // 规则初始化
    this.rulesInit();
    //初始化字典
    this.handleLoadDic();
    // 初始化表单
    this.dataformat();
  },
  methods: {
    getComponent,
    getPlaceholder,
    dataformat() {
      this.formDefault = formInitVal(this.columnOption);
      this.form = this.deepClone(this.formDefault.tableForm);
      this.formVal();
    },
    //搜索指定的属性配置
    findColumnIndex(value) {
      let result = -1;
      this.columnOption.forEach(column => {
        result = this.findArray(column.column, value, "prop");
      });
      return result;
    },
    handleChange(item, index) {
      const column = item[index]; //获取当前节点级联
      const list = column.cascader;
      const str = list.join(",");
      const value = this.form[column.prop];
      // 下一个节点
      const columnNext = item[index + 1] || {}; //获取下一个联动节点属性
      const columnNextProp = columnNext.prop;
      /**
       * 1.判断当前节点是否有下级节点
       * 2.判断当前节点是否有值
       */
      if (
        this.validatenull(list) ||
        this.validatenull(value) ||
        this.validatenull(columnNext)
      ) {
        return;
      }

      // 如果不是首次加载则清空全部关联节点的属性值和字典值
      if (this.formList.includes(str)) {
        //清空子类字典列表和值
        list.forEach(ele => {
          this.form[ele] = "";
          this.$set(this.DIC, ele, []);
        });
      }
      // 根据当前节点值获取下一个节点的字典
      sendDic({ url: columnNext.dicUrl.replace("{{key}}", value) }).then(
        res => {
          const dic = Array.isArray(res) ? res : [];
          // 修改字典
          this.$set(this.DIC, columnNextProp, dic);
          /**
           * 1.是change多级默认联动
           * 2.字典不为空
           * 3.非首次加载
           */
          if (!this.validatenull(dic) && this.formList.includes(str)) {
            //取字典的指定项或则第一项
            let dicvalue = dic[columnNext.defaultIndex || 0];
            if (!dicvalue) dicvalue = dic[0];
            if (dicvalue) {
              this.form[columnNext.prop] =
                dicvalue[
                  (columnNext.props || this.parentOption.props || {}).value ||
                    "value"
                ];
              this.clearValidate();
            }
          }
          //首次加载的放入队列记录
          if (!this.formList.includes(str)) this.formList.push(str);
        }
      );
    },
    formVal() {
      Object.keys(this.value).forEach(ele => {
        this.form[ele] = this.value[ele];
      });
      this.$emit("input", this.form);
    },

    rulesInit() {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    resetForm() {
      this.form = this.deepClone(this.formDefault.tableForm);
      this.$emit("input", this.form);
      this.$emit("reset-change");
    },
    submit() {
      let formRules = this.formRules;
      let form = this.form;
      Object.keys(formRules).forEach(ele => {
        const type = getObjType(form[ele]);
        if (type !== "string") {
          formRules[ele].forEach(rule => {
            if (rule.required) {
              rule.type = type;
            }
          });
        }
      });
      this.asyncValidator(formRules, form, { firstFields: true })
        .then(res => {
          this.$emit("submit", this.form);
        })
        .catch(err => {
          this.$notify({
            message: err[0].message,
            duration: 1500
          });
        });
    }
  }
});
</script>

