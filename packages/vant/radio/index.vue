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
                 :plain="text!==item[valueKey]"
                 size="medium"
                 v-for="(item,index) in dic"
                 :type="text===item[valueKey]?'primary':'default'"
                 :key="index"
                 @click.native="text=item[valueKey]">{{item[labelKey]}}</van-tag>
      </template>
      <van-radio-group v-show="!tags"
                       v-model="text"
                       slot="input"
                       :disabled="disabled"
                       :direction="direction">
        <van-radio v-for="(item,index) in dic "
                   :key="index"
                   :name="item[valueKey]">
          {{item[labelKey]}}
        </van-radio>
      </van-radio-group>
    </template>

  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "radio",
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
  }
});
</script>

