<template>
  <div :class="b()">
    <avue-crud ref="crud"
               :option="option"
               :data="text">
      <template slot-scope="scope"
                slot="index">
        <el-button v-if="!delBtn&&hoverList[scope.row.$index]&&!disabled"
                   @mouseout.native="mouseoutRow(scope.row.$index)"
                   @click="delRow(scope.row.$index)"
                   type="danger"
                   size="mini"
                   :disabled="disabled"
                   icon="el-icon-delete"
                   circle></el-button>
        <span v-else-if="delBtn || !hoverList[scope.row.$index]"
              @mouseover="mouseoverRow(scope.row.$index)">{{scope.row.$index+1}}</span>
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
    rowAdd () {
      return this.children.rowAdd
    },
    rowDel () {
      return this.children.rowDel
    },
    viewBtn () {
      return this.children.viewBtn === false
    },
    delBtn () {
      return this.children.delBtn === false
    },
    columnOption () {
      return this.children.column || []
    },
    option () {
      return Object.assign({
        border: true,
        header: false,
        menu: false,
      }, (() => {
        let option = this.deepClone(this.children)
        delete option.column;
        return option;
      })(), (() => {
        let list = [{
          label: '#',
          prop: 'index',
          fixed: true,
          width: 50,
          renderHeader: (h, { column, $index }) => {
            if (this.option.addBtn === false) {
              return '序号';
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
          slot: true
        }];
        this.columnOption.forEach(ele => {
          list.push(Object.assign(ele, {
            cell: true,
            slot: ele.formslot,
            disabled: this.disabled || this.viewBtn
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
    text () {
      this.initData();
    }
  },
  methods: {
    initData () {
      this.text.forEach((ele, index) => {
        ele = Object.assign(ele, {
          $cellEdit: true,
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
        this.text.splice(index, 1);
      }
      const row = this.text[index]
      if (typeof this.rowDel === 'function') {
        this.rowDel(row, callback);
      } else {
        callback();
      }
    },
    addRow () {
      const callback = (obj = {}) => {
        this.$refs.crud.rowCellAdd(obj);
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
