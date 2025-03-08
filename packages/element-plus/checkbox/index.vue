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
                       :fill="fill"
                       :text-color="textColor"
                       :min="min"
                       :max="max"
                       @click="handleClick">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :border="border"
                 :size="size"
                 :value="item[valueKey]"
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
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
  props: {
    fill: String,
    textColor: String,
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
      const availableOptions = this.dic.filter(item => !item[this.disabledKey]);
      this.text = val ? availableOptions.map(ele => ele[this.valueKey]) : [];
      this.isIndeterminate = false;
    },
    handleCheckChange () {
      let value = this.text;
      if (!this.all) return
      const availableCount = this.dic.filter(item => !item[this.disabledKey]).length;
      let checkedCount = value.length;
      this.checkAll = checkedCount === availableCount;
      this.isIndeterminate = checkedCount > 0 && checkedCount < availableCount;
    }
  }
});
</script>

