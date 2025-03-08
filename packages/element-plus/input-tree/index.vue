<template>
  <el-tree-select ref="tree"
                  :class="b()"
                  :cache-data="cacheData"
                  v-model="text"
                  :loading="loading"
                  :lazy="lazy"
                  :load="handleLoad"
                  :size="size"
                  @check="checkChange"
                  :filter-node-method="filterNodeMethod"
                  :render-after-expand="false"
                  :loading-text="loadingText"
                  :collapse-tags="tags"
                  :clearable="clearableVal"
                  :placeholder="placeholder"
                  :popper-class="popperClass"
                  :popper-append-to-body="popperAppendToBody"
                  :multiple="multiple"
                  :node-key="valueKey"
                  :show-checkbox="multiple"
                  :filterable="filterable"
                  :check-strictly="checkStrictly"
                  :disabled="disabled"
                  :accordion="accordion"
                  :icon-class="iconClass"
                  :indent="indent"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  :check-on-click-leaf="checkOnClickLeaf"
                  :default-checked-keys="keysList"
                  :default-expanded-keys="defaultExpandedKeys?defaultExpandedKeys:keysList"
                  :default-expand-all="defaultExpandAll"
                  :check-on-click-node="checkOnClickNode"
                  :expand-on-click-node="expandOnClickNode"
                  @node-click.self="handleNodeClick"
                  :props="treeProps"
                  :data="netDic">
    <template #="{data,node}">
      <slot v-if="$slots.default"
            :label="labelKey"
            :value="valueKey"
            :node="node"
            :item="data"></slot>
      <span v-else
            style="margin-left:8px;">
        <span>{{getLabelText(data)}}</span>
        <span :class="b('desc')"
              v-if="data[descKey]">{{ data[descKey] }}</span>
      </span>
    </template>
  </el-tree-select>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { DIC_SHOW_SPLIT } from 'global/variable';
import { DIC_PROPS } from 'global/variable';
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      netDic: [],
      loading: false,
    };
  },
  props: {
    cacheData: [Object, Array],
    indent: Number,
    filterNodeMethod: Function,
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
    modelValue: {},
    loadingText: {
      type: String,
    },
    lazy: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    checkOnClickLeaf: Boolean,
    filterable: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: (props) => props.multiple ? false : true
    },
    accordion: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
    },
    defaultExpandedKeys: Array,
    checkOnClickNode: Boolean,
    expandOnClickNode: Boolean,
    defaultExpandAll: Boolean,
    popperAppendToBody: Boolean,
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    },
    netDic: {
      handler () {
        this.init();
      },
      immediate: true
    },
  },
  computed: {
    keysList () {
      return this.multiple ? this.text : [this.text || '']
    },
    treeProps () {
      return Object.assign(this.deepClone(DIC_PROPS), this.props, {
        isLeaf: this.leafKey
      })
    }
  },
  methods: {
    handleTextValue (value) {
      this.init();
    },
    getHalfList () {
      let list = this.$refs.tree.getCheckedNodes(false, true)
      list = list.map(ele => ele[this.valueKey])
      return list;
    },
    init () {
      this.disabledParentNode(this.dic, this.parent);
    },
    disabledParentNode (dic, parent) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!this.validatenull(children)) {
          if (!parent) {
            ele.disabled = true;
          }
          this.disabledParentNode(children, parent);
        }
      });
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      if (typeof this.checked === "function") this.checked(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
    },
    handleNodeClick (data, node, nodeComp) {
      if (typeof this.nodeClick === "function") this.nodeClick(data, node, nodeComp);
    },
    handleLoad (node, resolve) {
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
        findDic(this.netDic, node.key, list)
        resolve(list);
      }
      this.treeLoad && this.treeLoad(node, callback)
    }
  }
});
</script>
