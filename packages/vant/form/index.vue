<template>
  <div :class="b('mobile')" :style="{width:setPx(tableOption.formWidth,'100%')}">
    <van-cell-group>
      <template v-for="(column,index) in columnOption">
        <component
          :key="index"
          v-model="form[column.prop]"
          :is="getComponent(column.type,column.component)"
          :label="column.label"
          :placeholder="getPlaceholder(column)"
          :prefixIcon="column.prefixIcon"
          :suffixIcon="column.suffixIcon"
          :type="column.type"
          :readonly="column.readonly"
          :disabled="column.disabled"
          :minRows="column.minRows"
          :rules="column.rules"
          :valueFormat="column.valueFormat"
          :format="column.format"
          :maxRows="column.maxRows"
          :props="column.props || tableOption.props"
          :dic="DIC[column.prop]"
          :clearable="column.clearable"
          @change="column.cascader?handleChange(index):''"
        ></component>
      </template>
      <div :class="b('mobile-menu')">
        <van-button block type="primary" @click="submit">{{vaildData(tableOption.submitText,'提 交')}}</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import create from "core/create";
import init from "../../core/crud/init";
import { formInitVal } from "core/dataformat";
import { sendDic } from "core/dic";
export default create({
  name: "form",
  mixins: [init()],
  data() {
    return {
      form: {},
      formList: [],
      formDefault: {},
      formCreate: true
    };
  },
  watch: {
    form: {
      handler() {
        if (!this.formCreate) {
          this.$emit("input", this.form);
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
      let list = [...this.tableOption.column] || [];
      list.forEach((ele, index) => {
        //处理级联地址
        if (!this.validatenull(ele.cascaderItem)) {
          let cascader = [...ele.cascaderItem];
          list[index].cascader = [...cascader];
          cascader.forEach((item, cindex) => {
            const columnIndex = index + cindex + 1;
            list[columnIndex].cascaderChange = ele.cascaderChange;
            list[columnIndex].cascader = [...cascader].splice(cindex + 1);
          });
        }
      });
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
    // 初始化表单
    this.dataformat();
    //初始化字典
    this.handleLoadDic();
  },
  methods: {
    dataformat() {
      this.formDefault = formInitVal(this.columnOption);
      this.form = this.deepClone(this.formDefault.tableForm);
      this.formVal();
    },
    handleChange(index) {
      const columnOption = [...this.columnOption];
      const column = columnOption[index];
      const columnNext = columnOption[index + 1] || {};
      const columnNextProp = columnNext.prop;
      const list = column.cascader;
      const str = list.join(",");
      const value = this.form[column.prop];
      //最后一级
      if (
        this.validatenull(list) ||
        this.validatenull(value) ||
        this.validatenull(columnNext) ||
        this.validatenull(this.form[column.prop])
      )
        return;
      if (this.formList.includes(str)) {
        //清空子类字典
        list.forEach(ele => {
          this.$set(this.DIC, ele, []);
        });
      }
      sendDic(columnNext.dicUrl.replace("{{key}}", value)).then(res => {
        // 修改字典
        this.$set(this.DIC, columnNextProp, res || []);
        const dic = res || [];
        /**
         * 1.是change联动
         * 2.字典不为空
         * 3.非首次加载
         */
        if (
          column.cascaderChange &&
          !this.validatenull(dic) &&
          this.formList.includes(str)
        ) {
          //取字典的指定项或则第一项
          const dicvalue = dic[columnNext.defaultIndex] || dic[0];
          this.form[columnNext.prop] =
            dicvalue[(columnNext.props || {}).value || "value"];
        }
        //首次加载的放入队列记录
        if (!this.formList.includes(str)) {
          this.formList.push(str);
          // 如果非change联动或者字典为空，清空子类数据
        } else if (!column.cascaderChange || this.validatenull(dic)) {
          list.forEach(ele => {
            this.form[ele] = "";
          });
        }
      });
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
      this.asyncValidator(this.formRules, this.form)
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

