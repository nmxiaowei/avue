
<template>
  <el-table-column :prop="columnOption.prop"
                   :label="columnOption.label"
                   filter-placement="bottom-end"
                   v-if="getColumnProp(columnOption,'hide')"
                   :filters="getColumnProp(columnOption,'filters')"
                   :filter-method="getColumnProp(columnOption,'filterMethod')?handleFiltersMethod:undefined"
                   :filter-multiple="validData(columnOption.filterMultiple,true)"
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
                  #[item]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-dynamic>
      <el-table-column v-else-if="getColumnProp(column,'hide')"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"
                       filter-placement="bottom-end"
                       :filters="getColumnProp(column,'filters')"
                       :filter-method="getColumnProp(column,'filterMethod')?handleFiltersMethod:undefined"
                       :filter-multiple="validData(column.filterMultiple,true)"
                       :show-overflow-tooltip="column.overHidden"
                       :min-width="column.minWidth"
                       :sortable="getColumnProp(column,'sortable')"
                       :render-header="column.renderHeader"
                       :align="column.align || crud.tableOption.align"
                       :header-align="column.headerAlign || crud.tableOption.headerAlign"
                       :width="getColumnProp(column,'width')"
                       :fixed="getColumnProp(column,'fixed')">
        <template #header="scope">
          <slot v-bind="{column,$index}"
                :name="crud.getSlotName(column,'H')"
                v-if="crud.getSlotName(column,'H',crud.$slots)"></slot>
          <el-popover placement="bottom"
                      v-else
                      :disabled="(crud.objectOption[column.prop] || {}).screen!==true"
                      trigger="hover">
            <el-input type="text"
                      :placeholder="`请输入 ${column.label} 筛选关键字`"
                      v-model="(crud.objectOption[column.prop] || {}).screenValue"
                      size="mini"></el-input>
            <template #reference>
              <span>{{column.label}}</span>
            </template>

          </el-popover>
        </template>
        <template #="{row,$index}">
          <el-form-item :prop="crud.isTree?'':`list.${$index}.${column.prop}`"
                        :label="vaildLabel(column,row,' ')"
                        v-if="row.$cellEdit && column.cell"
                        :label-width="vaildLabel(column,row,'1px')"
                        :rules='column.rules'>
            <el-tooltip :content="(crud.listError[`list.${$index}.${column.prop}`] || {}).msg"
                        :disabled="!(crud.listError[`list.${$index}.${column.prop}`] || {}).valid"
                        placement="top">
              <div>
                <slot v-bind="{
                      row:row,
                      dic:crud.DIC[column.prop],
                      size:crud.isMediumSize,
                      index:$index,
                      disabled:crud.btnDisabledList[$index],
                      label:handleShowLabel(row,column,crud.DIC[column.prop])
                    }"
                      :name="crud.getSlotName(column,'F')"
                      v-if="crud.getSlotName(column,'F',crud.$slots)"></slot>
                <form-temp v-else
                           :column="column"
                           :size="crud.isMediumSize"
                           :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                           :props="column.props || crud.tableOption.props"
                           :readonly="column.readonly"
                           :disabled="crud.disabled || crud.tableOption.disabled || column.disabled || crud.btnDisabledList[$index]"
                           :clearable="validData(column.clearable,false)"
                           v-bind="$uploadFun(column,crud)"
                           v-model="row[column.prop]"
                           @change="columnChange($index,row,column,index)">
                </form-temp>
              </div>
            </el-tooltip>
          </el-form-item>
          <slot :row="row"
                :index="$index"
                :dic="crud.DIC[column.prop]"
                :size="crud.isMediumSize"
                :label="handleShowLabel(row,column,crud.DIC[column.prop])"
                :name="column.prop"
                v-else-if="column.prop,crud.$slots"></slot>
          <column-temp v-else
                       v-bind="{row,column}"></column-temp>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import formTemp from 'common/components/form/index'
import columnTemp from './menu'
export default {
  name: 'column-dynamic',
  components: {
    formTemp,
    columnTemp
  },
  inject: ["dynamic", 'crud'],
  props: {
    t: Function,
    columnOption: {
      type: Object,
      required: true
    }
  },
  created () {
    const list = [
      'getColumnProp',
      "vaildLabel",
      "vaildColumn",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
      "columnChange",
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
