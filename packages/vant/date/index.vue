<template>
  <div class="avue-cell">
    <van-field v-model="textLabel"
               :placeholder="placeholder"
               :clearable="clearable"
               :left-icon="prefixIcon"
               is-link
               :disabled="disabled"
               input-align="right"
               :required="required"
               @click.native="handleDateClick"
               readonly
               :icon="suffixIcon"
               :label="label" />
    <van-popup v-model="box"
               position="bottom">
      <van-datetime-picker :title="label"
                           v-model="date"
                           :type="type"
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
const formatDafault = {
  datetime: "yyyy-MM-dd hh:mm:ss",
  date: "yyyy-MM-dd"
};
export default create({
  name: "date",
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
    }
  },
  data () {
    return {
      date: '',
      box: false,
      textLabel: "",
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
  computed: {
    isTimestamp () {
      return this.valueFormat === "timestamp";
    }
  },
  methods: {
    getLabelShow (val) {
      let value = val || this.date
      if (!this.validatenull(value)) {
        const date = new Date(value);
        const format = this.format.replace("dd", "DD").replace("yyyy", "YYYY");
        const valueFormat = this.valueFormat.replace("dd", "DD").replace("yyyy", "YYYY");
        this.textLabel = dayjs(date).format(format);
        if (this.isTimestamp) {
          this.text = new Date(value).getTime();
        } else {
          this.text = dayjs(value).format(valueFormat);
        }
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

