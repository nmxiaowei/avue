<template>
  <div :class="b()">
    <div :class="b('filter')"
         v-if="vaildData(option.filter,true)">
      <el-input placeholder="输入关键字进行过滤"
                :size="size"
                v-model="filterText">
        <el-button slot="append"
                   :size="size"
                   @click="parentAdd"
                   icon="el-icon-plus"
                   v-if="vaildData(option.addBtn,true)"></el-button>
        <template slot="append">
          <slot name="addBtn"></slot>
        </template>
      </el-input>
    </div>

    <el-tree ref="tree"
             :data="list"
             :node-key="nodeKey"
             :check-strictly="checkStrictly"
             :filter-node-method="filterNode"
             :expand-on-click-node="false"
             :default-expand-all="defaultExpandAll">
      <div slot-scope="{ node,data }"
           :class="b('item')">
        <div :class="b('title')"
             @click.self="nodeClick(data)"
             @mouseenter="data.is_show=true"
             @mouseleave="data.is_show=false">{{ data[labelKey]}}
          <div :class="b('menu')"
               v-show="data.is_show && vaildData(option.menu,true)">
            <el-dropdown trigger="click">
              <i class="el-icon-more"
                 :class="b('icon')"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="vaildData(option.addBtn,true)"
                                  @click.native="append(node,data)">新增</el-dropdown-item>
                <el-dropdown-item v-if="vaildData(option.editBtn,true)"
                                  @click.native="edit(node,data)">修改</el-dropdown-item>
                <el-dropdown-item v-if="vaildData(option.delBtn,true)"
                                  @click.native="remove(node,data)">删除</el-dropdown-item>
                <slot name="menuBtn"
                      :node="node"
                      :data="data"></slot>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-tree>
    <el-dialog :title="obj[labelKey]"
               :visible.sync="box"
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
import { deepClone, vaildData } from "utils/util";
import create from "core/create";
export default create({
  name: "tree",
  mixins: [locale],
  props: {
    checkStrictly: {
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
  computed: {
    addText () {
      return this.addFlag ? this.t("crud.addBtn") : this.t("crud.editBtn");
    },
    addFlag () {
      return this.type === "add" || this.type === "parentAdd";
    },
    size () {
      return this.option.size || "small";
    },
    props () {
      return this.option.props || {};
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
    defaultExpandAll () {
      return this.vaildData(this.option.expandAll, true);
    },
    nodeKey () {
      return this.option.nodeKey || DIC_PROPS.nodeKey;
    },
    columnOption () {
      return this.appednKey(deepClone(this.data || []));
    },
    formColumnOption () {
      return (this.option.formOption || {}).column || [];
    },
    formOption () {
      return Object.assign(
        {
          submitText: this.addText,
          column: [
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
  data () {
    return {
      filterText: "",
      box: false,
      type: "",
      node: {},
      obj: {},
      form: {},
      list: []
    };
  },
  created () {
    this.vaildData = vaildData;
    this.list = deepClone(this.columnOption);
  },
  watch: {
    columnOption () {
      this.list = deepClone(this.columnOption);
    },
    option () {
      this.init();
    },
    filterText (val) {
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
    handleSubmit (form, done) {
      this.addFlag ? this.save(form, done) : this.update(form, done)
    },
    appednKey (list) {
      list.forEach(ele => {
        ele.is_show = false;
        if (ele[this.childrenKey]) {
          this.appednKey(ele[this.childrenKey]);
        }
      });
      return list;
    },
    nodeClick (data) {
      this.$emit("node-click", data);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    hide () {
      this.box = false;
      this.node = {};
      this.obj = {};
      this.$refs.form.resetForm();
      this.$refs.form.clearValidate();
    },
    save (data, done) {
      const callback = () => {
        const form = deepClone(Object.assign(this.form, { is_show: false }));
        if (this.type === "add") {
          if (!this.obj[this.childrenKey]) {
            this.$set(this.obj, "children", []);
          }
          this.obj.children.push(form);
        } else if (this.type === "parentAdd") this.obj.push(form);
        this.hide();
        done();
      };
      this.$emit("save", this.obj, this.node, callback, done);
    },
    update (data, done) {
      const callback = () => {
        const parent = this.node.parent;
        const children = parent.data[this.childrenKey] || parent.data;
        const index = children.findIndex(
          item => item[this.nodeKey] === this.form[this.nodeKey]
        );
        children.splice(index, 1, this.form);
        this.hide();
        done();
      };
      this.$emit("update", this.obj, this.node, callback, done);
    },

    edit (node, data) {
      this.type = "edit";
      this.node = node;
      this.obj = data;
      this.form = deepClone(this.obj);
      this.show();
    },
    parentAdd (data) {
      this.type = "parentAdd";
      this.obj = this.list;
      this.show();
    },
    append (node, data) {
      this.type = "add";
      this.obj = data;
      this.node = node;
      this.show();
    },
    show () {
      this.box = true;
      setTimeout(() => {
        this.$refs.form.clearValidate();
      }, 0);
    },
    remove (node, data) {
      this.obj = data;
      this.node = node;
      const callback = () => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      };
      this.$confirm("是否删除改节点?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("del", this.obj, this.node, callback);
        })
        .catch(() => { });
    }
  }
});
</script>
