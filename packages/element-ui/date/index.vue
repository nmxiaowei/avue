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
import props from "common/common/props.js";
import event from "common/common/event.js";
import locale from "core/locale";
export default create({
  name: "date",
  mixins: [props(), event(), locale],
  data () {
    return {
      menu: [],
    };
  },
  props: {
    editable: Boolean,
    unlinkPanels: Boolean,
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    defaultTime: [String, Array],
    pickerOptions: Object,
    type: {
      type: String,
      default: "date"
    },
    valueFormat: String,
    format: String
  }
});
</script>

