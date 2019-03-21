<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button type="primary"
                 @click="$parent.rowAdd"
                 :icon="config.addBtnIcon"
                 :size="$parent.isMediumSize"
                 v-permission="$parent.permission.addBtn"
                 v-if="vaildData($parent.tableOption.addBtn,config.addBtn)">{{t('crud.addBtn')}}</el-button>
      <el-button type="primary"
                 @click="$parent.rowCellAdd"
                 :icon="config.addBtnIcon"
                 v-permission="$parent.permission.addRowBtn"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.addRowBtn,config.addRowBtn)">{{t('crud.addBtn')}}</el-button>

      <el-button type="primary"
                 @click="rowPrint"
                 :icon="config.printBtnIcon"
                 v-permission="$parent.permission.printBtn"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.printBtn,config.printBtn)">{{t('crud.printBtn')}}</el-button>
      <el-button type="primary"
                 @click="rowExcel"
                 :icon="config.excelBtnIcon"
                 v-permission="$parent.permission.excelBtn"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.excelBtn,config.excelBtn)">{{t('crud.excelBtn')}}</el-button>
      <slot name="menuLeft"></slot>
    </div>
    <div :class="b('right')">
      <slot name="menuRight"></slot>

      <el-tooltip effect="dark"
                  content="刷新"
                  placement="top">
        <el-button :icon="config.refreshBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.refreshChange"
                   v-permission="$parent.permission.refreshBtn"
                   v-if="vaildData($parent.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="列显隐"
                  placement="top">
        <el-button :icon="config.columnBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.dialogColumn.columnBox=true"
                   v-permission="$parent.permission.columnBtn"
                   v-if="vaildData($parent.tableOption.columnBtn,config.columnBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="搜索"
                  placement="top">
        <el-button :icon="config.searchBoxBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.headerSearch.handleSearchShow()"
                   v-permission="$parent.permission.searchBtn"
                   v-if="($parent.$refs.headerSearch || {}).searchFlag && vaildData($parent.tableOption.searchBtn,config.searchBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="过滤"
                  placement="top">
        <el-button :icon="config.filterBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.dialogFilter.box=true"
                   v-permission="$parent.permission.filterBtn"
                   v-if="vaildData($parent.tableOption.filterBtn,config.filterBtn)"></el-button>
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
  data() {
    return {
      config: config
    };
  },
  created() {
    this.vaildData = vaildData;
  },
  computed: {
    data() {
      if (this.$parent.tableOption.selection) {
        return this.$parent.tableSelect;
      } else {
        return this.$parent.list;
      }
    },
    columnIndex() {
      return this.$parent.$refs.dialogColumn.columnIndex;
    }
  },
  methods: {
    //下载excel
    rowExcel() {
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
        title: this.$parent.tableOption.title || new Date().getTime(),
        columns: (() => {
          let list = [];
          this.$parent.propOption.forEach(ele => {
            if (this.columnIndex.includes(ele.prop)) {
              list.push({
                label: ele.label,
                prop: (() => {
                  if (
                    !this.validatenull(this.$parent.DIC[ele.prop]) ||
                    !this.validatenull(this.$parent.cascaderDIC[ele.prop])
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
      this.$parent.setCurrentRow();
    },
    //计算统计
    handleSum() {
      const option = this.$parent.tableOption;
      const columnOption = this.$parent.propOption;
      let count = 0;
      let data = [...this.data];
      let sumsList = [...this.$parent.sumsList];
      if (option.index) count++;
      if (option.selection) count++;
      if (option.expand) count++;
      sumsList.splice(0, count);
      sumsList.splice(sumsList.length - 1, 1);
      if (option.showSummary) {
        let sumsObj = {};
        sumsList.forEach((ele, index) => {
          sumsObj[columnOption[index].prop] = ele;
        });
        data.push(sumsObj);
      }
      return data;
    },
    //打印
    rowPrint() {
      if (this.validatenull(this.data)) {
        this.$message.warning("请勾选要打印的数据");
        return;
      }
      let headerOption = [];
      const getTemplate = () => {
        headerOption = this.$parent.propOption.filter(ele => {
          return this.columnIndex.includes(ele.prop) && ele.type !== "upload";
        });
        return tableTemp(
          headerOption,
          this.handleSum(),
          this.$parent.tableOption
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
