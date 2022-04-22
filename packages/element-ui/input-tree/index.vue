<template>
  <el-select :class="b()"
             :size="size"
             ref="main"
             :loading="loading"
             :loading-text="loadingText"
             :multiple="multiple"
             :multiple-limit="limit"
             :collapse-tags="tags"
             @click.native="initScroll"
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
         style="padding:0 10px;margin:5px 0 0 0;">
      <el-input size="mini"
                :placeholder="filterText"
                v-model="filterValue"></el-input>
    </div>
    <el-option :value="text">
      <el-tree :data="dicList"
               class="tree-option"
               style="padding:10px 0;"
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
               :highlight-current="!multiple"
               :current-node-key="multiple?'':text"
               @check="checkChange"
               :filter-node-method="filterNode"
               :default-checked-keys="keysList"
               :default-expand-all="defaultExpandAll"
               @node-click.self="handleNodeClick">
        <div style="width:100%;padding-right:10px;"
             slot-scope="{ data }">
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
import { sendDic } from "core/dic";
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      node: [],
      filterValue: "",
      box: false,
      created: false,
      netDic: [],
      loading: false,
    };
  },
  props: {
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
    value: {},
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
      default: '输入关键字进行过滤'
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
    iconClass: {
      type: String,
    },
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
    text: {
      handler (value) {
        if (this.validatenull(value)) this.clearHandle();
        this.init();

      },
    },
    value (val) {
      if (!this.validatenull(val)) {
        if (this.lazy && !this.created) {
          this.created = true
          this.handleRemoteMethod(this.multiple ? this.text.join(',') : this.text)
        }
      }
    },
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
      let list = this.netDic;
      addParent(list);
      return list;
    },
    keysList () {
      if (this.validatenull(this.text)) return [];
      let list = []
      if (Array.isArray(this.text)) {
        list = this.text;
      }
      else {
        list = (this.text + '').split(this.separator)
        list = list.map(ele => detailDataType(ele, this.dataType))
      }
      return list
    },
    labelShow () {
      let result = [];
      let list = this.deepClone(this.node);
      if (this.typeformat) {
        result = list.map(ele => this.getLabelText(ele))
      } else {
        result = list.map(ele => ele[this.labelKey])
      }
      if (this.multiple) {
        return result
      } else {
        return result.join('')
      }
    }
  },
  methods: {
    handleClear () {
      if (this.multiple) {
        this.text = [];
      } else {
        this.text = '';
      }
      this.node = [];
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
        findDic(this.netDic, node.key, list)
        resolve(list);
      }
      this.treeLoad && this.treeLoad(node, callback)
    },
    // 初始化滚动条
    initScroll (event) {
      setTimeout(() => {
        this.$nextTick(() => {
          let scrollBar = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')
          scrollBar.forEach(ele => {
            ele.scrollTop = 0;
          })
        })
      }, 0)
      this.handleClick(event);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.text = [];
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
          let node = this.$refs.tree.getNode(this.vaildData(this.text, ''))
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
    clearHandle () {
      this.filterValue = '';
      this.$refs.tree.setCurrentKey(null)
      this.$refs.tree.setCheckedKeys([]);
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
    },
    handleRemoteMethod (query) {
      this.loading = true;
      sendDic({
        column: this.column,
        value: query,
      }).then(res => {
        this.loading = false;
        this.netDic = res;
      });
    }
  }
});
</script>
