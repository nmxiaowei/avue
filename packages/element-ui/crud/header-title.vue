<template #header  v-if="vaildData($parent.tableOption.title,false) || vaildData($parent.tableOption.dateBtn,config.dateBtn)">
  <div :class="b('title')">
    <p>{{$parent.tableOption.title}}</p>
    <avue-date type="dategroup"
               @change="dateChange"
               v-if="vaildData($parent.tableOption.dateBtn,config.dateBtn)"
               :default="vaildData($parent.tableOption.dateDefault,config.dateDefault)"
               :size="$parent.isMediumSize"></avue-date>
  </div>
</template>

<script>
import create from "core/create";
import config from "./config";
import { vaildData } from "utils/util";
export default create({
  name: "crud",
  data () {
    return {
      config: config
    };
  },
  created () {
    this.vaildData = vaildData;
  },
  methods: {
    //日期组件回调
    dateChange (val) {
      this.$parent.$emit("date-change", val);
    }
  }
});
</script>
