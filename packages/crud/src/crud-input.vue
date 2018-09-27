<template>
  <div>
    <el-input v-if="type==='tree'"
              :size="size"
              v-model="labelShow"
              :type="typeParam"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :placeholder="placeholder?placeholder:`请选择${label}`"
              @change="handleChange"
              :disabled="disabled"
              :readonly="true"
              @click.native="disabled?'':open()" />
    <el-input v-else-if="type==='phone'"
              :size="size"
              :clearable="clearable"
              v-model="text"
              @click.native="handleClick"
              :type="typeParam"
              :maxlength="maxlength"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :readonly="readonly"
              :placeholder="placeholder?placeholder:`请输入${label}`"
              @change="handleChange"
              :disabled="disabled" />
    <el-input v-else
              :size="size"
              :clearable="clearable"
              v-model="text"
              @click.native="handleClick"
              :type="typeParam"
              :maxlength="maxlength"
              :minlength="minlength"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :readonly="readonly"
              :placeholder="placeholder?placeholder:`请输入${label}`"
              @change="handleChange"
              :disabled="disabled" />
    <el-dialog :visible.sync="box"
               append-to-body
               :title="`请选择${label}`"
               width="50%">
      <el-input style="margin-bottom:15px;"
                placeholder="输入关键字进行过滤"
                v-model="filterText"
                v-if="filter">
      </el-input>
      <div class="avue-dialog">
        <el-tree :data="dic"
                 :node-key="valueKey"
                 :show-checkbox="multiple"
                 :props="props"
                 ref="tree"
                 @check="checkChange"
                 :filter-node-method="filterNode"
                 :default-expanded-keys="multiple?text:[]"
                 :default-checked-keys="multiple?text:[]"
                 :default-expand-all="defaultExpandAll"
                 @node-click="handleNodeClick"></el-tree>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
import { validatenull } from '../../utils/validate';
export default create({
  name: 'crud-input',
  mixins: [crudCompoents()],
  data () {
    return {
      filterText: '',
      box: false,
      labelText: this.multiple ? [] : ''
    };
  },
  props: {
    nodeClick: Function,
    value: {
    },
    filter: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    minlength: {
      type: Number
    },
    maxlength: {
      type: Number,
      default: function () {
        if (this.type === 'phone') return 11;
      }
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  watch: {
    value () {
      this.init();
    },
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    labelShow () {
      return this.multiple ? this.labelText.join('/').toString() : this.labelText;
    },
    textShow () {
      if (this.textLen === 11) return `${this.text.substr(0, 3)} ${this.text.substr(3, 4)} ${this.text.substr(7, 4)}`
      return this.text;
    },
    textLen () {
      return this.text.length;
    },
    typeParam: function () {
      if (this.type === 'textarea') {
        return 'textarea';
      } else if (this.type === 'password') {
        return 'password';
      } else {
        return 'text';
      }
    }
  },
  created () { },
  mounted () {
    this.init();
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
      this.text = [];
      this.labelText = [];
      checkedKeys.checkedNodes.forEach(node => {
        if (validatenull(node[this.childrenKey])) {
          this.text.push(node[this.valueKey]);
          this.labelText.push(node[this.labelKey]);
        }
      });
      this.$emit('input', this.text);
      this.$emit('change', this.text);
    },
    open () {
      this.box = true;
      this.handleClick();
    },
    init () {
      if (this.type === 'tree') {
        if (this.multiple) {
          this.labelText = ['获取字典中...'];
        } else {
          this.labelText = '获取字典中...';
        }
        const check = setInterval(() => {
          if (!validatenull(this.dic)) {
            if (this.multiple) {
              this.labelText = [];
              this.text.forEach(ele => {
                this.findLabelNode(this.dic, ele, this.props);
              });
            } else {
              this.labelText = this.text;
              this.findLabelNode(this.dic, this.text, this.props);
            }
            if (!this.parent) this.disabledParentNode(this.dic);
            clearInterval(check);
          } else {
            this.labelText = '';
          }
        }, 500);
      } else if (this.type === 'phone') {
        if (!validatenull(this.text) && this.textLen == 11) {
          this.text = this.textShow;
        }
      }
    },
    findLabelNode (dic, value, props) {
      const labelKey = props.label || 'label';
      const valueKey = props.value || 'value';
      const childrenKey = props.children || 'children';
      dic.forEach(ele => {
        const children = ele[childrenKey];
        if (ele[valueKey] === value) {
          const label = ele[labelKey];
          this.multiple ? this.labelText.push(label) : this.labelText = label;
        } else if (!validatenull(children)) {
          this.findLabelNode(children, value, props);
        }
      });
    },
    disabledParentNode (dic) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!validatenull(children)) {
          ele.disabled = true;
          this.disabledParentNode(children);
        }
      });
    },
    handleNodeClick (data) {
      const callback = () => {
        this.box = false;
      }
      if (validatenull(data[this.childrenKey]) && !this.multiple || this.parent) {
        const value = data[this.valueKey];
        const label = data[this.labelKey];
        this.text = value;
        this.labelText = label;
        this.$emit('input', value);
        this.$emit('change', value);
        if (typeof this.nodeClick === 'function') this.nodeClick(data, callback);
        else callback();
      }

    },
    handleClick () {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.column });
    },
    handleChange (value) {
      let text = this.text;
      if (typeof this.change === 'function') this.change({ value: value, column: this.column });
      if (this.type === 'phone') {
        this.text = text.replace(/[^0-9.]/g, '');
        this.text = this.textShow;
        text = this.text.replace(/\s/g, "");
      }
      this.$emit('input', text);
      this.$emit('change', text);
    }
  }
});
</script>

