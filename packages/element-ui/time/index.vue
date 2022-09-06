<template>
  <div :class="b()">
    <el-time-picker v-model="text"
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
                    :shortcuts="shortcuts"
                    :disabled-date="disabledDate"
                    :value-format="valueFormat"
                    :placeholder="placeholder"
                    @change="handleChange"
                    @click="handleClick"
                    :disabled="disabled"></el-time-picker>
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
    startPlaceholder: {
      type: String
    },
    endPlaceholder: {
      type: String
    },
    rangeSeparator: {
      type: String
    },
    modelValue: {
      required: true
    },
    disabledDate: Function,
    shortcuts: [Object, Function],
    defaultValue: {
      type: [String, Array]
    },
    valueFormat: {
      default: ""
    },
    arrowControl: {
      type: Boolean,
      default: false
    },
    type: {
      default: ""
    },
    format: {
      default: ""
    }
  },
  created () { },
  mounted () { },
  computed: {
    isRange () {
      return this.type === "timerange";
    }
  },
  methods: {
    handleTextValue (val) {
      if (Array.isArray(this.text) && this.validatenull(this.text)) {
        this.text = this.text.join(',')
      }
    }
  }
});
</script>