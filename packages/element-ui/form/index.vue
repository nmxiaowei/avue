<template>
  <div :class="b()" :style="{width:setPx(tableOption.formWidth,'100%')}">
    <el-form
      ref="form"
      status-icon
      :model="form"
      :label-position="tableOption.labelPosition"
      :size="controlSize"
      :label-width="setPx(tableOption.labelWidth,80)"
      :rules="formRules"
    >
      <el-row :gutter="20" :span="24">
        <draggable :list="columnOption" :options="dragOptions" :class="b('group')">
          <template v-if="vaildVisdiplay(column)" v-for="(column,index) in columnOption">
            <el-col
              :key="column.prop"
              :md="column.span||12"
              :xs="24"
              :class="b('row',{'cursor':draggableStart})"
              @mouseover.native="draggableMenu?mouseover(index):''"
              @mouseout.native="draggableMenu?mouseout(index):''"
            >
              <div :class="b('option')" v-if="optionIndex[index]">
                <i class="el-icon-menu" @click="optionMenu(column,index)"></i>
                <i class="el-icon-delete" @click="optionDelete(column,index)"></i>
              </div>
              <el-form-item
                :label="column.label"
                :prop="column.prop"
                :label-width="setPx(column.labelWidth,tableOption.labelWidth || 80)"
              >
                <el-tooltip
                  :disabled="!column.tip"
                  :content="vaildData(column.tip,getPlaceholder(column))"
                  :placement="column.tipPlacement"
                >
                  <slot
                    :value="form[column.prop]"
                    :column="column"
                    :label="detail(form,column,tableOption,DIC)"
                    :size="column.size || controlSize"
                    :disabled="vaildDisabled(column)"
                    :dic="DIC[column.prop]"
                    :name="column.prop"
                    v-if="column.formslot"
                  ></slot>

                  <component
                    :is="getComponent(column.type,column.component)"
                    v-else
                    :action="column.action"
                    :append="column.append"
                    :border="column.border"
                    :change="column.change"
                    :changeoOnSelect="column.changeoOnSelect"
                    :checked="column.checked"
                    :clearable="column.clearable"
                    :click="column.click"
                    :column="column"
                    :colors="column.colors"
                    :controls-position="column.controlsPosition"
                    :dataType="column.dataType"
                    :defaultExpandAll="column.defaultExpandAll"
                    :defaultTime="column.defaultTime"
                    :dic="DIC[column.prop]"
                    :disabled="vaildDisabled(column)"
                    :drag="column.drag"
                    :endPlaceholder="column.endPlaceholder"
                    :expand-trigger="column.expandTrigger"
                    :filter="column.filter"
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
                    :parent="column.parent"
                    :pickerOptions="column.pickerOptions"
                    :placeholder="getPlaceholder(column)"
                    :precision="column.precision"
                    :prefixIcon="column.prefixIcon"
                    :prepend="column.prepend"
                    :prop="column.prop"
                    :props="column.props || tableOption.props"
                    :propsHttp="column.propsHttp ||tableOption.propsHttp"
                    :range="column.range"
                    :readonly="vaildData(draggableStart,column.readonly)"
                    :separator="column.separator"
                    :showFileList="column.showFileList"
                    :showInput="column.showInput"
                    :showStops="column.showStops"
                    :showText="column.showText"
                    :size="column.size || controlSize"
                    :startPlaceholder="column.startPlaceholder"
                    :step="column.step"
                    :suffixIcon="column.suffixIcon"
                    :texts="column.texts"
                    :tip="column.tip"
                    :type="column.type"
                    :upload-before="uploadBefore"
                    :upload-after="uploadAfter"
                    :value-format="column.valueFormat"
                    :voidIconClass="column.voidIconClass"
                    v-model="form[column.prop]"
                    @change="column.cascader?handleChange(index):''"
                  ></component>
                </el-tooltip>
              </el-form-item>
            </el-col>
            <div
              :class="b('line')"
              :key="index"
              :style="{width:(column.count/24*100)+'%'}"
              v-if="column.row && column.span!==24"
            ></div>
          </template>
        </draggable>
        <el-col :span="24" v-if="vaildData(tableOption.menuBtn,true)">
          <el-form-item :label-width="menuWidth">
            <!-- 菜单按钮组 -->
            <div :class="b('menu',[menuPostion])">
              <el-button
                type="primary"
                @click="handleMock"
                :size="controlSize"
                icon="el-icon-edit-outline"
                v-if="vaildData(tableOption.mock,false)"
              >一键填充数据</el-button>
              <el-button
                type="primary"
                @click="submit"
                :size="controlSize"
                icon="el-icon-check"
                v-if="vaildData(tableOption.submitBtn,true)"
              >{{vaildData(tableOption.submitText,'提 交')}}</el-button>
              <el-button
                icon="el-icon-delete"
                :size="controlSize"
                v-if="vaildData(tableOption.emptyBtn,true)"
                @click="resetForm"
              >{{vaildData(tableOption.emptyText,'清 空')}}</el-button>
              <slot name="menuForm" :size="controlSize"></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import create from "core/create";
import draggable from "vuedraggable";
import init from "../../core/crud/init";
import { formInitVal } from "core/dataformat";
import { sendDic } from "core/dic";
import mock from "utils/mock";
export default create({
  name: "form",
  mixins: [init()],
  components: {
    draggable
  },
  data() {
    return {
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      form: {},
      formCreate: true,
      formDefault: {},
      formRules: {},
      cascadeCreate: true
    };
  },
  watch: {
    form: {
      handler() {
        if (!this.formCreate) {
          this.$emit("input", this.form);
        } else {
          this.cascadeInit();
          this.formCreate = false;
        }
      },
      deep: true
    },
    value: {
      handler() {
        if (!this.formCreate) {
          this.formVal();
          this.cascadeInit();
        }
      },
      deep: true
    }
  },
  computed: {
    //动态计算列的位置
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
      return list;
    },
    draggable() {
      return this.tableOption.draggable || {};
    },
    draggableMenu() {
      return this.draggable.menu || false;
    },
    draggableStart() {
      return this.draggable.start;
    },
    draggableFlag() {
      return this.vaildData(this.draggable.clone, true);
    },
    dragOptions() {
      if (!this.draggableStart) {
        return {
          disabled: true
        };
      }
      let pull = (() => {
        if (this.draggableFlag) {
          return {
            pull: "clone",
            revertClone: false
          };
        }
        return {};
      })();
      return {
        animation: 0,
        ghostClass: "avue-ghost",
        group: (function() {
          return Object.assign({ name: "avue" }, pull);
        })(),
        sort: this.vaildData(this.draggable.sort, false)
      };
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
    // 规则初始化
    this.rulesInit();
    // 初始化表单
    this.dataformat();
  },
  methods: {
    dataformat() {
      this.formDefault = formInitVal(this.columnOption);
      this.form = this.deepClone(this.formDefault.tableForm);
      this.formVal(false);
    },
    //级联初始化
    cascadeInit() {
      for (let i = 0; i < this.columnOption.length; i++) {
        const ele = this.columnOption[i];
        if (ele.cascaderFirst) {
          let cascader = [...ele.cascader];
          const cascaderLen = cascader.length - 1;
          if (!this.validatenull(this.form[ele.prop]))
            this.handleChange(i, true);
          for (let j = 0; j < ele.cascader.length - 1; j++) {
            const cindex = i + (j + 1);
            let cele = this.columnOption[cindex];
            cele.cascader = cascader.slice(1);
            if (!this.validatenull(this.form[cele.prop]))
              this.handleChange(cindex, true);
          }
        }
      }
    },
    formVal(callback) {
      Object.keys(this.value).forEach(ele => {
        this.form[ele] = this.value[ele];
      });
      if (callback !== false) this.$emit("input", this.form);
    },
    handleMock() {
      const form = mock(this.columnOption, this.DIC);
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
    vaildVisdiplay(column) {
      if (!this.validatenull(column.visdiplay)) {
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
    rulesInit() {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    handleChange(index, clear) {
      const columnOption = this.columnOption;
      const column = columnOption[index];
      const columnNext = columnOption[index + 1];
      const list = column.cascader;
      if (clear !== true) {
        list.forEach(ele => {
          this.form[ele] = "";
          this.$set(this.DIC, ele, []);
        });
      }
      const value = this.form[column.prop];
      if (!this.validatenull(value)) {
        sendDic(columnNext.dicUrl.replace("{{key}}", value)).then(res => {
          setTimeout(() => {
            this.$set(this.DIC, columnNext.prop, res);
          }, 10);
        });
      }
    },
    clearValidate() {
      this.$refs.form.clearValidate();
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

