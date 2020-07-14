<template>
  <div :class="b()">
    <el-time-picker v-model="text"
                    :is-range="isRange"
                    :size="size"
                    :default-value="defaultValue"
                    :range-separator="rangeSeparator || t('date.tip')"
                    :arrow-control="arrowControl"
                    :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder"
                    :format="format"
                    :readonly="readonly"
                    :clearable="disabled?false:clearable"
                    :value-format="valueFormat"
                    :placeholder="placeholder"
                    @change="handleChange"
                    @click.native="handleClick"
                    :disabled="disabled"></el-time-picker>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import locale from "../../core/common/locale";
export default create({
  name: "time",
  mixins: [props(), event(), locale],
  data () {
    return {};
  },
  props: {
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