<template>
  <span>
    <template v-for="(column,index) in list">
      <dynamic-column v-if="column.children && column.children.length"
                      :columnOption="column"
                      :key="column.label">
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
          <template slot-scope="scope">
            <span>
              <form-temp :column="column"
                         v-if="cellEditFlag(scope.row,column)"
                         :size="crud.isMediumSize"
                         :dic="(crud.cascaderDIC[scope.row.$index] || {})[column.prop] || crud.DIC[column.prop]"
                         :t="t"
                         :props="column.props || crud.tableOption.props"
                         :disabled="column.disabled || crud.btnDisabledList[scope.row.$index]"
                         :clearable="vaildData(column.clearable,false)"
                         :upload-before="crud.uploadBefore"
                         :upload-after="crud.uploadAfter"
                         :upload-preview="crud.uploadPreview"
                         :upload-error="crud.uploadError"
                         :upload-delete="crud.uploadDelete"
                         v-model="scope.row[column.prop]"
                         @change="column.cascader && handleChange(index,scope.row)">
              </form-temp>
              <slot :row="scope.row"
                    :dic="crud.DIC[column.prop]"
                    :size="crud.isMediumSize"
                    :label="handleShowLabel(scope.row,column,crud.DIC[column.prop])"
                    :name="column.prop"
                    v-else-if="column.slot"></slot>
              <template v-else>
                <span v-if="column.parentProp">{{handleDetail(scope.row,column,(crud.cascaderDIC[scope.row.$index] || {})[column.prop])}}</span>
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
                <span v-else
                      v-html="handleDetail(scope.row,column,crud.DIC[column.prop])"></span>
              </template>
            </span>

          </template>

        </el-table-column>
      </template>
    </template>

  </span>

</template>

<script>
import { DIC_PROPS } from 'global/variable'
import dynamicColumn from "./dynamic-column";
import locale from "../../core/common/locale";
import { sendDic } from "core/dic";
import { getComponent, getPlaceholder } from "core/dataformat";
import formTemp from '../../core/components/form/index'
import { detail } from "core/detail";
export default {
  name: "column",
  mixins: [locale],
  components: {
    formTemp,
    dynamicColumn
  },
  inject: ["crud"],
  provide () {
    return {
      crud: this.crud,
      dynamic: this
    };
  },
  props: {
    columnOption: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    list () {
      let result = [...this.columnOption];
      return result;
    }
  },
  methods: {
    getComponent,
    getPlaceholder,
    vaildColumn (item) {
      const prop = item.prop;
      return ((this.crud.$refs.dialogColumn || {}).columnIndex || []).includes(
        prop
      )
    },
    getImgList (scope, column) {
      let url = (column.propsHttp || {}).home || ''
      let value = (column.props || {}).value || DIC_PROPS.value;
      if (column.listType == 'picture-img') {
        return [url + scope.row[column.prop]]
      }
      let list = this.detailData(this.deepClone(scope.row[column.prop]), column.dataType);
      list.forEach((ele, index) => {
        if (ele.constructor === Object) {
          list[index] = url + ele[value];
        } else {
          list[index] = url + ele;
        }
      })
      return list;
    },
    detailData (list, dataType) {
      if (this.validatenull(list)) {
        return []
      } else if (!Array.isArray(list) && ['string', 'number'].includes(dataType)) {
        return list.split(',')
      }
      return list;
    },
    menuText (value) {
      return this.menuType === "text" ? "text" : value;
    },
    handleDetail (row, column, DIC) {
      let result = row[column.prop];
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    handleShowLabel (row, column, DIC) {
      let result = "";
      if (!this.validatenull(DIC)) {
        result = detail(row, column, this.tableOption, DIC);
        row["$" + column.prop] = result;
      }
      return result;
    },
    handleChange (index, row) {
      this.$nextTick(() => {
        const columnOption = [...this.crud.propOption];
        //本节点;
        const column = columnOption[index];
        const list = column.cascader;
        const value = row[column.prop];
        const rowIndex = row.$index;
        // 下一个节点
        const columnNext = columnOption[index + 1];
        const columnNextProp = columnNext.prop;

        //最后一级
        if (
          this.validatenull(list) ||
          this.validatenull(value) ||
          this.validatenull(columnNext)
        ) {
          return;
        }
        // 如果本节点没有字典则创建节点数组
        if (this.validatenull(this.crud.cascaderDIC[rowIndex])) {
          this.$set(this.crud.cascaderDIC, rowIndex, {});
        }
        if (this.crud.formIndexList.includes(rowIndex)) {
          //清空子类字典
          list.forEach(ele => {
            this.$set(this.crud.cascaderDIC[rowIndex], ele.prop, []);
            list.forEach(ele => (row[ele] = ""));
          });
        }
        sendDic({
          url: (columnNext.dicUrl || '').replace("{{key}}", value),
          method: columnNext.dicMethod,
          query: columnNext.dicQuery,
          formatter: columnNext.dicFormatter,
          resKey: (columnNext.props || {}).res
        }).then(
          res => {
            // 修改字典
            this.$set(this.crud.cascaderDIC[rowIndex], columnNextProp, dic);
            //首次加载的放入队列记录
            if (!this.crud.formIndexList.includes(rowIndex)) this.crud.formIndexList.push(rowIndex);
            const dic = Array.isArray(res) ? res : [];
            if (!this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex)) {
              row[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
            }
          }
        );
      })

    },
    openImg (list, index) {
      list = list.map(ele => {
        return { thumbUrl: ele, url: ele }
      })
      this.$ImagePreview(list, index);
    },
    cellEditFlag (row, column) {
      return (
        row.$cellEdit &&
        column.slot !== true &&
        column.cell
      );
    },
    // 图标显示
    iconShow (prop, record) {
      return (
        prop === this.crud.treeProp &&
        record.children &&
        record.children.length > 0
      );
    },
    // 切换下级是否展开
    toggleExpanded (row, index) {
      row._expand = !row._expand;
      this.$set(this.crud.list, index, row);
    },
    //表格筛选逻辑
    handleFiltersMethod (value, row, column) {
      const columnNew = this.columnOption.filter(
        ele => ele.prop === column.property
      )[0];
      if (typeof columnNew.filtersMethod === "function") {
        return columnNew.filtersMethod(value, row, columnNew);
      } else {
        return row[columnNew.prop] === value;
      }
    },
    //表格筛选字典
    handleFilters (column) {
      if (column.filter !== true) return undefined;
      if (this.validatenull(column.dicFilters)) {
        let list = [];
        (this.crud.DIC[column.prop] || []).forEach(ele => {
          const props = column.props || this.crud.tableOption.props || {};
          list.push({
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value]
          });
        });
        return list;
      }
      return column.dicFilters;
    }
  }
};
</script>

