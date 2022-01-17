<template>
  <el-col :span="menuSpan"
          :md="menuSpan"
          :sm="12"
          :xs="24"
          :style="styleName"
          :class="[formSafe.b('menu',[formSafe.menuPosition]),'no-print']"
          v-if="validData(formSafe.parentOption.menuBtn,true)">
    <el-button type="primary"
               @click="formSafe.handleMock"
               :size="formSafe.controlSize"
               icon="el-icon-edit-outline"
               :loading="formSafe.allDisabled"
               v-if="formSafe.isMock">{{validData(formSafe.parentOption.mockText,t("form.mockBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.handlePrint"
               :size="formSafe.controlSize"
               icon="el-icon-printer"
               :loading="formSafe.allDisabled"
               v-if="formSafe.isPrint">{{validData(formSafe.parentOption.printText,t("form.printBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.submit"
               :size="formSafe.controlSize"
               :icon="formSafe.parentOption.submitIcon || 'el-icon-check'"
               :loading="formSafe.allDisabled"
               v-if="validData(formSafe.parentOption.submitBtn,true)">{{validData(formSafe.parentOption.submitText,t("form.submitBtn"))}}</el-button>
    <el-button :icon="formSafe.parentOption.emptyIcon || 'el-icon-delete'"
               :size="formSafe.controlSize"
               :loading="formSafe.allDisabled"
               v-if="validData(formSafe.parentOption.emptyBtn,true)"
               @click="formSafe.resetForm">{{validData(formSafe.parentOption.emptyText,t("form.emptyBtn"))}}</el-button>
    <slot name="menuForm"
          :disabled="formSafe.allDisabled"
          :size="formSafe.controlSize"></slot>
  </el-col>
</template>
<script>
import locale from "core/locale";
export default {
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
