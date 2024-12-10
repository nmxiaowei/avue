<template>
  <component :is="crud.tableColumnName"
             v-if="getColumnProp(columnOption,'hide')"
             :prop="columnOption.prop"
             :label="columnOption.label"
             :class-name="columnOption.className"
             :label-class-name="columnOption.labelClassName"
             filter-placement="bottom-end"
             :filters="getColumnProp(columnOption,'filters')"
             :filter-method="getColumnProp(columnOption,'filterMethod')?handleFilterMethod:undefined"
             :filter-multiple="validData(columnOption.filterMultiple,true)"
             :show-overflow-tooltip="columnOption.showOverflowTooltip || columnOption.overHidden"
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
                  #[item]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-dynamic>
      <column-slot v-else
                   :key="column.prop"
                   :column="column"
                   :column-option="columnOption.children">
        <template v-for="item in crud.mainSlot"
                  #[item]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-slot>
    </template>
  </component>
</template>

<script>
import columnSlot from './column-slot'
import tableItemCard from '../grid/item'
export default {
  name: 'column-dynamic',
  components: {
    columnSlot,
    tableItemCard
  },
  inject: ["dynamic", 'crud'],
  props: {
    columnOption: Object
  },
  created () {
    const list = [
      'getColumnProp',
      "handleFilterMethod",
      "handleFilters"
    ];
    list.forEach(ele => {
      this[ele] = this.dynamic[ele];
    })
  }
};
</script>