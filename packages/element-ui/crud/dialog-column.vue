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
                size="small"
                border>
        <el-table-column align="center"
                         width="100"
                         header-align="center"
                         prop="label"
                         label="列名">
        </el-table-column>
        <el-table-column :prop="item.prop"
                         :key="index"
                         align="center"
                         header-align="center"
                         :width="item.width|| 50"
                         v-for="(item,index) in crud.defaultColumn"
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
        const ele = this.crud.default[o]
        if (ele?.showColumn != false) {
          list.push(Object.assign(ele, { prop: o }))
        }
      }
      return list;
    }
  }
});
</script>

