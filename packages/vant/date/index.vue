<template>
  <div>
    <van-field v-model="textLabel"
               :rules="rules"
               :placeholder="placeholder"
               :clearable="clearable"
               :left-icon="prefixIcon"
               :disabled="disabled"
               :input-align="inputAlign"
               :required="required"
               @click.native="handleDateClick"
               readonly
               :icon="suffixIcon"
               :label="label">
    </van-field>
    <van-popup v-model="box"
               position="bottom">
      <van-datetime-picker v-if="isTimeType"
                           :title="label"
                           v-model="time"
                           :type="type"
                           @cancel="hide"
                           :min-date="minDate"
                           :max-date="maxDate"
                           :min-hour="minHour"
                           :max-hour="maxHour"
                           :min-minute="minMinute"
                           :max-minute="maxMinute"
                           @confirm="handleConfirm" />
      <van-datetime-picker v-else
                           :title="label"
                           v-model="date"
                           :type="type"
                           @cancel="hide"
                           :min-date="minDate"
                           :max-date="maxDate"
                           :min-hour="minHour"
                           :max-hour="maxHour"
                           :min-minute="minMinute"
                           :max-minute="maxMinute"
                           @confirm="handleConfirm" />
    </van-popup>

  </div>
</template>

<script>
import dayjs from "dayjs";
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
const formatDafault = {
  datetime: "YYYY-MM-DD hh:mm:ss",
  date: "YYYY-MM-DD",
  time: 'hh:mm:ss'
};
function formatDetail (val) {
  return val.replace("dd", "DD").replace("yyyy", "YYYY");
}
export default create({
  mixins: [props(), event()],
  props: {
    minDate: Date,
    maxDate: Date,
    minHour: [String, Number],
    maxHour: [String, Number],
    minMinute: [String, Number],
    maxMinute: [String, Number],
    valueFormat: {
      default: function () {
        return formatDafault[this.type];
      }
    },
    format: {
      default: function () {
        return formatDafault[this.type];
      }
    }
  },
  data () {
    return {
      date: '',
      time: '',
      oldDate: '',
      box: false,
    };
  },
  watch: {
    text: {
      handler () {
        this.setDate();
      },
      immediate: true
    }
  },
  computed: {
    isTimestamp () {
      return this.valueFormat === "timestamp";
    },
    isTimeType () {
      return this.type === "time"
    },
    textLabel () {
      if (this.validatenull(this.oldDate)) {
        return ''
      }
      return dayjs(this.oldDate).format(formatDetail(this.format));
    }
  },
  methods: {
    setDate () {
      let value = this.text;
      if (this.validatenull(value)) {
        return new Date()
      }
      if (this.isTimeType) {
        this.time = value;
        value = dayjs().format(formatDafault.date) + ` ${value}`
      }
      this.date = dayjs(value).toDate()
      this.oldDate = dayjs(value).toDate()
    },
    setVal () {
      this.oldDate = this.date;
      if (this.isTimeType) {
        this.text = this.time;
      } else if (this.isTimestamp) {
        this.text = new Date(this.oldDate).getTime();
      } else {
        this.text = dayjs(this.oldDate).format(formatDetail(this.valueFormat));
      }
    },
    handleDateClick () {
      this.handleClick();
      if (this.disabled || this.readonly) return
      this.setDate();
      this.show();
    },
    handleConfirm () {
      this.setVal()
      this.hide();
    },
    show () {
      this.box = true;
    },
    hide () {
      this.box = false;
    }
  }
});
</script>

