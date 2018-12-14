<template>
  <div class="avue-cell">
    <van-radio-group v-model="text" @change="handleChange">
      <p :class="['avue-cell__title',{'avue-cell__title--required':required}]">{{label}}</p>
      <van-cell-group>
        <van-cell
          v-for="(item,index) in dic "
          :key="index"
          :title="item[labelKey]"
          clickable
          :disabled="disabled"
          @click="handleRadioClick(item[valueKey])"
        >
          <van-radio :name="item[valueKey]"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import { findByValue } from "utils/util";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "radio",
  mixins: [props(), event()],
  props: {
    rules: {
      type: Array
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleRadioClick(value) {
      this.text = value;
      this.handleClick();
    }
  }
});
</script>

