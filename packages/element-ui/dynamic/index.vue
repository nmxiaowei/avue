<template>
  <div :class="b()">
    <avue-crud ref="crud"
               :option="option"
               :data="text">
      <template slot-scope="scope"
                slot="index">
        <el-button v-if="hoverList[scope.row.$index]"
                   @mouseout.native="mouseoutRow(scope.row.$index)"
                   @click="delRow(scope.row.$index)"
                   type="danger"
                   size="mini"
                   icon="el-icon-delete"
                   circle></el-button>
        <span v-else
              @mouseover="mouseoverRow(scope.row.$index)">{{scope.row.$index+1}}</span>
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
            return h('el-button', {
              attrs: {
                size: 'mini',
                type: 'primary',
                icon: 'el-icon-plus',
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
            disabled:this.disabled
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
      this.flagList();
      this.$set(this.hoverList, index, true)
    },
    mouseoutRow (index) {
      this.flagList();
      this.$set(this.hoverList, index, false)
    },
    flagList () {
      this.hoverList.forEach((ele, index) => {
        ele = false;
      })
    },
    delRow (index) {
      this.text.splice(index, 1);
    },
    addRow () {
      this.$refs.crud.rowCellAdd({});
    }
  }
});
</script>
