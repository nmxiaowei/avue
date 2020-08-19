<template>
  <div :class="b('mobile')"
       :style="{width:setPx(tableOption.formWidth,'100%')}">
    <van-cell-group class="avue-cell-group"
                    :key="index"
                    v-for="(item,index) in columnOption">
      <template v-for="(column,cindex) in item.column">
        <component :key="cindex"
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
                   @change="propChange(item.column,column)"></component>
      </template>
      <div :class="b('mobile-menu')">
        <van-button block
                    type="primary"
                    v-if="vaildData(tableOption.submitBtn,true)"
                    @click="submit">{{vaildData(tableOption.submitText,'提 交')}}</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import create from "core/create";
import init from "../../core/common/init";
import { detail } from "core/detail";
import { getComponent, getPlaceholder, formInitVal, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
export default create({
  name: "form",
  mixins: [init(), locale],
  data () {
    return {
      tableOption: {},
      form: {},
      formList: [],
      formCreate: false,
      formDefault: {},
      formVal: {}
    };
  },
  watch: {
    formRules: {
      handler () {
        this.clearValidate();
      },
      deep: true
    },
    form: {
      handler (val) {
        if (this.formCreate) this.setVal();
      },
      deep: true
    },
    value: {
      handler (val) {
        if (this.formCreate) {
          this.setForm(val);
        } else {
          this.formVal = Object.assign(this.formVal, val || {});
        }

      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    propOption () {
      let list = [];
      this.columnOption.forEach(option => {
        option.column.forEach(column => list.push(column));
      });
      return list;
    },
    parentOption () {
      let option = this.deepClone(this.tableOption);
      let group = option.group;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      if (group) {
        //处理分组以外的部分
        group.unshift({
          arrow: false,
          column: option.column
        })
      }
      return option;
    },
    columnOption () {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        ele.column = ele.column || [];
        //处理级联属性
        ele.column = calcCascader(ele.column);
      });;
      return list;
    },
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
  created () {
    this.$nextTick(() => {
      this.dataFormat();
      this.setVal();
      this.clearValidate();
      this.formCreate = true;
    })
  },
  methods: {
    getComponent,
    getPlaceholder,
    setVal () {
      this.$emit("input", this.form);
      this.$emit("change", this.form);
    },
    //初始化表单
    dataFormat () {
      this.formDefault = formInitVal(this.propOption);
      let value = this.deepClone(this.formDefault.tableForm);
      this.setForm(this.deepClone(Object.assign(value, this.formVal)))
    },
    //表单赋值
    setForm (value) {
      Object.keys(value).forEach(ele => {
        this.$set(this.form, ele, value[ele]);
      });
      this.forEachLabel();
    },
    clearValidate () {

    },
    propChange (option, column) {
      if (column.cascader) this.handleChange(option, column)
    },
    handleChange (list, column) {
      this.$nextTick(() => {
        const cascader = column.cascader;
        const str = cascader.join(",");
        const columnNextProp = cascader[0];
        const value = this.form[column.prop];
        // 下一个节点
        const columnNext = this.findObject(list, columnNextProp)
        /**
         * 1.判断当前节点是否有下级节点
         * 2.判断当前节点是否有值
         */
        if (
          this.validatenull(cascader) ||
          this.validatenull(value) ||
          this.validatenull(columnNext)
        ) {
          return;
        }

        // 如果不是首次加载则清空全部关联节点的属性值和字典值
        if (this.formList.includes(str)) {
          //清空子类字典列表和值
          cascader.forEach(ele => {
            this.form[ele] = "";
            this.$set(this.DIC, ele, []);
          });
        }
        // 根据当前节点值获取下一个节点的字典
        sendDic({
          column: columnNext,
          value: value,
        }).then(res => {
          //首次加载的放入队列记录
          if (!this.formList.includes(str)) this.formList.push(str);
          // 修改字典
          const dic = Array.isArray(res) ? res : [];
          this.$set(this.DIC, columnNextProp, dic);
          if (!this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex) && this.validatenull(this.form[columnNextProp])) {
            this.form[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
          }
        });
      })
    },
    forEachLabel () {
      this.propOption.forEach(column => {
        this.handleShowLabel(column, this.DIC[column.prop]);
      });
    },

    //获取全部字段字典的label
    handleShowLabel (column, DIC) {
      let result;
      if (!this.validatenull(DIC)) {
        result = detail(this.form, column, this.tableOption, DIC);
        this.$set(this.form, ["$" + column.prop], result);
      }
      return result;
    },
    resetForm () {
      this.clearValidate();
      if (this.reset) {
        this.resetFields();
        this.clearVal();
      }
      this.$emit("input", this.form);
      this.$emit("reset-change");
    },
    submit () {
      this.asyncValidator(this.formRules, this.form, { firstFields: true })
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

