<template>
  <el-drawer :class="[b('dialog'),b('column')]"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             class="avue-dialog"
             :title="t('crud.showTitle')"
             :size="crud.isMobile?'100%':'50%'"
             :visible.sync="columnBox">
    <el-scrollbar style="height:calc(100% - 100px)">
      <el-table :data="list"
                ref="table"
                :key="Math.random()"
                size="small"
                border>
        <el-table-column align="center"
                         width="100"
                         header-align="center"
                         prop="label"
                         label="列名">
        </el-table-column>
        <template v-for="(item,index) in crud.defaultColumn">
          <el-table-column :prop="item.prop"
                           :key="index"
                           align="center"
                           header-align="center"
                           :width="item.width|| 50"
                           v-if="!['order'].includes(crud.defaultColumn.prop)"
                           :label="item.label">
            <template slot-scope="{row}">
              <el-slider :min="0"
                         :max="2000"
                         size="small"
                         v-if="item.prop=='width'"
                         v-model="crud.default[row.prop][item.prop]"></el-slider>
              <el-checkbox v-else
                           v-model="crud.default[row.prop][item.prop]"></el-checkbox>
            </template>
          </el-table-column>
        </template>

      </el-table>
    </el-scrollbar>
  </el-drawer>
</template>
<script>
import create from "core/create";
import packages from "core/packages";
import locale from "../../core/common/locale";
export default create({
  name: 'crud',
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      columnBox: false,
    };
  },
  computed: {
    list () {
      let list = [];
      for (var o in this.crud.default) {
        const ele = this.crud.default[o] || {}
        if (ele.showColumn != false) {
          list.push(Object.assign(ele, { prop: o }))
        }
      }
      list = list.filter(item => !this.validatenull(item.order)).sort((a, b) => (a.order || 0) - (b.order || 0)).concat(list.filter(item => this.validatenull(item.order)))
      return list;
    }
  },
  watch: {
    columnBox (val) {
      if (val) this.$nextTick(() => this.rowDrop())
    }
  },
  methods: {
    //行排序
    rowDrop () {
      const el = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = window.Sortable.create(el, {
        ghostClass: 'el-table__row',
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          this.crud.headerSort(oldIndex, newIndex)
          this.$nextTick(() => this.rowDrop())
        }
      })
    },
  }
});
</script>

