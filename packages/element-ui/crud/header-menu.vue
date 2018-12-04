<template>
  <div :class="b('menu')" v-if="vaildData($parent.tableOption.header,true)">
    <div :class="b('left')">
      <el-button
        type="primary"
        @click="rowAdd"
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
        @click="$parent.$refs.search.handleSearchShow()"
        v-if="($parent.$refs.search || {}).searchFlag && vaildData($parent.tableOption.searchBtn,config.searchBtn)"
      ></el-button>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import config from "./config";
import { vaildData } from "utils/util";
import { setTimeout } from "timers";
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
    //打印
    rowPrint() {
      this.$parent.printKey = false;
      this.$nextTick(() => {
        window.print();
        this.$parent.printKey = true;
      });
    },
    // 新增
    rowAdd() {
      this.$parent.tableForm = this.deepClone(
        this.$parent.defaultForm.tableForm
      );
      this.$parent.$refs.dialogForm.show("add");
    }
  }
});
</script>
