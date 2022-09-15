<template>
  <div v-if="columnBox">
    <el-drawer :class="[b('dialog'),b('column')]"
               lock-scroll
               :modal-append-to-body="$AVUE.modalAppendToBody"
               :append-to-body="$AVUE.appendToBody"
               class="avue-dialog"
               :title="t('crud.showTitle')"
               :size="crud.isMobile?'100%':'40%'"
               :visible.sync="columnBox">
      <el-table :data="data"
                ref="table"
                height="100%"
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
          <el-table-column :label="item.label"
                           :prop="item.prop"
                           :key="index"
                           align="center"
                           header-align="center">
            <template slot-scope="{row}">
              <el-checkbox @change="handleChange(item.prop)"
                           v-model="crud.objectOption[row.prop][item.prop]"></el-checkbox>
            </template>
          </el-table-column>
        </template>

      </el-table>
    </el-drawer>
  </div>

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
      data: [],
      columnBox: false
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
    }
  },
  methods: {
    handleShow () {
      this.data = []
      this.crud.propOption.forEach(column => {
        if (column.showColumn != false) this.data.push(column)
      })
      this.columnBox = true
      this.$nextTick(() => this.rowDrop())
    },
    handleChange (prop) {
      if (['hide', 'filters'].includes(prop)) {
        this.crud.refreshTable()
      }
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

