<template>
  <div class="avue-cell">
    <van-field v-model="textLabel"
               :placeholder="placeholder"
               :disabled="disabled"
               :clearable="clearable"
               :left-icon="prefixIcon"
               is-link
               input-align="right"
               :required="required"
               @click.native="handleSelectClick"
               readonly
               :icon="suffixIcon"
               :label="label" />
    <van-popup v-model="box"
               position="bottom">
      <van-picker ref="picker"
                  show-toolbar
                  :title="label"
                  :columns="columns"
                  @cancel="handleCancel"
                  @confirm="handleConfirm" />
    </van-popup>
  </div>
</template>

<script>
import create from "core/create";
import { findByValue } from "utils/util";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "select",
  mixins: [props(), event()],
  props: {
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
      textIndex: 0
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
    dic() {
      this.init();
    },
    box() {
      if (this.box) {
        this.$nextTick(() => {
          this.$refs.picker.setIndexes([this.textIndex]);
        });
      }
    },
    text() {
      this.handleChange(this.value);
    }
  },
  computed: {
    columns() {
      let list = this.dic.map(ele =>
        Object.assign({ text: ele[this.labelKey] }, ele)
      );
      return list;
    }
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    handleSelectClick() {
      if (this.disabled) return;
      this.show();
      this.handleClick();
    },
    handleConfirm(value, index) {
      const dicObj = this.dic[index];
      this.text = dicObj[this.valueKey];
      this.textLabel = dicObj[this.labelKey];
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
    },
    init() {
      if (!this.validatenull(this.text)) {
        this.textLabel = findByValue(this.dic, this.text, this.props, true);
        this.textIndex = this.columns.findIndex(
          ele => ele.text === this.textLabel
        );
      }
    }
  }
});
</script>

