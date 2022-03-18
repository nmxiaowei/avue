<template>
  <el-drawer :class="[b('dialog'),b('column')]"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             class="avue-dialog"
             :title="t('crud.showTitle')"
             @opened="init"
             :size="crud.isMobile?'100%':'40%'"
             :visible.sync="columnBox">
    <el-table :data="list"
              ref="table"
              height="100%"
              :key="Math.random()"
              size="small"
              border>
      <el-table-column align="center"
                       width="100"
                       header-align="center"
                       prop="label"
                       key="label"
                       :label="t('crud.column.name')">
      </el-table-column>
      <template v-for="(item,index) in defaultColumn">
        <el-table-column :prop="item.prop"
                         :key="item.prop"
                         align="center"
                         header-align="center"
                         v-if="item.hide!=true"
                         :label="item.label">
          <template slot-scope="{row}">
            <el-checkbox v-model="crud.objectOption[row.prop][item.prop]"></el-checkbox>
          </template>
        </el-table-column>
      </template>

    </el-table>
  </el-drawer>
</template>
<script>
import create from "core/create";
import config from "./config.js";
import packages from "core/packages";
import locale from "core/locale";
export default create({
  name: 'crud',
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      columnBox: false,
      bindList: {}
    };
  },
  computed: {
    defaultColumn () {
      return [{
        label: this.t('crud.column.hide'),
        prop: 'hide'
      }, {
        label: this.t('crud.column.fixed'),
        prop: 'fixed'
      }, {
        label: this.t('crud.column.filters'),
        prop: 'filters'
      }, {
        label: this.t('crud.column.sortable'),
        prop: 'sortable'
      }, {
        label: this.t('crud.column.index'),
        prop: 'index',
        hide: true
      }, {
        label: this.t('crud.column.width'),
        prop: 'width',
        hide: true
      }]
    },
    list () {
      let list = [];
      this.crud.propOption.forEach(ele => {
        if (ele.showColumn != false) {
          list.push(ele)
        }
      })
      return list;
    }
  },
  methods: {
    init () {
      this.crud.propOption.forEach(column => {
        if (this.bindList[column.prop] === true) return
        this.defaultColumn.forEach(ele => {
          if (['hide', 'filters'].includes(ele.prop)) {
            this.$watch(`crud.objectOption.${column.prop}.${ele.prop}`, () => this.crud.refreshTable())
          }
        })
        this.bindList[column.prop] = true;
      })
      this.rowDrop();
    },
    rowDrop () {
      const el = this.$refs.table.$el.querySelectorAll(config.dropRowClass)[0]
      this.crud.tableDrop('column', el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        this.crud.headerSort(oldIndex, newIndex)
        this.crud.refreshTable(() => this.rowDrop())
      })
    },
  }
});
</script>

