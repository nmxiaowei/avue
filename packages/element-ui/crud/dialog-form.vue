<template>
  <component :is="dialogType"
             lock-scroll
             show-close
             v-dialogDrag="vaildData(crud.tableOption.dialogDrag,config.dialogDrag)"
             :class="b('dialog')"
             :custom-class="vaildData(crud.tableOption.customClass,config.customClass)"
             :fullscreen="crud.isMobile?true:crud.tableOption.dialogFullscreen"
             :modal-append-to-body="false"
             append-to-body
             :top="setPx(crud.tableOption.dialogTop,100)"
             :title="dialogTitle"
             :close-on-press-escape="crud.tableOption.dialogEscape"
             :close-on-click-modal="crud.tableOption.dialogClickModal"
             :modal="crud.tableOption.dialogModal"
             :show-close="crud.tableOption.dialogCloseBtn"
             :visible.sync="boxVisible"
             v-model="boxVisible"
             :width="vaildData(crud.tableOption.dialogWidth+'',crud.isMobile?'100%':config.dialogWidth+'')"
             @close="closeDialog">
    <div :style="{height:dialogHeight,overflow:'hidden'}"
         ref="content">
      <el-scrollbar style="height:100%">
        <avue-form v-model="tableForm"
                   v-if="boxVisible"
                   ref="tableForm"
                   :disabled="keyBtn"
                   :uploadBefore="crud.uploadBefore"
                   :uploadAfter="crud.uploadAfter"
                   :option="formOption">
          <template slot-scope="scope"
                    v-for="item in columnFormOption"
                    :slot="item.prop">
            <slot :value="scope.value"
                  :column="scope.column"
                  :dic="scope.dic"
                  :size="scope.size"
                  :label="scope.label"
                  :disabled="scope.disabled"
                  :row="tableForm"
                  :index="tableIndex"
                  :name="item.prop"
                  v-if="item.formslot"></slot>
          </template>
        </avue-form>
      </el-scrollbar>
    </div>

    <span slot="footer"
          class="dialog-footer">
      <!-- 弹出框按钮组 -->
      <slot name="menuForm"
            :type="boxType"
            :size="crud.controlSize"></slot>
      <el-button type="primary"
                 @click="rowUpdate"
                 :size="crud.controlSize"
                 v-if="boxType==='edit'"
                 :loading="keyBtn">{{vaildData(crud.tableOption.updateBtnTitle,t('crud.updateBtn'))}}</el-button>
      <el-button type="primary"
                 @click="rowSave"
                 :size="crud.controlSize"
                 :loading="keyBtn"
                 v-else-if="boxType==='add'">{{vaildData(crud.tableOption.saveBtnTitle,t('crud.saveBtn'))}}</el-button>
      <el-button :size="crud.controlSize"
                 @click="closeDialog">{{vaildData(crud.tableOption.cancelBtnTitle,t('crud.cancelBtn'))}}</el-button>
    </span>
  </component>
</template>

<script>
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
      keyBtn: false,
      boxVisible: false,
      boxHeight: 0,
      tableForm: {},
      index: -1
    };
  },
  props: {
    columnFormOption: {},
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    boxVisible (val) {
      if (val) {
        this.$nextTick(() => {
          this.initFun()
        })
      }
    },
    value: {
      handler () {
        this.formVal();
      },
      deep: true
    },
    tableForm: {
      handler () {
        this.$emit("input", this.tableForm);
      },
      deep: true
    }
  },
  mounted () {

  },
  computed: {
    dialogType () {
      return this.isDrawer ? 'avue-drawer' : 'elDialog'
    },
    isDrawer () {
      return this.crud.tableOption.dialogType === 'drawer';
    },
    dialogHeight () {
      if (this.isDrawer) {
        return 'calc(100% - 55px)';
      }
      return this.setPx(
        this.vaildData(
          this.crud.tableOption.dialogHeight,
          config.dialogHeight
        )
      );
    },
    formOption () {
      let option = this.deepClone(this.crud.tableOption);
      option.menuBtn = false;
      option.boxType = this.boxType;
      option.column = this.crud.propOption;
      //不分组的表单不加载字典
      if (!this.crud.isGroup) {
        option.dicFlag = false;
        option.dicData = this.crud.DIC;
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
    initFun () {
      this.crud.clearValidate = this.$refs.tableForm.clearValidate
      this.crud.validate = this.$refs.tableForm.validate
    },
    updateDic (prop, list) {
      this.$refs.tableForm.updateDic(prop, list);
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit("input", this.tableForm);
    },
    //清空表单
    resetForm () {
      this.$refs["tableForm"].resetForm();
      this.$emit("input", this.tableForm);
    },
    // 保存
    rowSave () {
      this.$refs["tableForm"].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        this.crud.$emit(
          "row-save",
          this.deepClone(this.tableForm),
          this.closeDialog,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    // 更新
    rowUpdate () {
      this.$refs["tableForm"].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        const index = this.tableIndex;
        this.crud.$emit(
          "row-update",
          this.deepClone(this.tableForm),
          this.index,
          this.closeDialog,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    closeDialog () {
      this.tableIndex = -1;
      this.tableForm = {};
      this.boxVisible = false;
      this.keyBtn = false;
      this.hide();
    },
    // 隐藏表单
    hide () {
      const callack = () => {
        this.$refs["tableForm"].resetForm();
      };
      if (typeof this.crud.beforeClose === "function")
        this.crud.beforeClose(callack, this.boxType);
      else callack();
    },
    // 显示表单
    show (type, index = -1) {
      this.index = index;
      this.boxType = type;
      const callack = () => {
        this.$nextTick(() => {
          this.boxVisible = true;
        });
      };
      if (typeof this.crud.beforeOpen === "function")
        this.crud.beforeOpen(callack, this.boxType);
      else callack();
    }
  }
});
</script>