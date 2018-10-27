<template>
  <div>
    <el-table-column v-if="columnIndex.indexOf(column.prop)!=-1"
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
                     :fixed="column.fixed">
      <crud-components v-if="column.children"
                       :columnOption="column.children"
                       :tableOption="tableOption"
                       :tableForm="tableForm"
                       :columnIndex="columnIndex"
                       :DIC="DIC">
        <template slot-scope="scope"
                  v-for="item in column.children"
                  :slot="item.prop">
          <slot :row="scope.row"
                :dic="scope.dic"
                :label="scope.label"
                :name="item.prop"
                v-if="item.solt"></slot>
        </template>
      </crud-components>
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
import column from '../../mixins/column'
import crudInput from './crud-input';
import crudSelect from './crud-select';
export default {
  name: 'crud-components',
  mixins: [column()],
  props: [
    'columnIndex',
    'columnOption',
    'tableOption',
    'DIC',
    'tableForm'
  ],
  components: {
    crudInput,
    crudSelect,
  },
  created () {
    this.initFun();
  },
  methods: {
  }
}
</script>

<style>
</style>
