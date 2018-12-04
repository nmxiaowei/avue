<template>
  <div :class="b()">
    <div :class="b('group')" v-if="isDategroup">
      <div :class="b('radio')">
        <el-radio-group :size="size" @change="handleChange" v-model="text">
          <el-radio-button
            :label="item.value"
            v-for="(item,index) in menu"
            :key="index"
          >{{item.label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div :class="b('date')">
        <el-date-picker
          v-model="datetime"
          type="daterange"
          :size="size"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <el-date-picker
      v-else
      :type="type"
      v-model="text"
      :size="size"
      :readonly="readonly"
      range-separator="至"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :clearable="disabled?false:clearable"
      :picker-options="pickerOptions"
      :value-format="valueFormat"
      :default-time="defaultTime"
      :placeholder="placeholder?placeholder:`请输入${label}`"
      @change="handleChange"
      @click.native="handleClick"
      :disabled="disabled"
    ></el-date-picker>
  </div>
</template>

<script>
import create from "core/create";
import { GetDateStr } from "utils/date.js";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "date",
  mixins: [props(), event()],
  data() {
    return {
      text: "",
      menu: [],
      datetime: [GetDateStr(0), GetDateStr(30)]
    };
  },
  props: {
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
    defaultTime: {
      type: String
    },
    pickerOptions: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "date"
    },
    valueFormat: {},
    format: {}
  },
  computed: {
    isDategroup() {
      return this.type === "dategroup";
    }
  },
  watch: {
    datetime() {
      this.text = "";
      this.setCurrent(this.datetime.join(","));
    }
  },
  created() {
    if (this.isDategroup) {
      this.init();
    }
  },
  mounted() {},
  methods: {
    handleChange(val) {
      this.setCurrent(val);
    },
    setCurrent(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
    init() {
      this.menu = [
        {
          label: "今天",
          value: GetDateStr(0)
        },
        {
          label: "昨天",
          value: GetDateStr(-1)
        },
        {
          label: "近7天",
          value: GetDateStr(-7)
        },
        {
          label: "全部",
          value: "-1"
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

