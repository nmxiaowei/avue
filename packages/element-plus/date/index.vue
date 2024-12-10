<template>
  <div :class="b()">
    <el-date-picker :type="type"
                    v-model="text"
                    :popper-class="popperClass"
                    :size="size"
                    :cell-class-name="cellClassName"
                    :editable="editable"
                    :unlink-panels="unlinkPanels"
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
                    :prefix-icon="prefixIcon"
                    :show-now="showNow"
                    @blur="handleBlur"
                    @focus="handleFocus"
                    @click="handleClick"
                    :readonly="readonly"
                    :disabled="disabled">
      <template #="cell">
        <div class="el-date-table-cell">
          <slot :item="cell"
                v-if="$slots.default">
          </slot>
          <span class="el-date-table-cell__text"
                v-else>{{  cell.renderText || cell.text }}</span>
        </div>
      </template>
    </el-date-picker>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "date",
  mixins: [props(), event(), locale],
  props: {
    cellClassName: String,
    prefixIcon: String,
    disabledDate: Function,
    showNow: Boolean,
    shortcuts: [Array, Function],
    editable: {
      type: Boolean,
      default: true
    },
    unlinkPanels: Boolean,
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    defaultTime: [String, Array],
    type: {
      type: String,
      default: "date"
    },
    valueFormat: String,
    format: String
  }
});
</script>

