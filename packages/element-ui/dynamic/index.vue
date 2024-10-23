<template>
  <div :class="b()"
       :key="reload">
    <template v-if="isForm">
      <div :class="b('header')">
        <el-button :size="size"
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
                     :size="size"
                     :disabled="disabled"
                     icon="el-icon-delete"
                     circle></el-button>
          <avue-form :key="index"
                     ref="main"
                     :table-data="{row:text[index],index}"
                     :option="option"
                     v-bind="$uploadFun(null,this)"
                     v-model="text[index]">
            <template #_index="{}">
              <span>{{item.$index+1}}</span>
            </template>
            <template v-for="item in columnSlot"
                      #[item]="scope">
              <slot v-bind="Object.assign(scope,{
                  row:text[index]
                })"
                    :name="item"></slot>
            </template>
          </avue-form>
        </div>
      </div>
    </template>
    <avue-crud v-else-if="isCrud"
               ref="main"
               :option="option"
               :disabled="disabled"
               v-bind="$uploadFun(null,this)"
               @cell-mouse-enter="cellMouseenter"
               @cell-mouse-leave="cellMouseLeave"
               @selection-change="handleSelectionChange"
               @sortable-change="handleSortableChange"
               :data="text">
      <template #_index-header="{}">
        <el-button v-if="!(addBtn || readonly) && maxFlag"
                   @click="addRow()"
                   type="primary"
                   :size="size"
                   :disabled="disabled"
                   icon="el-icon-plus"
                   circle></el-button>
      </template>
      <template #_index="scope">
        <el-button v-if="!readonly && !disabled  && !delBtn && hoverList[scope.row.$index]"
                   @click="delRow(scope.row.$index)"
                   type="danger"
                   :size="size"
                   :disabled="disabled"
                   icon="el-icon-delete"
                   circle></el-button>
        <div v-else>{{scope.row.$index+1}}</div>
      </template>
      <template v-for="item in columnSlot"
                #[getSlotName({prop:item},`F`)]="scope">
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
import { getColumn } from 'utils/util'
export default create({
  name: "dynamic",
  mixins: [props(), event()],
  data () {
    return {
      reload: Math.random(),
      hoverList: []
    }
  },
  props: {
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    max: Number,
    boxType: String,
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
    isAdd () {
      return this.boxType === "add"
    },
    isEdit () {
      return this.boxType === "edit"
    },
    isView () {
      return this.boxType === "view"
    },
    textLen () {
      return this.text.length;
    },
    maxFlag () {
      if (this.max) {
        return !(this.text.length == this.max)
      }
      return true
    },
    showIndex () {
      return this.validData(this.children.index, true)
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
      return getColumn(this.children.column)
    },
    option () {
      // 默认选项
      let options = {
        boxType: this.boxType,
        border: true,
        header: false,
        menu: false,
        size: this.size,
        disabled: this.disabled,
        readonly: this.readonly,
        menuBtn: false,
      };

      // 处理子选项
      let childOptions = this.deepClone(this.children);
      delete childOptions.column;

      let columnOption = this.deepClone(this.columnOption);
      const callback = (list) => {
        list.forEach((ele, index) => {
          if (ele.children && Array.isArray(ele.children)) callback(ele.children)
          else {
            list[index] = {
              ...ele,
              ...{
                hide: this.validData(ele.hide, !this.validParams(ele, 'display', true)),
                disabled: this.validParams(ele, 'disabled', false),
                detail: this.validParams(ele, 'detail', false),
                cell: this.validData(ele.cell, this.isCrud)
              }
            }
          }
        })
      }
      callback(columnOption)
      // 处理列选项
      columnOption.unshift({
        label: this.children.indexLabel || '#',
        prop: '_index',
        display: this.showIndex,
        hide: !this.showIndex,
        fixed: true,
        align: 'center',
        headerAlign: 'center',
        span: 24,
        width: 60
      })

      // 返回合并后的选项对象
      return {
        ...options,
        ...{ column: columnOption },
        ...childOptions
      };
    }
  },
  mounted () {
    this.initData();
  },
  methods: {
    validParams (column, type, value) {
      function replaceStr (str) { // 正则法
        str = str.toLowerCase();
        var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
        return str.replace(reg, function (m) {
          return m.toUpperCase()
        });
      }
      let key, caseKey = replaceStr(type);
      if (!this.validatenull(column[type])) {
        key = type
      } else if (this.isAdd) {
        key = 'add' + caseKey
      } else if (this.isEdit) {
        key = 'edit' + caseKey
      } else if (this.isView) {
        key = 'view' + caseKey
      }
      return this.validData(column[key], value)
    },
    handleTextValue (val) {
      this.initData();
    },
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
      this.hoverList[index] = true;
    },
    mouseoutRow (index) {
      if (this.delBtn) return
      this.flagList();
      this.hoverList[index] = false
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
        this.reload = Math.random();
      }
      if (typeof this.rowDel === 'function') {
        this.rowDel(this.text[index], callback);
      } else {
        callback();
      }
    },
    addRow () {
      const callback = (obj = {}) => {
        let row = this.deepClone({
          ...this.valueOption,
          ...obj,
          ...{
            $index: this.textLen
          }
        })
        if (this.isCrud) {
          this.$refs.main.rowCellAdd(row);
        } else if (this.isForm) {
          this.text.push(row)
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
