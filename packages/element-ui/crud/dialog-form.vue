<template>
  <div v-if="boxVisible">
    <component :is="dialogType"
               lock-scroll
               :destroy-on-close="crud.tableOption.dialogDestroy"
               :wrapperClosable="crud.tableOption.dialogClickModal"
               :direction="direction"
               v-dialogDrag="vaildData(crud.tableOption.dialogDrag,config.dialogDrag)"
               :class="['avue-dialog',b('dialog'),{'avue-dialog--fullscreen':fullscreen}]"
               :custom-class="crud.tableOption.dialogCustomClass"
               :modal-append-to-body="vaildData(crud.tableOption.dialogModalAppendToBody,$AVUE.modalAppendToBody)"
               :append-to-body="vaildData(crud.tableOption.appendToBody,$AVUE.appendToBody)"
               :top="dialogTop"
               :title="dialogTitle"
               :close-on-press-escape="crud.tableOption.dialogEscape"
               :close-on-click-modal="vaildData(crud.tableOption.dialogClickModal,false)"
               :modal="crud.tableOption.dialogModal"
               :show-close="crud.tableOption.dialogCloseBtn"
               :visible.sync="boxVisible"
               v-bind="params"
               :before-close="hide">
      <div slot="title"
           :class="b('dialog__header')">
        <span class="el-dialog__title">{{dialogTitle}}</span>
        <div :class="b('dialog__menu')">
          <i @click="handleFullScreen"
             :class="fullscreen?'el-icon-news':'el-icon-full-screen'"
             class="el-dialog__close"></i>
        </div>
      </div>
      <avue-form v-model="crud.tableForm"
                 ref="tableForm"
                 :status.sync="disabled"
                 @change="handleChange"
                 @submit="handleSubmit"
                 @reset-change="hide"
                 @tab-click="handleTabClick"
                 @error="handleError"
                 v-bind="$uploadFun({},crud)"
                 :option="option">
        <template slot-scope="scope"
                  v-for="item in crud.formSlot"
                  :slot="getSlotName(item)">
          <slot :name="item"
                v-bind="Object.assign(scope,{
                    type:boxType
                  }) "></slot>
        </template>
      </avue-form>
      <span class="avue-dialog__footer"
            :class="'avue-dialog__footer--'+dialogMenuPosition">
        <el-button v-if="vaildData(option.submitBtn,true) && !isView"
                   @click="submit"
                   :disabled="disabled"
                   :size="crud.controlSize"
                   :icon="option.submitIcon"
                   type="primary">{{option.submitText}}</el-button>
        <el-button v-if="vaildData(option.emptyBtn,true) && !isView"
                   @click="reset"
                   :disabled="disabled"
                   :size="crud.controlSize"
                   :icon="option.emptyIcon">{{option.emptyText}}</el-button>
        <slot name="menuForm"
              :disabled="disabled"
              :size="crud.controlSize"
              :type="boxType"></slot>
      </span>
    </component>
  </div>

</template>

<script>
import create from "core/create";
import locale from "core/locale";
import config from "./config";
import { filterParams } from 'utils/util'
export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      disabled: false,
      config: config,
      boxType: "",
      fullscreen: false,
      size: null,
      boxVisible: false
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    option () {
      let option = this.deepClone(this.crud.tableOption);
      option.boxType = this.boxType;
      option.column = this.deepClone(this.crud.propOption);
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
      option.emptyBtn = option.cancelBtn;
      option.emptyText = this.crud.menuIcon('cancelBtn')
      option.emptyIcon = this.crud.getBtnIcon('cancelBtn')
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
    isView () {
      return this.boxType === 'view'
    },
    isAdd () {
      return this.boxType === 'add'
    },
    isEdit () {
      return this.boxType === 'edit'
    },
    direction () {
      return this.crud.tableOption.dialogDirection
    },
    width () {
      return this.vaildData(this.crud.tableOption.dialogWidth + '', this.crud.isMobile ? '100%' : config.dialogWidth + '')
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
      return this.isDrawer ?
        {
          size: this.fullscreen ? '100%' : this.width,
          direction: this.crud.tableOption.dialogDirection
        } : {
          width: this.width,
          fullscreen: this.fullscreen
        };
    },
    dialogTitle () {
      const key = `${this.boxType}`;
      if (!this.validatenull(this.boxType)) {
        return this.crud.tableOption[key + 'Title'] || this.t(`crud.${key}Title`);
      }
    },
    dialogMenuPosition () {
      return this.crud.option.dialogMenuPosition || 'right'
    }
  },
  methods: {
    submit () {
      this.$refs.tableForm.submit()
    },
    reset () {
      this.$refs.tableForm.resetForm()
    },
    getSlotName (item) {
      return item.replace('Form', '')
    },
    initFun () {
      ['clearValidate', 'validate', 'resetForm', 'validateField'].forEach(ele => {
        this.crud[ele] = this.$refs.tableForm[ele]
      })
    },
    handleChange () {
      this.crud.$emit('input', this.crud.tableForm)
      this.crud.$emit('change', this.crud.tableForm)
    },
    handleTabClick (tab, event) {
      this.crud.$emit('tab-click', tab, event)
    },
    handleFullScreen () {
      if (this.isDrawer) {
        if (this.validatenull(this.size)) {
          this.size = '100%'
        } else {
          this.size = ''
        }
      }
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
    // 保存
    rowSave (hide) {
      this.crud.$emit(
        "row-save",
        filterParams(this.crud.tableForm),
        this.closeDialog,
        hide
      );
    },
    // 更新
    rowUpdate (hide) {
      this.crud.$emit(
        "row-update",
        filterParams(this.crud.tableForm),
        this.crud.tableIndex,
        this.closeDialog,
        hide
      );
    },
    closeDialog (row) {
      row = this.deepClone(row);
      const callback = () => {
        if (this.isEdit) {
          let { parentList, index } = this.crud.findData(row[this.crud.rowKey])
          if (parentList) {
            parentList.splice(index, 1, row);
          }
        } else if (this.isAdd) {
          let { item } = this.crud.findData(row[this.crud.rowParentKey])
          if (item) {
            if (!item[this.crud.childrenKey]) {
              this.$set(item, this.crud.childrenKey, [])
            }
            if (this.crud.tableOption.lazy) {
              this.$set(item, this.crud.hasChildrenKey, true)
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
        this.boxVisible = false;
        Object.keys(this.crud.tableForm).forEach(ele => {
          this.$delete(this.crud.tableForm, ele);
        })
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
      const callback = () => {
        this.fullscreen = this.crud.tableOption.dialogFullscreen
        this.boxVisible = true;
        this.$nextTick(() => {
          this.initFun()
        })
      };
      if (typeof this.crud.beforeOpen === "function") {
        this.crud.beforeOpen(callback, this.boxType);
      } else {
        callback();
      }
    }
  }
});
</script>
