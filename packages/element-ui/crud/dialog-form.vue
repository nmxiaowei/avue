<template>
  <component :is="dialogType"
             lock-scroll
             :class="['avue-dialog',b('dialog',{'fullscreen':fullscreen})]"
             :destroy-on-close="crud.tableOption.dialogDestroy"
             :wrapperClosable="crud.tableOption.dialogClickModal"
             :direction="direction"
             v-dialogdrag="vaildData(crud.tableOption.dialogDrag,config.dialogDrag)"
             :custom-class="crud.tableOption.dialogCustomClass"
             :fullscreen="fullscreen"
             :modal-append-to-body="false"
             append-to-body
             :top="setPx(dialogTop)"
             :title="dialogTitle"
             :close-on-press-escape="crud.tableOption.dialogEscape"
             :close-on-click-modal="vaildData(crud.tableOption.dialogClickModal,false)"
             :modal="crud.tableOption.dialogModal"
             :show-close="crud.tableOption.dialogCloseBtn"
             v-model="boxVisible"
             :size="size?size:width"
             :width="setPx(width)"
             :before-close="hide"
             @opened="handleOpened">
    <template #title>
      <div :class="b('dialog__header')">
        <span class="el-dialog__title">{{dialogTitle}}</span>
        <div :class="b('dialog__menu')">
          <i @click="handleFullScreen"
             class="el-dialog__close el-icon-full-screen"></i>
        </div>
      </div>
    </template>

    <el-scrollbar :style="styleName">
      <avue-form v-model="crud.tableForm"
                 v-if="boxVisible"
                 ref="tableForm"
                 @change="handleChange"
                 @submit="handleSubmit"
                 @reset-change="hide"
                 @tab-click="handleTabClick"
                 @error="handleError"
                 v-bind="$uploadFun({},crud)"
                 :option="formOption">
        <!-- 循环form表单卡槽 -->
        <template v-for="item in crud.formSlot"
                  #[getSlotName(item)]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
        <template #menuForm="scope">
          <slot name="menuForm"
                v-bind="{...scope,...{type:boxType}}"></slot>
        </template>
      </avue-form>
    </el-scrollbar>
  </component>
</template>

<script>
import { filterDefaultParams } from 'utils/util'
import create from "core/create";
import locale from "../../core/common/locale";
import config from "./config";
export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      config: config,
      boxType: "",
      fullscreen: false,
      size: null,
      boxVisible: false,
      boxHeight: 0,
      index: -1
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
    styleName () {
      return {
        height: this.dialogHeight,
        overflow: 'hidden'
      }
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
      return this.crud.tableOption.dialogTop || config.dialogTop
    },
    isDrawer () {
      return this.crud.tableOption.dialogType === 'drawer';
    },
    dialogHeight () {
      if (this.isDrawer) {
        return 'calc(100% - 100px)';
      }
      if (this.crud.tableOption.dialogHeight === config.dialogHeight) {
        return this.setPx(config.clientHeight - 3 * this.dialogTop);
      }
      return this.setPx(this.crud.tableOption.dialogHeight);
    },
    formOption () {
      let option = this.deepClone(this.crud.tableOption);
      option.boxType = this.boxType;
      option.column = this.deepClone(this.crud.propOption);
      option.printBtn = false;
      option.mockBtn = false;
      if (this.isView) {
        option.menuBtn = false;
        option.detail = true;
      } else {
        option.menuPosition = option.dialogMenuPosition || 'right'
        if (this.isAdd) {
          option.submitBtn = option.saveBtn;
          option.submitText = this.crud.menuIcon('saveBtn');
          option.submitIcon = option.saveBtnIcon || config.saveBtnIcon
        } else if (this.isEdit) {
          option.submitBtn = option.updateBtn;
          option.submitText = this.crud.menuIcon('updateBtn');
          option.submitIcon = option.updateBtnIcon || config.updateBtnIcon
        }
        option.emptyBtn = option.cancelBtn;
        option.emptyIcon = option.cancelBtnIcon || config.cancelBtnIcon;
        option.emptyText = this.crud.menuIcon('cancelBtn')
      }
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
    }
  },
  methods: {
    handleOpened () {
      this.$nextTick(() => this.initFun())
    },
    getSlotName (item) {
      return item.replace('form', '')
    },
    handleChange () {
      this.crud.$emit('update:modelValue', this.crud.tableForm)
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
      } else {
        if (this.fullscreen) {
          this.fullscreen = false;
        } else {
          this.fullscreen = true;
        }
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
      ['clearValidate', 'validate', 'resetForm'].forEach(ele => {
        this.crud[ele] = this.$refs.tableForm[ele]
      })
    },
    // 保存
    rowSave (hide) {
      this.crud.$emit(
        "row-save",
        filterDefaultParams(this.crud.tableForm, this.crud.tableOption.translate),
        this.closeDialog,
        hide
      );
    },
    // 更新
    rowUpdate (hide) {
      const index = this.crud.tableIndex;
      this.crud.$emit(
        "row-update",
        filterDefaultParams(this.crud.tableForm, this.crud.tableOption.translate),
        this.index,
        this.closeDialog,
        hide
      );
    },
    closeDialog (row, index) {
      const callback = () => {
        if (this.isEdit) {
          let obj = this.findObject(this.crud.data, row[this.crud.rowKey], this.crud.rowKey);
          obj = Object.assign(obj || {}, row);
        } else if (this.isAdd) {
          const callback = (list = [], index) => {
            this.validatenull(index) ? list.push(row) : list.splice(index, 0, row);
          }
          if (this.crud.isTree) {
            let childrenKey = this.crud.treeProps['children'] || 'children'
            let hasChildrenKey = this.crud.treeProps['hasChildren'] || 'hasChildren'
            if (!row[childrenKey]) row[childrenKey] = []
            if (this.crud.vaildParent(row)) {
              callback(this.crud.data, index)
            } else {
              let parent = this.findObject(this.crud.data, row[this.crud.rowParentKey], this.crud.rowKey);
              if (parent === undefined) {
                return callback(this.crud.data, index)
              }
              if (!parent[childrenKey]) {
                parent[hasChildrenKey] = true
                parent[childrenKey] = []
              }
              callback(parent[childrenKey], index)
            }
          } else {
            callback(this.crud.data, index)
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
        Object.keys(this.crud.tableForm).forEach(ele => {
          delete this.crud.tableForm[ele];
        })
        this.crud.tableIndex = -1;
        this.boxVisible = false;
      };
      if (typeof this.crud.beforeClose === "function") {
        this.crud.beforeClose(callback, this.boxType);
      } else {
        callback();
      }
    },
    // 显示表单
    show (type, index = -1) {
      this.index = index;
      this.boxType = type;
      const callback = () => {
        this.$nextTick(() => {
          this.fullscreen = this.crud.tableOption.dialogFullscreen
          this.boxVisible = true;
        });
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
