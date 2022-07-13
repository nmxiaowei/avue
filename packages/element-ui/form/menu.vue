<template>
  <el-col :span="menuSpan"
          :md="menuSpan"
          :style="styleName"
          :class="[b('menu',[formSafe.menuPosition]),'no-print']"
          v-if="validData(formSafe.tableOption.menuBtn, true)">
    <el-button type="primary"
               @click="formSafe.handleMock"
               :size="formSafe.controlSize"
               icon="el-icon-edit"
               :loading="formSafe.allDisabled"
               v-if="formSafe.isMock">{{validData(formSafe.tableOption.mockText,t("form.mockBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.handlePrint"
               :size="formSafe.controlSize"
               icon="el-icon-printer"
               :loading="formSafe.allDisabled"
               v-if="formSafe.isPrint">{{validData(formSafe.tableOption.printText,t("form.printBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.submit"
               :size="formSafe.controlSize"
               :icon="formSafe.tableOption.submitIcon || 'el-icon-check'"
               :loading="formSafe.allDisabled"
               v-if="validData(formSafe.tableOption.submitBtn,true)">{{validData(formSafe.tableOption.submitText,t("form.submitBtn"))}}</el-button>
    <el-button :icon="formSafe.tableOption.emptyIcon || 'el-icon-delete'"
               :size="formSafe.controlSize"
               :loading="formSafe.allDisabled"
               v-if="validData(formSafe.tableOption.emptyBtn,true)"
               @click="formSafe.resetForm">{{validData(formSafe.tableOption.emptyText,t("form.emptyBtn"))}}</el-button>
    <slot name="menu-form"
          :disabled="formSafe.allDisabled"
          :size="formSafe.controlSize"></slot>
  </el-col>
</template>
<script>
import locale from "core/locale";
import create from "core/create";
export default create({
  name: 'form',
  inject: ["formSafe"],
  mixins: [locale],
  computed: {
    menuSpan () {
      return this.formSafe.tableOption.menuSpan || 24;
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
})
</script>