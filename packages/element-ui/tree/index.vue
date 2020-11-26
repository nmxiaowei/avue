<template>
  <div :class="b()">
    <div :class="b('filter')"
         v-if="vaildData(option.filter,true)">
      <el-input :placeholder="vaildData(option.filterText,'输入关键字进行过滤')"
                :size="size"
                v-model="filterValue">
        <el-button slot="append"
                   :size="size"
                   @click="parentAdd"
                   icon="el-icon-plus"
                   v-if="vaildData(option.addBtn,true)"></el-button>
      </el-input>
    </div>
    <el-tree ref="tree"
             :data="data"
             :lazy="lazy"
             :load="treeLoad"
             :props="treeProps"
             :icon-class="iconClass"
             :highlight-current="!multiple"
             :show-checkbox="multiple"
             :accordion="accordion"
             :node-key="props.value"
             :check-strictly="checkStrictly"
             :filter-node-method="filterNode"
             v-loading="loading"
             :expand-on-click-node="expandOnClickNode"
             @check-change="handleCheckChange"
             @node-click="nodeClick"
             @node-contextmenu="nodeContextmenu"
             :default-expand-all="defaultExpandAll">
      <span slot-scope="{ node, data }"
            v-if="$scopedSlots.default">
        <slot :node="node"
              :data="data"></slot>
      </span>
      <span class="el-tree-node__label"
            slot-scope="{node}"
            v-else>
        <span>{{node.label}}</span>
      </span>
    </el-tree>
    <div class="el-cascader-panel is-bordered"
         v-if="client.show&&menu"
         @click="client.show=false"
         :style="styleName"
         :class="b('menu')">
      <div :class="b('item')"
           v-if="vaildData(option.addBtn,true)"
           @click="rowAdd">新增</div>
      <div :class="b('item')"
           v-if="vaildData(option.editBtn,true)"
           @click="rowEdit">修改</div>
      <div :class="b('item')"
           v-if="vaildData(option.delBtn,true)"
           @click="rowRemove">删除</div>
      <slot name="menu"
            :node="node"></slot>
    </div>
    <el-dialog :title="node[labelKey] || title"
               :visible.sync="box"
               :class="b('dialog')"
               class="avue-dialog"
               modal-append-to-body
               append-to-body
               @close="hide"
               :width="vaildData(option.dialogWidth,'50%')">
      <avue-form v-model="form"
                 :option="formOption"
                 ref="form"
                 @submit="handleSubmit"></avue-form>
    </el-dialog>

  </div>
</template>

<script>
import { DIC_PROPS } from 'global/variable';
import locale from "../../core/common/locale";
import create from "core/create";
export default create({
  name: "tree",
  mixins: [locale],
  props: {
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
      obj: {},
      form: {},
    };
  },
  computed: {
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
      return this.option.title
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
      return this.addFlag ? this.t("crud.addBtn") : this.t("crud.editBtn");
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
    labelText () {
      return this.props.labelText || DIC_PROPS.labelText;
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
    formColumnOption () {
      return (this.option.formOption || {}).column || [];
    },
    formOption () {
      return Object.assign(
        {
          submitText: this.addText,
          column: [{
            label: this.valueKey,
            prop: this.valueKey,
            display: false
          },
          {
            label: this.labelText,
            prop: this.labelKey,
            rules: [
              {
                required: true,
                message: `${this.t("tip.input")} ${this.labelText}`,
                trigger: "blur"
              }
            ]
          },
          ...this.formColumnOption
          ]
        },
        (() => {
          let option = this.option.formOption || {};
          delete option.column;
          return option;
        })()
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
    }
  },
  methods: {
    initFun () {
      [
        'filter', 'updateKeyChildren', 'getCheckedNodes', 'setCheckedNodes', 'getCheckedKeys',
        'setCheckedKeys', 'setChecked', 'getHalfCheckedNodes', 'getHalfCheckedKeys', 'getCurrentKey', 'getCurrentNode',
        'setCurrentKey', 'setCurrentNode', 'getNode', 'remove', 'append', 'insertBefore', 'insertAfter'
      ].forEach(ele => {
        this[ele] = this.$refs.tree[ele];
      })
    },
    nodeContextmenu (e, data) {
      this.node = this.deepClone(data);
      this.client.x = e.clientX;
      this.client.y = e.clientY;
      this.client.show = true;
    },
    handleCheckChange (data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    handleSubmit (form, done) {
      this.addFlag ? this.save(form, done) : this.update(form, done)
    },
    nodeClick (data, node, nodeComp) {
      this.$emit("node-click", data, node, nodeComp);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    hide () {
      this.box = false;
      this.node = {};
      this.$refs.form.resetForm();
      this.$refs.form.clearValidate();
    },
    save (data, done) {
      const callback = () => {
        let form = this.deepClone(this.form);
        if (this.type === "add") {
          this.$refs.tree.append(form, this.node[this.valueKey])
        } else if (this.type === "parentAdd") {
          this.$refs.tree.append(form)
        }
        this.hide();
        done()
      };
      this.$emit("save", this.node, data, callback, done);
    },
    update (data, done) {
      const callback = () => {
        let node = this.$refs.tree.getNode(this.node[this.valueKey]);
        let form = this.deepClone(this.form);
        node.data = form
        this.hide();
        done()
      };
      this.$emit("update", this.node, data, callback, done);
    },
    rowEdit (a) {
      this.type = "edit";
      this.form = this.node;
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
      this.client.show = false;
      this.box = true;
    },
    rowRemove () {
      this.client.show = false;
      const callback = () => {
        this.$refs.tree.remove(this.node[this.valueKey])
      }
      this.$emit("del", this.node, callback);
    }
  }
});
</script>
