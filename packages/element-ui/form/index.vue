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
      <el-row :span="24">
        <avue-group v-for="(item,index) in columnOption"
                    :key="item.prop"
                    :display="item.display"
                    :icon="item.icon"
                    :card="parentOption.card"
                    :label="item.label">
          <template slot="header"
                    v-if="$slots[item.prop+'Header']">
            <slot :name="item.prop+'Header'"></slot>
          </template>
          <div :class="b('group')">
            <template v-if="vaildDisplay(column)"
                      v-for="(column,cindex) in item.column">
              <el-col :key="column.prop"
                      :style="{paddingLeft:setPx((parentOption.gutter ||20)/2),paddingRight:setPx((parentOption.gutter ||20)/2)}"
                      :md="column.span || itemSpanDefault"
                      :xs="24"
                      :offset="column.offset || 0"
                      :class="b('row')">
                <el-form-item :label="column.label"
                              :prop="column.prop"
                              :class="b('item--'+(column.labelPosition ||item.labelPosition || ''))"
                              :label-width="getLabelWidth(column,item)">
                  <el-tooltip :disabled="!column.tip || column.type==='upload'"
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
                               :accordion="column.accordion"
                               :typeslot="column.typeslot"
                               :appendClick="column.appendClick"
                               :border="column.border"
                               :change="column.change"
                               :changeoOnSelect="column.changeoOnSelect"
                               :checked="column.checked"
                               :clearable="column.clearable"
                               :changeOnSelect="column.changeOnSelect"
                               :click="column.click"
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
                               :disabled="vaildDisabled(column)"
                               :drag="column.drag"
                               :endPlaceholder="column.endPlaceholder"
                               :expand-trigger="column.expandTrigger"
                               :filter="column.filter"
                               :blur="column.blur"
                               :focus="column.focus"
                               :tpyeformat="column.tpyeformat"
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
                               v-model="form[column.prop]"
                               @change="column.cascader?handleChange(item.column,cindex):''">
                      <template :slot="column.prop+'Type'"
                                slot-scope="{item,label,value}"
                                v-if="column.typeslot">
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
                   :key="cindex"
                   :style="{width:(column.count/24*100)+'%'}"
                   v-if="column.row && column.span!==24 && column.count"></div>
            </template>
          </div>
        </avue-group>

        <el-col :span="24"
                v-if="vaildData(parentOption.menuBtn,true)">
          <el-form-item>
            <!-- 菜单按钮组 -->
            <div :class="b('menu',[menuPostion])">
              <el-button type="primary"
                         @click="handleMock"
                         :size="controlSize"
                         icon="el-icon-edit-outline"
                         v-if="isMock">填充数据</el-button>
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
import { detail } from "core/detail";
import create from "core/create";
import init from "../../core/crud/init";
import { getComponent, getPlaceholder } from "core/dataformat";
import { formInitVal, calcCount, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import mock from "utils/mock";
export default create({
  name: "form",
  mixins: [init()],
  data() {
    return {
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      itemSpanDefault: 12,
      formOld: {},
      form: {},
      formList: [],
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
    propOption() {
      let list = [];
      this.columnOption.forEach(option => {
        option.column.forEach(column => {
          list.push(column);
        });
      });
      return list;
    },
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
    columnOption() {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        ele.column = ele.column || [];
        // 循环列的全部属性
        ele.column.forEach((column, cindex) => {
          //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
          if (column.display !== false && !this.isMobile) {
            column = calcCount(column, this.itemSpanDefault, cindex === 0);
          }
        });
        //处理级联属性
        ele.column = calcCascader(ele.column);
      });
      return list;
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
    },
    isMock() {
      return this.vaildData(this.parentOption.mock, false);
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
    this.columnOption.forEach(ele => {
      this.handleLoadDic(ele).then(res => {
        this.forEachLabel();
      });
    });
    // 初始化表单
    this.dataformat();
  },
  methods: {
    getComponent,
    getPlaceholder,
    forEachLabel() {
      this.columnOption.forEach(ele => {
        ele.column.forEach(column => {
          this.handleShowLabel(column, this.DIC[column.prop]);
        });
      });
    },
    getLabelWidth(column, item) {
      const result =
        column.labelWidth || item.labelWidth || this.parentOption.labelWidth;
      return this.setPx(result);
    },
    //获取全部字段字典的label
    handleShowLabel(column, DIC) {
      let result = "";
      if (!this.validatenull(DIC)) {
        result = detail(this.form, column, this.tableOption, DIC);
        this.$set(this.form, ["$" + column.prop], result);
      }
      return result;
    },
    //对部分表单字段进行校验的方法
    validateField(val) {
      return this.$refs.form.validateField(val);
    },
    //搜索指定的属性配置
    findColumnIndex(value) {
      let result = -1;
      this.columnOption.forEach(column => {
        result = this.findArray(column.column, value, "prop");
      });
      return result;
    },
    updateDic(prop, list) {
      this.$set(this.DIC, prop, list);
    },
    dataformat() {
      let formDefault = formInitVal(this.propOption);
      this.formDefault = formDefault;
      this.form = this.deepClone(formDefault.tableForm);
      this.formVal();
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
        this.$set(this.form, ele, this.value[ele]);
      });
      this.forEachLabel();
      this.$emit("input", this.form);
    },
    handleMock() {
      if (this.isMock) {
        this.columnOption.forEach(column => {
          const form = mock(column.column, this.DIC, this.form, this.isMock);
          if (!this.validatenull(form)) {
            Object.keys(form).forEach(ele => {
              this.form[ele] = form[ele];
            });
            this.clearValidate();
          }
        });
        this.$message.success("模拟数据填充成功");
      }
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
    vaildDisplay(column) {
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
    rulesInit(option) {
      (option || this.columnOption).forEach(ele => {
        if (ele.rules && ele.display !== false)
          this.$set(this.formRules, ele.prop, ele.rules);
      });
      this.$nextTick(() => {
        this.clearValidate();
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
    /**
     * 清空表单字段
     * @param part:true 清空在column中字段,否则清空全部
     */
    resetForm(params = {}) {
      const part = params.part;
      if (part) {
        this.columnOption.forEach(ele => {
          ele.column.forEach(column => {
            const prop = column.prop;
            this.form[prop] = this.formDefault.tableForm[prop];
          });
        });
      } else {
        this.form = this.deepClone(this.formDefault.tableForm);
      }
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

