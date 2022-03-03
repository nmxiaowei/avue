
<template>
  <el-table-column :prop="columnOption.prop"
                   :key="columnOption.prop"
                   :label="columnOption.label"
                   filter-placement="bottom-end"
                   v-if="getColumnProp(columnOption,'hide')"
                   :filters="getColumnProp(columnOption,'filters')"
                   :filter-method="getColumnProp(columnOption,'filterMethod')?handleFiltersMethod:undefined"
                   :filter-multiple="vaildData(columnOption.filterMultiple,true)"
                   :show-overflow-tooltip="columnOption.overHidden"
                   :min-width="columnOption.minWidth"
                   :sortable="getColumnProp(columnOption,'sortable')"
                   :render-header="columnOption.renderHeader"
                   :align="columnOption.align || crud.tableOption.align"
                   :header-align="columnOption.headerAlign || crud.tableOption.headerAlign"
                   :width="getColumnProp(columnOption,'width')"
                   :fixed="getColumnProp(columnOption,'fixed')">
    <template v-for="column in columnOption.children">
      <column-dynamic v-if="column.children && column.children.length>0"
                      :key="column.label"
                      :columnOption="column">
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="item">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-dynamic>
      <column-slot v-else
                   :column="column"
                   :column-option="columnOption.children">
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="item">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-slot>
    </template>
  </el-table-column>
</template>

<script>
import columnSlot from './column-slot'
export default {
  name: 'column-dynamic',
  components: {
    columnSlot
  },
  inject: ["dynamic", 'crud'],
  props: {
    columnOption: Object
  },
  created () {
    const list = [
      'getColumnProp',
      "handleFiltersMethod",
      "handleFilters"
    ];
    Object.keys(this.dynamic).forEach(ele => {
      if (list.includes(ele)) {
        this[ele] = this.dynamic[ele];
      }
    });
  }
};
</script>
