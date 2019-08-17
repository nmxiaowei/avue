<template>
  <div :class="b()">
    <a-form :form="formRules"
            @submit="handleSubmit">
      <a-row>
        <a-col :span="column.span || 12"
               v-for="(column,index) in columnOption">
          <a-form-item :label="column.label"
                       :key="index"
                       :label-col="{ span: labelCol }"
                       :wrapper-col="{ span: wrapperCol }">
            <component :is="getComponent(column.type,column.component)"
                       :dic="DIC[column.prop]"
                       v-model="form[column.prop]"
                       :button="column.button"
                       :border="column.border"
                       :placeholder="getPlaceholder(column)"
                       v-decorator="[
                        column.prop,
                        {rules: column.rules,initialValue: form[column.prop]}
                      ]">
            </component>
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :span="24">
        <a-form-item :wrapper-col="{ span: 24}">
          <div :class="b('menu',[menuPosition])">
            <a-button type="primary"
                      html-type="submit">
              提 交
            </a-button>

            <a-button @click="handleReset">取消</a-button>
          </div>
        </a-form-item>
      </a-col>
    </a-form>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import init from "../../core/crud/init";
import create from "core/create";
import { detail } from "core/detail";
import { formInitVal } from "core/dataformat";
import { getComponent, getPlaceholder } from "core/dataformat";
export default create({
  name: "form",
  mixins: [init(), locale],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    uploadBefore: Function,
    uploadAfter: Function,
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      form: {},
      formCreate: true,
      formOld: {},
      formDefault: {},
      formRules: this.$form.createForm(this),
    };
  },
  watch: {
    form: {
      handler () {
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
      handler () {
        this.formOld = this.deepClone(this.value);
        if (!this.formCreate) {
          this.formVal();
        }
      },
      deep: true
    }
  },
  created () {
    //初始化字典
    this.handleLoadDic().then(res => {
      this.forEachLabel();
    });
    // 初始化表单
    this.dataformat();
  },
  computed: {
    parentOption () {
      return this.tableOption
    },
    menuPosition: function () {
      if (this.parentOption.menuPosition) {
        return this.parentOption.menuPosition;
      } else {
        return "center";
      }
    },
    labelCol () {
      return this.parentOption.labelWidth || 5
    },
    wrapperCol () {
      return 24 - this.labelCol
    },
    columnOption () {
      return this.parentOption.column || [];
    },
  },
  methods: {
    getComponent,
    getPlaceholder,
    forEachLabel () {
      this.columnOption.forEach(column => {
        this.handleShowLabel(column, this.DIC[column.prop]);
      });
    },
    //获取全部字段字典的label
    handleShowLabel (column, DIC) {
      let result = "";
      if (!this.validatenull(DIC)) {
        result = detail(this.form, column, this.tableOption, DIC);
        this.$set(this.form, ["$" + column.prop], result);
      }
      return result;
    },
    dataformat () {
      let formDefault = formInitVal(this.propOption);
      this.formDefault = formDefault;
      this.form = this.deepClone(formDefault.tableForm);
      this.formVal();
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
      this.forEachLabel();
      this.$emit("input", this.form);
    },
    handleReset () {
      this.formRules.resetFields();
    },
    handleSubmit (e) {
      e.preventDefault();
      this.formRules.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  }
});
</script>

