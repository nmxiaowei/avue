<template>
  <div :class="b()">
    <el-date-picker :type="type"
                    v-model="text"
                    :size="size"
                    :unlink-panels="unlinkPanels"
                    :readonly="readonly"
                    :default-value="defaultValue"
                    :default-time="defaultTime"
                    :range-separator="rangeSeparator || t('date.tip')"
                    :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder"
                    :format="format"
                    :clearable="disabled?false:clearable"
                    :picker-options="pickerOptions"
                    :value-format="valueFormat"
                    :placeholder="placeholder"
                    @blur="handleBlur"
                    @focus="handleFocus"
                    @click.native="handleClick"
                    :disabled="disabled"></el-date-picker>
  </div>
</template>

<script>
import create from "core/create";
import { GetDateStr } from "utils/date.js";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import locale from "../../core/common/locale";
export default create({
  name: "date",
  mixins: [props(), event(), locale],
  data () {
    return {
      text: "",
      menu: [],
    };
  },
  props: {
    unlinkPanels: {
      type: Boolean,
      default: false
    },
    value: {},
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
    },
    rangeSeparator: {
      type: String
    },
    defaultValue: {
      type: [String, Array]
    },
    defaultTime: {
      type: [String, Array]
    },
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    type: {
      type: String,
      default: "date"
    },
    valueFormat: {},
    format: {}
  }
});
</script>

