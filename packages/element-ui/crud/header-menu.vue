<template>
  <div :class="b('menu')" v-if="vaildData($parent.tableOption.header,true)">
    <div :class="b('left')">
      <el-button
        type="primary"
        @click="$parent.rowAdd"
        :icon="config.addBtnIcon"
        :size="$parent.isMediumSize"
        v-if="vaildData($parent.tableOption.addBtn,config.addBtn)"
      >{{config.addBtnTitle}}</el-button>
      <el-button
        type="primary"
        @click="$parent.rowCellAdd"
        :icon="config.addBtnIcon"
        :size="$parent.isMediumSize"
        v-if="vaildData($parent.tableOption.addBtn,config.addBtn)"
      >{{config.addBtnTitle}}</el-button>

      <el-button
        type="primary"
        @click="rowPrint"
        :icon="config.printBtnIcon"
        :size="$parent.isMediumSize"
        v-if="vaildData($parent.tableOption.printBtn,config.printBtn)"
      >{{config.printBtnTitle}}</el-button>
      <el-button
        type="primary"
        @click="rowExcel"
        :icon="config.excelBtnIcon"
        :size="$parent.isMediumSize"
        v-if="vaildData($parent.tableOption.excelBtn,config.excelBtn)"
      >{{config.excelBtnTitle}}</el-button>
      <slot name="menuLeft"></slot>
    </div>
    <div :class="b('right')">
      <slot name="menuRight"></slot>
      <el-button
        :icon="config.refreshBtnIcon"
        circle
        :size="$parent.isMediumSize"
        @click="$parent.refreshChange"
        v-if="vaildData($parent.tableOption.refreshBtn,config.refreshBtn)"
      ></el-button>
      <el-button
        :icon="config.columnBtnIcon"
        circle
        :size="$parent.isMediumSize"
        @click="$parent.$refs.showColumn.columnBox=true"
        v-if="vaildData($parent.tableOption.columnBtn,config.columnBtn)"
      ></el-button>
      <el-button
        :icon="config.searchboxBtnIcon"
        circle
        :size="$parent.isMediumSize"
        @click="$parent.$refs.headerSearch.handleSearchShow()"
        v-show="($parent.$refs.headerSearch || {}).searchFlag && vaildData($parent.tableOption.searchBtn,config.searchBtn)"
      ></el-button>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import config from "./config";
import { vaildData } from "utils/util";
export default create({
  name: "crud",
  data() {
    return {
      config: config
    };
  },
  created() {
    this.vaildData = vaildData;
    this.$parent = this.$parent.$parent;
  },
  methods: {
    //下载excel
    rowExcel() {
      if (!window.saveAs || !window.XLSX) {
        if (__ENV__ === "development") {
          this.$log.warning("导出excel需要引入以下包");
          if (!window.saveAs) {
            this.$log.capsule(
              "file-saver：",
              "https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js",
              "warning"
            );
          }
          if (!window.XLSX) {
            this.$log.capsule(
              "xlsx",
              "https://cdn.bootcss.com/xlsx/0.14.1/xlsx.full.min.js",
              "warning"
            );
          }
        }
        return;
      }
      let data = this.deepClone(this.$parent.tableSelect);

      if (this.validatenull(data)) {
        this.$message.warning("请勾选要导出的数据");
        return;
      }
      this.$export.excel({
        title: this.$parent.tableOption.title || new Date().getTime(),
        columns: (() => {
          let list = [];
          this.$parent.columnOption.forEach(ele => {
            if (!this.validatenull(this.$parent.DIC[ele.prop])) {
              list.push({
                label: ele.label,
                prop: "$" + ele.prop
              });
            } else {
              list.push({
                label: ele.label,
                prop: ele.prop
              });
            }
          });
          return list;
        })(),
        data: data
      });
      this.$parent.setCurrentRow();
    },
    //打印
    rowPrint() {
      this.$parent.printKey = false;
      this.$nextTick(() => {
        window.print();
        this.$parent.printKey = true;
      });
    }
  }
});
</script>
