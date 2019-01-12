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
      <el-row :gutter="parentOption.gutter || 20"
              :span="24">
        <avue-group v-for="(item,index) in columnOption"
                    :key="item.prop"
                    :display="item.display"
                    :icon="item.icon"
                    :card="parentOption.card"
                    :label="item.label">
          <div :class="b('group')">
            <template v-if="vaildDisplay(column)"
                      v-for="(column,cindex) in item.column">
              <el-col :key="column.prop"
                      :md="column.span || itemSpanDefault"
                      :xs="24"
                      :offset="column.offset || 0"
                      :class="b('row')">

                <el-form-item :label="column.label"
                              :prop="column.prop"
                              :label-width="setPx(column.labelWidth,parentOption.labelWidth || 80)">
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
                               :dicUrl="column.dicUrl"
                               :dicMethod="column.dicMethod"
                               :dicQuery="column.dicQuery"
                               :disabled="vaildDisabled(column)"
                               :drag="column.drag"
                               :endPlaceholder="column.endPlaceholder"
                               :expand-trigger="column.expandTrigger"
                               :filter="column.filter"
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
                               @change="column.cascader?handleChange(item.column,cindex):''"></component>
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
import create from "core/create";
import init from "../../core/crud/init";
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
    columnOption() {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        ele.column = ele.column || [];
        // 循环列的全部属性
        ele.column.forEach((column, cindex) => {
          // 如果时级联放入数组中记录
          column.cascaderItem && this.formCascaderList.push(column.prop);
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
    // 规则初始化
    this.columnOption.forEach(ele => {
      this.rulesInit(ele.column);
    });
    //初始化字典
    this.columnOption.forEach(ele => {
      this.handleLoadDic(ele);
    });
    // 初始化表单
    this.dataformat();
    // 延迟判断级联框是否有值
    setTimeout(() => {
      this.formCascaderList.forEach(ele => {
        if (this.validatenull(this.form[ele])) {
          this.cascaderInit();
        }
      });
    }, 500);
  },
  methods: {
    //搜索指定的属性配置
    findColumnIndex(value) {
      let result = -1;
      this.columnOption.forEach(column => {
        result = this.findArray(column.column, value, "prop");
      });
      return result;
    },
    cascaderInit() {
      if (this.formCascaderInit) return;
      this.columnOption.forEach(column => {
        let list = column.column || [];
        list.forEach((ele, index) => {
          //如果没有级联配置跳过
          if (this.validatenull(ele.cascaderItem)) return;

          this.vaildFormList(list[index]);
          // 子节点级联处理
          ele.cascaderItem.forEach((item, cindex) => {
            const columnIndex = index + cindex + 1;
            this.vaildFormList(list[columnIndex]);
          });
        });
      });
      this.formCascaderInit = true;
    },
    //判断加入级联列
    vaildFormList(column) {
      const str = column.cascader.join(",");
      if (
        this.validatenull(this.form[column.prop]) &&
        !this.validatenull(column.cascader) &&
        !this.formList.includes(str)
      ) {
        this.formList.push(str);
      }
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
          if (
            column.cascaderChange &&
            !this.validatenull(dic) &&
            this.formList.includes(str)
          ) {
            //取字典的指定项或则第一项
            const dicvalue = dic[columnNext.defaultIndex || 0];
            this.form[columnNext.prop] =
              dicvalue[(columnNext.props || {}).value || "value"];
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
      this.formRules = {};
      (option || this.columnOption).forEach(ele => {
        if (ele.rules && ele.display !== false)
          this.formRules[ele.prop] = ele.rules;
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

