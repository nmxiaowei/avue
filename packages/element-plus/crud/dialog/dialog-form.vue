<template>
  <component v-if="boxVisible"
             :is="dialogType"
             :draggable="validData(crud.tableOption.dialogDrag,config.dialogDrag)"
             :class="['avue-dialog',b('dialog'),this.crud.tableOption.dialogCustomClass]"
             :append-to-body="validData(crud.tableOption.dialogAppendToBody,true)"
             :top="dialogTop"
             :title="dialogTitle"
             :close-on-press-escape="crud.tableOption.dialogEscape"
             :close-on-click-modal="validData(crud.tableOption.dialogClickModal,false)"
             :modal="crud.tableOption.dialogModal"
             :show-close="crud.tableOption.dialogCloseBtn"
             v-model="boxVisible"
             v-bind="params"
             :before-close="hide">
    <template #header>
      <div :class="b('dialog__header')">
        <span class="el-dialog__title">{{dialogTitle}}</span>
        <div :class="b('dialog__menu')">
          <el-icon class='el-dialog__close'
                   @click="handleFullScreen">
            <component :is="fullscreen?'el-icon-copy-document':'el-icon-full-screen'" />
          </el-icon>
        </div>
      </div>
    </template>
    <avue-form v-model="crud.tableForm"
               v-model:status="disabled"
               ref="tableForm"
               @change="handleChange"
               @submit="handleSubmit"
               @reset-change="hide"
               @tab-click="handleTabClick"
               @error="handleError"
               v-bind="$uploadFun(null,crud)"
               v-loading="loading"
               :element-loading-text="crud.tableOption.loadingText"
               :element-loading-spinner="crud.tableOption.loadingSpinner"
               :element-loading-svg="crud.tableOption.loadingSvg"
               :element-loading-background="crud.tableOption.loadingBackground"
               :option="option">
      <!-- 循环form表单卡槽 -->
      <template v-for="item in crud.formSlot"
                #[getSlotName(item)]="scope">
        <slot :name="item"
              v-bind="Object.assign(scope,{type:boxType})"></slot>
      </template>
    </avue-form>
    <span class="avue-dialog__footer"
          :class="'avue-dialog__footer--'+dialogMenuPosition">
      <slot name="menu-form-before"
            v-bind="menuParams()"></slot>
      <el-button type="primary"
                 @click="($refs.tableForm || {}).handleMock"
                 :loading="disabled||loading"
                 :size="crud.size"
                 :icon="option.mockIcon"
                 v-if="validData(option.mockBtn,false) && !isView">
        {{option.mockText}}
      </el-button>
      <el-button v-if="validData(option.submitBtn,true) && !isView"
                 @click="submit"
                 :loading="disabled||loading"
                 :size="crud.size"
                 :icon="option.submitIcon"
                 type="primary">{{option.submitText}}</el-button>
      <el-button v-if="validData(option.emptyBtn,true) && !isView"
                 @click="reset"
                 :disabled="disabled||loading"
                 :size="crud.size"
                 :icon="option.emptyIcon">{{option.emptyText}}</el-button>
      <slot name="menu-form"
            v-bind="menuParams()"></slot>
    </span>
  </component>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import config from "../config";
import { filterParams } from 'utils/util'
export default create({
  name: "crud",
  mixins: [locale],
  emits: ['update:modelValue', 'change'],
  inject: ["crud"],
  data () {
    return {
      loading: false,
      disabled: false,
      config: config,
      boxType: "",
      fullscreen: false,
      boxVisible: false
    };
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    isView () {
      return this.boxType === 'view'
    },
    isAdd () {
      return this.boxType === 'add'
    },
    isEdit () {
      return this.boxType === 'edit'
    },
    width () {
      let dialogWidth = this.crud.tableOption.dialogWidth + ''
      let defaultWidth = this.crud.isMobile ? '100%' : config.dialogWidth;
      let result = this.validData(dialogWidth, defaultWidth);
      return this.setPx(result)
    },
    dialogType () {
      return this.isDrawer ? 'elDrawer' : 'elDialog'
    },
    dialogTop () {
      return (!this.isDrawer && !this.fullscreen) ? this.crud.tableOption.dialogTop : '0'
    },
    isDrawer () {
      return this.crud.tableOption.dialogType === 'drawer';
    },
    params () {
      let result = this.isDrawer ?
        {
          size: this.fullscreen ? '100%' : this.width,
          direction: this.crud.tableOption.dialogDirection
        } : {
          width: this.width,
          fullscreen: this.fullscreen
        };
      return Object.assign(result, this.$uploadFun({}, this.crud))
    },
    option () {
      let option = this.deepClone(this.crud.tableOption);
      option.boxType = this.boxType;
      option.column = this.deepClone(this.crud.propOption);
      option.column.forEach(ele => {
        delete ele.render
        if (ele.renderForm) ele.render = ele.renderForm
      })
      option.menuBtn = false;
      if (this.isAdd) {
        option.submitBtn = option.saveBtn;
        option.submitText = this.crud.menuIcon('saveBtn');
        option.submitIcon = this.crud.getBtnIcon('saveBtn')
      } else if (this.isEdit) {
        option.submitBtn = option.updateBtn;
        option.submitText = this.crud.menuIcon('updateBtn');
        option.submitIcon = this.crud.getBtnIcon('updateBtn')
      } else if (this.isView) {
        option.detail = true;
      }
      option.mockIcon = this.crud.getBtnIcon('mockBtn')
      option.mockText = this.crud.menuIcon('mockBtn')

      option.emptyBtn = option.cancelBtn;
      option.emptyIcon = this.crud.getBtnIcon('cancelBtn')
      option.emptyText = this.crud.menuIcon('cancelBtn')
      //不分组的表单不加载字典
      if (!this.crud.isGroup) {
        option.dicFlag = false;
        option.dicData = this.crud.DIC;
      }
      if (!this.validatenull(option.dicFlag)) {
        option.column.forEach(ele => {
          ele.boxType = this.boxType;
          ele.dicFlag = ele.dicFlag || option.dicFlag
        })
      }
      return option;
    },
    dialogTitle () {
      const key = `${this.boxType}`;
      if (!this.validatenull(this.boxType)) {
        return this.crud.tableOption[key + 'Title'] || this.t(`crud.${key}Title`);
      }
    },
    dialogMenuPosition () {
      return this.crud.tableOption.dialogMenuPosition || 'right'
    }
  },
  methods: {
    menuParams () {
      return {
        disabled: this.disabled,
        size: this.crud.size,
        type: this.boxType
      }
    },
    submit () {
      this.$refs.tableForm.submit()
    },
    reset () {
      this.$refs.tableForm.resetForm(false)
    },
    getSlotName (item) {
      return item.replace('-form', '')
    },
    handleChange () {
      this.crud.setVal()
    },
    handleTabClick (tab, event) {
      this.crud.$emit('tab-click', tab, event)
    },
    handleFullScreen () {
      if (this.fullscreen) {
        this.fullscreen = false;
      } else {
        this.fullscreen = true;
      }
    },
    handleError (error) {
      this.crud.$emit('error', error)
    },
    handleSubmit (form, hide) {
      if (this.isAdd) {
        this.rowSave(hide);
      } else if (this.isEdit) {
        this.rowUpdate(hide);
      }
    },
    initFun () {
      ['clearValidate', 'validate', 'resetForm', 'validateField'].forEach(ele => {
        this.crud[ele] = this.$refs.tableForm[ele]
      })
    },
    // 保存
    rowSave (hide) {
      this.crud.$emit(
        "row-save",
        filterParams(this.crud.tableForm, ['$']),
        this.closeDialog,
        hide
      );
    },
    // 更新
    rowUpdate (hide) {
      this.crud.$emit(
        "row-update",
        filterParams(this.crud.tableForm, ['$']),
        this.crud.tableIndex,
        this.closeDialog,
        hide
      );
    },
    closeDialog (row, index) {
      row = this.deepClone(row);
      const callback = () => {
        if (this.isEdit) {
          let { parentList, index } = this.crud.findData(row[this.crud.rowKey])
          if (parentList) {
            const oldRow = parentList.splice(index, 1)[0];
            row[this.crud.childrenKey] = oldRow[this.crud.childrenKey]
            parentList.splice(index, 0, row)
          }
        } else if (this.isAdd) {
          let { item } = this.crud.findData(row[this.crud.rowParentKey])
          if (item) {
            if (!item[this.crud.childrenKey]) {
              item[this.crud.childrenKey] = []
            }
            if (this.crud.tableOption.lazy) {
              item[this.crud.hasChildrenKey] = true
            }
            item[this.crud.childrenKey].push(row)
          } else {
            this.crud.list.push(row);
          }
        }
      }
      if (row) callback();
      this.hide();
    },
    // 隐藏表单
    hide (done) {
      const callback = () => {
        done && done();
        this.crud.tableIndex = -1;
        this.crud.tableForm = {}
        this.crud.setVal()
        this.boxVisible = false;
      };
      if (typeof this.crud.beforeClose === "function") {
        this.crud.beforeClose(callback, this.boxType);
      } else {
        callback();
      }
    },
    // 显示表单
    show (type) {
      this.boxType = type;
      const callback = (fn) => {
        this.fullscreen = this.crud.tableOption.dialogFullscreen
        this.boxVisible = true;
        this.loading = false
        this.$nextTick(() => {
          this.initFun()
          fn && fn()
        })
      };
      const loading = () => {
        callback(() => {
          this.loading = true
        });

      }
      if (typeof this.crud.beforeOpen === "function") {
        this.crud.beforeOpen(callback, this.boxType, loading);
      } else {
        callback();
      }
    }
  }
});
</script>
