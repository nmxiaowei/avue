/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { DIC_PROPS } from '../../../src/global/variable.mjs';
import locale from '../../../src/core/locale.mjs';
import create from '../../../src/core/create.mjs';
import permission from '../../core/directive/permission.mjs';

var script = create({
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
    checkOnClickLeaf: Boolean,
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
    modelValue: {
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
      // 存储事件监听器引用，用于销毁时清理
      clickListener: null,
    };
  },
  computed: {
    virtualize () {
      return this.option.virtualize
    },
    componentName () {
      return 'elTree' + (this.virtualize ? 'V2' : '')
    },
    styleName () {
      return {
        top: this.setPx(this.client.y - 10),
        left: this.setPx(this.client.x - 10),
      }
    },
    treeProps () {
      return Object.assign(this.deepClone(DIC_PROPS), this.props, {
        isLeaf: this.leafKey
      })
    },
    menu () {
      return this.validData(this.option.menu, true)
    },
    title () {
      return this.option.title || this.t('crud.addTitle')
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
      return this.option.size
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
    // 创建事件监听器函数并存储引用，用于后续清理
    this.clickListener = (e) => {
      // 检查点击事件是否发生在组件外部，如果是则隐藏右键菜单
      if (!this.$el.contains(e.target)) {
        this.client.show = false;
      }
    };
    
    // 注册全局点击事件监听器
    document.addEventListener('click', this.clickListener);
    
    // 初始化树组件的方法
    this.initFun();
  },
  beforeUnmount () {
    // 组件销毁前清理全局事件监听器，防止内存泄漏
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
      this.clickListener = null;
    }
  },
  watch: {
    filterValue (val) {
      this.$refs.tree.filter(val);
    },
    modelValue (val) {
      this.form = val;
    },
    form (val) {
      this.$emit('update:modelValue', val);
      this.$emit("change", val);
    }
  },
  methods: {
    handleDragStart (node, ev) {
      this.$emit('node-drag-start', node, ev);
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      this.$emit('node-drag-enter', draggingNode, dropNode, ev);
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      this.$emit('node-drag-leave', draggingNode, dropNode, ev);
    },
    handleDragOver (draggingNode, dropNode, ev) {
      this.$emit('node-drag-over', draggingNode, dropNode, ev);
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      this.$emit('node-drag-end', draggingNode, dropNode, dropType, ev);
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      this.$emit('node-drop', draggingNode, dropNode, dropType, ev);
    },
    menuIcon (value) {
      return this.validData(this.option[value + 'Text'], this.t("crud." + value))
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
    /**
     * 初始化树组件的方法代理
     * 将element-plus tree组件的方法代理到当前组件实例上，
     * 使父组件可以直接调用这些方法
     */
    initFun () {
      [
        'filter', 'updateKeyChildren', 'getCheckedNodes', 'setCheckedNodes', 'getCheckedKeys',
        'setCheckedKeys', 'setChecked', 'getHalfCheckedNodes', 'getHalfCheckedKeys', 'getCurrentKey', 'getCurrentNode',
        'setCurrentKey', 'setCurrentNode', 'getNode', 'remove', 'append', 'insertBefore', 'insertAfter'
      ].forEach(ele => {
        this[ele] = this.$refs.tree[ele];
      });
    },
    nodeContextmenu (e, data, node, obj) {
      this.node = node;
      this.client.x = e.clientX;
      this.client.y = e.clientY;
      this.client.show = true;
      this.$emit('node-contextmenu', data, node, obj);
    },
    handleCheckChange (data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate);
    },
    handleSubmit (form, done) {
      this.addFlag ? this.save(form, done) : this.update(form, done);
    },
    nodeClick (data, node, nodeComp) {
      this.client.show = false;
      this.$emit("node-click", data, node, nodeComp);
    },
    nodeExpand (data, node, nodeComp) {
      this.$emit("node-expand", data, node, nodeComp);
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
        done && done();
        this.node = {};
        this.form = {};
        this.box = false;
      };
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback, this.type);
      } else {
        callback();
      }
    },
    save (data, done) {
      const callback = (form) => {
        form = this.deepClone(form || this.form);
        if (this.type === "add") {
          this.$refs.tree.append(form, this.node.data[this.valueKey]);
        } else if (this.type === "parentAdd") {
          this.$refs.tree.append(form);
        }
        done();
        this.$nextTick(() => this.hide());
      };
      this.$emit("save", this.node, data, callback, done);
    },
    update (data, done) {
      const callback = (form) => {
        form = this.deepClone(form || this.form);
        const rowKey = form[this.valueKey];
        this.node.data = form;
        let { parentList, index } = this.findData(rowKey);
        if (parentList) {
          const oldRow = parentList.splice(index, 1)[0];
          form[this.childrenKey] = oldRow[this.childrenKey];
          parentList.splice(index, 0, this.deepClone(form));
        }
        this.hide();
        done();
      };
      this.$emit("update", this.node, data, callback, done);
    },
    rowEdit (a) {
      this.type = "edit";
      this.form = this.deepClone(this.node.data);
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
      };
      if (typeof this.beforeOpen === "function") {
        this.beforeOpen(callback, this.type);
      } else {
        callback();
      }
    },
    rowRemove () {
      this.client.show = false;
      const callback = () => {
        this.$refs.tree.remove(this.node);
      };
      this.$emit("del", this.node, callback);
    },
    findData (id) {
      let result = {};
      const callback = (parentList, parent) => {
        parentList.forEach((ele, index) => {
          if (ele[this.valueKey] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent
            };
          }
          if (ele[this.childrenKey]) {
            callback(ele[this.childrenKey], ele);
          }
        });
      };
      callback(this.data);
      return result;
    }
  }
});

export { script as default };
