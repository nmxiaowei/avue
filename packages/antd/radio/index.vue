<template>
  <div :class="b()">
    <a-radio-group v-model="text"
                   :readonly="readonly"
                   :disabled="disabled"
                   @click.native="handleClick"
                   @change="handleChange"
                   :buttonStyle="border?'outline':'solid'">
      <component :is="componentName"
                 v-for="(item,index) in netDic"
                 :disabled="item[disabledKey]"
                 :value="item[valueKey]">{{item[labelKey]}}</component>
    </a-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "radio",
  mixins: [props(), event()],
  data () {
    return {
      name: 'radio',
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

