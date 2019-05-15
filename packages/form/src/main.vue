<template>
  <div :class="b()"
       :style="{width:setPx(tableOption.formWidth,'100%')}">
    <el-form ref="form"
             status-icon
             :model="form"
             :label-position="tableOption.labelPosition"
             :size="controlSize"
             :label-width="setPx(tableOption.labelWidth,80)"
             :rules="formRules">
      <el-row :gutter="20"
              :span="24">
        <div :class="b('group')">
          <template v-if="vaildVisdiplay(column)"
                    v-for="(column,index) in columnOption">
            <el-col :key="column.prop"
                    :md="column.span||12"
                    :xs="24"
                    :class="b('row')">
              <div :class="b('option')"
                   v-if="optionIndex[index]">
                <i class="el-icon-menu"
                   @click="optionMenu(column,index)"></i>
                <i class="el-icon-delete"
                   @click="optionDelete(column,index)"></i>
              </div>
              <el-form-item :label="column.label"
                            :prop="column.prop"
                            :label-width="setPx(column.labelWidth,tableOption.labelWidth || 80)">
                <el-tooltip :disabled="!column.tip"
                            :content="column.tip"
                            :placement="column.tipPlacement">
                  <slot :value="form[column.prop]"
                        :column="column"
                        :size="column.size || controlSize"
                        :disabled="vaildDisabled(column)"
                        :dic="DIC[column.prop]"
                        :name="column.prop"
                        v-if="column.formsolt"></slot>

                  <component :is="getComponent({type:column.type,component:column.component})"
                             v-else
                             :prop="column.prop"
                             :props="column.props || tableOption.props"
                             :propsHttp="column.propsHttp || tableOption.propsHttp"
                             v-model="form[column.prop]"
                             :change="column.change"
                             :click="column.click"
                             :nodeClick="column.nodeClick"
                             :showAllLevels="column.showAllLevels"
                             :changeOnSelect="column.changeOnSelect"
                             :checked="column.checked"
                             :prepend="column.prepend"
                             :append="column.append"
                             :column="column"
                             :filter="column.filter"
                             :iconList="column.iconList"
                             :precision="column.precision"
                             :multiple="column.multiple"
                             :readonly="column.readonly"
                             :placeholder="column.placeholder"
                             :step="column.step"
                             :range="column.range"
                             :showStops="column.showStops"
                             :showInput="column.showInput"
                             :controls-position="column.controlsPosition"
                             :expand-trigger="column.expandTrigger"
                             :size="column.size || controlSize"
                             :parent="column.parent"
                             :colors="column.colors"
                             :action="column.action"
                             :limit="column.limit"
                             :dicUrl="column.dicUrl"
                             :tip="column.tip"
                             :loadText="column.loadText"
                             :listType="column.listType"
                             :drag="column.drag"
                             :showFileList="column.showFileList"
                             :iconClasses="column.iconClasses"
                             :voidIconClass="column.voidIconClass"
                             :showText="column.showText"
                             :texts="column.texts"
                             :tpyeformat="column.tpyeformat"
                             :filterable="column.filterable"
                             :separator="column.separator"
                             :border="column.border"
                             :minlength="column.minlength"
                             :maxlength="column.maxlength"
                             :prefixIcon="column.prefixIcon"
                             :suffixIcon="column.suffixIcon"
                             :defaultExpandAll="column.defaultExpandAll"
                             :options="column.options"
                             :pickerOptions="column.pickerOptions"
                             :defaultTime="column.defaultTime"
                             :min="column.min"
                             :max="column.max"
                             :changeoOnSelect="column.changeoOnSelect"
                             :label="column.label"
                             :clearable="column.clearable"
                             :startPlaceholder="column.startPlaceholder"
                             :dataType="column.dataType"
                             :endPlaceholder="column.endPlaceholder"
                             :type="column.type"
                             :typeformat="column.typeformat"
                             :minRows="column.minRows"
                             :maxRows="column.maxRows"
                             :format="column.format"
                             :formatTooltip="column.formatTooltip"
                             :value-format="column.valueFormat"
                             :remote="column.remote"
                             :dic="DIC[column.prop]"
                             :disabled="vaildDisabled(column)"
                             :upload-before="uploadBefore"
                             :upload-after="uploadAfter"
                             @change="column.cascader?handleChange(index):''">
                    <template :slot="column.prop+'Type'"
                              slot-scope="{item,label,value}"
                              v-if="column.typesolt">
                      <slot :name="column.prop+'Type'"
                            :item="item"
                            :value="value"
                            :label="label"></slot>
                    </template>
                  </component>
                </el-tooltip>
              </el-form-item>
            </el-col>
            <div :class="b('line')"
                 :key="index"
                 :style="{width:(column.count/24*100)+'%'}"
                 v-if="column.row && column.span!==24"></div>
          </template>
        </div>
        <el-col :span="24"
                v-if="vaildData(tableOption.menuBtn,true)">
          <el-form-item :label-width="menuWidth">
            <!-- 菜单按钮组 -->
            <div :class="b('menu',[menuPostion])">
              <el-button type="primary"
                         @click="handleMock"
                         :size="controlSize"
                         icon="el-icon-edit-outline"
                         v-if="vaildData(tableOption.mock,false)">一键填充数据</el-button>
              <el-button type="primary"
                         @click="submit"
                         :size="controlSize"
                         icon="el-icon-check"
                         v-if="vaildData(tableOption.submitBtn,true)">{{vaildData(tableOption.submitText,'提 交')}}</el-button>
              <el-button icon="el-icon-delete"
                         :size="controlSize"
                         v-if="vaildData(tableOption.emptyBtn,true)"
                         @click="resetForm">{{vaildData(tableOption.emptyText,'清 空')}}</el-button>
              <slot name="menuForm"></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import create from "../../utils/create";
import { sendDic } from "../../utils/dic";
import crud from "../../mixins/crud";
import { deepClone, calcCascader } from "../../utils/util";
import mock from "../../utils/mock";
import { validatenull } from "../../utils/validate.js";
import { setTimeout } from "timers";
export default create({
  name: "form",
  mixins: [crud()],
  data() {
    return {
      first: true,
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      form: {},
      formCreate: true,
      formDefault: {},
      formList: [],
      formRules: {}
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
        if (!this.formCreate) {
          this.formVal();
        }
      },
      deep: true
    }
  },
  computed: {
    columnOption() {
      let list = this.tableOption.column || [];
      let count = 0;
      list.forEach(ele => {
        count = count + (ele.span || 12);
        if (count >= 24) {
          count = 0 + (ele.span || 12);
        } else if (ele.row && count !== 24) {
          ele.count = 24 - count;
          count = 0;
        }
      });
      list = calcCascader(list);
      return list;
    },
    menuWidth: function() {
      if (this.tableOption.menuPostion === "left") {
        return "";
      } else {
        return "0";
      }
    },
    menuPostion: function() {
      if (this.tableOption.menuPostion) {
        return this.tableOption.menuPostion;
      } else {
        return "center";
      }
    },
    boxType: function() {
      return this.tableOption.boxType;
    }
  },
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
  created() {
    //初始化字典
    this.handleLoadDic();
    // 初始化数据
    this.formInit();
  },
  methods: {
    handleMock() {
      const form = mock(this.columnOption, this.DIC) || {};
      Object.keys(form).forEach(ele => {
        this.form[ele] = form[ele];
      });
      this.clearValidate();
      this.$message.success("模拟数据填充成功");
    },
    optionDelete(column, index) {
      this.$emit("option-delete", { column, index });
    },
    optionMenu(column, index) {
      this.$emit("option-menu", { column, index });
    },
    mouseover(index) {
      this.optionIndex[index] = true;
      this.optionIndex.splice(0, 0);
    },
    mouseout(index) {
      this.optionIndex[index] = false;
      this.optionIndex.splice(0, 0);
    },
    // 验证表单是否禁止
    vaildDisabled(column) {
      if (this.disabled) return true;
      if (!validatenull(column.disabled)) {
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
    vaildVisdiplay(column) {
      if (!validatenull(column.visdiplay)) {
        return this.vaildData(column.visdiplay, true);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addVisdiplay, true);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editVisdiplay, true);
      } else if (this.boxType === "view") {
        return this.vaildData(column.viewVisdiplay, true);
      } else {
        return true;
      }
    },
    formInit() {
      this.formDefault = this.formInitVal(this.columnOption);
      this.form = this.deepClone(this.formDefault.tableForm);
      this.formVal();
    },
    rulesInit() {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    handleChange(index) {
      const item = this.columnOption;
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
                  (columnNext.props || this.tableOption.props || {}).value ||
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
      let valueItems = Object.keys(this.value);
      let formItems = Object.keys(this.form);
      // 找出两个列表的不同字段
      let diff = valueItems
        .concat(formItems)
        .filter(v => !valueItems.includes(v) || !formItems.includes(v));
      // 删除旧的字段
      diff.forEach(item => {
        delete this.form[item];
      });
      
      Object.keys(this.value).forEach(ele => {
        this.form[ele] = this.value[ele];
      });
      this.$emit("input", this.form);
    },
    clearValidate() {
      this.$refs["form"].clearValidate();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    resetForm() {
      this.form = this.deepClone(this.formDefault.tableForm);
      this.$emit("input", this.form);
      this.$emit("reset-change");
      this.clearValidate();
    },
    validate(callback) {
      this.$refs["form"].validate(valid => callback(valid));
    },
    submit() {
      this.validate(valid => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    }
  }
});
</script>

