<template>
  <div :class="b()">
    <component :is="componentName"
               v-model="text"
               :popper-class="popperClass"
               :is-range="isRange"
               :size="size"
               :editable="editable"
               :default-value="defaultValue"
               :range-separator="rangeSeparator"
               :arrow-control="arrowControl"
               :start-placeholder="startPlaceholder || t('time.start')"
               :end-placeholder="endPlaceholder || t('time.end')"
               :format="format"
               :readonly="readonly"
               :clearable="clearableVal"
               :picker-options="pickerOptions"
               :value-format="valueFormat"
               :placeholder="placeholder"
               @change="handleChange"
               @click.native="handleClick"
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
    editable: Boolean,
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    value: {},
    defaultValue: [String, Array],
    pickerOptions: Object,
    valueFormat: String,
    arrowControl: Boolean,
    type: String,
    format: String
  },
  watch: {
    text () {
      if (Array.isArray(this.text) && this.validatenull(this.text)) {
        this.text = this.text.join(',')
      }
    }
  },
  created () { },
  mounted () { },
  computed: {
    componentName () {
      let pickerOptions = this.pickerOptions || {}
      if (pickerOptions.start || pickerOptions.end || pickerOptions.step) {
        return "elTimeSelect"
      } else {
        return "elTimePicker"
      }
    },
    isRange () {
      return this.type === "timerange";
    }
  },
  methods: {}
});
</script>