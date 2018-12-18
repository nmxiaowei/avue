<template>
  <div :class="b()"
       :style="{width:setPx(parentOption.formWidth,'100%')}">

    <el-form ref="form"
             status-icon
             :model="form"
             :label-position="parentOption.labelPosition"
             :size="controlSize"
             :label-width="setPx(parentOption.labelWidth,80)"
             :rules="formRules">
      <el-row :gutter="20"
              :span="24">
        <div>
          <avue-group v-for="(item,index) in columnOption"
                      :key="item.prop"
                      :icon="item.icon"
                      :card="parentOption.card"
                      :label="item.label">
            <draggable :list="item.column"
                       :options="dragOptions"
                       :class="b('group')">
              <template v-if="vaildVisdiplay(column)"
                        v-for="(column,cindex) in item.column">
                <el-col :key="column.prop"
                        :md="column.span||12"
                        :xs="24"
                        :class="b('row',{'cursor':draggableStart})"
                        @mouseover.native="draggableMenu?mouseover(cindex):''"
                        @mouseout.native="draggableMenu?mouseout(cindex):''">
                  <div :class="b('option')"
                       v-if="optionIndex[cindex]">
                    <i class="el-icon-menu"
                       @click="optionMenu(column,cindex)"></i>
                    <i class="el-icon-delete"
                       @click="optionDelete(column,cindex)"></i>
                  </div>
                  <el-form-item :label="column.label"
                                :prop="column.prop"
                                :label-width="setPx(column.labelWidth,parentOption.labelWidth || 80)">
                    <el-tooltip :disabled="!column.tip"
                                :content="vaildData(column.tip,getPlaceholder(column))"
                                :placement="column.tipPlacement">
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
                                 :props="column.props || parentOption.props"
                                 :propsHttp="column.propsHttp ||parentOption.propsHttp"
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
                                 @change="column.cascader?handleChange(item.column,cindex):''"></component>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <div :class="b('line')"
                     :key="cindex"
                     :style="{width:(column.count/24*100)+'%'}"
                     v-if="!isMobile && column.row && column.span!==24 && column.count"></div>
              </template>
            </draggable>
          </avue-group>
        </div>
        <el-col :span="24"
                v-if="vaildData(parentOption.menuBtn,true)">
          <el-form-item :label-width="menuWidth">
            <!-- 菜单按钮组 -->
            <div :class="b('menu',[menuPostion])">
              <el-button type="primary"
                         @click="handleMock"
                         :size="controlSize"
                         icon="el-icon-edit-outline"
                         v-if="vaildData(parentOption.mock,false)">一键填充数据</el-button>
              <el-button type="primary"
                         @click="submit"
                         :size="controlSize"
                         icon="el-icon-check"
                         v-if="vaildData(parentOption.submitBtn,true)">{{vaildData(parentOption.submitText,'提 交')}}</el-button>
              <el-button icon="el-icon-delete"
                         :size="controlSize"
                         v-if="vaildData(parentOption.emptyBtn,true)"
                         @click="resetForm">{{vaildData(parentOption.emptyText,'清 空')}}</el-button>
              <slot name="menuForm"
                    :size="controlSize"></slot>
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
import { formInitVal, calcCount } from "core/dataformat";
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
      formOld: {},
      form: {},
      formList: [],
      formCascader: false,
      formCascaderInit: false,
      formCascaderList: [],
      formCreate: true,
      formDefault: {},
      formRules: {}
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
    parentOption() {
      let option = this.deepClone(this.tableOption);
      let group = option.group;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      delete option.column;
      return option;
    },
    //动态计算列的位置
    columnOption() {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        (ele.column || []).forEach((column, cindex) => {
          if (this.vaildData(column.visdiplay, true))
            column = calcCount(column, 12, cindex === 0);
          //处理级联地址
          if (!this.validatenull(column.cascaderItem)) {
            this.formCascaderList.push(column.prop);
            let cascader = [...column.cascaderItem];
            ele.column[cindex].cascader = [...cascader];
            cascader.forEach((item, tindex) => {
              const columnIndex = cindex + tindex + 1;
              ele.column[columnIndex].cascaderChange = column.cascaderChange;
              ele.column[columnIndex].cascader = [...cascader].splice(
                tindex + 1
              );
            });
          }
        });
      });
      return list;
    },
    draggable() {
      return this.parentOption.draggable || {};
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
      if (this.parentOption.menuPostion === "left") {
        return "";
      } else {
        return "0";
      }
    },
    menuPostion: function() {
      if (this.parentOption.menuPostion) {
        return this.parentOption.menuPostion;
      } else {
        return "center";
      }
    },
    boxType: function() {
      return this.parentOption.boxType;
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
    this.columnOption.forEach(ele => {
      this.rulesInit(ele.column);
    });
    // 初始化表单
    this.dataformat();
    //初始化字典
    this.columnOption.forEach(ele => {
      this.handleLoadDic(ele);
    });
    setTimeout(() => {
      this.formCascaderList.forEach(ele => {
        if (this.validatenull(this.form[ele])) {
          this.cascaderInit();
        }
      });
    }, 500);
  },
  methods: {
    cascaderInit() {
      if (this.formCascaderInit) return;
      this.columnOption.forEach((ele, index) => {
        const list = this.columnOption;
        if (!this.validatenull(ele.cascaderItem)) {
          let cascader = [...ele.cascaderItem];
          const str = list[index].cascader.join(",");
          //处理级联地址
          if (
            this.validatenull(this.form[ele.prop]) &&
            !this.validatenull(list[index].cascader) &&
            !this.formList.includes(str)
          ) {
            this.formList.push(str);
          }
          cascader.forEach((item, cindex) => {
            const columnIndex = index + cindex + 1;
            const str = list[columnIndex].cascader.join(",");
            if (
              this.validatenull(this.form[list[columnIndex].prop]) &&
              !this.validatenull(list[columnIndex].cascader) &&
              !this.formList.includes(str)
            ) {
              this.formList.push(str);
            }
          });
        }
      });
      this.formCascaderInit = true;
    },
    dataformat() {
      let formDefault = {};
      this.columnOption.forEach(ele => {
        formDefault = Object.assign(
          formInitVal(ele.column),
          this.deepClone(formDefault)
        );
      });
      this.formDefault = formDefault;
      this.form = this.deepClone(formDefault.tableForm);
      this.formVal();
    },

    handleChange(item, index) {
      const column = item[index];
      const columnNext = item[index + 1] || {};
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
        this.$nextTick(() => {
          this.$set(this.DIC, columnNextProp, res || []);
        });
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
    rulesInit(option) {
      this.formRules = {};
      (option || this.columnOption).forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
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

