<template>
  <el-cascader :options="dic"
               v-model="text"
               :placeholder="placeholder"
               :props="allProps"
               :size="size"
               :clearable="clearableVal"
               :show-all-levels="showAllLevels"
               :filterable="filterable"
               :popper-class="popperClass"
               :separator="separator"
               :disabled="disabled"
               :collapse-tags="tags"
               @focus="handleFocus"
               @blur="handleBlur"
               @click.native="handleClick">
    <template slot-scope="{data,node}">
      <slot v-if="$scopedSlots.default"
            :data="data"
            :node="node"></slot>
      <span v-else>{{data[labelKey]}}</span>
    </template>
  </el-cascader>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
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
    tags: {
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
    lazy: {
      type: Boolean,
      default: false
    },
    lazyLoad: Function,
    filterable: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String
    }
  },
  data () {
    return {};
  },
  computed: {
    allProps () {
      return {
        label: this.labelKey,
        value: this.valueKey,
        children: this.childrenKey,
        checkStrictly: this.checkStrictly,
        multiple: this.multiple,
        emitPath: this.emitPath,
        lazy: this.lazy,
        lazyLoad: (node, resolve) => {
          let callback = (list) => {
            let findDic = (list, value, children) => {
              list.forEach(ele => {
                if (ele[this.valueKey] == value) {
                  ele[this.childrenKey] = children
                } else if (ele[this.childrenKey]) {
                  findDic(ele[this.childrenKey])
                }
              })
            }
            findDic(this.dic, node[this.valueKey], list)
            resolve(list);
          }
          this.lazyLoad && this.lazyLoad(node, callback)
        },
        expandTrigger: this.expandTrigger
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
  }
});
</script>
