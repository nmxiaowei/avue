<template>
  <div :class="b()">
    <template v-if="isForm">
      <div :class="b('header')">
        <el-button size="mini"
                   circle
                   v-if="!readonly && !disabled && !addBtn"
                   :disabled="disabled"
                   type="primary"
                   icon="el-icon-plus"
                   @click="addRow"></el-button>
      </div>
      <div>
        <div v-for="(item,index) in text"
             :class="b('row')"
             :key="index"
             @mouseenter="cellMouseenter({$index:index})"
             @mouseleave="cellMouseLeave({$index:index})">
          <el-button v-if="!readonly && !disabled  && !delBtn && hoverList[index]"
                     @click="delRow(item.$index)"
                     type="danger"
                     :class="b('menu')"
                     size="mini"
                     :disabled="disabled"
                     icon="el-icon-delete"
                     circle></el-button>
          <avue-form :key="index"
                     ref="main"
                     :option="deepClone(option)"
                     v-model="text[index]">
            <div slot-scope="{}"
                 slot="_index">
              <span>{{item.$index+1}}</span>
            </div>
            <template v-for="item in columnSlot"
                      slot-scope="scope"
                      :slot="item">
              <slot :name="item"
                    v-bind="Object.assign(scope,{
                  row:text[index]
                })"></slot>
            </template>
          </avue-form>
        </div>
      </div>
    </template>
    <avue-crud v-else-if="isCrud"
               ref="main"
               :option="option"
               :disabled="disabled"
               @cell-mouse-enter="cellMouseenter"
               @cell-mouse-leave="cellMouseLeave"
               @selection-change="handleSelectionChange"
               @sortable-change="handleSortableChange"
               :data="text">
      <template slot-scope="scope"
                slot="_indexHeader">
        <el-button v-if="!(addBtn || readonly)"
                   @click="addRow()"
                   type="primary"
                   size="mini"
                   :disabled="disabled"
                   icon="el-icon-plus"
                   circle></el-button>
      </template>
      <template slot-scope="scope"
                slot="_index">
        <el-button v-if="!readonly && !disabled  && !delBtn && hoverList[scope.row.$index]"
                   @click="delRow(scope.row.$index)"
                   type="danger"
                   size="mini"
                   :disabled="disabled"
                   icon="el-icon-delete"
                   circle></el-button>
        <div v-else>{{scope.row.$index+1}}</div>
      </template>
      <template v-for="item in columnSlot"
                slot-scope="scope"
                :slot="getSlotName({prop:item},'F')">
        <slot v-bind="scope"
              :name="item"></slot>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "dynamic",
  mixins: [props(), event()],
  data () {
    return {
      hoverList: []
    }
  },
  props: {
    columnSlot: {
      type: Array,
      default: () => {
        return []
      }
    },
    children: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    showIndex () {
      return this.vaildData(this.children.index, true)
    },
    showType () {
      return this.children.type || 'crud'
    },
    isForm () {
      return this.showType === 'form'
    },
    isCrud () {
      return this.showType === 'crud'
    },
    selectionChange () {
      return this.children.selectionChange
    },
    sortableChange () {
      return this.children.sortableChange
    },
    rowAdd () {
      return this.children.rowAdd
    },
    rowDel () {
      return this.children.rowDel
    },
    viewBtn () {
      return this.children.viewBtn === false
    },
    addBtn () {
      return this.children.addBtn === false
    },
    delBtn () {
      return this.children.delBtn === false
    },
    valueOption () {
      let result = {};
      this.columnOption.forEach(ele => {
        if (ele.value) {
          result[ele.prop] = ele.value;
        }
      })
      return result;
    },
    rulesOption () {
      let rules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) {
          rules[ele.prop] = ele.rules;
        }
      })
      return rules;
    },
    columnOption () {
      return this.children.column || []
    },
    option () {
      return Object.assign({
        border: true,
        header: false,
        menu: false,
        size: this.size,
        disabled: this.disabled,
        readonly: this.readonly,
        emptyBtn: false,
        submitBtn: false,
      }, (() => {
        let option = this.deepClone(this.children)
        delete option.column;
        return option;
      })(), (() => {
        let list = [{
          label: this.children.indexLabel || '#',
          prop: '_index',
          display: this.showIndex,
          fixed: true,
          align: 'center',
          headerAlign: 'center',
          span: 24,
          width: 50
        }];
        this.columnOption.forEach(ele => {
          list.push(Object.assign(ele, {
            cell: this.vaildData(ele.cell, true)
          }))
        })
        return {
          column: list
        }
      })())
    }
  },
  mounted () {
    this.initData();
  },
  watch: {
    textLen () {
      return this.text.length;
    },
    text () {
      this.initData();
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectionChange && this.selectionChange(val);
    },
    handleSortableChange (oldindex, newindex, row, list) {
      this.sortableChange && this.sortableChange(oldindex, newindex, row, list);
    },
    cellMouseenter (row) {
      let index = row.$index;
      this.mouseoverRow(index);
    },
    cellMouseLeave (row, column, cell, event) {
      let index = row.$index;
      this.mouseoutRow(index)
    },
    initData () {
      this.text.forEach((ele, index) => {
        ele = Object.assign(ele, {
          $cellEdit: true,
          $index: index,
        })
      })
    },
    mouseoverRow (index) {
      if (this.delBtn) return
      this.flagList();
      this.$set(this.hoverList, index, true)
    },
    mouseoutRow (index) {
      if (this.delBtn) return
      this.flagList();
      this.$set(this.hoverList, index, false)
    },
    flagList () {
      this.hoverList.forEach((ele, index) => {
        ele = false;
      })
    },
    delRow (index) {
      const callback = () => {
        let list = this.deepClone(this.text)
        list.splice(index, 1);
        this.text = list;
      }
      if (typeof this.rowDel === 'function') {
        this.rowDel(this.text[index], callback);
      } else {
        callback();
      }
    },
    addRow () {
      const callback = (obj = {}) => {
        obj = Object.assign(this.valueOption, obj, {
          $index: this.textLen
        });
        if (this.isCrud) {
          this.$refs.main.rowCellAdd(obj);
        } else if (this.isForm) {
          this.text.push(obj)
        }
      }
      if (typeof this.rowAdd === 'function') {
        this.rowAdd(callback);
      } else {
        callback();
      }
    }
  }
});
</script>
