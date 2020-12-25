<template>
  <div :class="[b(),{'avue--view':isView,'avue--detail':isDetail}]"
       :style="{width:setPx(parentOption.formWidth,'100%')}">
    <el-form ref="form"
             :status-icon="parentOption.statusIcon"
             @submit.native.prevent
             :model="form"
             :label-suffix="parentOption.labelSuffix || ':'"
             :size="$AVUE.formSize || controlSize"
             :label-position="parentOption.labelPosition"
             :label-width="setPx(parentOption.labelWidth,labelWidth)"
             :rules="formRules">
      <el-row :span="24"
              :class="{'avue-form__tabs':isTabs}">
        <avue-group v-for="(item,index) in columnOption"
                    :key="item.prop"
                    :tabs="isTabs"
                    :arrow="item.arrow"
                    :collapse="item.collapse"
                    :display="item.display"
                    :icon="item.icon"
                    :index="index"
                    :header="!isTabs"
                    :active="activeName"
                    :card="parentOption.card"
                    :label="item.label">
          <el-tabs slot="tabs"
                   v-model="activeName"
                   @tab-click="handleTabClick"
                   :class="b('tabs')"
                   :type="tabsType"
                   v-if="isTabs&&index == 1">
            <template v-for="(item,index) in columnOption">
              <el-tab-pane v-if="vaildData(item.display,true) && index!=0"
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
            </template>
          </el-tabs>
          <template slot="header"
                    v-if="$slots[item.prop+'Header']">
            <slot :name="item.prop+'Header'"></slot>
          </template>
          <div :class="b('group',{'flex':vaildData(item.flex,true)})"
               v-show="isGroupShow(item,index)">
            <template v-for="(column,cindex) in item.column">
              <el-col v-if="vaildDisplay(column)"
                      :key="cindex"
                      :style="{paddingLeft:setPx((parentOption.gutter ||20)/2),paddingRight:setPx((parentOption.gutter ||20)/2)}"
                      :span="getSpan(column)"
                      :md="getSpan(column)"
                      :sm="12"
                      :xs="24"
                      :offset="column.offset || 0"
                      :class="[b('row'),{'avue--detail':vaildDetail(column)},column.className]">
                <el-form-item :prop="column.prop"
                              :label="column.label"
                              :class="b('item--'+(column.labelPosition || item.labelPosition || ''))"
                              :label-position="column.labelPosition || item.labelPosition || parentOption.labelPosition"
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
                               :ref="column.prop"
                               :dic="DIC[column.prop]"
                               :t="t"
                               :props="parentOption.props"
                               :propsHttp="parentOption.propsHttp"
                               v-bind="$uploadFun(column)"
                               :disabled="getDisabled(column)"
                               :enter="parentOption.enter"
                               :size="parentOption.size"
                               v-model="form[column.prop]"
                               @enter="submit"
                               @change="propChange(item.column,column)">
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
                   v-if="vaildDisplay(column)&&column.row && column.span!==24 && column.count"
                   :key="`line${cindex}`"
                   :style="{width:(column.count/24*100)+'%'}"></div>
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
import init from "../../core/common/init";
import formTemp from '../../core/components/form/index'
import { DIC_PROPS } from 'global/variable';
import { getComponent, getPlaceholder, formInitVal, calcCount, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import { filterDefaultParams, clearVal, getAsVal, setAsVal } from 'utils/util'
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
      activeName: '',
      labelWidth: 90,
      allDisabled: false,
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      itemSpanDefault: 12,
      bindList: {},
      form: {},
      formList: [],
      formCreate: false,
      formDefault: {},
      formVal: {}
    };
  },
  provide () {
    return {
      formSafe: this
    };
  },
  watch: {
    tabsActive: {
      handler (val) {
        this.activeName = this.tabsActive
      },
      immediate: true
    },
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
    columnLen () {
      return this.columnOption.length
    },
    dynamicOption () {
      let list = []
      this.propOption.forEach(ele => {
        if (ele.type == 'dynamic' && this.vaildDisplay(ele)) {
          list.push(ele)
        }
      })
      return list
    },
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
        // 循环列的全部属性
        ele.column.forEach((column, cindex) => {
          //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
          if (column.display !== false && !this.isMobile) {
            column = calcCount(column, this.itemSpanDefault, cindex === 0);
          }
        });
        //处理级联属性
        ele.column = calcCascader(ele.column);
        //根据order排序
        ele.column = ele.column.sort((a, b) => {
          return (b.order || 0) - (a.order || 0)
        })
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
    tabsActive () {
      return this.vaildData(this.tableOption.tabsActive + '', '1')
    },
    isMock () {
      return this.vaildData(this.parentOption.mockBtn, false);
    }
  },
  props: {
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    reset: {
      type: Boolean,
      default: true
    },
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
    getDisabled (column) {
      return this.vaildDetail(column) || this.isDetail || this.vaildDisabled(column) || this.allDisabled
    },
    getSpan (column) {
      return column.span || this.parentOption.span || this.itemSpanDefault
    },
    isGroupShow (item, index) {
      if (this.isTabs) {
        return index == this.activeName || index == 0
      } else {
        return true;
      }
    },
    forEachLabel () {
      this.propOption.forEach(column => {
        this.handleShowLabel(column, this.DIC[column.prop]);
      });
    },
    handleTabClick (tab, event) {
      this.$emit('tab-click', tab, event)
    },
    getLabelWidth (column, item) {
      let result;
      if (!this.validatenull(column.labelWidth)) {
        result = column.labelWidth
      } else if (!this.validatenull(item.labelWidth)) {
        result = item.labelWidth
      } else {
        result = this.parentOption.labelWidth;
      }
      return this.setPx(result, this.labelWidth);
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
    //对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.form.validateField(val);
    },
    getPropRef (prop) {
      return this.$refs[prop][0];
    },
    //初始化表单
    dataFormat () {
      this.formDefault = formInitVal(this.propOption);
      let value = this.deepClone(this.formDefault.tableForm);
      this.setForm(this.deepClone(Object.assign(value, this.formVal)))
    },
    setVal () {
      this.$emit("input", this.form);
      this.$emit("change", this.form);
    },
    //表单赋值
    setForm (value) {
      Object.keys(value).forEach(ele => {
        let result = value[ele];
        let column = this.propOption.find(column => column.prop == ele)
        this.$set(this.form, ele, result);
        if (!column) return
        let prop = column.prop
        let bind = column.bind
        if (bind && !this.bindList[prop]) {
          this.$watch('form.' + prop, (n, o) => {
            if (n != o) setAsVal(this.form, bind, n);
          })
          this.$watch('form.' + bind, (n, o) => {
            if (n != o) this.$set(this.form, prop, n);
          })
          this.$set(this.form, prop, eval('value.' + bind));
          this.bindList[prop] = true;
        }
      });
      this.forEachLabel();
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
          form: this.form
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
    handlePrint () {
      this.$Print({
        html: this.$el.innerHTML
      });
    },
    propChange (option, column) {
      if (column.cascader) this.handleChange(option, column)
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
    clearValidate (list) {
      this.$nextTick(() => {
        this.$refs.form.clearValidate(list);
      })
    },
    validate (callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let dynamicList = [];
          let dynamicError = [];
          const cb = () => {
            if (!this.validatenull(dynamicError)) {
              callback(false, dynamicError)
              return
            }
            this.show();
            callback(true, this.hide)
          }
          this.dynamicOption.forEach(ele => {
            dynamicError.push({
              field: ele.prop,
              label: ele.label,
              children: {}
            });
            dynamicList.push(this.$refs[ele.prop][0].$refs.temp.validate());
          })
          Promise.all(dynamicList).then(res => {
            let count = 0;
            res.forEach((err, index) => {
              let objKey = Object.keys(dynamicError);
              if (this.validatenull(err)) {
                dynamicError.splice(count, 1)
                return
              }
              count = count + 1;
              if (index == 0) {
                let count = Object.keys(err)[0]
                this.$message.error(`【${dynamicError[index].label}】第${Number(count) + 1}行:${err[count][0].message}`);
              }
              dynamicError[objKey[index]].children = err;
            })
            cb();
          })
        } else callback(valid, this.hide)
      });
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
    clearVal () {
      this.form = clearVal(this.form)
    },
    resetFields () {
      this.$refs.form.resetFields();
    },
    show () {
      this.allDisabled = true;
    },
    hide () {
      this.allDisabled = false;
    },
    submit () {
      this.validate((valid, msg) => {
        if (valid) {
          this.$emit("submit", filterDefaultParams(this.form, this.parentOption.translate), this.hide);
        } else {
          this.$emit("error", msg);
        }
      });
    }
  }
});
</script>

