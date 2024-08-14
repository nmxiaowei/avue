<template>
  <div :class="b()">
    <el-checkbox v-if="all"
                 :class="b('all')"
                 :disabled="disabled"
                 :indeterminate="isIndeterminate"
                 v-model="checkAll"
                 @change="handleCheckAll">{{t('check.checkAll')}}</el-checkbox>
    <el-checkbox-group v-model="text"
                       @change="handleCheckChange"
                       :disabled="disabled"
                       :size="size"
                       :min="min"
                       :max="max"
                       @click.native="handleClick">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :size="size"
                 :readonly="readonly"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
import locale from "core/locale";
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "checkbox",
  props: {
    all: {
      type: Boolean,
      default: false
    }
  },
  mixins: [props(), event(), locale],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      name: 'checkbox',
    };
  },
  watch: {
    dic () {
      this.handleCheckChange();
    },
    text: {
      handler (val) {
        this.handleCheckChange();
      }
    },
  },
  created () { },
  mounted () { },
  methods: {
    handleCheckAll (val) {
      if (!this.all) return
      this.text = val ? this.dic.map(ele => ele[this.valueKey]) : [];
      this.isIndeterminate = false;
    },
    handleCheckChange () {
      let value = this.text;
      if (!this.all) return
      let checkedCount = value.length;
      let dicLen = this.dic.length;
      this.checkAll = checkedCount === dicLen;
      this.isIndeterminate = checkedCount > 0 && checkedCount < dicLen
    }
  }
});
</script>

