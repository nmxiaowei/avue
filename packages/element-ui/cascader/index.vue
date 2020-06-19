<template>
  <el-cascader :options="dic"
               v-model="text"
               :placeholder="placeholder"
               :props="allProps"
               :readonly="readonly"
               :size="size"
               :emit-path="emitPath"
               :change-on-select="changeOnSelect"
               :clearable="disabled?false:clearable"
               :expand-trigger="expandTrigger"
               :show-all-levels="showAllLevels"
               :filterable="filterable"
               :separator="separator"
               :disabled="disabled"
               @click.native="handleClick">
    <template slot-scope="{ node, data }"
              v-if="typeslot">
      <slot :name="prop+'Type'"
            :data="data"
            :node="node"></slot>
    </template>
  </el-cascader>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "cascader",
  mixins: [props(), event()],
  props: {
    checkStrictly: {
      type: Boolean,
      default: false
    },
    emitPath: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => []
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: "hover"
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "/"
    }
  },
  data () {
    return {};
  },
  watch: {},
  computed: {
    allProps () {
      return Object.assign(this.props, {
        checkStrictly: this.checkStrictly,
        multiple: this.multiple
      })
    }
  },
  created () { },
  mounted () { },
  methods: {
  }
});
</script>
