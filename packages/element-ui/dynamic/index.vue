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
                     :option="option"
                     v-model="text[index]">
            <div slot-scope="{}"
                 slot="_index">
              <span>{{item.$index+1}}</span>
            </div>
            <template v-for="column in columnOption"
                      slot-scope="scope"
                      :slot="column.prop">
              <slot :row="text[index]"
                    :dic="scope.dic"
                    :size="scope.size"
                    :label="scope.label"
                    :name="column.prop"></slot>
            </template>
          </avue-form>
        </div>
      </div>
    </template>
    <avue-crud v-else-if="isCrud"
               ref="crud"
               :option="option"
               :disabled="disabled"
               @cell-mouse-enter="cellMouseenter"
               @cell-mouse-leave="cellMouseLeave"
               @selection-change="handleSelectionChange"
               :data="text">
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
      <template v-for="(item,index) in columnOption"
                slot-scope="scope"
                :slot="item.prop">
        <slot :row="scope.row"
              :dic="scope.dic"
              :size="scope.size"
              :label="scope.label"
              :name="item.prop"></slot>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "dynamic",
  mixins: [props(), event()],
  data () {
    return {
      hoverList: []
    }
  },
  props: {
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
        readonly: this.readonly,
        emptyBtn: false,
        submitBtn: false,
      }, (() => {
        let option = this.deepClone(this.children)
        delete option.column;
        return option;
      })(), (() => {
        let list = [{
          label: '#',
          prop: '_index',
          display: this.showIndex,
          detail: true,
          fixed: true,
          align: 'center',
          headerAlign: 'center',
          span: 24,
          width: 50,
          renderHeader: (h, { column, $index }) => {
            if (this.addBtn || this.readonly) {
              return
            }
            return h('el-button', {
              attrs: {
                size: 'mini',
                type: 'primary',
                icon: 'el-icon-plus',
                disabled: this.disabled,
                circle: true
              },
              on: {
                click: this.addRow
              }
            })
          },
          slot: true,
          formslot: true
        }];
        this.columnOption.forEach(ele => {
          list.push(Object.assign(ele, {
            cell: this.vaildData(ele.cell, true),
            slot: ele.formslot
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
    cellMouseenter (row) {
      let index = row.$index;
      this.mouseoverRow(index);
    },
    cellMouseLeave (row, column, cell, event) {
      let index = row.$index;
      this.mouseoutRow(index)
    },
    validate () {
      return new Promise(resolve => {
        let list = [];
        this.text.forEach((ele, index) => {
          let callback = () => {
            return new Promise(resolve => {
              this.asyncValidator(this.rulesOption, ele).then(() => {
                resolve();
              }).catch(error => {
                resolve(error)
              })
            })
          }
          list.push(callback())
        })
        Promise.all(list).then(error => {
          let result;
          error.forEach((ele, index) => {
            if (!this.validatenull(ele)) {
              if (!result) result = {}
              result[index] = ele
            }
          })
          resolve(result)
        })
      })
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
          this.$refs.crud.rowCellAdd(obj);
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
