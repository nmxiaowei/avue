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
                    :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder"
                    :format="format"
                    :readonly="readonly"
                    :clearable="clearableVal"
                    :picker-options="pickerOptions"
                    :value-format="valueFormat"
                    :placeholder="placeholder"
                    @change="handleChange"
                    @click.native="handleClick"
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
      type: String,
      default: "开始时间"
    },
    endPlaceholder: {
      type: String,
      default: "结束时间"
    },
    rangeSeparator: {
      type: String
    },
    value: {
      required: true
    },
    defaultValue: {
      type: [String, Array]
    },
    pickerOptions: {
      type: Object,
      default: () => { }
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
    isRange () {
      return this.type === "timerange";
    }
  },
  methods: {}
});
</script>