<template>
  <div class="avue-cell">
    <van-cell :title="label"
              :class="{'van-cell--required':required}"
              v-if="tags">
      <van-tag class="avue-cell__tags"
               plain
               v-for="(item,index) in dic"
               :type="text.includes(item[valueKey])?'primary':''"
               :key="index"
               @click.native="handleCheckboxClick(index)">{{item[labelKey]}}</van-tag>
    </van-cell>
    <van-checkbox-group v-show="!tags"
                        v-model="text"
                        @change="handleChange"
                        :max="max">
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
                  @click="handleCheckboxClick(index)">
          <van-checkbox :name="item[valueKey]"
                        ref="checkbox" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
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
    handleCheckboxClick(index) {
      this.$refs.checkbox[index].toggle();
      this.handleClick();
    }
  }
});
</script>

