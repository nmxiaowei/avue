<template>
  <div class="avue-cell">
    <van-field v-model="textLabel"
               :placeholder="placeholder"
               :clearable="clearable"
               :left-icon="prefixIcon"
               :disabled="disabled"
               is-link
               input-align="right"
               :required="required"
               @click.native="handleDateClick"
               readonly
               :icon="suffixIcon"
               :label="label" />
    <van-popup v-model="box"
               position="bottom">
      <van-datetime-picker ref="picker"
                           :title="label"
                           type="time"
                           @cancel="handleCancel"
                           @confirm="handleConfirm" />
    </van-popup>
  </div>
</template>

<script>
import dayjs from "dayjs";
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { getDateValues } from "utils/date";
const formatDafault = {
  time: "hh:mm"
};
export default create({
  name: "time",
  mixins: [props(), event()],
  props: {
    valueFormat: {
      default: function() {
        return formatDafault[this.type];
      }
    },
    format: {
      default: function() {
        return formatDafault[this.type];
      }
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      box: false,
      textLabel: ""
    };
  },
  watch: {
    value: {
      handler() {
        this.initVal();
        this.init();
      },
      immediate: true
    },
    box() {
      if (this.box) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.picker.$refs.picker.setValues(
              getDateValues("2019-01-01 " + this.text, this.valueFormat)
            );
          }, 0);
        });
      }
    },
    text() {
      this.handleChange(this.value);
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    init() {
      this.handleSetLabel(this.text);
    },
    handleSetLabel(value) {
      const date = new Date("2019-01-01 " + value);
      if (!this.validatenull(date)) {
        this.textLabel = dayjs(date).format(this.format);
      }
    },
    handleDateClick() {
      this.show();
      this.handleClick();
    },
    handleConfirm(value) {
      const date = new Date("2019-01-01 " + value);
      this.handleSetLabel(date);
      this.text = dayjs(date).format(this.valueFormat);
      this.handleChange(this.text);
      this.hide();
    },
    show() {
      this.box = true;
    },
    hide() {
      this.box = false;
    },
    handleCancel() {
      this.hide();
    }
  }
});
</script>

