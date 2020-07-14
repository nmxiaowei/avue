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
      <van-datetime-picker v-model="date"
                           :title="label"
                           type="time"
                           @cancel="hide"
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
      default: function () {
        return formatDafault[this.type];
      }
    },
    format: {
      default: function () {
        return formatDafault[this.type];
      }
    },
  },
  data () {
    return {
      date: "",
      box: false,
      textLabel: ""
    };
  },
  watch: {
    text: {
      handler (val) {
        this.getLabelShow(val);
      },
      immediate: true
    }
  },
  methods: {
    getLabelShow (val) {
      let value = val || this.date
      if (!this.validatenull(value)) {
        const date = new Date("2020/02/02 " + value);
        this.textLabel = dayjs(date).format(this.format);
        this.text = dayjs(date).format(this.valueFormat);
      }
    },
    handleDateClick () {
      this.show();
      this.handleClick();
    },
    handleConfirm (value) {
      this.getLabelShow();
      this.hide();
    },
    show () {
      this.box = true;
      this.date = this.text;
    },
    hide () {
      this.box = false;
      this.date = ''
    }
  }
});
</script>

