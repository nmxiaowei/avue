<template>
  <div>
    <el-table-column v-if="showClomnuIndex.indexOf(column.prop)!=-1"
                     v-for="(column,index) in columnOption"
                     :prop="column.prop"
                     :key="column.prop"
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
                     :fixed="column.fixed">
      <crud-components v-if="column.children"
                       :columnOption="column.children"
                       :tableOption="tableOption"
                       :showClomnuIndex="showClomnuIndex"></crud-components>
      <template slot-scope="scope">
        <template v-if="cellEditFlag(scope.row,column)">
          <component size="small"
                     :is="getSearchType(column.type)"
                     v-model="tableForm[column.prop]"
                     :type="getType(column)"
                     clearable
                     :placeholder="column.label"
                     :dic="setDic(column.dicData,DIC[column.dicData])"></component>
        </template>
        <slot :row="scope.row"
              :dic="setDic(column.dicData,DIC[column.dicData])"
              :label="detail(scope.row,column)"
              :name="column.prop"
              v-else-if="column.solt"></slot>
        <template v-else>
          <span v-html="detail(scope.row,column)"></span>
        </template>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import * as utils from '../../utils/util.js';
export default {
  name: 'crudComponents',
  props: [
    'showClomnuIndex',
    'columnOption',
    'tableOption'
  ],
  created () {
    this.initFun();
  },
  methods: {
    cellEditFlag (row, column) {
      return row.$cellEdit && [undefined, 'select', 'input'].includes(column.type) && column.solt !== true && column.cell;
    },
    initFun () {
      Object.keys(utils).forEach(key => {
        this[key] = utils[key];
      });
    },// 处理数据
    detail (row, column) {
      let result = row[column.prop] || '';
      if (column.type) {
        if (
          (column.type === 'date' ||
            column.type === 'time' ||
            column.type === 'datetime') &&
          column.format
        ) {
          const format = column.format
            .replace('dd', 'DD')
            .replace('yyyy', 'YYYY');
          result = moment(result).format(format);
        }
        if (column.dicData) {
          result = this.findByvalue(
            typeof column.dicData === 'string' ?
              this.DIC[column.dicData] :
              column.dicData,
            result,
            (column.props || this.tableOption.props)
          );
        }
      }
      if (column.formatter && typeof column.formatter === 'function') {
        result = column.formatter(row, row[column.prop], result, column);
      }
      return result;
    },
  }
}
</script>

<style>
</style>
