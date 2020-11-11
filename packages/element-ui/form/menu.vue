<template>
  <el-col :span="menuSpan"
          :md="menuSpan"
          :sm="12"
          :xs="24"
          :style="styleName"
          :class="formSafe.b('menu',[formSafe.menuPosition])"
          v-if="vaildData(formSafe.parentOption.menuBtn,true)">
    <el-form-item label-width="0px">
      <el-button type="primary"
                 @click="formSafe.handleMock"
                 :size="formSafe.controlSize"
                 icon="el-icon-edit-outline"
                 :loading="formSafe.allDisabled"
                 v-if="formSafe.isMock">{{t("form.mockBtn")}}</el-button>
      <el-button type="primary"
                 @click="formSafe.handlePrint"
                 :size="formSafe.controlSize"
                 icon="el-icon-printer"
                 :loading="formSafe.allDisabled"
                 v-if="formSafe.isPrint">{{t("form.printBtn")}}</el-button>
      <el-button type="primary"
                 @click="formSafe.submit"
                 :size="formSafe.controlSize"
                 :icon="formSafe.parentOption.submitIcon || 'el-icon-check'"
                 :loading="formSafe.allDisabled"
                 v-if="vaildData(formSafe.parentOption.submitBtn,true)">{{vaildData(formSafe.parentOption.submitText,t("form.submit"))}}</el-button>
      <el-button :icon="formSafe.parentOption.emptyIcon || 'el-icon-delete'"
                 :size="formSafe.controlSize"
                 :loading="formSafe.allDisabled"
                 v-if="vaildData(formSafe.parentOption.emptyBtn,true)"
                 @click="formSafe.resetForm">{{vaildData(formSafe.parentOption.emptyText,t("form.empty"))}}</el-button>
      <slot name="menuForm"
            :disabled="formSafe.allDisabled"
            :size="formSafe.controlSize"></slot>
    </el-form-item>
  </el-col>
</template>
<script>
import locale from "../../core/common/locale";
export default {
  form: '1',
  inject: ["formSafe"],
  mixins: [locale],
  computed: {
    menuSpan () {
      return this.formSafe.parentOption.menuSpan || 24;
    },
    styleName () {
      if (this.menuSpan !== 24) {
        return {
          padding: 0
        }
      }
      return {}
    }
  }
}
</script>
