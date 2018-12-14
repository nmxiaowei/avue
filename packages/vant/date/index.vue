<template>
  <div class="avue-cell">
    <van-field
      v-model="textLabel"
      :placeholder="placeholder"
      :clearable="clearable"
      :left-icon="prefixIcon"
      is-link
      :required="required"
      @click.native="handleDateClick"
      readonly
      :icon="suffixIcon"
      :label="label"
    />
    <van-popup v-model="box" position="bottom">
      <van-datetime-picker
        :title="label"
        ref="picker"
        :type="type"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from "dayjs";
import create from "core/create";
import { findByValue } from "utils/util";
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
      textLabel: "",
      picker: ""
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
          console.log(this.$refs.picker);
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
      const format = this.format.replace("dd", "DD").replace("yyyy", "YYYY");
      this.textLabel = dayjs(value).format(format);
    },
    handleDateClick() {
      this.show();
      this.handleClick();
    },
    handleConfirm(value) {
      const format = this.format.replace("dd", "DD").replace("yyyy", "YYYY");
      const valueFormat = this.valueFormat
        .replace("dd", "DD")
        .replace("yyyy", "YYYY");
      this.handleSetLabel(value);
      this.text = dayjs(value).format(valueFormat);
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

