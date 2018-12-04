<template>
  <div
    slot="header"
    :class="b('title')"
    v-if="vaildData($parent.tableOption.title,false) || vaildData($parent.tableOption.dateBtn,config.dateBtn)"
  >
    <span>{{$parent.tableOption.title}}</span>
    <avue-date
      type="dategroup"
      @change="dateChange"
      v-if="vaildData($parent.tableOption.dateBtn,config.dateBtn)"
      :default="vaildData($parent.tableOption.dateDefault,config.dateDefault)"
      :size="$parent.isMediumSize"
    ></avue-date>
  </div>
</template>

<script>
import create from "core/create";
import config from "./config";
import { vaildData } from "utils/util";
export default create({
  name: "crud",
  data() {
    return {
      config: config
    };
  },
  created() {
    this.$parent = this.$parent.$parent;
    this.vaildData = vaildData;
  },
  methods: {
    //日期组件回调
    dateChange(val) {
      this.$parent.$emit("date-change", val);
    }
  }
});
</script>
