<template>
  <div :class="b()">
    <component :is="componentName"
               v-model="text"
               :popper-class="popperClass"
               :is-range="isRange"
               :size="size"
               :editable="editable"
               :disabled-hours="disabledHours"
               :disabled-minutes="disabledMinutes"
               :disabled-seconds="disabledSeconds"
               :default-value="defaultValue"
               :range-separator="rangeSeparator"
               @visible-change="visibleChange"
               :arrow-control="arrowControl"
               :start-placeholder="startPlaceholder || t('time.start')"
               :end-placeholder="endPlaceholder || t('time.end')"
               :format="format"
               :readonly="readonly"
               :clearable="clearableVal"
               :start="start"
               :end="end"
               :step="step"
               :max-time="maxTime"
               :min-time="minTime"
               :value-format="valueFormat"
               :placeholder="placeholder"
               @click="handleClick"
               :disabled="disabled">
    </component>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import locale from "core/locale";
export default create({
  name: "time",
  mixins: [props(), event(), locale],
  data () {
    return {};
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    maxTime: String,
    minTime: String,
    start: String,
    end: String,
    step: String,
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    valueFormat: String,
    arrowControl: Boolean,
    type: String,
    format: String,
    visibleChange: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function
  },
  computed: {
    componentName () {
      if (this.start || this.end || this.step || this.maxTime || this.minTime) {
        return "elTimeSelect"
      } else {
        return "elTimePicker"
      }
    },
    isRange () {
      return this.type === "timerange";
    }
  }
});
</script>