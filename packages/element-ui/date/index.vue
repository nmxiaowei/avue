<template>
  <div :class="b()">
    <el-date-picker :type="type"
                    v-model="text"
                    :popper-class="popperClass"
                    :size="size"
                    :editable="editable"
                    :unlink-panels="unlinkPanels"
                    :readonly="readonly"
                    :default-value="defaultValue"
                    :default-time="defaultTime"
                    :range-separator="rangeSeparator"
                    :start-placeholder="startPlaceholder || t('date.start')"
                    :end-placeholder="endPlaceholder || t('date.end')"
                    :format="format"
                    :clearable="clearableVal"
                    :shortcuts="shortcuts"
                    :disabled-date="disabledDate"
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
import locale from "core/locale";
import { GetDateStr } from "utils/date.js";
import props from "common/common/props.js";
import event from "common/common/event.js";
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
    editable: {
      type: Boolean,
      default: true
    },
    unlinkPanels: {
      type: Boolean,
      default: false
    },
    modelValue: {},
    startPlaceholder: {
      type: String
    },
    endPlaceholder: {
      type: String
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
    disabledDate: Function,
    shortcuts: [Object, Function],
    type: {
      type: String,
      default: "date"
    },
    valueFormat: {},
    format: {}
  }
});
</script>

