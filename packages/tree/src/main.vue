<template>
  <div :class="b()">
    <div :class="b('filter')">
      <el-input placeholder="输入关键字进行过滤"
                v-model="filterText">
        <el-button slot="append"
                   @click="parentAdd"
                   icon="el-icon-plus"></el-button>
      </el-input>
    </div>

    <el-tree ref="tree"
             :data="columnOption"
             :node-key="nodeKey"
             :filter-node-method="filterNode"
             :expand-on-click-node="false"
             :default-expand-all="defaultExpandAll">
      <div slot-scope="{ node,data }"
           :class="b('item')">
        <span :class="b('title')">{{ node[labelKey]}}</span>
        <div :class="b('menu')">
          <el-dropdown trigger="click">
            <i class="el-icon-more"
               :class="b('icon')"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="append(snode,data)">新增</el-dropdown-item>
              <el-dropdown-item @click.native="edit(node,data)">修改</el-dropdown-item>
              <el-dropdown-item @click.native="remove(node,data)">删除</el-dropdown-item>
              <slot name="menuBtn"
                    :node="node"
                    :data="data"></slot>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-tree>
    <el-dialog :title="addFlag?'新增':'修改'"
               :visible.sync="box"
               width="50%">
      <el-input v-model="form[labelKey]" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="save"
                   v-if="addFlag">新 增</el-button>
        <el-button type="primary"
                   v-else
                   @click="update">修 改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
const propsDefault = {
  nodeKey: 'id',
  label: 'label',
  value: 'value',
  children: 'children'
}
import { deepClone } from '../../utils/util';
import create from '../../utils/create'
export default create({
  name: 'tree',
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
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
    addFlag () {
      return this.type === 'add' || this.type === 'parentAdd'
    },
    props () {
      return this.option.props || {}
    },
    valueKey () {
      return this.props.value || this.propsDefault.value;
    },
    labelKey () {
      return this.props.label || this.propsDefault.label;
    },
    childrenKey () {
      return this.props.children || this.propsDefault.children;
    },
    defaultExpandAll () {
      return this.option.defaultExpandAll || true;
    },
    nodeKey () {
      return this.option.nodeKey || this.propsDefault.nodeKey;
    }
  },
  data () {
    return {
      filterText: '',
      box: false,
      type: '',
      node: {},
      obj: {},
      form: {},
      columnOption: [],
    }
  },
  created () {
    this.init();
  },
  watch: {
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
      this.$emit('input', val);
    }
  },

  methods: {
    init () {
      this.columnOption = deepClone(this.option.column || []);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    hide () {
      this.box = false;
      this.form = {};
      this.node = {};
      this.obj = {};
    },
    save () {

      const callback = () => {
        if (this.type === 'add') {
          if (!this.obj[this.childrenKey]) {
            this.$set(this.obj, 'children', []);
          }
          this.obj.children.push(deepClone(this.form));
        }
        else if (this.type === 'parentAdd') this.obj.push(deepClone(this.form));
        this.hide();
      }
      this.$emit('save', this.obj, this.node, callback);
    },
    update () {
      const callback = () => {
        const parent = this.node.parent;
        const children = parent.data[this.childrenKey] || parent.data;
        const index = children.findIndex(item => item[this.nodeKey] === this.form[this.nodeKey]);
        children.splice(index, 1, this.form);
        this.hide();
      }
      this.$emit('update', this.obj, this.node, callback);
    },

    edit (node, data) {
      this.type = 'edit';
      this.node = node;
      this.obj = data;
      this.form = deepClone(this.obj);
      this.box = true;
    },
    parentAdd (data) {
      this.type = 'parentAdd';
      this.obj = this.columnOption;
      this.form = {};
      this.box = true;
    },
    append (node, data) {
      this.type = 'add';
      this.obj = data;
      this.node = node;
      this.form = {};
      this.box = true;
    },

    remove (node, data) {
      this.obj = data;
      this.node = node;
      const callback = () => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }
      this.$confirm('是否删除改节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('del', this.obj, this.node, callback);
      }).catch(() => {

      });

    }
  }
})
</script>

<style>
</style>
