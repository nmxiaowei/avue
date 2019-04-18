<template>
  <div>
    <el-select v-model="text"
               :size="size"
               :multiple="multiple"
               :filterable="remote?true:filterable"
               :remote="remote"
               :readonly="readonly"
               :remote-method="handleRemoteMethod"
               :collapse-tags="tags"
               :clearable="disabled?false:clearable"
               @click.native="handleClick"
               :placeholder="placeholder"
               :multiple-limit="limit"
               :disabled="disabled">
      <el-option v-for="(item,index) in netDic"
                 :key="index"
                 :disabled="item[disabledKey]"
                 :label="getLabelText(item)"
                 :value="item[valueKey]">
        <slot :name="prop+'Type'"
              :label="labelKey"
              :value="valueKey"
              :item="item"></slot>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import create from "../../utils/create";
import { sendDic } from "../../utils/dic";
import crudCompoents from "../../mixins/crud-compoents.js";
import crudFun from "../../mixins/crud-fun.js";
export default create({
  name: "crud-select",
  mixins: [crudCompoents(), crudFun()],
  data() {
    return {
      netDic: []
    };
  },
  props: {
    value: {},
    tpyeformat: Function,
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
    dic: {
      handler(val) {
        this.netDic = val;
      },
      immediate: true
    },
    text: {
      handler(val) {
        this.handleChange(val);
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getLabelText(item) {
      if (typeof this.tpyeformat === "function") {
        return this.tpyeformat(item, this.labelKey, this.valueKey);
      }
      return item[this.labelKey];
    },
    handleRemoteMethod(query) {
      sendDic({
        url: this.dicUrl.replace("{{key}}", query)
      }).then(res => {
        this.netDic = res;
      });
    }
  }
});
</script>