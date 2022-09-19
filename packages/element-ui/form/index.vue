<template>
  <div :class="[b(),{'avue--detail':isDetail}]"
       :style="{width:setPx(parentOption.formWidth,'100%')}">
    <el-form ref="form"
             :status-icon="parentOption.statusIcon"
             @submit.native.prevent
             :model="form"
             :label-suffix="labelSuffix"
             :size="$AVUE.formSize || controlSize"
             :label-position="parentOption.labelPosition"
             :label-width="setPx(parentOption.labelWidth,labelWidth)">
      <el-row :span="24"
              :class="{'avue-form__tabs':isTabs}">
        <avue-group v-for="(item,index) in columnOption"
                    @change="handleGroupClick"
                    :key="item.prop"
                    :tabs="isTabs"
                    :arrow="item.arrow"
                    :collapse="item.collapse"
                    :display="vaildDisplay(item)"
                    :icon="item.icon"
                    :index="index"
                    :header="!isTabs"
                    :active="activeName"
                    :label="item.label">
          <el-tabs slot="tabs"
                   v-model="activeName"
                   @tab-click="handleTabClick"
                   :class="b('tabs')"
                   :type="tabsType"
                   v-if="isTabs&&index == 1">
            <template v-for="(tabs,index) in columnOption">
              <el-tab-pane v-if="vaildDisplay(tabs) && index!=0"
                           :key="index"
                           :name="index+''">
                <span slot="label">
                  <slot :name="getSlotName(tabs,'H')"
                        :column="column"
                        v-if="getSlotName(tabs,'H',$scopedSlots)"></slot>
                  <template v-else>
                    <i :class="tabs.icon">&nbsp;</i>
                    {{tabs.label}}
                  </template>
                </span>
              </el-tab-pane>
            </template>
          </el-tabs>
          <template slot="header"
                    v-if="getSlotName(item,'H',$scopedSlots)">
            <slot :name="getSlotName(item,'H')"
                  :column="item"></slot>
          </template>
          <div :class="b('group',{'flex':vaildData(item.flex,true)})"
               v-show="isGroupShow(item,index)">
            <template v-for="(column,cindex) in item.column">
              <el-col v-if="vaildDisplay(column)"
                      :key="cindex"
                      :style="{paddingLeft:gutter,paddingRight:gutter}"
                      :span="getSpan(column)"
                      :md="getSpan(column)"
                      :sm="column.smSpan || item.smSpan || 12"
                      :xs="column.xsSpan || item.xmSpan ||  24"
                      :offset="column.offset || item.offset"
                      :push="column.push || item.push"
                      :pull="column.pull || item.pull"
                      :class="[b('row'),{'avue--detail avue--detail__column':vaildDetail(column)},column.className]">
                <el-form-item :prop="column.prop"
                              :label="column.label"
                              :rules="column.rules"
                              :class="b('item--'+(column.labelPosition || item.labelPosition || ''))"
                              :label-position="column.labelPosition || item.labelPosition || parentOption.labelPosition"
                              :label-width="getLabelWidth(column,item)">
                  <template slot="label"
                            v-if="getSlotName(column,'L',$scopedSlots)">
                    <slot :name="getSlotName(column,'L')"
                          :column="column"
                          :value="form[column.prop]"
                          :readonly="column.readonly || readonly"
                          :disabled="getDisabled(column)"
                          :size="column.size || controlSize"
                          :dic="DIC[column.prop]"></slot>
                  </template>
                  <template slot="label"
                            v-else-if="column.labelTip">
                    <el-tooltip class="item"
                                effect="dark"
                                :placement="column.labelTipPlacement || 'top-start'">
                      <div slot="content"
                           v-html="column.labelTip"></div>
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <span> {{column.label}}{{labelSuffix}}</span>
                  </template>
                  <template slot="error"
                            slot-scope="scope"
                            v-if="getSlotName(column,'E',$scopedSlots)">
                    <slot :name="getSlotName(column,'E')"
                          v-bind="Object.assign(scope,{
                            column,
                            value:form[column.prop],
                            readonly:readonly || column.readonly,
                            disabled:getDisabled(column),
                            size:column.size || controlSize,
                            dic:DIC[column.prop]
                          })"></slot>
                  </template>
                  <component :is="validTip(column)?'div':'elTooltip'"
                             :disabled="validTip(column)"
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
                          v-if="$scopedSlots[column.prop]"></slot>
                    <form-temp :column="column"
                               v-else
                               :ref="column.prop"
                               :dic="DIC[column.prop]"
                               :props="parentOption.props"
                               :propsHttp="parentOption.propsHttp"
                               v-bind="$uploadFun(column)"
                               :disabled="getDisabled(column)"
                               :readonly="column.readonly || readonly"
                               :enter="parentOption.enter"
                               :size="parentOption.size"
                               v-model="form[column.prop]"
                               @enter="submit"
                               :column-slot="columnSlot"
                               @change="propChange(item.column,column)">
                      <template :slot="getSlotName(column,'T')"
                                slot-scope="scope"
                                v-for="item in getSlotName(column,'T',$scopedSlots)?[column]:[]">
                        <slot :name="getSlotName(item,'T')"
                              v-bind="scope"></slot>
                      </template>
                      <template v-for="item in columnSlot"
                                slot-scope="scope"
                                :slot="item">
                        <slot v-bind="scope"
                              :name="item"></slot>
                      </template>
                    </form-temp>
                  </component>
                </el-form-item>
              </el-col>
              <div :class="b('line')"
                   v-if="vaildDisplay(column)&&column.row && column.span!==24 && column.count"
                   :key="`line${cindex}`"
                   :style="{width:(column.count/24*100)+'%'}"></div>
            </template>
            <form-menu v-if="!isDetail&&!isMenu">
              <template slot-scope="scope"
                        slot="menuForm">
                <slot name="menuForm"
                      v-bind="scope"></slot>
              </template>
            </form-menu>
          </div>
        </avue-group>
        <form-menu v-if="!isDetail&&isMenu">
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
import { detail } from "core/detail";
import create from "core/create";
import init from "common/common/init";
import formTemp from 'common/components/form/index'
import { DIC_PROPS } from 'global/variable';
import { getComponent, getPlaceholder, formInitVal, calcCount, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import { filterParams, clearVal, getAsVal, setAsVal } from 'utils/util'
import mock from "utils/mock";
import formMenu from './menu'
export default create({
  name: "form",
  mixins: [init()],
  components: {
    formTemp,
    formMenu
  },
  props: {
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    status: {
      type: Boolean,
      default: false
    },
    isCrud: {
      type: Boolean,
      default: false
    },
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
      activeName: '',
      labelWidth: 90,
      allDisabled: false,
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      itemSpanDefault: 12,
      form: {},
      formCreate: false,
      formList: [],
      formBind: {},
    };
  },
  provide () {
    return {
      formSafe: this
    };
  },
  watch: {
    value: {
      handler (val) {
        if (this.formCreate) {
          this.setForm()
        }
      },
      deep: true
    },
    form: {
      handler (val) {
        if (this.formCreate) {
          this.setLabel()
          this.setVal()
        }
      },
      deep: true
    },
    tabsActive: {
      handler (val) {
        this.activeName = this.tabsActive
      },
      immediate: true
    },
    DIC: {
      handler () {
        this.setLabel()
      },
      deep: true,
      immediate: true
    },
    allDisabled: {
      handler (val) {
        this.$emit('update:status', val)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    columnSlot () {
      return Object.keys(this.$scopedSlots).filter(item => !this.propOption.map(ele => ele.prop).includes(item))
    },
    labelSuffix () {
      return this.parentOption.labelSuffix || ':'
    },
    isMenu () {
      return this.columnOption.length != 1
    },
    isDetail () {
      return this.detail === true
    },
    isTabs () {
      return this.parentOption.tabs === true;
    },
    isAdd () {
      return this.boxType === "add"
    },
    isEdit () {
      return this.boxType === "edit"
    },
    isView () {
      return this.boxType === "view"
    },
    gutter () {
      return this.setPx((this.parentOption.gutter || 10) / 2)
    },
    detail () {
      return this.parentOption.detail
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
        if (option.display !== false) {
          option.column.forEach(column => {
            list.push(column)
          });
        }
      });
      return list;
    },
    parentOption () {
      return this.tableOption || {};
    },
    columnOption () {
      let column = this.tableOption.column || []
      let group = this.deepClone(this.tableOption.group) || [];
      let footer = this.tableOption.footer || [];
      group.unshift({
        header: false,
        column: column
      })
      if (footer.length !== 0) {
        group.push({
          header: false,
          column: footer
        })
      }
      group.forEach((ele, index) => {
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
        ele.column = ele.column.sort((a, b) => (b.order || 0) - (a.order || 0))
      });
      return group;
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
  mounted () {
    setTimeout(() => {
      this.dataFormat()
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
    setForm () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
    },
    setVal () {
      this.$emit('input', this.form)
      this.$emit('change', this.form)
    },
    setLabel () {
      if (this.tableOption.filterNull === true) {
        this.form = filterParams(this.form, [''], false)
      }
      if (this.tableOption.filterDic == true) {
        this.form = filterParams(this.form, ['$'], false)
        return
      }
      this.propOption.forEach(column => {
        let result;
        let DIC = this.DIC[column.prop]
        if (this.validatenull(DIC)) return
        result = detail(this.form, column, this.tableOption, DIC);
        if (result) {
          this.$set(this.form, `$${column.prop}`, result);
        } else {
          this.$delete(this.form, `$${column.prop}`)
        }
      });
    },
    handleGroupClick (activeNames) {
      this.$emit('tab-click', activeNames)
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
    //对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.form.validateField(val);
    },
    validTip (column) {
      return !column.tip || column.type === 'upload'
    },
    getPropRef (prop) {
      return this.$refs[prop][0];
    },
    //初始化表单
    dataFormat () {
      let formDefault = formInitVal(this.propOption).tableForm;
      let form = {}
      Object.entries(Object.assign(formDefault, this.value)).forEach(ele => {
        let key = ele[0], value = ele[1]
        if (this.validatenull(this.value[key])) {
          form[key] = value
        } else {
          form[key] = this.value[key]
        }
      })
      this.$set(this, 'form', form)
      this.setControl()
      this.$emit('input', this.form)
      setTimeout(() => {
        this.formCreate = true
        this.clearValidate()
      })
    },
    setControl () {
      this.propOption.forEach(column => {
        let prop = column.prop
        let bind = column.bind
        let control = column.control
        let value = this.form
        if (!this.formBind[prop]) {
          if (bind) {
            this.$watch('form.' + prop, (n, o) => {
              if (n != o) setAsVal(this.form, bind, n);
            })
            this.$watch('form.' + bind, (n, o) => {
              if (n != o) this.$set(this.form, prop, n);
            })
            this.$set(this.form, prop, eval('value.' + bind));
          }
          if (control) {
            const callback = () => {
              let controlList = control(this.form[column.prop], this.form) || {};
              Object.keys(controlList).forEach(item => {
                let ele = Object.assign(this.objectOption[item] || {}, controlList[item])
                this.$set(this.objectOption, item, ele)
                if (controlList[item].dicData) this.DIC[item] = controlList[item].dicData
              })
            }
            this.$watch('form.' + prop, (n, o) => {
              callback()
            })
            callback()
          }
          this.formBind[prop] = true;
        }
      })
    },
    handleChange (list, column) {
      this.$nextTick(() => {
        const cascader = column.cascader;
        const str = cascader.join(",");
        cascader.forEach(item => {
          const columnNextProp = item;
          const value = this.form[column.prop];
          // 下一个节点
          const columnNext = this.findObject(list, columnNextProp)
          if (this.validatenull(columnNext)) return
          // 如果不是首次加载则清空全部关联节点的属性值和字典值
          if (this.formList.includes(str)) {
            //清空子类字典列表和值
            cascader.forEach(ele => {
              this.form[ele] = "";
              this.$set(this.DIC, ele, []);
            });
          }
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
          // 根据当前节点值获取下一个节点的字典
          sendDic({
            column: columnNext,
            value: value,
            form: this.form
          }).then(res => {
            //首次加载的放入队列记录
            if (!this.formList.includes(str)) this.formList.push(str);
            // 修改字典
            const dic = res || [];
            this.$set(this.DIC, columnNextProp, dic);
            if (!this.validatenull(dic) && !this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex) && this.validatenull(this.form[columnNextProp])) {
              this.form[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
            }
          });
        })
      })
    },
    handlePrint () {
      this.$Print(this.$el);
    },
    propChange (option, column) {
      if (column.cascader) this.handleChange(option, column)
    },
    handleMock () {
      if (!this.isMock) return
      this.columnOption.forEach(column => {
        const form = mock(column.column, this.DIC, this.form, this.isMock);
        if (!this.validatenull(form)) {
          Object.keys(form).forEach(ele => {
            this.form[ele] = form[ele];
          });

        }
      });
      this.$nextTick(() => {
        this.clearValidate();
        this.$emit('mock-change', this.form);
      })

    },
    vaildDetail (column) {
      let key;
      if (this.detail) return false;
      if (!this.validatenull(column.detail)) {
        key = 'detail';
      } else if (this.isAdd) {
        key = 'addDetail';
      } else if (this.isEdit) {
        key = 'editDetail';
      } else if (this.isView) {
        return false;
      }
      if (key) return this.vaildData(column[key], false)
      return false;
    },
    // 验证表单是否禁止
    vaildDisabled (column) {
      let key;
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        key = 'disabled';
      } else if (this.isAdd) {
        key = 'addDisabled'
      } else if (this.isEdit) {
        key = 'editDisabled'
      } else if (this.isView) {
        return true;
      }
      if (key) return this.vaildData(column[key], false)
      return false;

    },
    // 验证表单是否显隐
    vaildDisplay (column) {
      let key;
      if (!this.validatenull(column.display)) {
        key = 'display'
      } else if (this.isAdd) {
        key = 'addDisplay'
      } else if (this.isEdit) {
        key = 'editDisplay'
      } else if (this.isView) {
        key = 'viewDisplay'
      }
      if (key) return this.vaildData(column[key], true)
      return true;
    },
    clearValidate (list) {
      this.$refs.form.clearValidate(list);
    },
    validateCellForm () {
      return new Promise(resolve => {
        this.$refs.form.validate((valid, msg) => {
          resolve(msg)
        });
      })
    },
    validate (callback) {
      this.$refs.form.validate((valid, msg) => {
        let dynamicList = [];
        let dynamicName = [];
        let dynamicError = {};
        this.dynamicOption.forEach(ele => {
          let isForm = ele.children.type === 'form'
          dynamicName.push(ele.prop);
          if (isForm) {
            if (!this.validatenull(this.$refs[ele.prop][0].$refs.temp.$refs.main)) {
              this.$refs[ele.prop][0].$refs.temp.$refs.main.forEach(ele => {
                dynamicList.push(ele.validateCellForm());
              })
            }
          } else {
            dynamicList.push(this.$refs[ele.prop][0].$refs.temp.$refs.main.validateCellForm());
          }
        })
        Promise.all(dynamicList).then(res => {
          let count = 0;
          res.forEach((error, index) => {
            if (!this.validatenull(error)) {
              dynamicError[dynamicName[index]] = error;
            }
          })
          let result = Object.assign(dynamicError, msg);
          if (this.validatenull(result)) {
            this.show();
            callback(true, this.hide)
          } else {
            callback(false, this.hide, result)
          }

        })
      });
    },
    resetForm () {
      this.form = clearVal(this.form, (this.tableOption.filterParams || []).concat([this.rowKey]))
      this.$nextTick(() => {
        this.clearValidate()
        this.$emit("reset-change");
      })
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
          this.$emit("submit", filterParams(this.form), this.hide);
        } else {
          this.$emit("error", msg);
        }
      });
    }
  }
});
</script>

