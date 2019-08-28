<template>
  <div :class="b()">
    <a-form :form="formRules"
            @submit="submit">
      <a-row>
        <a-col :span="column.span || 12"
               v-for="(column,index) in columnOption">
          <a-form-item :label="column.label"
                       :key="index"
                       :label-col="{ span: labelCol }"
                       :wrapper-col="{ span: wrapperCol }">
            <a-tooltip :placement="column.tipPlacement">
              <template slot="title"
                        v-if="!column.tip || column.type==='upload'">
                <span>{{vaildData(column.tip,getPlaceholder(column))}}</span>
              </template>
              <slot :value="form[column.prop]"
                    :column="column"
                    :label="form['$'+column.prop]"
                    :size="column.size || controlSize"
                    :disabled="vaildDisabled(column)"
                    :dic="DIC[column.prop]"
                    :name="column.prop"
                    v-if="column.formslot"></slot>

              <component :is="getComponent(column.type,column.component)"
                         v-else
                         :action="column.action"
                         :append="column.append"
                         :accordion="column.accordion"
                         :typeslot="column.typeslot"
                         :appendClick="column.appendClick"
                         :border="column.border"
                         :button="column.button"
                         :change="column.change"
                         :changeoOnSelect="column.changeoOnSelect"
                         :checked="column.checked"
                         :clearable="column.clearable"
                         :changeOnSelect="column.changeOnSelect"
                         :click="column.click"
                         :onRemove="column.onRemove"
                         :showWordLimit="column.showWordLimit"
                         :column="column"
                         :colors="column.colors"
                         :canvasOption="column.canvasOption"
                         :controls-position="column.controlsPosition"
                         :dataType="column.dataType"
                         :defaultExpandAll="column.defaultExpandAll"
                         :defaultTime="column.defaultTime"
                         :dic="DIC[column.prop]"
                         :dicUrl="column.dicUrl"
                         :dicMethod="column.dicMethod"
                         :dicQuery="column.dicQuery"
                         :disabled="vaildDisabled(column) || allDisabled"
                         :drag="column.drag"
                         :endPlaceholder="column.endPlaceholder"
                         :expand-trigger="column.expandTrigger"
                         :filter="column.filter"
                         :blur="column.blur"
                         :focus="column.focus"
                         :typeformat="column.typeformat"
                         :filesize="column.filesize"
                         :filterable="column.filterable"
                         :format="column.format"
                         :formatTooltip="column.formatTooltip"
                         :iconClasses="column.iconClasses"
                         :label="column.label"
                         :limit="column.limit"
                         :listType="column.listType"
                         :loadText="column.loadText"
                         :min="column.min"
                         :max="column.max"
                         :minlength="column.minlength"
                         :maxlength="column.maxlength"
                         :minRows="column.minRows"
                         :maxRows="column.maxRows"
                         :multiple="column.multiple"
                         :nodeClick="column.nodeClick"
                         :options="column.options"
                         :oss="column.oss"
                         :parent="column.parent"
                         :pickerOptions="column.pickerOptions"
                         :placeholder="getPlaceholder(column)"
                         :precision="column.precision"
                         :prefixIcon="column.prefixIcon"
                         :prepend="column.prepend"
                         :prependClick="column.prependClick"
                         :prop="column.prop"
                         :props="column.props || parentOption.props"
                         :propsHttp="column.propsHttp ||parentOption.propsHttp"
                         :range="column.range"
                         :iconList="column.iconList"
                         :readonly="column.readonly"
                         :checkStrictly="column.checkStrictly"
                         :separator="column.separator"
                         :showFileList="column.showFileList"
                         :showInput="column.showInput"
                         :showStops="column.showStops"
                         :showAllLevels="column.showAllLevels"
                         :showText="column.showText"
                         :size="column.size || controlSize"
                         :startPlaceholder="column.startPlaceholder"
                         :step="column.step"
                         :suffixIcon="column.suffixIcon"
                         :texts="column.texts"
                         :tip="column.tip"
                         :type="column.type"
                         :accept="column.accept"
                         :tags="column.tags"
                         :upload-before="uploadBefore"
                         :upload-after="uploadAfter"
                         :value-format="column.valueFormat"
                         :voidIconClass="column.voidIconClass"
                         :remote="column.remote"
                         :autocomplete="column.autocomplete"
                         v-model="form[column.prop]"
                         :allow-create="column.allowCreate"
                         :default-first-option="column.defaultFirstOption"
                         v-decorator="[
                          column.prop,
                          {rules: column.rules,initialValue: form[column.prop]}
                        ]">
                <template :slot="column.prop+'Type'"
                          slot-scope="{item,label,value}"
                          v-if="column.typeslot">
                  <slot :name="column.prop+'Type'"
                        :item="item"
                        :value="value"
                        :label="label"></slot>
                </template>
              </component>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :span="24">
        <a-form-item :wrapper-col="{ span: 24}">
          <div :class="b('menu',[menuPosition])">
            <a-button type="primary"
                      icon="check"
                      :loading="allDisabled"
                      html-type="submit">
              提 交
            </a-button>

            <a-button icon="delete"
                      :loading="allDisabled"
                      @click="handleReset">取 消</a-button>
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
      allDisabled: false,
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
    boxType: function () {
      return this.parentOption.boxType;
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
    // 验证表单是否禁止
    vaildDisabled (column) {
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        return this.vaildData(column.disabled, false);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addDisabled, false);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editDisabled, false);
      } else if (this.boxType === "view") {
        return true;
      } else {
        return false;
      }
    },
    // 验证表单是否显隐
    vaildDisplay (column) {
      if (!this.validatenull(column.display)) {
        return this.vaildData(column.display, true);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addDisplay, true);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editDisplay, true);
      } else if (this.boxType === "view") {
        return this.vaildData(column.viewDisplay, true);
      } else {
        return true;
      }
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
    show () {
      this.allDisabled = true;
    },
    hide () {
      this.allDisabled = false;
    },
    submit (e) {
      e.preventDefault();
      this.formRules.validateFields((err, values) => {
        if (!err) {
          this.form = values;
          this.show();
          this.$emit("submit", this.form, this.hide);
        }
      });
    }
  }
});
</script>

