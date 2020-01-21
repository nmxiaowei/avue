<template>
  <el-col :span="formSafe.menuSpan"
          v-if="vaildData(formSafe.parentOption.menuBtn,true)">
    <el-form-item label-width="0px">
      <!-- 菜单按钮组 -->
      <div :class="formSafe.b('menu',[formSafe.menuPosition])"
           :style="styleName">
        <el-button type="primary"
                   @click="formSafe.handleMock"
                   :size="formSafe.controlSize"
                   icon="el-icon-edit-outline"
                   :loading="formSafe.allDisabled"
                   v-if="formSafe.isMock">填充数据</el-button>
        <el-button type="primary"
                   @click="formSafe.submit"
                   :size="formSafe.controlSize"
                   :icon="formSafe.parentOption.submitIcon || 'el-icon-check'"
                   :loading="formSafe.allDisabled"
                   v-if="vaildData(formSafe.parentOption.submitBtn,true)">{{vaildData(formSafe.parentOption.submitText,'提 交')}}</el-button>
        <el-button :icon="formSafe.parentOption.emptyIcon || 'el-icon-delete'"
                   :size="formSafe.controlSize"
                   :loading="formSafe.allDisabled"
                   v-if="vaildData(formSafe.parentOption.emptyBtn,true)"
                   @click="formSafe.resetForm">{{vaildData(formSafe.parentOption.emptyText,'清 空')}}</el-button>
        <slot name="menuForm"
              :size="formSafe.controlSize"></slot>
      </div>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  form: '1',
  inject: ["formSafe"],
  computed: {
    styleName () {
      if (this.formSafe.menuSpan !== 24) {
        return {
          padding: 0
        }
      }
      return {}
    }
  }
}
</script>
