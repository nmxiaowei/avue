<template>
  <div :class="[b(),{'avue--detail':isDetail}]"
       :style="{width:setPx(tableOption.formWidth,'100%')}">
    <el-form ref="form"
             :status-icon="tableOption.statusIcon"
             @submit.prevent
             :model="form"
             :scroll-to-error="tableOption.scrollToError"
             :hide-required-asterisk="tableOption.hideRequiredAsterisk"
             :require-asterisk-position="tableOption.requireAsteriskPosition"
             :scroll-into-view-options="tableOption.scrollIntoViewOptions"
             :label-suffix="labelSuffix"
             :size="size"
             :label-position="tableOption.labelPosition"
             :label-width="setPx(tableOption.labelWidth,config.labelWidth)">
      <el-row :span="24"
              :gutter="tableOption.gutter"
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
          <template #tabs>
            <el-tabs v-model="activeName"
                     @tab-click="handleTabClick"
                     :class="b('tabs')"
                     :type="tabsType"
                     v-if="isTabs&&index == 1">
              <template v-for="(tabs,index) in columnOption">
                <el-tab-pane v-if="vaildDisplay(tabs) && index!=0"
                             :key="index"
                             :name="index+''">
                  <template #label>
                    <span>
                      <slot :name="getSlotName(tabs,'H')"
                            :column="tabs"
                            v-if="getSlotName(tabs,'H',$slots)"></slot>
                      <template v-else>
                        <i :class="tabs.icon">&nbsp;</i>
                        {{tabs.label}}
                      </template>
                    </span>
                  </template>
                </el-tab-pane>
              </template>
            </el-tabs>
          </template>
          <template #header
                    v-if="getSlotName(item,'H',$slots)">
            <slot :name="getSlotName(item,'H')"
                  :column="item"></slot>
          </template>
          <div :class="b('group',{'flex':validData(item.flex,true)})"
               v-if="isGroupShow(item,index,isVerifyAll)"
               v-show="isGroupShow(item,index)">
            <template v-for="(column,cindex) in item.column">
              <el-col v-if="vaildDisplay(column)"
                      :key="cindex"
                      :span="getItemParams(column,item,'span')"
                      :md="getItemParams(column,item,'span')"
                      :sm="getItemParams(column,item,'span')"
                      :xs="getItemParams(column,item,'xsSpan')"
                      :offset="getItemParams(column,item,'offset')"
                      :push="getItemParams(column,item,'push')"
                      :pull="getItemParams(column,item,'pull')"
                      :class="[b('row'),{'avue--detail avue--detail__column':vaildDetail(column)},column.className]">
                <el-form-item :prop="column.prop"
                              :label="column.label"
                              :rules="column.rules"
                              :class="b('item--'+(column.labelPosition || item.labelPosition || ''))"
                              :label-position="column.labelPosition || item.labelPosition || tableOption.labelPosition"
                              :label-width="getItemParams(column,item,'labelWidth',true)">
                  <template #label
                            v-if="getSlotName(column,'L',$slots)">
                    <slot :name="getSlotName(column,'L')"
                          :column="column"
                          :value="form[column.prop]"
                          :readonly="column.readonly || readonly"
                          :disabled="getDisabled(column)"
                          :size="column.size || size"
                          :dic="DIC[column.prop]"></slot>
                  </template>
                  <template #label
                            v-else-if="column.labelTip">
                    <el-tooltip class="item"
                                effect="dark"
                                :placement="column.labelTipPlacement || 'top-start'">
                      <template #content>
                        <div v-html="column.labelTip"></div>
                      </template>
                      <el-icon>
                        <el-icon-info-filled />
                      </el-icon>
                    </el-tooltip>
                    <span> {{column.label}}{{labelSuffix}}</span>
                  </template>
                  <template #error="scope"
                            v-if="getSlotName(column,'E')">
                    <slot :name="getSlotName(column,'E')"
                          v-bind="Object.assign(scope,{
                            column,
                            value:form[column.prop],
                            readonly:column.readonly || readonly,
                            disabled:getDisabled(column),
                            size:column.size || size,
                            dic:DIC[column.prop]
                          })"></slot>
                  </template>
                  <component :is="validTip(column)?'div':'elTooltip'"
                             :disabled="validTip(column)"
                             :content="validData(column.tip,getPlaceholder(column))"
                             :placement="column.tipPlacement">
                    <div>
                      <slot :value="form[column.prop]"
                            :column="column"
                            :label="form['$'+column.prop]"
                            :size="column.size || size"
                            :readonly="column.readonly|| readonly"
                            :disabled="getDisabled(column)"
                            :dic="DIC[column.prop]"
                            :name="column.prop"
                            v-if="$slots[column.prop]"></slot>
                      <form-temp :column="column"
                                 v-else
                                 :box-type="boxType"
                                 :ref="column.prop"
                                 :dic="DIC[column.prop]"
                                 :props="tableOption.props"
                                 :propsHttp="tableOption.propsHttp"
                                 :render="column.render"
                                 :row="form"
                                 :table-data="tableData"
                                 :readonly="column.readonly || readonly"
                                 v-bind="$uploadFun(column)"
                                 :disabled="getDisabled(column)"
                                 :enter="tableOption.enter"
                                 :size="size"
                                 v-model="form[column.prop]"
                                 @enter="submit"
                                 :column-slot="columnSlot"
                                 @change="propChange(item.column,column)">
                        <template #="scope"
                                  v-if="getSlotName(column,'T',$slots)">
                          <slot :name="getSlotName(column,'T')"
                                v-bind="scope"></slot>
                        </template>
                        <template v-for="item in columnSlot"
                                  #[item]="scope">
                          <slot v-bind="scope"
                                :name="item"></slot>
                        </template>
                      </form-temp>
                    </div>
                  </component>
                </el-form-item>
              </el-col>
              <div :class="b('line')"
                   v-if="vaildDisplay(column)&&column.row && column.span!==24 && column.count"
                   :key="`line${cindex}`"
                   :style="{width:(column.count/24*100)+'%'}"></div>
            </template>
            <form-menu v-if="!isMenu">
              <template #menu-form-before="scope">
                <slot name="menu-form-before"
                      v-bind="scope"></slot>
              </template>
              <template #menu-form="scope">
                <slot name="menu-form"
                      v-bind="scope"></slot>
              </template>
            </form-menu>
          </div>
        </avue-group>
        <form-menu v-if="isMenu">
          <template #menu-form="scope">
            <slot name="menu-form"
                  v-bind="scope"></slot>
          </template>
        </form-menu>
      </el-row>
    </el-form>
  </div>
</template>

<script>
let count = {}
import { detail } from "core/detail";
import create from "core/create";
import init from "common/common/init";
import formTemp from 'common/components/form/index'
import formMenu from './menu'
import { DIC_PROPS } from 'global/variable';
import { getComponent, getPlaceholder, formInitVal, calcCount, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
import { getColumn, filterParams, clearVal, getAsVal, blankVal, setAsVal } from 'utils/util'
import mock from "utils/mock";
import config from "./config.js";
export default create({
  name: "form",
  mixins: [init('form')],
  emits: [
    'update:modelValue',
    'update:status',
    'reset-change',
    'mock-change',
    'tab-click',
    'submit',
    'error'
  ],
  components: {
    formTemp,
    formMenu
  },
  data () {
    return {
      config,
      activeName: '',
      allDisabled: false,
      tableOption: {},
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
    modelValue: {
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
    size () {
      return this.tableOption.size || this.$AVUE.formSize || this.$AVUE.size;
    },
    columnSlot () {
      return Object.keys(this.$slots).filter(item => !this.propOption.map(ele => ele.prop).includes(item))
    },
    labelSuffix () {
      return this.tableOption.labelSuffix || ':'
    },
    isMenu () {
      return this.columnOption.length != 1
    },
    isDetail () {
      return this.detail === true
    },
    isAdd () {
      return ['parentAdd', 'add'].includes(this.boxType)
    },
    isTabs () {
      return this.tableOption.tabs === true;
    },
    isEdit () {
      return this.boxType === "edit"
    },
    isView () {
      return this.boxType === "view"
    },
    detail () {
      return this.tableOption.detail
    },
    disabled () {
      return this.tableOption.disabled
    },
    readonly () {
      return this.tableOption.readonly
    },
    tabsType () {
      return this.tableOption.tabsType;
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
          option.column.forEach(column => list.push(column));
        }
      });
      return list;
    },
    columnOption () {
      const detail = (list) => {
        list.forEach((ele, index) => {
          ele.column = getColumn(ele.column) || []
          // 循环列的全部属性
          ele.column.forEach((column, cindex) => {
            //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
            if (column.display !== false && !this.isMobile) {
              column = calcCount(column, this.config.span, cindex === 0);
            }
          });
          //处理级联属性
          ele.column = calcCascader(ele.column);
          //根据order排序
          ele.column = ele.column.sort((a, b) => (b.order || 0) - (a.order || 0))
        });
      }
      let tableOption = this.tableOption
      let column = getColumn(tableOption.column)
      let group = tableOption.group || [];
      let footer = tableOption.footer || [];
      let firstGroup = [], footerGroup = []
      firstGroup = [{
        header: false,
        column: column
      }]
      detail(firstGroup)
      detail(group)
      if (footer.length !== 0) {
        footerGroup = [{
          header: false,
          column: footer
        }]
        detail(footerGroup)
      }
      return firstGroup.concat(group).concat(footerGroup)
    },
    menuPosition: function () {
      if (this.tableOption.menuPosition) {
        return this.tableOption.menuPosition;
      } else {
        return "center";
      }
    },
    boxType: function () {
      return this.tableOption.boxType;
    },
    isPrint () {
      return this.validData(this.tableOption.printBtn, false)
    },
    tabsActive () {
      return this.validData(this.tableOption.tabsActive + '', '1')
    },
    isMock () {
      return this.validData(this.tableOption.mockBtn, false);
    },
    isVerifyAll () {
      return this.validData(this.tableOption.tabsVerifyAll, true);
    },
    menuSpan () {
      return this.tableOption.menuSpan || 24;
    }
  },
  props: {
    uploadSized: Function,
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
    modelValue: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
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
    isGroupShow (item, index, verifyAll) {
      if (verifyAll) return true
      else if (this.isTabs) {
        return index == this.activeName || index == 0
      } else {
        return true;
      }
    },

    dataFormat () {
      let formDefault = formInitVal(this.propOption);
      let formValue = this.modelValue
      let form = {}
      Object.entries(Object.assign(formDefault, formValue)).forEach(ele => {
        let key = ele[0], value = ele[1]
        if (this.validatenull(formValue[key])) {
          form[key] = value
        } else {
          form[key] = formValue[key]
        }
      })
      this.form = form;
      this.setLabel()
      this.setControl()
      this.setVal()
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
        if (!this.formBind[prop]) {
          let bindList = [];
          if (bind) {
            let formProp = this.$watch('form.' + prop, (n, o) => {
              setAsVal(this.form, bind, n);
            })
            let formDeep = this.$watch('form.' + bind, (n, o) => {
              this.form[prop] = n
            })
            bindList.push(formProp)
            bindList.push(formDeep)
            this.form[prop] = getAsVal(this.form, bind)
          }
          if (control) {
            const callback = () => {
              const controlResolve = (list) => {
                Object.keys(list).forEach(item => {
                  let ele = Object.assign(this.objectOption[item] || {}, list[item])
                  this.objectOption[item] = ele;
                  if (list[item].dicData) this.DIC[item] = list[item].dicData
                })
              }
              let result = this.form['$' + column.prop] || this.form[column.prop]
              let controlList = control(this.form[column.prop], this.form, result, column) || {};
              if (controlList instanceof Promise) {
                controlList.then(res => {
                  controlResolve(res)
                })
              } else {
                controlResolve(controlList)
              }
            }
            let formControl = this.$watch('form.' + prop, (n, o) => {
              callback()
            })
            bindList.push(formControl)
            callback()
          }
          this.formBind[prop] = bindList;
        }
      })
    },
    setForm () {
      Object.keys(this.modelValue).forEach(ele => {
        this.form[ele] = this.modelValue[ele]
      });
    },
    setVal () {
      this.$emit('update:modelValue', this.form)
      this.$emit('change', this.form)
    },
    setLabel () {
      if (this.tableOption.filterNull === true) {
        this.form = filterParams(this.form, [''], false)
      }
      if (this.tableOption.filterDic == true) {
        this.form = filterParams(this.form, ['$'], false)
      } else {
        this.propOption.forEach(column => {
          let result;
          let DIC = this.DIC[column.prop]
          if (this.validatenull(DIC)) return
          result = detail(this.form, column, this.tableOption, DIC);
          if (result) {
            this.form[`$${column.prop}`] = result;
          } else {
            delete this.form[`$${column.prop}`]
          }
        });
      }
    },
    handleGroupClick (activeNames) {
      this.$emit('tab-click', activeNames)
    },
    handleTabClick (tab, event) {
      this.$emit('tab-click', tab, event)
    },
    getItemParams (column, item, type, isPx) {
      let result;
      if (!this.validatenull(column[type])) {
        result = column[type]
      } else if (!this.validatenull(item[type])) {
        result = item[type]
      } else {
        result = this.tableOption[type];
      }
      result = this.validData(result, this.config[type])
      return isPx ? this.setPx(result) : result
    },
    //对部分表单字段进行校验的方法
    validateField (val, fn) {
      return this.$refs.form.validateField(val, fn);
    },
    scrollToField (val) {
      return this.$refs.form.scrollToField(val);
    },
    validTip (column) {
      return !column.tip || column.type === 'upload'
    },
    getPropRef (prop) {
      return this.$refs[prop][0];
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
              this.form[ele] = blankVal(this.form[ele])
              this.DIC[ele] = []
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
          }, this).then(res => {
            //首次加载的放入队列记录
            if (!this.formList.includes(str)) this.formList.push(str);
            // 修改字典
            const dic = res || [];
            this.DIC[columnNextProp] = dic
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
      let key = column.prop
      if (!count[key]) {
        if (column.cascader) this.handleChange(option, column)
      }
      count[key] = true
      this.$nextTick(() => count[key] = false)
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
      return this.validData(column[key], false)

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
      return this.validData(column[key], false)
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
      } else {
        return true;
      }
      return this.validData(column[key], true)
    },
    clearValidate (list) {
      if (this.$refs.form) this.$refs.form.clearValidate(list);
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
            callback && callback(true, this.hide, result)
          } else {
            callback && callback(false, this.hide, result)
          }

        })
      });
    },
    resetForm (reset = true) {
      if (reset) {
        let propList = this.propOption.map(ele => ele.prop)
        this.form = clearVal(this.form, propList, (this.tableOption.filterParams || []).concat([this.rowKey]))
      }
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
      this.validate((valid, hide, msg) => {
        if (valid) {
          this.$emit("submit", filterParams(this.form, ['$']), this.hide);
        } else {
          this.$emit("error", msg);
        }
      });
    }
  },
  unmounted () {
    Object.keys(this.formBind).forEach(ele => {
      this.formBind[ele].forEach(unWatch => {
        unWatch()
      })
    })
  }
});
</script>

