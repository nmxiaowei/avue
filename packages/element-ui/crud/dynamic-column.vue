
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
          <template slot-scope="scope">
            <span>
              <form-temp :column="column"
                         v-if="cellEditFlag(scope.row,column)"
                         size="mini"
                         :dic="(crud.cascaderDIC[scope.row.$index] || {})[column.prop] || crud.DIC[column.prop]"
                         :t="t"
                         :props="column.props || crud.tableOption.props"
                         :disabled="column.disabled || crud.btnDisabled"
                         :clearable="vaildData(column.clearable,false)"
                         :upload-before="crud.uploadBefore"
                         :upload-after="crud.uploadAfter"
                         :upload-preview="crud.uploadPreview"
                         :upload-error="crud.uploadError"
                         :upload-delete="crud.uploadDelete"
                         v-model="scope.row[column.prop]"
                         @change="column.cascader?handleChange(index,scope.row):''">
              </form-temp>
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
                <span v-else-if="['img','upload'].includes(column.type)">
                  <div class="avue-crud__img">
                    <img v-for="(item,index) in getImgList(scope,column) "
                         :src="item"
                         :key="index"
                         @click="openImg(getImgList(scope,column),index)" />
                  </div>
                </span>
                <span v-else-if="['url'].includes(column.type)">
                  <el-link type="primary"
                           :href="scope.row[column.prop]"
                           :target="column.target || '_blank'">{{scope.row[column.prop]}}</el-link>
                </span>
                <span v-else-if="['color'].includes(column.type)">
                  <i class="avue-crud__color"
                     :style="{backgroundColor:scope.row[column.prop]}"></i>
                </span>
                <span v-else-if="['array'].includes(column.type)">
                  {{detailData(scope.row[column.prop],column.dataType).join(' | ')}}
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
      "openImg",
      "detailData",
      "getComponent",
      "getPlaceholder",
      "vaildColumn",
      "menuText",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
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
