<template>
  <div :class="b()">
    <avue-crud ref="crud"
               :option="option"
               :data="text">
      <template slot-scope="scope"
                slot="index">
        <el-button v-if="!readonly && !disabled  && !delBtn && hoverList[scope.row.$index]"
                   @mouseout.native="mouseoutRow(scope.row.$index)"
                   @click="delRow(scope.row.$index)"
                   type="danger"
                   size="mini"
                   :disabled="disabled"
                   icon="el-icon-delete"
                   circle></el-button>
        <span v-else
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
    readonly: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
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
        readonly: this.readonly,
        disabled: this.disabled
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
            if (this.option.addBtn === false || (this.readonly || this.disabled)) {
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
          let result = {}
          error.forEach((ele, index) => {
            if (!this.validatenull(ele)) {
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
        obj = Object.assign(this.valueOption, obj);
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
