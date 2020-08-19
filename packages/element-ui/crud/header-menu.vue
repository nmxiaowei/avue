<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button type="primary"
                 @click="crud.rowAdd"
                 :icon="config.addBtnIcon"
                 :size="crud.isMediumSize"
                 v-permission="crud.getPermission('addBtn')"
                 v-if="vaildData(crud.tableOption.addBtn,config.addBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <el-button type="primary"
                 @click="crud.rowCellAdd"
                 :icon="config.addBtnIcon"
                 v-permission="crud.getPermission('addRowBtn')"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.addRowBtn,config.addRowBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </el-button>
      <el-button type="primary"
                 @click="rowPrint"
                 :icon="config.printBtnIcon"
                 v-permission="crud.getPermission('printBtn')"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.printBtn,config.printBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('printBtn')}}
        </template>
      </el-button>
      <el-button type="primary"
                 @click="rowExcel"
                 :icon="config.excelBtnIcon"
                 v-permission="crud.getPermission('excelBtn')"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.excelBtn,config.excelBtn)">
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('excelBtn')}}
        </template>
      </el-button>
      <slot name="menuLeft"></slot>
    </div>
    <div :class="b('right')">
      <slot name="menuRight"></slot>
      <avue-date type="datetimerange"
                 @change="dateChange"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 format="yyyy-MM-dd HH:mm:ss"
                 :pickerOptions="pickerOptions"
                 style="display:inline-block;margin-right:20px;"
                 v-if="vaildData(crud.tableOption.dateBtn,config.dateBtn)"
                 :size="crud.isMediumSize"></avue-date>
      <el-tooltip effect="dark"
                  :content="t('crud.refreshBtn')"
                  placement="top">
        <el-button :icon="config.refreshBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.refreshChange"
                   v-permission="crud.getPermission('refreshBtn')"
                   v-if="vaildData(crud.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.showBtn')"
                  placement="top">
        <el-button :icon="config.columnBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.dialogColumn.columnBox=true"
                   v-permission="crud.getPermission('columnBtn')"
                   v-if="vaildData(crud.tableOption.columnBtn,config.columnBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.searchBtn')"
                  placement="top">
        <el-button :icon="config.searchBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.headerSearch.handleSearchShow()"
                   v-if="(crud.$refs.headerSearch || {}).searchFlag"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.filterBtn')"
                  placement="top">
        <el-button :icon="config.filterBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.dialogFilter.box=true"
                   v-permission="crud.getPermission('filterBtn')"
                   v-if="vaildData(crud.tableOption.filterBtn,config.filterBtn)"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import permission from '../../core/directive/permission';
import create from "core/create";
import config from "./config";
import packages from "core/packages";
import { dateFtt } from 'utils/date'
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
  computed: {
    data () {
      if (this.crud.tableOption.selection) {
        return this.crud.tableSelect;
      } else {
        return this.crud.list;
      }
    },
    columnIndex () {
      return this.crud.$refs.dialogColumn.columnIndex;
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
      this.vaildData = vaildData;
      this.crud.rowExcel = this.rowExcel;
      this.crud.rowPrint = this.rowPrint;
    },
    rowExcel () {
      if (!window.saveAs || !window.XLSX) {
        packages.logs("file-saver");
        packages.logs("xlsx");
        return;
      }
      if (this.validatenull(this.data)) {
        this.$message.warning("请勾选要导出的数据");
        return;
      }
      this.$export.excel({
        title: (this.crud.tableOption.title || '') + dateFtt('yyyy-MM-dd hh:mm:ss', new Date()),
        columns: (() => {
          let list = [];
          this.crud.propOption.forEach(ele => {
            if (this.columnIndex.includes(ele.prop)) {
              list.push({
                label: ele.label,
                prop: (() => {
                  if (
                    !this.validatenull(this.crud.DIC[ele.prop]) ||
                    !this.validatenull(this.crud.cascaderDIC[ele.prop])
                  ) {
                    return "$" + ele.prop;
                  }
                  return ele.prop;
                })()
              });
            }
          });
          return list;
        })(),
        data: this.handleSum()
      });
      this.crud.setCurrentRow();
    },
    //计算统计
    handleSum () {
      const option = this.crud.tableOption;
      const columnOption = this.crud.propOption;
      let count = 0;
      let sumsList = [...this.crud.sumsList];
      let data = []
      this.data.forEach(ele => {
        let obj = this.deepClone(ele);
        columnOption.forEach(column => {
          if (column.bind) {
            obj[column.prop] = getAsVal(obj, column.bind);
          }
        })
        data.push(obj);
      })
      if (option.index) count++;
      if (option.selection) count++;
      if (option.expand) count++;
      sumsList.splice(0, count);
      sumsList.splice(sumsList.length - 1, 1);
      if (option.showSummary) {
        let sumsObj = {};
        sumsList.forEach((ele, index) => {
          if ((columnOption[index] || {}).prop) {
            sumsObj[columnOption[index].prop] = ele;
          }
        });
        data.push(sumsObj);
      }
      return data;
    },
    //打印
    rowPrint () {
      this.$nextTick(() => {
        this.$Print({
          html: this.crud.$el.innerHTML
        })
      });
    }
  }
});
</script>
