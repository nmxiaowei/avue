<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button type="primary"
                 @click="crud.rowAdd"
                 :icon="config.addBtnIcon"
                 :size="crud.isMediumSize"
                 v-permission="crud.permission.addBtn"
                 v-if="vaildData(crud.tableOption.addBtn,config.addBtn)">{{t('crud.addBtn')}}</el-button>
      <el-button type="primary"
                 @click="crud.rowCellAdd"
                 :icon="config.addBtnIcon"
                 v-permission="crud.permission.addRowBtn"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.addRowBtn,config.addRowBtn)">{{t('crud.addBtn')}}</el-button>

      <el-button type="primary"
                 @click="rowPrint"
                 :icon="config.printBtnIcon"
                 v-permission="crud.permission.printBtn"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.printBtn,config.printBtn)">{{t('crud.printBtn')}}</el-button>
      <el-button type="primary"
                 @click="rowExcel"
                 :icon="config.excelBtnIcon"
                 v-permission="crud.permission.excelBtn"
                 :size="crud.isMediumSize"
                 v-if="vaildData(crud.tableOption.excelBtn,config.excelBtn)">{{t('crud.excelBtn')}}</el-button>
      <slot name="menuLeft"></slot>
    </div>
    <div :class="b('right')">
      <slot name="menuRight"></slot>

      <el-tooltip effect="dark"
                  :content="t('crud.refreshBtn')"
                  placement="top">
        <el-button :icon="config.refreshBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.refreshChange"
                   v-permission="crud.permission.refreshBtn"
                   v-if="vaildData(crud.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.showBtn')"
                  placement="top">
        <el-button :icon="config.columnBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.dialogColumn.columnBox=true"
                   v-permission="crud.permission.columnBtn"
                   v-if="vaildData(crud.tableOption.columnBtn,config.columnBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.searchBtn')"
                  placement="top">
        <el-button :icon="config.searchBoxBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.headerSearch.handleSearchShow()"
                   v-permission="crud.permission.searchBtn"
                   v-if="(crud.$refs.headerSearch || {}).searchFlag && vaildData(crud.tableOption.searchBtn,config.searchBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="t('crud.filterBtn')"
                  placement="top">
        <el-button :icon="config.filterBtnIcon"
                   circle
                   :size="crud.isMediumSize"
                   @click="crud.$refs.dialogFilter.box=true"
                   v-permission="crud.permission.filterBtn"
                   v-if="vaildData(crud.tableOption.filterBtn,config.filterBtn)"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import tableTemp from "../../util/tableTemp";
import create from "core/create";
import config from "./config";
import packages from "core/packages";
import { vaildData } from "utils/util";
export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
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
        title: this.crud.tableOption.title || new Date().getTime(),
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
      let data = [...this.data];
      let sumsList = [...this.crud.sumsList];
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
      if (this.validatenull(this.data)) {
        this.$message.warning("请勾选要打印的数据");
        return;
      }
      let headerOption = [];
      const getTemplate = () => {
        headerOption = this.crud.propOption.filter(ele => {
          return this.columnIndex.includes(ele.prop) && ele.type !== "upload";
        });
        return tableTemp(
          headerOption,
          this.handleSum(),
          this.crud.tableOption
        );
      };

      this.$nextTick(() => {
        var newstr = getTemplate();
        var tab = window.open("", "打印");
        tab.document.open();
        tab.document.write(newstr);
        tab.window.print();
        tab.close();
      });
    }
  }
});
</script>
