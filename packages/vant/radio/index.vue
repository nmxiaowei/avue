<template>
  <div class="avue-cell">
    <van-cell :title="label"
              :class="{'van-cell--required':required}"
              v-if="tags">
      <van-tag class="avue-cell__tags"
               plain
               v-for="(item,index) in dic"
               :type="text===item[valueKey]?'primary':''"
               :key="index"
               @click.native="handleRadioClick(item[valueKey])">{{item[labelKey]}}</van-tag>
    </van-cell>
    <van-radio-group v-model="text"
                     @change="handleChange"
                     v-else>
      <p :class="['avue-cell__title',{'avue-cell__title--required':required}]">
        {{label}}
        <small class="avue-cell__tip"
               v-if="tip">{{tip}}</small>
      </p>
      <van-cell-group>
        <van-cell v-for="(item,index) in dic "
                  :key="index"
                  :title="item[labelKey]"
                  clickable
                  :disabled="disabled"
                  @click="handleRadioClick(item[valueKey])">
          <van-radio :name="item[valueKey]" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "radio",
  mixins: [props(), event()],
  props: {
    tags: {
      type: Boolean,
      default: false
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
      if (this.disabled) return;
      this.text = value;
      this.handleClick();
    }
  }
});
</script>

