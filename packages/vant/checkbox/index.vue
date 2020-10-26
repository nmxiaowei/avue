<template>
  <van-field :class="b('mobile')"
             :placeholder="placeholder"
             :rules="rules"
             :clearable="clearable"
             :disabled="disabled"
             :input-align="inputAlign"
             :required="required"
             @click.native="handleClick"
             readonly
             :label="label">
    <template slot="input">
      <template v-if="tags">
        <van-tag class="avue__tag"
                 :plain="!text.includes(item[valueKey])"
                 size="medium"
                 v-for="(item,index) in dic"
                 :type="text.includes(item[valueKey])?'primary':'default'"
                 :key="index"
                 @click.native="handleCheckboxClick(index)">{{item[labelKey]}}</van-tag>
      </template>
      <van-checkbox-group v-show="!tags"
                          v-model="text"
                          :disabled="disabled"
                          :direction="direction">
        <van-checkbox ref="checkbox"
                      v-for="(item,index) in dic "
                      :key="index"
                      shape="square"
                      :name="item[valueKey]">
          {{item[labelKey]}}
        </van-checkbox>
      </van-checkbox-group>
    </template>

  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
  mixins: [props(), event()],
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    tags: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {};
  },
  watch: {},
  computed: {},
  created () { },
  mounted () { },
  methods: {
    handleCheckboxClick (index) {
      this.$refs.checkbox[index].toggle();
      this.handleClick();
    }
  }
});
</script>

