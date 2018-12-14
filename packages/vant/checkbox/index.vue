<template>
  <div class="avue-cell">
    <van-checkbox-group v-model="text" @change="handleChange" :max="max">
      <p :class="['avue-cell__title',{'avue-cell__title--required':required}]">{{label}}</p>
      <van-cell-group>
        <van-cell
          v-for="(item,index) in dic "
          :key="index"
          :title="item[labelKey]"
          clickable
          :disabled="disabled"
          @click="handleCheckboxClick(index)"
        >
          <van-checkbox :name="item[valueKey]" ref="checkbox"/>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
import create from "core/create";
import { findByValue } from "utils/util";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
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
    handleCheckboxClick(index) {
      this.$refs.checkbox[index].toggle();
      this.handleClick();
    }
  }
});
</script>

