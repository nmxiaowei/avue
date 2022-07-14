<template>
  <div :class="b('menu')">
    <div :class="b('left')"
         v-if="vaildData(crud.tableOption.menuLeft,true)">
      <el-button type="primary"
                 @click="crud.rowAdd"
                 :icon="crud.getBtnIcon('addBtn')"
                 :size="crud.isMediumSize"
                 v-permission="crud.getPermission('addBtn')"
                 v-if="vaildData(crud.tableOption.addBtn,config.addBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <el-button type="primary"
                 @click="crud.rowCellAdd"
                 :icon="crud.getBtnIcon('addBtn')"
                 v-permission="crud.getPermission('addRowBtn')"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.addRowBtn,config.addRowBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <slot name="menuLeft"
            :size="crud.isMediumSize"></slot>
    </div>
    <div :class="b('right')"
         v-if="vaildData(crud.tableOption.menuRight,true)">
      <avue-date type="datetimerange"
                 @change="dateChange"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 format="yyyy-MM-dd HH:mm:ss"
                 :pickerOptions="pickerOptions"
                 style="display:inline-block;margin-right:20px;"
                 v-if="vaildData(crud.tableOption.dateBtn,config.dateBtn)"
                 :size="crud.isMediumSize"></avue-date>
      <slot name="menuRight"
            :size="crud.isMediumSize"></slot>
      <el-button :icon="crud.getBtnIcon('excelBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="rowExcel"
                 v-permission="crud.getPermission('excelBtn')"
                 v-if="vaildData(crud.tableOption.excelBtn,config.excelBtn)"></el-button>
      </el-button>
      <el-button :icon="crud.getBtnIcon('printBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="rowPrint"
                 v-permission="crud.getPermission('printBtn')"
                 v-if="vaildData(crud.tableOption.printBtn,config.printBtn)"></el-button>
      </el-button>
      <el-button :icon="crud.getBtnIcon('refreshBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="crud.refreshChange"
                 v-permission="crud.getPermission('refreshBtn')"
                 v-if="vaildData(crud.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      <el-button :icon="crud.getBtnIcon('columnBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="crud.$refs.dialogColumn.handleShow()"
                 v-permission="crud.getPermission('columnBtn')"
                 v-if="vaildData(crud.tableOption.columnBtn,config.columnBtn)"></el-button>
      <el-button :icon="crud.getBtnIcon('searchBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="crud.$refs.headerSearch.handleSearchShow()"
                 v-if="(crud.$refs.headerSearch || {}).searchFlag&&vaildData(crud.tableOption.searchShowBtn,true)"></el-button>
      <el-button :icon="crud.getBtnIcon('filterBtn')"
                 circle
                 :size="crud.isMediumSize"
                 @click="crud.$refs.dialogFilter.handleShow()"
                 v-permission="crud.getPermission('filterBtn')"
                 v-if="vaildData(crud.tableOption.filterBtn,config.filterBtn)"></el-button>

    </div>
  </div>
</template>

<script>
import locale from "core/locale";
import permission from 'common/directive/permission';
import create from "core/create";
import config from "./config";
import packages from "core/packages";
import { vaildData, getAsVal } from "utils/util";
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
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      config: config
    };
  },
  created () {
    this.initFun();

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
      this.vaildData = vaildData;
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
