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
             :disabled="disabled"
             :readonly="true">
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
import { DIC_SPLIT } from 'global/variable';
import { findLabelNode } from 'utils/util'
import { validatenull } from "utils/validate";
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      node: {},
      filterText: "",
      box: false,
      labelText: this.multiple ? [] : ""
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
        this.handleChange(value);
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
      if (this.validatenull(this.value)) {
        return ''
      } else if (this.multiple) {
        return (this.labelText || []).join(DIC_SPLIT).toString()
      }
      return this.getLabelText(this.node);
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
      this.labelText = [];
      const list = checkedKeys.checkedNodes;
      list.forEach(node => {
        if (validatenull(node[this.childrenKey]) && !this.checkStrictly) {
          this.text.push(node[this.valueKey]);
          this.labelText.push(node[this.labelKey]);
        } else if (this.checkStrictly) {
          this.text.push(node[this.valueKey]);
          this.labelText.push(node[this.labelKey]);
        }
      });
      if (typeof this.checked === "function") this.checked(checkedNodes);
      const result =
        this.isString && this.multiple ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    },
    init () {
      if (this.multiple) {
        this.labelText = [];
      } else {
        this.labelText = "";
      }
      const check = setInterval(() => {
        if (validatenull(this.dic)) {
          this.labelText = "";
          clearInterval(check);
          return;
        }
        //是否禁止父类
        this.disabledParentNode(this.dic, this.parent);
        if (this.multiple) {
          this.labelText = [];
          if (!validatenull(this.text)) {
            this.text.forEach(ele => {
              //特殊处理0
              ele = validatenull(ele) ? 0 : ele;
              const label = findLabelNode(this.dic, ele, this.props) || ele;
              this.labelText.push(label)
            });
          }
        } else {
          this.labelText = "";
          if (!validatenull(this.text)) {
            this.labelText = this.text;
            const label = findLabelNode(this.dic, this.text, this.props) || this.text;
            this.node = {}
            this.node[this.labelKey] = label
            this.labelText = label
          }
        }
        setTimeout(() => {
          this.$partent && this.$partent.$parent.clearValidate();
        }, 0);
        clearInterval(check);
      }, 500);
    },
    disabledParentNode (dic, parent) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!validatenull(children)) {
          if (!parent) {
            ele.disabled = true;
          }
          this.disabledParentNode(children, parent);
        }
      });
    },
    clearHandle () {
      let allNode = document.querySelectorAll('.tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
      this.$refs.tree.setCheckedKeys([]);
    },
    handleNodeClick (data) {
      const callback = () => {
        this.node = data;
        this.$refs.main.blur();
      };
      if (data.disabled) return
      if (typeof this.nodeClick === "function") this.nodeClick(data);
      if (this.multiple) return;
      if (
        (validatenull(data[this.childrenKey]) && !this.multiple) ||
        this.parent
      ) {
        const value = data[this.valueKey];
        const label = data[this.labelKey];
        const result = this.isString && this.multiple ? value.join(",") : value;
        this.text = value;
        this.labelText = label;
        this.$emit("input", result);
        this.$emit("change", result);
        callback();
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
