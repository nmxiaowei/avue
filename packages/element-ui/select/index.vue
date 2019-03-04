<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :filterable="remote?true:filterable"
             :remote="remote"
             :readonly="readonly"
             :remote-method="handleRemoteMethod"
             :collapse-tags="tags"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder"
             @click.native="handleClick"
             :multiple-limit="limit"
             :disabled="disabled">
    <el-option v-for="(item,index) in remote?netDic:dic"
               :key="index"
               :disabled="item[disabledKey]"
               :label="item[labelKey]"
               :value="item[valueKey]">
      <slot :name="prop+'Type'"
            :label="labelKey"
            :value="valueKey"
            :item="item"></slot>
    </el-option>
  </el-select>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { sendDic } from "core/dic";
export default create({
  name: "select",
  mixins: [props(), event()],
  data() {
    return {
      netDic: []
    };
  },
  props: {
    value: {},
    remote: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 99
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    text: {
      handler() {
        this.handleChange(this.text);
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRemoteMethod(query) {
      sendDic({
        url: this.dicUrl.replace("{{key}}", query),
        method: this.dicMethod,
        query: this.dicQuery
      }).then(res => {
        this.netDic = res;
      });
    }
  }
});
</script>