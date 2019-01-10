<template>
  <el-dialog lock-scroll
             :class="b('dialog')"
             :custom-class="vaildData($parent.tableOption.customClass,config.customClass)"
             :fullscreen="$parent.isMobile?true:$parent.tableOption.dialogFullscreen"
             :modal-append-to-body="false"
             append-to-body
             :title="dialogTitle"
             :close-on-press-escape="$parent.tableOption.dialogEscape"
             :close-on-click-modal="$parent.tableOption.dialogClickModal"
             :modal="$parent.tableOption.dialogModal"
             :show-close="$parent.tableOption.dialogCloseBtn"
             :visible.sync="boxVisible"
             :width="vaildData($parent.tableOption.dialogWidth,$parent.isMobile?'100%':config.dialogWidth)"
             @close="closeDialog">
    <div :class="b('dialog', ['overflow'])">
      <avue-form v-model="tableForm"
                 ref="tableForm"
                 :disabled="keyBtn"
                 :uploadBefore="$parent.uploadBefore"
                 :uploadAfter="$parent.uploadAfter"
                 :option="formOption">
        <template slot-scope="scope"
                  v-for="item in $parent.columnOption"
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
    </div>
    <span slot="footer"
          class="dialog-footer">
      <!-- 弹出框按钮组 -->
      <slot name="menuForm"
            :type="boxType"
            :size="$parent.controlSize"></slot>
      <el-button type="primary"
                 @click="rowUpdate"
                 :size="$parent.controlSize"
                 v-if="boxType==='edit'"
                 :loading="keyBtn">{{vaildData($parent.tableOption.updateBtnTitle,config.updateBtnTitle)}}</el-button>
      <el-button type="primary"
                 @click="rowSave"
                 :size="$parent.controlSize"
                 :loading="keyBtn"
                 v-else-if="boxType==='add'">{{vaildData($parent.tableOption.saveBtnTitle,config.saveBtnTitle)}}</el-button>
      <el-button :size="$parent.controlSize"
                 v-if="boxType!=='view'"
                 @click="closeDialog">{{vaildData($parent.tableOption.cancelBtnTitle,config.cancelBtnTitle)}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import create from "core/create";
import { vaildData } from "utils/util";
import config from "./config";
export default create({
  name: "crud",
  data() {
    return {
      config: config,
      boxType: "",
      keyBtn: false,
      boxVisible: false,
      tableForm: {}
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
  watch: {
    value: {
      handler() {
        this.formVal();
      },
      deep: true
    },
    tableForm: {
      handler() {
        this.$emit("input", this.tableForm);
      },
      deep: true
    }
  },
  created() {
    this.vaildData = vaildData;
  },
  computed: {
    formOption() {
      let option = this.deepClone(this.$parent.tableOption);
      option.submitBtn = false;
      option.submitPostion = "right";
      option.boxType = this.boxType;
      option.dicFlag = false;
      option.dicData = this.$parent.DIC;
      option.emptyBtn = false;
      return option;
    },
    dialogTitle() {
      const key = `${this.boxType}Title`;
      return this.$parent.tableOption[key] || this.config[key];
    }
  },
  methods: {
    formVal() {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit("input", this.tableForm);
    },
    //清空表单
    resetForm() {
      this.$refs["tableForm"].resetForm();
      this.$emit("input", this.tableForm);
    },
    // 保存
    rowSave() {
      this.$refs["tableForm"].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        this.$parent.$emit(
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
    rowUpdate() {
      this.$refs["tableForm"].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        const index = this.tableIndex;
        this.$parent.$emit(
          "row-update",
          this.deepClone(this.tableForm),
          index,
          this.closeDialog,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    closeDialog() {
      this.tableIndex = -1;
      this.tableForm = {};
      this.boxVisible = false;
      this.keyBtn = false;
      this.hide();
    },
    // 隐藏表单
    hide() {
      const callack = () => {
        this.$refs["tableForm"].resetForm();
      };
      if (typeof this.$parent.beforeClose === "function")
        this.$parent.beforeClose(callack, this.boxType);
      else callack();
    },
    // 显示表单
    show(type) {
      this.boxType = type;
      const callack = () => {
        this.boxVisible = true;
      };
      if (typeof this.$parent.beforeOpen === "function")
        this.$parent.beforeOpen(callack, this.boxType);
      else callack();
    }
  }
});
</script>