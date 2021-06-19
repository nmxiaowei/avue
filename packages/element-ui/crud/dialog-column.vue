<template>
  <el-drawer lock-scroll
             append-to-body
             :class="['avue-dialog',b('dialog'),b('column')]"
             :title="t('crud.showTitle')"
             @opened="rowDrop"
             :size="crud.isMobile?'100%':'40%'"
             :visible.sync="columnBox">
    <div style="height:calc(100% - 5px)">
      <el-table :data="list"
                ref="table"
                :key="Math.random()"
                height="100%"
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
                           v-if="item.hide!=true"
                           :label="item.label">
            <<<<<<< HEAD
                    <template
                    #="{row}">
              <el-slider :min="0"
                         :max="2000"
                         size="small"
                         v-if="item.prop=='width'"
                         v-model="crud.objectOption[row.prop][item.prop]"></el-slider>
              <el-checkbox v-else
                           v-model="crud.objectOption[row.prop][item.prop]"></el-checkbox>
              =======
              <template slot-scope="{row}">
                <el-checkbox v-model="crud.objectOption[row.prop][item.prop]"></el-checkbox>
                >>>>>>> 0a461a6f... fix:crud header column params
              </template>
          </el-table-column>
        </template>

      </el-table>
    </div>
  </el-drawer>
</template>
<script>
import create from "core/create";
import config from "./config.js";
import packages from "core/packages";
import locale from "../../core/common/locale";
import { arraySort } from 'utils/util'
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
      for (var o in this.crud.objectOption) {
        const ele = this.crud.objectOption[o]
        if (ele.showColumn != false) {
          list.push(Object.assign(ele, { prop: o }))
        }
      }
      list = arraySort(list, 'index', (a, b) => this.crud.objectOption[a.prop]?.index - this.crud.objectOption[b.prop]?.index)
      return list;
    }
  },
  methods: {
    rowDrop () {
      const el = this.$refs.table.$el.querySelectorAll(config.dropRowClass)[0]
      this.crud.tableDrop(el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        this.crud.headerSort(oldIndex, newIndex)
        this.$nextTick(() => this.rowDrop())
      })
    },
  }
});
</script>

