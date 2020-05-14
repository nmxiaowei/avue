<template>
  <div :class="[b(),{'avue--view':isView,'avue--detail':isDetail}]"
       :style="{width:setPx(parentOption.formWidth,'100%')}">
    <el-form ref="form"
             status-icon
             @submit.native.prevent
             :model="form"
             :label-suffix="parentOption.labelSuffix || ':'"
             :label-position="parentOption.labelPosition"
             :size="$AVUE.formSize || controlSize"
             :label-width="setPx(parentOption.labelWidth,labelWidth)"
             :rules="formRules">
      <el-row :span="24"
              :class="{'avue-form__tabs':isTabs}">
        <avue-group v-for="(item,index) in columnOption"
                    :key="item.prop"
                    :tabs="isTabs"
                    :display="item.display"
                    :icon="item.icon"
                    :index="index"
                    :header="!isTabs"
                    :active="activeName"
                    :card="parentOption.card"
                    :label="item.label">
          <el-tabs slot="tabs"
                   v-model="activeName"
                   :class="b('tabs')"
                   :type="tabsType"
                   v-if="isTabs&&index == 1">
            <el-tab-pane v-for="(item,index) in columnOption"
                         v-if="!item.display && index!=0"
                         :key="index"
                         :name="index+''">
              <span slot="label">
                <slot :name="item.prop+'Header'"
                      v-if="$slots[item.prop+'Header']"></slot>
                <template v-else>
                  <i :class="item.icon">&nbsp;</i>
                  {{item.label}}
                </template>
              </span>
            </el-tab-pane>
          </el-tabs>
          <template slot="header"
                    v-if="$slots[item.prop+'Header']">
            <slot :name="item.prop+'Header'"></slot>
          </template>
          <div :class="b('group')"
               v-show="isGroupShow(item,index)">
            <template v-if="vaildDisplay(column)"
                      v-for="(column,cindex) in item.column">
              <el-col :key="column.prop"
                      :style="{paddingLeft:setPx((parentOption.gutter ||20)/2),paddingRight:setPx((parentOption.gutter ||20)/2)}"
                      :span="getSpan(column)"
                      :md="getSpan(column)"
                      :sm="12"
                      :xs="24"
                      :offset="column.offset || 0"
                      :class="[b('row'),{'avue--detail':vaildDetail(column)}]">
                <el-form-item :prop="column.prop"
                              :label="column.label"
                              :class="b('item--'+(column.labelPosition ||item.labelPosition || ''))"
                              :label-position="column.labelPosition"
                              :label-width="getLabelWidth(column,item)">
                  <template slot="label"
                            v-if="column.labelslot">
                    <slot :name="column.prop+'Label'"
                          :column="column"
                          :value="form[column.prop]"
                          :readonly="readonly || column.readonly"
                          :disabled="getDisabled(column)"
                          :size="column.size || controlSize"
                          :dic="DIC[column.prop]"></slot>
                  </template>
                  <template slot="error"
                            slot-scope="{error}"
                            v-if="column.errorslot">
                    <slot :name="column.prop+'Error'"
                          :column="column"
                          :error="error"
                          :value="form[column.prop]"
                          :readonly="readonly || column.readonly"
                          :disabled="getDisabled(column)"
                          :size="column.size || controlSize"
                          :dic="DIC[column.prop]"></slot>
                  </template>

                  <el-tooltip :disabled="!column.tip || column.type==='upload'"
                              :content="vaildData(column.tip,getPlaceholder(column))"
                              :placement="column.tipPlacement">
                    <slot :value="form[column.prop]"
                          :column="column"
                          :label="form['$'+column.prop]"
                          :size="column.size || controlSize"
                          :readonly="readonly || column.readonly"
                          :disabled="getDisabled(column)"
                          :dic="DIC[column.prop]"
                          :name="column.prop"
                          v-if="column.formslot"></slot>
                    <form-temp :column="column"
                               v-else
                               :dic="DIC[column.prop]"
                               :t="t"
                               :props="parentOption.props"
                               :propsHttp="parentOption.propsHttp"
                               :upload-before="uploadBefore"
                               :upload-after="uploadAfter"
                               :upload-delete="uploadDelete"
                               :upload-preview="uploadPreview"
                               :upload-error="uploadError"
                               :readonly="readonly || column.readonly"
                               :disabled="getDisabled(column)"
                               v-model="form[column.prop]"
                               :enter="parentOption.enter"
                               @enter="submit"
                               @change="column.cascader && handleChange(item.column,cindex)">
                      <template :slot="citem.prop"
                                slot-scope="scope"
                                v-for="citem in ((column.children || {}).column || [])">
                        <slot :row="scope.row"
                              :dic="scope.dic"
                              v-if="citem.slot"
                              :size="scope.size"
                              :name="citem.prop"
                              :label="scope.label"></slot>
                      </template>
                      <template :slot="column.prop+'Type'"
                                slot-scope="{item,label,value,node,data}"
                                v-if="column.typeslot">
                        <slot :name="column.prop+'Type'"
                              :item="item"
                              :node="node"
                              :data="data"
                              :value="value"
                              :label="label"></slot>
                      </template>
                    </form-temp>
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <div :class="b('line')"
                   :key="cindex"
                   :style="{width:(column.count/24*100)+'%'}"
                   v-if="column.row && column.span!==24 && column.count"></div>
            </template>
            <slot name="search"></slot>
            <form-menu v-if="!isDetail && !isMenu">
              <template slot-scope="scope"
                        slot="menuForm">
                <slot name="menuForm"
                      v-bind="scope"></slot>
              </template>
            </form-menu>
          </div>
        </avue-group>
        <form-menu v-if="!isDetail && isMenu">
          <template slot-scope="scope"
                    slot="menuForm">
            <slot name="menuForm"
                  v-bind="scope"></slot>
          </template>
        </form-menu>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import locale from "../../core/common/locale";
import { detail } from "core/detail";
import create from "core/create";
import init from "../../core/crud/init";
import formTemp from '../../core/components/form/index'
import { getComponent, getPlaceholder, formInitVal, calcCount, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import { filterDefaultParams, clearVal } from 'utils/util'
import mock from "utils/mock";
import formMenu from './menu'
export default create({
  name: "form",
  mixins: [init(), locale],
  components: {
    formTemp,
    formMenu
  },
  data () {
    return {
      activeName: '1',
      labelWidth: 90,
      allDisabled: false,
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
  provide () {
    return {
      formSafe: this
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
  computed: {
    isMenu () {
      return this.columnOption.length != 1
    },
    isDetail () {
      return this.option.detail
    },
    isAdd () {
      return this.boxType === "add"
    },
    isTabs () {
      return this.parentOption.tabs;
    },
    isEdit () {
      return this.boxType === "edit"
    },
    isView () {
      return this.boxType === "view"
    },
    disabled () {
      return this.parentOption.disabled
    },
    readonly () {
      return this.parentOption.readonly
    },
    tabsType () {
      return this.parentOption.tabsType;
    },
    propOption () {
      let list = [];
      this.columnOption.forEach(option => {
        option.column.forEach(column => {
          list.push(column);
        });
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
          column: option.column
        })
      }
      return option;
    },
    columnOption () {
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
      });;
      return list;
    },
    menuPosition: function () {
      if (this.parentOption.menuPosition) {
        return this.parentOption.menuPosition;
      } else {
        return "center";
      }
    },
    boxType: function () {
      return this.parentOption.boxType;
    },
    isPrint () {
      return this.vaildData(this.parentOption.printBtn, false)
    },
    isMock () {
      return this.vaildData(this.parentOption.mockBtn, false);
    },
    menuSpan () {
      return this.parentOption.menuSpan || 24;
    },
  },
  props: {
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  created () {
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
    getDisabled (column) {
      return this.vaildDetail(column) || this.isDetail || this.vaildDisabled(column) || this.allDisabled
    },
    getSpan (column) {
      return this.parentOption.span || column.span || this.itemSpanDefault
    },
    isGroupShow (item, index) {
      if (this.isTabs) {
        return index == this.activeName || index == 0
      } else {
        return true;
      }
    },
    forEachLabel () {
      this.columnOption.forEach(ele => {
        ele.column.forEach(column => {
          this.handleShowLabel(column, this.DIC[column.prop]);
        });
      });
    },
    getLabelWidth (column, item) {
      let result;
      if (!this.validatenull(column.labelWidth)) {
        result = column.labelWidth
      } else if (!this.validatenull(column.labelWidth)) {
        result = item.labelWidth
      } else {
        result = this.parentOption.labelWidth;
      }
      return this.setPx(result, this.labelWidth);
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
    //对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.form.validateField(val);
    },
    updateDic (prop, list) {
      const column = this.findObject(this.columnOption, prop);
      if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
        sendDic({
          url: column.dicUrl,
          formatter: column.dicFormatter,
          resKey: (column.props || {}).res
        }).then(list => {
          this.$set(this.DIC, prop, list);
        });
      } else {
        this.$set(this.DIC, prop, list);
      }
    },
    dataformat () {
      let formDefault = formInitVal(this.propOption);
      this.formDefault = formDefault;
      this.form = this.deepClone(formDefault.tableForm);
      this.formVal();
    },

    handleChange (item, index) {
      setTimeout(() => {
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
        sendDic({ url: (columnNext.dicUrl || '').replace("{{key}}", value), resKey: (columnNext.props || {}).res, formatter: columnNext.dicFormatter }).then(
          res => {
            const dic = Array.isArray(res) ? res : [];
            // 修改字典
            this.$set(this.DIC, columnNextProp, dic);
            //首次加载的放入队列记录
            if (!this.formList.includes(str)) this.formList.push(str);
          }
        );
      }, 0)
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
      this.forEachLabel();
      this.$emit("input", this.form);
    },
    handlePrint () {
      this.$Print({
        html: this.$el.innerHTML
      });
    },
    handleMock () {
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
        this.$emit('mock-change', this.form);
      }
    },
    vaildDetail (column) {
      if (this.detail) return true;
      if (!this.validatenull(column.detail)) {
        return this.vaildData(column.detail, false);
      } else if (this.isAdd) {
        return this.vaildData(column.addDetail, false);
      } else if (this.isEdit) {
        return this.vaildData(column.editDetail, false);
      } else if (this.isView) {
        return true;
      } else {
        return false;
      }
    },
    // 验证表单是否禁止
    vaildDisabled (column) {
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        return this.vaildData(column.disabled, false);
      } else if (this.isAdd) {
        return this.vaildData(column.addDisabled, false);
      } else if (this.isEdit) {
        return this.vaildData(column.editDisabled, false);
      } else if (this.isView) {
        return true;
      } else {
        return false;
      }
    },
    // 验证表单是否显隐
    vaildDisplay (column) {
      if (!this.validatenull(column.display)) {
        return this.vaildData(column.display, true);
      } else if (this.isAdd) {
        return this.vaildData(column.addDisplay, true);
      } else if (this.isEdit) {
        return this.vaildData(column.editDisplay, true);
      } else if (this.isView) {
        return this.vaildData(column.viewDisplay, true);
      } else {
        return true;
      }
    },
    rulesInit (option) {
      (option || this.columnOption).forEach(ele => {
        if (ele.rules && ele.display !== false)
          this.$set(this.formRules, ele.prop, ele.rules);
      });
      this.$nextTick(() => {
        this.clearValidate();
      });
    },
    clearValidate () {
      this.$refs.form.clearValidate();
    },
    validate () {
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
    resetForm () {
      this.resetFields();
      this.clearValidate();
      this.clearVal();
      this.$emit("input", this.form);
      this.$emit("reset-change");
    },
    clearVal () {
      this.form = clearVal(this.form)
    },
    resetFields () {
      this.$refs.form.resetFields();
    },
    validate (callback) {
      this.$refs["form"].validate(valid => callback(valid));
    },
    show () {
      this.allDisabled = true;
    },
    hide () {
      this.allDisabled = false;
    },
    submit () {
      this.validate(valid => {
        if (valid) {
          this.show();
          this.$emit("submit", filterDefaultParams(this.form, this.parentOption.translate), this.hide);
        }
        this.asyncValidator(this.formRules, this.form).then(() => {
        }).catch(err => {
          this.$emit("error", err);
        })
      });
    }
  }
});
</script>

