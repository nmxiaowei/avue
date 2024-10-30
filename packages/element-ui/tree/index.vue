<template>
  <div :class="b()">
    <div :class="b('filter')"
         v-if="vaildData(option.filter,true)">
      <el-input :placeholder="vaildData(option.filterText,t('tip.input'))"
                :size="size"
                v-model="filterValue">

      </el-input>
      <el-button v-permission="getPermission('addBtn')"
                 :size="size"
                 @click="parentAdd"
                 icon="el-icon-plus"
                 v-if="vaildData(option.addBtn,true)"></el-button>
      <slot v-else
            v-permission="getPermission('addBtn')"
            name="addBtn"></slot>
    </div>
    <el-scrollbar :class="b('content')">
      <el-tree ref="tree"
               :data="data"
               :lazy="lazy"
               :load="treeLoad"
               :draggable="draggable"
               :props="treeProps"
               :icon-class="iconClass"
               :indent="indent"
               :highlight-current="!multiple"
               :show-checkbox="multiple"
               :accordion="accordion"
               :node-key="valueKey"
               :check-strictly="checkStrictly"
               :check-on-click-node="checkOnClickNode"
               :filter-node-method="filterNode"
               v-loading="loading"
               :expand-on-click-node="expandOnClickNode"
               @check-change="handleCheckChange"
               @node-click="nodeClick"
               @node-contextmenu="nodeContextmenu"
               @node-drag-start="handleDragStart"
               @node-drag-enter="handleDragEnter"
               @node-drag-leave="handleDragLeave"
               @node-drag-over="handleDragOver"
               @node-drag-end="handleDragEnd"
               @node-drop="handleDrop"
               :allow-drop="option.allowDrop"
               :allow-drag="option.allowDrag"
               :default-expand-all="defaultExpandAll"
               :default-expanded-keys="defaultExpandedKeys">

        <slot slot-scope="{ node, data }"
              :node="node"
              v-if="$scopedSlots.default"
              :data="data"></slot>

        <span class="el-tree-node__label"
              slot-scope="{node}"
              v-else>
          <span>{{node.label}}</span>
        </span>
      </el-tree>
    </el-scrollbar>
    <div class="el-cascader-panel is-bordered"
         v-if="client.show&&menu"
         @click="client.show=false"
         :style="styleName"
         :class="b('menu')">
      <div :class="b('item')"
           v-if="vaildData(option.addBtn,true)"
           v-permission="getPermission('addBtn')"
           @click="rowAdd">{{menuIcon('addBtn')}}</div>
      <div :class="b('item')"
           v-if="vaildData(option.editBtn,true)"
           v-permission="getPermission('editBtn')"
           @click="rowEdit">{{menuIcon('editBtn')}}</div>
      <div :class="b('item')"
           v-if="vaildData(option.delBtn,true)"
           v-permission="getPermission('delBtn')"
           @click="rowRemove">{{menuIcon('delBtn')}}</div>
      <slot name="menu"
            :node="node"></slot>
    </div>
    <div v-if="box">
      <el-dialog :title="node[labelKey] || title"
                 :visible.sync="box"
                 :class="b('dialog')"
                 class="avue-dialog avue-dialog--none"
                 :modal-append-to-body="$AVUE.modalAppendToBody"
                 :append-to-body="$AVUE.appendToBody"
                 :before-close="hide"
                 :width="setPx(vaildData(option.dialogWidth,'50%'))">
        <avue-form v-model="form"
                   :option="formOption"
                   ref="form"
                   @submit="handleSubmit"></avue-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { DIC_PROPS } from 'global/variable';
import locale from "core/locale";
import create from "core/create";
import permission from 'common/directive/permission';
export default create({
  name: "tree",
  mixins: [locale],
  directives: {
    permission
  },
  props: {
    indent: Number,
    filterNodeMethod: Function,
    checkOnClickNode: Boolean,
    beforeClose: Function,
    beforeOpen: Function,
    permission: {
      type: [Function, Object],
      default: () => {
        return {};
      }
    },
    iconClass: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false
    },
    expandOnClickNode: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      filterValue: "",
      client: {
        x: 0,
        y: 0,
        show: false
      },
      box: false,
      type: "",
      node: {},
      form: {}
    };
  },
  computed: {
    draggable () {
      return this.option.draggable
    },
    styleName () {
      return {
        top: this.setPx(this.client.y - 10),
        left: this.setPx(this.client.x - 10),
      }
    },
    treeProps () {
      return Object.assign(this.props, {
        isLeaf: this.leafKey
      })
    },
    menu () {
      return this.vaildData(this.option.menu, true)
    },
    title () {
      return this.option.title || this.t(`crud.addTitle`)
    },
    treeLoad () {
      return this.option.treeLoad
    },
    checkStrictly () {
      return this.option.checkStrictly
    },
    accordion () {
      return this.option.accordion
    },
    multiple () {
      return this.option.multiple
    },
    lazy () {
      return this.option.lazy
    },
    addText () {
      return this.addFlag ? this.menuIcon('addBtn') : this.menuIcon('updateBtn');
    },
    addFlag () {
      return ["add", "parentAdd"].includes(this.type);
    },
    size () {
      return this.option.size || "small";
    },
    props () {
      return this.option.props || {};
    },
    leafKey () {
      return this.props.leaf || DIC_PROPS.leaf
    },
    valueKey () {
      return this.props.value || DIC_PROPS.value;
    },
    labelKey () {
      return this.props.label || DIC_PROPS.label;
    },
    childrenKey () {
      return this.props.children || DIC_PROPS.children;
    },
    nodeKey () {
      return this.option.nodeKey || DIC_PROPS.nodeKey;
    },
    defaultExpandAll () {
      return this.option.defaultExpandAll;
    },
    defaultExpandedKeys () {
      return this.option.defaultExpandedKeys;
    },
    formOption () {
      return Object.assign(
        this.option.formOption || {},
        {
          boxType: this.type,
          submitText: this.addText,
        }
      );
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) this.client.show = false
    })
    this.initFun()
  },
  watch: {
    filterValue (val) {
      this.$refs.tree.filter(val);
    },
    value (val) {
      this.form = val;
    },
    form (val) {
      this.$emit("input", val);
      this.$emit("change", val);
    }
  },
  methods: {
    handleDragStart (node, ev) {
      this.$emit('node-drag-start', node, ev)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      this.$emit('node-drag-enter', draggingNode, dropNode, ev)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      this.$emit('node-drag-leave', draggingNode, dropNode, ev)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      this.$emit('node-drag-over', draggingNode, dropNode, ev)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      this.$emit('node-drag-end', draggingNode, dropNode, dropType, ev)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      this.$emit('node-drop', draggingNode, dropNode, dropType, ev)
    },
    menuIcon (value) {
      return this.vaildData(this.option[value + 'Text'], this.t("crud." + value))
    },
    getPermission (key) {
      if (typeof this.permission === "function") {
        return this.permission(key, this.node.data || {})
      } else if (!this.validatenull(this.permission[key])) {
        return this.permission[key]
      } else {
        return true;
      }
    },
    initFun () {
      [
        'filter', 'updateKeyChildren', 'getCheckedNodes', 'setCheckedNodes', 'getCheckedKeys',
        'setCheckedKeys', 'setChecked', 'getHalfCheckedNodes', 'getHalfCheckedKeys', 'getCurrentKey', 'getCurrentNode',
        'setCurrentKey', 'setCurrentNode', 'getNode', 'remove', 'append', 'insertBefore', 'insertAfter'
      ].forEach(ele => {
        this[ele] = this.$refs.tree[ele];
      })
    },
    nodeContextmenu (e, data, node, obj) {
      this.node = node;
      this.client.x = e.clientX;
      this.client.y = e.clientY;
      this.client.show = true;
      this.$emit('node-contextmenu', data, node, obj)
    },
    handleCheckChange (data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    handleSubmit (form, done) {
      this.addFlag ? this.save(form, done) : this.update(form, done)
    },
    nodeClick (data, node, nodeComp) {
      this.client.show = false
      this.$emit("node-click", data, node, nodeComp);
    },
    filterNode (value, data) {
      if (typeof this.filterNodeMethod === 'function') {
        return this.filterNodeMethod(value, data);
      }
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    hide (done) {
      const callback = () => {
        done && done()
        this.node = {};
        this.form = {}
        this.box = false;
      }
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback, this.type);
      } else {
        callback();
      }
    },
    save (data, done) {
      const callback = (form) => {
        form = form || this.form;
        if (this.type === "add") {
          this.$refs.tree.append(form, this.node.data[this.valueKey])
        } else if (this.type === "parentAdd") {
          this.$refs.tree.append(form)
        }
        this.hide();
        done()
      };
      this.$emit("save", this.node, data, callback, done);
    },
    update (data, done) {
      const callback = (form) => {
        form = form || this.form;
        const rowKey = form[this.valueKey]
        this.node.data = this.form
        let { parentList, index } = this.findData(rowKey)
        if (parentList) {
          const oldRow = parentList.splice(index, 1)[0];
          form[this.childrenKey] = oldRow[this.childrenKey]
          parentList.splice(index, 0, form)
        }
        this.hide();
        done()
      };
      this.$emit("update", this.node, data, callback, done);
    },
    rowEdit (a) {
      this.type = "edit";
      this.form = this.node.data;
      this.show();
    },
    parentAdd () {
      this.type = "parentAdd";
      this.show();
    },
    rowAdd () {
      this.type = "add";
      this.show();
    },
    show () {
      const callback = () => {
        this.client.show = false;
        this.box = true;
      }
      if (typeof this.beforeOpen === "function") {
        this.beforeOpen(callback, this.type);
      } else {
        callback();
      }
    },
    rowRemove () {
      this.client.show = false;
      const callback = () => {
        this.$refs.tree.remove(this.node.data[this.valueKey])
      }
      this.$emit("del", this.node, callback);
    },
    findData (id) {
      let result = {}
      const callback = (parentList, parent) => {
        parentList.forEach((ele, index) => {
          if (ele[this.valueKey] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent
            }
          }
          if (ele[this.childrenKey]) {
            callback(ele[this.childrenKey], ele)
          }
        })
      }
      callback(this.data)
      return result;
    },
  }
});
</script>
