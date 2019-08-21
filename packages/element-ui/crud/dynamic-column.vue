
<template>
  <el-table-column :label="columnOption.label"
                   :min-width="columnOption.minWidth"
                   :width="columnOption.width"
                   :render-header="columnOption.renderHeader"
                   :align="columnOption.align || crud.tableOption.align"
                   :header-align="columnOption.headerAlign || crud.tableOption.headerAlign"
                   :prop="columnOption.key">
    <template v-for="column in columnOption.children">
      <dynamic-column v-if="column.children && column.children.length"
                      :key="column.label"
                      :columnOption="column">
        <template v-for="(item,index) in crud.propOption"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot :row="scope.row"
                :dic="scope.dic"
                :size="scope.size"
                :label="scope.label"
                :name="item.prop"></slot>
        </template></dynamic-column>
      <template v-else>
        <el-table-column v-if="vaildColumn(column.prop)"
                         :key="column.prop"
                         :prop="column.prop"
                         :label="column.label"
                         filter-placement="bottom-end"
                         :filters="handleFilters(column)"
                         :filter-method="column.filter? handleFiltersMethod : undefined"
                         :filter-multiple="vaildData(column.filterMultiple,true)"
                         :show-overflow-tooltip="column.overHidden"
                         :min-width="column.minWidth"
                         :sortable="column.sortable"
                         :render-header="column.renderHeader"
                         :align="column.align || crud.tableOption.align"
                         :header-align="column.headerAlign || crud.tableOption.headerAlign"
                         :width="column.width"
                         :fixed="crud.isMobile?false:column.fixed">
          <template slot-scope="scope">
            <span>
              <template v-if="cellEditFlag(scope.row,column)">
                <component :is="getComponent(column.type)"
                           size="mini"
                           v-model="scope.row[column.prop]"
                           :type="column.type"
                           :disabled="column.disabled || crud.btnDisabled"
                           :props="column.props || crud.tableOption.props"
                           :format="column.format"
                           :parent="column.parent"
                           :change="column.change"
                           :precision="column.precision"
                           :remote="column.remote"
                           :focus="column.focus"
                           :blur="column.blur"
                           :click="column.click"
                           :maxlength="column.maxlength"
                           :prefix-icon="column.prefixIcon"
                           :suffix-icon="column.suffixIcon"
                           :defaultExpandAll="column.defaultExpandAll"
                           :filterable="column.searchFilterable"
                           :filter-method="column.searchFilterMethod"
                           :value-format="column.valueFormat"
                           :multiple="column.multiple"
                           :allow-create="column.allowCreate"
                           :default-first-option="column.defaultFirstOption"
                           :readonly="column.readonly"
                           :clearable="vaildData(column.clearable,false)"
                           :placeholder="column.searchPlaceholder || column.label"
                           @change="column.cascader?handleChange(index,scope.row):''"
                           :dic="(crud.cascaderDIC[scope.row.$index] || {})[column.prop] || crud.DIC[column.prop]"></component>
              </template>
              <slot :row="scope.row"
                    :dic="crud.DIC[column.prop]"
                    :size="crud.isMediumSize"
                    :label="handleShowLabel(scope.row,column,crud.DIC[column.prop])"
                    :name="column.prop"
                    v-else-if="column.slot"></slot>
              <template v-else>
                <span v-if="[undefined,'number'].includes(column.type)">
                  {{scope.row[column.prop]}}
                </span>
                <span v-else-if="column.parentProp"
                      v-html="handleDetail(scope.row,column,(crud.cascaderDIC[scope.row.$index] || {})[column.prop])"></span>

                <template v-else-if="['upload'].includes(column.type)">
                  <avue-img :align="column.align"
                            :listType="column.listType"
                            :imgWidth="column.imgWidth"
                            :fullscreen="column.imgFullscreen"
                            :imgHeight="column.imgHeight"
                            :imgType="column.imgType"
                            :type="menuText()"
                            :dataType="column.dataType"
                            :size="crud.isMediumSize"
                            :value="scope.row[column.prop]"
                            v-if="scope.row[column.prop]"></avue-img>
                </template>
                <span v-else-if="['color'].includes(column.type)">
                  <i class="avue-crud__color"
                     :style="{backgroundColor:scope.row[column.prop]}"></i>
                </span>
                <span v-else-if="['icon-select'].includes(column.type)">
                  <i class="avue-crud__icon-select"
                     :class="scope.row[column.prop]"></i>
                </span>
                <span v-else-if="column.displayAs=='switch' && ['switch'].includes(column.type)">
                  <el-switch v-model="scope.row[column.prop]"
                             disabled />
                </span>
                <span v-else
                      v-html="handleDetail(scope.row,column,crud.DIC[column.prop])"></span>
              </template>
            </span>

          </template>

        </el-table-column>

      </template>

    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "dynamic-column",
  inject: ["dynamic", 'crud'],
  props: {
    columnOption: {
      type: Object,
      required: true
    }
  },
  created () {
    const list = [
      "getComponent",
      "getPlaceholder",
      "vaildColumn",
      "menuText",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
      "cellEditFlag",
      "iconShow",
      "toggleExpanded",
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
