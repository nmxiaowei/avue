<template>
  <div>
    <el-table-column
      v-if="columnIndex.indexOf(column.prop)!=-1"
      v-for="(column,index) in columnOption"
      :prop="column.prop"
      :key="index"
      filter-placement="bottom-end"
      :filters="column.filters"
      :filter-method="column.filterMethod"
      :filter-multiple="vaildData(column.filterMultiple,true)"
      :show-overflow-tooltip="column.overHidden"
      :min-width="column.minWidth"
      :sortable="column.sortable"
      :align="vaildData(column.align,tableOption.align)"
      :header-align="vaildData(column.headerAlign,tableOption.headerAlign)"
      :width="column.width"
      :label="column.label"
      :fixed="column.fixed"
    >
      <template slot-scope="scope">
        <template v-if="cellEditFlag(scope.row,column)">
          <component
            size="small"
            :is="getSearchType(column.type)"
            v-model="tableForm[column.prop]"
            :type="getType(column)"
            clearable
            :placeholder="column.label"
            :dic="setDic(column.dicData,DIC[column.dicData])"
          ></component>
        </template>
        <slot
          :row="scope.row"
          :dic="setDic(column.dicData,DIC[column.dicData])"
          :label="detail(scope.row,column,tableOption,DIC)"
          :name="column.prop"
          v-else-if="column.solt"
        ></slot>
        <template v-else>
          <span v-html="detail(scope.row,column,tableOption,DIC)"></span>
        </template>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import { detail } from "src/core/detail";
import { setDic, vaildData } from "utils/util";
import crudInput from "components/input/";
import crudSelect from "components/select/";
import { getSearchType, getType } from "src/core/dataformat";
export default {
  props: ["columnIndex", "columnOption", "tableOption", "DIC", "tableForm"],
  components: {
    crudInput,
    crudSelect
  },
  created() {
    this.detail = detail;
    this.setDic = setDic;
    this.getSearchType = getSearchType;
    this.getType = getType;
    this.vaildData = vaildData;
  },
  methods: {
    cellEditFlag(row, column) {
      return (
        row.$cellEdit &&
        [undefined, "select", "input"].includes(column.type) &&
        column.solt !== true &&
        column.cell
      );
    }
  }
};
</script>

