<template>
  <el-select :class="b()"
             :size="size"
             ref="main"
             @click.native="initScroll"
             :value="labelShow"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder"
             @change="handleChange"
             @focus="handleFocus"
             @blur="handleBlur"
             :disabled="disabled">
    <div v-if="filter"
         style="padding:0 10px;margin:5px 0 0 0;">
      <el-input size="mini"
                placeholder="输入关键字进行过滤"
                v-model="filterText"></el-input>
    </div>
    <el-option :value="text">
      <el-tree :data="dicList"
               class="tree-option"
               style="padding:10px 0;"
               :lazy="lazy"
               :load="treeLoad"
               :node-key="valueKey"
               :accordion="accordion"
               :icon-class="iconClass"
               :show-checkbox="multiple"
               :props="treeProps"
               :check-strictly="checkStrictly"
               ref="tree"
               :highlight-current="!multiple"
               :current-node-key="multiple?'':text"
               @check="checkChange"
               :filter-node-method="filterNode"
               :default-expanded-keys="defaultExpandedKeys?defaultExpandedKeys:(defaultExpandAll?[]:keysList)"
               :default-checked-keys="defaultCheckedKeys?defaultCheckedKeys:keysList"
               :default-expand-all="defaultExpandAll"
               @node-click.self="handleNodeClick">
        <div style="width:100%;padding-right:10px;"
             slot-scope="{ data }">
          <slot :name="prop+'Type'"
                :label="labelKey"
                :value="valueKey"
                :item="data"
                v-if="typeslot"></slot>
          <slot v-else-if="$scopedSlots.default"
                :label="labelKey"
                :value="valueKey"
                :item="data"></slot>
          <span v-else
                :class="{'avue--disabled':data[disabledKey]}">{{data[labelKey]}}</span>
        </div>
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { DIC_SHOW_SPLIT } from 'global/variable';
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      node: [],
      filterText: "",
      box: false,
      labelText: []
    };
  },
  props: {
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
    value: {},
    lazy: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: false
    },
    includeHalfChecked: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: true
    },
    defaultExpandedKeys: {
      type: Array,
    },
    iconClass: {
      type: String,
    },
    defaultCheckedKeys: {
      type: Array,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    text: {
      handler (value) {
        if (this.validatenull(value)) {
          this.clearHandle();
        }
      },
    },
    dic () {
      this.init();
    },
    value () {
      this.initVal();
      this.init();
    },
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    treeProps () {
      return Object.assign(this.props, {
        isLeaf: this.leafKey
      })
    },
    dicList () {
      function addParent (result, parent) {
        result.forEach(ele => {
          const children = ele.children;
          if (children) {
            addParent(children, ele);
          }
          if (parent) {
            ele.$parent = parent;
          }
        });
      }
      let list = this.dic;
      addParent(list);
      return list;
    },
    keysList () {
      if (this.validatenull(this.text)) {
        return [];
      }
      return this.multiple ? this.text : [this.text];
    },
    labelShow () {
      if (this.typeformat) {
        let list = [];
        this.node.forEach(ele => {
          list.push(this.getLabelText(ele))
        })
        return list.join(DIC_SHOW_SPLIT).toString()
      }
      return (this.labelText || []).join(DIC_SHOW_SPLIT).toString()
    },
  },
  mounted () {
    this.init();
  },
  methods: {
    // 初始化滚动条
    initScroll () {
      setTimeout(() => {
        this.$nextTick(() => {
          let scrollBar = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')
          scrollBar.forEach(ele => {
            ele.scrollTop = 0;
          })
        })
      }, 0)
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.text = [];
      this.node = [];
      this.labelText = [];
      const list = this.$refs.tree.getCheckedNodes(this.leafOnly, this.includeHalfChecked);
      list.forEach(node => {
        this.node.push(node)
        this.text.push(node[this.valueKey]);
        this.labelText.push(node[this.labelKey]);
      });
      if (typeof this.checked === "function") this.checked(checkedNodes);
      const result =
        this.isString && this.multiple ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    },
    init () {
      this.$nextTick(() => {
        this.labelText = [];
        this.node = [];
        if (this.multiple) {
          let list = this.$refs.tree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
          list.forEach(ele => {
            this.labelText.push(ele[this.labelKey])
            this.node.push(ele);
          })
        } else {
          let node = this.$refs.tree.getNode(this.text)
          if (node) {
            let data = node.data
            this.$refs.tree.setCurrentKey(data[this.valueKey])
            this.labelText.push(data[this.labelKey])
            this.node.push(data);
          }
        }
      })
      //是否禁止父类
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
    clearHandle () {
      this.$refs.tree.setCurrentKey(null)
      this.$refs.tree.setCheckedKeys([]);
    },
    handleNodeClick (data) {
      if (data.disabled) return
      if (typeof this.nodeClick === "function") this.nodeClick(data);
      if (this.multiple) return;
      if (
        (this.validatenull(data[this.childrenKey]) && !this.multiple) ||
        this.parent
      ) {
        const value = data[this.valueKey];
        const label = data[this.labelKey];
        const result = this.isString && this.multiple ? value.join(",") : value;
        this.text = value;
        this.node = [data];
        this.labelText = [label];
        this.$refs.main.blur();
        this.$emit("input", result);
        this.$emit("change", result);
      }
    },
    handleClick () {
      const result =
        this.isString && this.multiple ? this.text.join(",") : this.text;
      if (typeof this.click === "function")
        this.click({ value: result, column: this.column });
    },
    handleChange (value) {
      let text = this.text;
      const result = this.isString && this.multiple ? value.join(",") : value;
      if (typeof this.change === "function") {
        this.change({ value: result, column: this.column });
      }
      this.$emit("input", result);
      this.$emit("change", result);
    }
  }
});
</script>
