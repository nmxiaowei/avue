
<template>
  <el-table-column :label="columnOption.label"
                   :min-width="columnOption.minWidth"
                   :width="columnOption.width"
                   :render-header="columnOption.renderHeader"
                   :align="columnOption.align || crud.tableOption.align"
                   :header-align="columnOption.headerAlign || crud.tableOption.headerAlign"
                   :prop="columnOption.prop">
    <template v-for="column in columnOption.children">
      <column-dynamic v-if="column.children && column.children.length>0"
                      :key="column.label"
                      :columnOption="column">
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot v-bind="scope"
                :name="item.prop"></slot>
        </template>
        <template v-for="item in crud.headerSlot"
                  slot-scope="scope"
                  :slot="crud.getSlotName(item,'H')">
          <slot v-bind="scope"
                :name="crud.getSlotName(item,'H')"></slot>
        </template>
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="crud.getSlotName(item,'F')">
          <slot v-bind="scope"
                :name="crud.getSlotName(item,'F')"></slot>
        </template>
      </column-dynamic>
      <el-table-column v-else-if="getColumnProp(column,'hide')"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"
                       filter-placement="bottom-end"
                       :filters="getColumnProp(column,'filters')"
                       :filter-method="getColumnProp(column,'filterMethod')?handleFiltersMethod:undefined"
                       :filter-multiple="vaildData(column.filterMultiple,true)"
                       :show-overflow-tooltip="column.overHidden"
                       :min-width="column.minWidth"
                       :sortable="getColumnProp(column,'sortable')"
                       :render-header="column.renderHeader"
                       :align="column.align || crud.tableOption.align"
                       :header-align="column.headerAlign || crud.tableOption.headerAlign"
                       :width="getColumnProp(column,'width')"
                       :fixed="getColumnProp(column,'fixed')">
        <template #header="scope">
          <slot :name="crud.getSlotName(column,'H')"
                v-if="crud.$slots[crud.getSlotName(column,'H')]"
                v-bind="Object.assign(scope,{column})"></slot>
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
        <template #default="{row,$index}">
          <el-form-item :prop="crud.isTree?'':`list.${$index}.${column.prop}`"
                        v-if="row.$cellEdit && column.cell"
                        :label="vaildLabel(column,row,' ')"
                        :label-width="vaildLabel(column,row,'1px')"
                        :rules='column.rules'>
            <slot v-bind="{
                      row:row,
                      dic:crud.DIC[column.prop],
                      size:crud.isMediumSize,
                      index:$index,
                      disabled:crud.btnDisabledList[$index],
                      label:handleShowLabel(row,column,crud.DIC[column.prop]),
                      '$cell':row.$cellEdit
                    }"
                  :name="crud.getSlotName(column,'F')"
                  v-if="crud.$slots[crud.getSlotName(column,'F')]"></slot>
            <form-temp v-else
                       :column="column"
                       :size="crud.isMediumSize"
                       :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                       :props="column.props || crud.tableOption.props"
                       :readonly="column.readonly"
                       :disabled="crud.disabled || crud.tableOption.disabled || column.disabled || crud.btnDisabledList[$index]"
                       :clearable="vaildData(column.clearable,false)"
                       v-bind="$uploadFun(column,crud)"
                       v-model="row[column.prop]"
                       @change="columnChange(index,row,column)">
            </form-temp>
          </el-form-item>
          <slot :row="row"
                :index="$index"
                :dic="crud.DIC[column.prop]"
                :size="crud.isMediumSize"
                :label="handleShowLabel(row,column,crud.DIC[column.prop])"
                :name="column.prop"
                v-else-if="crud.$slots[column.prop]"></slot>
          <template v-else>
            <span v-if="['img','upload'].includes(column.type)">
              <div class="avue-crud__img">
                <img v-for="(item,index) in getImgList(row,column) "
                     :src="item"
                     :key="index"
                     @click="openImg(getImgList(row,column),index)" />
              </div>
            </span>
            <span v-else-if="['url'].includes(column.type)">
              <el-link v-for="(item,index) in corArray(row[column.prop],column.separator)"
                       type="primary"
                       :key="index"
                       :href="item"
                       :target="column.target || '_blank'">{{item}}</el-link>
            </span>
            <span v-else-if="['rate'].includes(column.type)">
              <avue-rate disabled
                         v-model="row[column.prop]" />
            </span>
            <span v-else
                  v-html="handleDetail(row,column)"></span>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import formTemp from '../../core/components/form/index'
export default {
  name: 'column-dynamic',
  components: {
    formTemp
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
      "corArray",
      "openImg",
      "detailData",
      "vaildLabel",
      "vaildColumn",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
      "columnChange",
      "getImgList",
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
