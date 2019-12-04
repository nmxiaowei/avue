<template>
  <div :class="b()">
    <div :class="b('group')"
         v-if="isDategroup">
      <div :class="b('radio')">
        <el-radio-group :size="size"
                        @change="handleChange"
                        v-model="text">
          <el-radio-button :label="item.value"
                           v-for="(item,index) in menu"
                           :key="index">{{item.label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div :class="b('date')">
        <el-date-picker v-model="datetime"
                        type="daterange"
                        :size="size"
                        :unlink-panels="unlinkPanels"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @focus="handleFocus"
                        @change="handleChange"
                        :range-separator="t('date.tip')"
                        :start-placeholder="t('date.start')"
                        :end-placeholder="t('date.end')"></el-date-picker>
      </div>
    </div>
    <el-date-picker v-else
                    :type="type"
                    v-model="text"
                    :size="size"
                    :unlink-panels="unlinkPanels"
                    :readonly="readonly"
                    :default-value="defaultValue"
                    :default-time="defaultTime"
                    :range-separator="t('date.tip')"
                    :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder"
                    :format="format"
                    :clearable="disabled?false:clearable"
                    :picker-options="pickerOptions"
                    :value-format="valueFormat"
                    :placeholder="placeholder"
                    @change="handleChange"
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
      datetime: [GetDateStr(0), GetDateStr(30)]
    };
  },
  props: {
    unlinkPanels: {
      type: Boolean,
      default: false
    },
    default: {
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
    defaultValue: {
      type: String
    },
    defaultTime: {
      type: String
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
  },
  computed: {
    isDategroup () {
      return this.type === "dategroup";
    }
  },
  watch: {
    datetime () {
      this.text = "";
      this.setCurrent((this.datetime || []).join(","));
    }
  },
  created () {
    if (this.isDategroup) {
      this.init();
    }
  },
  mounted () { },
  methods: {
    setCurrent (val) {
      this.$emit('input', val)
    },
    init () {
      this.menu = [
        {
          label: this.t("date.t"),
          value: GetDateStr(0)
        },
        {
          label: this.t("date.y"),
          value: GetDateStr(-1)
        },
        {
          label: this.t("date.n"),
          value: GetDateStr(-7) + ',' + GetDateStr(0)
        },
        {
          label: this.t("date.a"),
          value: ""
        }
      ];
      if (this.default) {
        this.text = GetDateStr(0);
        this.setCurrent(this.text);
      }
    }
  }
});
</script>

