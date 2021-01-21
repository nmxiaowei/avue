
<template>
  <el-table-column :label="columnOption.label"
                   :min-width="columnOption.minWidth"
                   :width="columnOption.width"
                   :render-header="columnOption.renderHeader"
                   :align="columnOption.align || crud.tableOption.align"
                   :header-align="columnOption.headerAlign || crud.tableOption.headerAlign"
                   :prop="columnOption.prop">
    <template v-for="column in columnOption.children">
      <column-dynamic v-if="column.children && column.children.length"
                      :key="column.label"
                      :columnOption="column">
        <template v-for="item in crud.propOption"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot v-bind="scope"
                :name="item.prop"></slot>
        </template>
      </column-dynamic>
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

          <span slot-scope="{row,$index}">
            <form-temp :column="column"
                       v-if="cellEditFlag(row,column)"
                       size="mini"
                       :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                       :t="t"
                       :props="column.props || crud.tableOption.props"
                       :readonly="column.readonly"
                       :disabled="crud.disabled || crud.tableOption.disabled || column.disabled || crud.btnDisabledList[$index]"
                       :clearable="vaildData(column.clearable,false)"
                       v-bind="$uploadFun(column,crud)"
                       v-model="row[column.prop]"
                       @change="columnChange(index,row,column)">
            </form-temp>
            <slot :row="row"
                  :index="$index"
                  :dic="crud.DIC[column.prop]"
                  :size="crud.isMediumSize"
                  :label="handleShowLabel(row,column,crud.DIC[column.prop])"
                  :name="column.prop"
                  v-else-if="column.slot"></slot>
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
  name: 'column-dynamic',
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
      "vaildColumn",
      "handleDetail",
      "handleShowLabel",
      "handleChange",
      "columnChange",
      "cellEditFlag",
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
