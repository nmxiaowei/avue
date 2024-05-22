<template>
  <el-col :span="menuSpan"
          :md="menuSpan"
          :xs="menuXsSpan"
          :style="styleName"
          :class="[b('menu',[formSafe.menuPosition]),'no-print']"
          v-if="validData(formSafe.tableOption.menuBtn, true)">
    <slot name="menu-form-before"
          :disabled="formSafe.allDisabled"
          :size="formSafe.size"></slot>
    <el-button type="primary"
               @click="formSafe.handleMock"
               :size="formSafe.size"
               icon="el-icon-edit"
               :disabled="formSafe.allDisabled"
               v-if="formSafe.isMock">{{validData(formSafe.tableOption.mockText,t("form.mockBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.handlePrint"
               :size="formSafe.size"
               icon="el-icon-printer"
               :disabled="formSafe.allDisabled"
               v-if="formSafe.isPrint">{{validData(formSafe.tableOption.printText,t("form.printBtn"))}}</el-button>
    <el-button type="primary"
               @click="formSafe.submit"
               :size="formSafe.size"
               :icon="formSafe.tableOption.submitIcon || 'el-icon-check'"
               :loading="formSafe.allDisabled"
               v-if="validData(formSafe.tableOption.submitBtn,true)">{{validData(formSafe.tableOption.submitText,t("form.submitBtn"))}}</el-button>
    <el-button :icon="formSafe.tableOption.emptyIcon || 'el-icon-delete'"
               :size="formSafe.size"
               :disabled="formSafe.allDisabled"
               v-if="validData(formSafe.tableOption.emptyBtn,true)"
               @click="formSafe.resetForm">{{validData(formSafe.tableOption.emptyText,t("form.emptyBtn"))}}</el-button>
    <slot name="menu-form"
          :disabled="formSafe.allDisabled"
          :size="formSafe.size"></slot>
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
    menuXsSpan () {
      return this.formSafe.tableOption.menuXsSpan || this.formSafe.config.xsSpan;
    },
    menuSpan () {
      return this.formSafe.tableOption.menuSpan || this.formSafe.config.xsSpan;
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