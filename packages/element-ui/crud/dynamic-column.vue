
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
        </template>
      </dynamic-column>
      <template v-else-if="!['dynamic'].includes(column.type)">
        <el-table-column v-if="vaildColumn(column)"
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

          <span slot-scope="scope">
            <form-temp :column="column"
                       v-if="cellEditFlag(scope.row,column)"
                       size="mini"
                       :dic="(crud.cascaderDIC[scope.row.$index] || {})[column.prop] || crud.DIC[column.prop]"
                       :t="t"
                       :props="column.props || crud.tableOption.props"
                       :readonly="column.readonly"
                       :disabled="crud.disabled || crud.tableOption.disabled || column.disabled || crud.btnDisabledList[scope.row.$index]"
                       :clearable="vaildData(column.clearable,false)"
                       v-bind="$uploadFun(column,crud)"
                       v-model="scope.row[column.prop]"
                       @change="columnChange(index,scope.row,column)">
            </form-temp>
            <slot :row="scope.row"
                  :dic="crud.DIC[column.prop]"
                  :size="crud.isMediumSize"
                  :label="handleShowLabel(scope.row,column,crud.DIC[column.prop])"
                  :name="column.prop"
                  v-else-if="column.slot"></slot>
            <template v-else>
              <span v-if="column.parentProp"
                    v-html="handleDetail(scope.row,column,(crud.cascaderDIC[scope.row.$index] || {})[column.prop])"></span>
              <span v-else-if="['img','upload'].includes(column.type)">
                <div class="avue-crud__img">
                  <img v-for="(item,index) in getImgList(scope,column) "
                       :src="item"
                       :key="index"
                       @click="openImg(getImgList(scope,column),index)" />
                </div>
              </span>
              <span v-else-if="['url'].includes(column.type)">
                <el-link v-for="(item,index) in corArray(scope.row[column.prop],column.separator)"
                         type="primary"
                         :key="index"
                         :href="item"
                         :target="column.target || '_blank'">{{item}}</el-link>
              </span>
              <span v-else-if="['rate'].includes(column.type)">
                <avue-rate disabled
                           v-model="scope.row[column.prop]" />
              </span>
              <span v-else
                    v-html="handleDetail(scope.row,column,crud.DIC[column.prop])">1</span>
            </template>
          </span>
        </el-table-column>
      </template>

    </template>
  </el-table-column>
</template>

<script>
import formTemp from '../../core/components/form/index'
import locale from "../../core/common/locale";
export default {
  name: "dynamic-column",
  mixins: [locale],
  components: {
    formTemp
  },
  inject: ["dynamic", 'crud'],
  props: {
    columnOption: {
      type: Object,
      required: true
    }
  },
  created () {
    const list = [
      "corArray",
      "openImg",
      "detailData",
      "getComponent",
      "getPlaceholder",
      "vaildColumn",
      "menuText",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
      "columnChange",
      "cellEditFlag",
      "iconShow",
      "getImgList",
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
