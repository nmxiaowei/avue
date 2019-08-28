<template>
  <div :class="b()">
    <a-select v-model="text"
              :placeholder="placeholder"
              :readonly="readonly"
              :disabled="disabled"
              @click.native="handleClick"
              @change="handleChange">
      <a-select-option v-for="(item,index) in netDic"
                       :disabled="item[disabledKey]"
                       :value="item[valueKey]">{{getLabelText(item)}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "select",
  mixins: [props(), event()],
  data () {
    return {
      netDic: []
    };
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    },
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>

