<template>
  <el-select :class="b()"
             :size="size"
             ref="main"
             :multiple="multiple"
             :multiple-limit="limit"
             :collapse-tags="tags"
             @click="handleClick"
             :value="labelShow"
             :clearable="clearableVal"
             :placeholder="placeholder"
             :popper-class="popperClass"
             :popper-append-to-body="popperAppendToBody"
             @focus="handleFocus"
             @blur="handleBlur"
             @clear="handleClear"
             :disabled="disabled">
    <div v-if="filter"
         :class="b('filter')">
      <el-input size="mini"
                :placeholder="filterText"
                v-model="filterValue"></el-input>
    </div>
    <el-option :value="text">
      <el-tree :data="dicList"
               :class="b('select')"
               :lazy="lazy"
               :load="handleTreeLoad"
               :node-key="valueKey"
               :accordion="accordion"
               :icon-class="iconClass"
               :show-checkbox="multiple"
               :expand-on-click-node="expandOnClickNode"
               :props="treeProps"
               :check-strictly="checkStrictly"
               ref="tree"
               :highlight-current="multiple!=true"
               :current-node-key="currentNodeKey"
               @check="checkChange"
               :filter-node-method="filterNode"
               :default-checked-keys="keysList"
               :default-expanded-keys="defaultExpandedKeys?defaultExpandedKeys:keysList"
               :default-expand-all="defaultExpandAll"
               @node-click.self="handleNodeClick">
        <div slot-scope="{ data }"
             :class="b('item')">
          <slot v-if="$scopedSlots.default"
                :label="labelKey"
                :value="valueKey"
                :item="data"></slot>
          <template v-else>
            <span :class="{'avue--disabled':data[disabledKey]}">{{data[labelKey]}}</span>
            <span :class="b('desc')"
                  v-if="data[descKey]">{{ data[descKey] }}</span>
          </template>
        </div>
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { DIC_SHOW_SPLIT } from 'global/variable';
import { detailDataType } from 'utils/util';
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      node: [],
      filterValue: "",
      box: false,
      dicList: []
    };
  },
  props: {
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
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
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Boolean,
      default: true
    },
    filterText: {
      type: String,
      default: ''
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
    iconClass: String,
    defaultExpandedKeys: Array,
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    text (val) {
      this.init();
    },
    dic: {
      handler (val) {
        this.dicList = val;
      },
      immediate: true
    },
    dicList: {
      handler () {
        this.init();
      },
      immediate: true
    },
    filterValue (val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    treeProps () {
      return Object.assign(this.props, {
        isLeaf: this.leafKey
      })
    },
    currentNodeKey () {
      return this.multiple ? '' : this.text
    },
    keysList () {
      return this.multiple ? this.text : [this.text || '']
    },
    labelShow () {
      let list = [...this.node]
      let result = list.map(ele => this.getLabelText(ele))
      return result
    }
  },
  methods: {
    handleClear () {
      this.text = this.multiple ? [] : '';
      this.node = [];
      this.filterValue = '';
      this.$refs.tree.setCurrentKey(null)
      this.$refs.tree.setCheckedKeys([]);
    },
    handleTreeLoad (node, resolve) {
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
        findDic(this.dicList, node.key, list)
        resolve(list);
      }
      this.treeLoad && this.treeLoad(node, callback)
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.text.splice(0, this.text.length)
      const list = this.$refs.tree.getCheckedNodes(this.leafOnly, false);
      list.forEach(node => this.text.push(node[this.valueKey]));
      if (typeof this.checked === "function") this.checked(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
    },
    getHalfList () {
      let list = this.$refs.tree.getCheckedNodes(false, true)
      list = list.map(ele => ele[this.valueKey])
      return list;
    },
    init () {
      this.$nextTick(() => {
        this.node = [];
        if (this.multiple) {
          let list = this.$refs.tree.getCheckedNodes(this.leafOnly, false)
          list.forEach(ele => {
            this.node.push(ele);
          })
        } else {
          let node = this.$refs.tree.getNode(this.text)
          if (node) {
            let data = node.data
            this.$refs.tree.setCurrentKey(data[this.valueKey])
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
    handleNodeClick (data, node, nodeComp) {
      if (data.disabled) return
      if (typeof this.nodeClick === "function") this.nodeClick(data, node, nodeComp);
      if (this.multiple) return;
      if (
        (this.validatenull(data[this.childrenKey]) && !this.multiple) ||
        this.parent
      ) {
        this.text = data[this.valueKey];
        this.$refs.main.blur();
      }
    }
  }
});
</script>
