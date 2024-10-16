<template>
  <div :class="b('header')">
    <div :class="b('left')"
         v-if="validData(crud.tableOption.menuLeft,true)">
      <el-button type="primary"
                 :class="b('addBtn')"
                 @click="crud.rowAdd"
                 :icon="crud.getBtnIcon('addBtn')"
                 :size="crud.size"
                 v-permission="crud.getPermission('addBtn')"
                 v-if="validData(crud.tableOption.addBtn,config.addBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <el-button type="primary"
                 :class="b('addBtn')"
                 @click="crud.rowCellAdd"
                 :icon="crud.getBtnIcon('addBtn')"
                 v-permission="crud.getPermission('addRowBtn')"
                 :size="crud.size"
                 v-if="validData(crud.tableOption.addRowBtn,config.addRowBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <slot name="menu-left"
            :size="crud.size"></slot>
    </div>
    <div :class="b('right')"
         v-if="validData(crud.tableOption.menuRight,true)">
      <avue-date type="datetimerange"
                 @change="dateChange"
                 value-format="YYYY-MM-DD HH:mm:ss"
                 format="YYYY-MM-DD HH:mm:ss"
                 :shortcuts="shortcuts"
                 style="display:inline-block;margin-right:20px;"
                 v-if="validData(crud.tableOption.dateBtn,config.dateBtn)"
                 :size="crud.size"></avue-date>
      <slot name="menu-right"
            :size="crud.size"></slot>
      <el-button :icon="crud.getBtnIcon('excelBtn')"
                 :class="b('excelBtn')"
                 circle
                 :size="crud.size"
                 @click="rowExcel"
                 v-permission="crud.getPermission('excelBtn')"
                 v-if="validData(crud.tableOption.excelBtn,config.excelBtn)">
      </el-button>
      <el-button :icon="crud.getBtnIcon('printBtn')"
                 :class="b('printBtn')"
                 circle
                 :size="crud.size"
                 @click="rowPrint"
                 v-permission="crud.getPermission('printBtn')"
                 v-if="validData(crud.tableOption.printBtn,config.printBtn)">
      </el-button>
      <el-button :icon="crud.getBtnIcon('refreshBtn')"
                 :class="b('refreshBtn')"
                 circle
                 :size="crud.size"
                 @click="crud.refreshChange"
                 v-permission="crud.getPermission('refreshBtn')"
                 v-if="validData(crud.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      <el-button :icon="crud.getBtnIcon('columnBtn')"
                 :class="b('columnBtn')"
                 circle
                 :size="crud.size"
                 @click="crud.$refs.dialogColumn.handleShow()"
                 v-permission="crud.getPermission('columnBtn')"
                 v-if="validData(crud.tableOption.columnBtn,config.columnBtn)"></el-button>
      <el-button :icon="crud.getBtnIcon('searchBtn')"
                 :class="b('searchBtn')"
                 circle
                 :size="crud.size"
                 @click="crud.$refs.headerSearch.handleSearchShow()"
                 v-if="(crud.$refs.headerSearch || {}).searchFlag&&validData(crud.tableOption.searchShowBtn,true)"></el-button>
      <el-button :icon="crud.getBtnIcon('filterBtn')"
                 :class="b('filterBtn')"
                 circle
                 :size="crud.size"
                 @click="crud.$refs.dialogFilter.handleShow()"
                 v-permission="crud.getPermission('filterBtn')"
                 v-if="validData(crud.tableOption.filterBtn,config.filterBtn)"></el-button>

      <el-button :icon="crud.getBtnIcon('gridBtn')"
                 :class="b('gridBtn')"
                 circle
                 :size="crud.size"
                 @click="crud.handleGridShow()"
                 v-permission="crud.getPermission('gridBtn')"
                 v-if="validData(crud.tableOption.gridBtn,config.gridBtn)"></el-button>

    </div>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import packages from "core/packages";
import permission from 'common/directive/permission';
import { validData, getAsVal } from "utils/util";
import config from "../config";
export default create({
  name: "crud",
  mixins: [locale],
  directives: {
    permission
  },
  inject: ["crud"],
  data () {
    return {
      dateCreate: false,
      shortcuts: [
        {
          text: '今天',
          value: new Date(),
        },
        {
          text: '昨天',
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
      config: config
    };
  },
  created () {
    this.initFun();

  },
  computed: {
    data () {
      if (this.crud.tableOption.selection) {
        return this.crud.tableSelect;
      } else {
        return this.crud.list;
      }
    }
  },
  methods: {
    //日期组件回调
    dateChange (val) {
      if (this.dateCreate) {
        this.crud.$emit("date-change", val);
      } else {
        this.dateCreate = true;
      }

    },
    initFun () {
      this.crud.rowExcel = this.rowExcel;
      this.crud.rowPrint = this.rowPrint;
    },
    rowExcel () {
      this.crud.$refs.dialogExcel.handleShow()
    },
    rowPrint () {
      this.$Print(this.crud.$refs.table)
    }
  }
});
</script>
