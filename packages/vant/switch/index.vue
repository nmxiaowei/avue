<template>
  <van-field :placeholder="placeholder"
             :rules="rules"
             :clearable="clearable"
             :disabled="disabled"
             :input-align="inputAlign"
             :required="required"
             @click.native="handleClick"
             readonly
             :label="label">
    <van-switch slot="input"
                v-model="text"
                :size="setPx(len)"
                :active-color="activeColor"
                :inactive-color="inactiveColor"
                :active-value="active[valueKey]"
                :inactive-value="inactive[valueKey]"
                :readonly="readonly"
                :disabled="disabled" />
  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    activeColor: String,
    inactiveColor: String,
    len: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
    };
  },
  watch: {},
  computed: {
    active () {
      return this.dic[1] || {};
    },
    inactive () {
      return this.dic[0] || {};
    }
  }
});
</script>


