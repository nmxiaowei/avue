<template>
  <component :is="crud.tableColumnName"
             v-if="getColumnProp(column,'hide')"
             :key="column.prop"
             :prop="column.prop"
             :grid-row="column.gridRow"
             :label="column.label"
             :class-name="column.className"
             :label-class-name="column.labelClassName"
             :column-key="column.prop"
             filter-placement="bottom-end"
             :filters="getColumnProp(column,'filters')"
             :filter-method="getColumnProp(column,'filterMethod')?handleFilterMethod:undefined"
             :filter-multiple="validData(column.filterMultiple,true)"
             :show-overflow-tooltip="column.showOverflowTooltip || column.overHidden"
             :min-width="column.minWidth"
             :sortable="getColumnProp(column,'sortable')"
             :sort-method="column.sortMethod"
             :sort-orders="column.sortOrders"
             :sort-by="column.sortBy"
             :resizable="column.resizable"
             :render-header="column.renderHeader"
             :align="column.align || crud.tableOption.align"
             :header-align="column.headerAlign || crud.tableOption.headerAlign"
             :width="getColumnProp(column,'width')"
             :fixed="getColumnProp(column,'fixed')">
    <template #header="{$index}">
      <slot :name="crud.getSlotName(column,'H')"
            v-if="crud.getSlotName(column,'H',crud.$slots)"
            v-bind="{column,$index}"></slot>
      <span v-else>{{column.label}}</span>
    </template>
    <template #="{row,column:tableColumn,$index}">
      <el-form-item :prop="crud.isTree?'':`list.${$index}.${column.prop}`"
                    :label="validLabel(column,row,' ')"
                    v-if="row.$cellEdit && column.cell"
                    :label-width="validLabel(column,row,'-1px')"
                    :rules='column.rules'>
        <el-tooltip :content="(crud.listError[`list.${$index}.${column.prop}`] || {}).msg"
                    :disabled="!(crud.listError[`list.${$index}.${column.prop}`] || {}).valid"
                    placement="top">
          <div>
            <slot v-bind="{
                      row:row,
                      tableColumn:tableColumn,
                      column:column,
                      dic:crud.DIC[column.prop],
                      size:crud.size,
                      index:$index,
                      disabled:crud.btnDisabledList[$index],
                      label:handleDetail(row,column),
                      '$cell':row.$cellEdit
                    }"
                  :name="crud.getSlotName(column,'F')"
                  v-if="crud.getSlotName(column,'F',crud.$slots)"></slot>
            <form-temp v-else
                       :column="column"
                       :size="crud.size"
                       :index="$index"
                       :row="row"
                       :render="column.renderForm"
                       :table-data="{index:$index,row:row,label:handleDetail(row,column)}"
                       :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                       :props="column.props || crud.tableOption.props"
                       :readonly="column.readonly"
                       :disabled="crud.disabled || crud.tableOption.disabled || column.disabled  || crud.btnDisabledList[$index]"
                       :clearable="validData(column.clearable,false)"
                       v-bind="$uploadFun(column,crud)"
                       v-model="row[column.prop]"
                       :column-slot="crud.mainSlot"
                       @change="columnChange(row,column,$index)">
              <template v-for="item in crud.mainSlot"
                        #[item]="scope">
                <slot v-bind="scope"
                      :name="item"></slot>
              </template>
            </form-temp>
          </div>
        </el-tooltip>
      </el-form-item>
      <custom v-else-if="column.render"
              :column="column"
              :row="row"
              :index="$index"
              :render="column.render"
              :event="column.event"
              :params="column.params"></custom>
      <slot :row="row"
            :tableColumn="tableColumn"
            :column="column"
            :index="$index"
            :dic="crud.DIC[column.prop]"
            :size="crud.size"
            :label="handleDetail(row,column)"
            :name="column.prop"
            v-else-if="crud.$slots[column.prop]"></slot>
      <template v-else>
        <span v-if="['img','upload'].includes(column.type)"
              class="avue-crud__img ">
          <template v-for="(item,index) in getImgList(row,column)"
                    :key="index">
            <component :src="item"
                       v-if="isMediaType(item,column.fileType)"
                       :is="isMediaType(item,column.fileType)"
                       @click.stop="openImg(row,column,index)"></component>
            <el-icon v-else
                     @click.stop="openImg(row,column,index)">
              <el-icon-document></el-icon-document>
            </el-icon>
          </template>
        </span>
        <el-link v-else-if="'url'===column.type"
                 v-for="(item,index) in corArray(row,column)"
                 type="primary"
                 :key="index"
                 :href="item"
                 :target="column.target || '_blank'">{{item}}</el-link>
        <avue-rate disabled
                   v-else-if="'rate'===column.type"
                   v-model="row[column.prop]"></avue-rate>
        <i v-else-if="'color'===column.type"
           class="avue-crud__color"
           :style="{backgroundColor:row[column.prop]}"></i>
        <icon-temp v-else-if="'icon'===column.type"
                   :text="row[column.prop]"></icon-temp>
        <span v-else-if="column.html"
              v-html="handleDetail(row,column)"></span>
        <span v-else
              v-text="handleDetail(row,column)"></span>
      </template>
    </template>
  </component>
</template>

<script>
let count = {}
import { detail } from "core/detail";
import { DIC_PROPS, DIC_SHOW_SPLIT, DIC_SPLIT } from 'global/variable'
import { sendDic } from "core/dic";
import { isMediaType, blankVal } from "utils/util";
import custom from 'common/components/form/custom'
import formTemp from 'common/components/form/index'
import iconTemp from 'common/components/icon/index'
import tableItemCard from '../grid/item'
export default {
  name: 'column-slot',
  inject: ["dynamic", 'crud'],
  components: {
    custom,
    tableItemCard,
    formTemp,
    iconTemp
  },
  props: {
    column: Object,
    columnOption: Array,
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
  },
  methods: {
    isMediaType (item, fileType) {
      return isMediaType(item, fileType)
    },
    validLabel (column, row, val) {
      if (column.rules && row.$cellEdit) {
        return val
      }
    },
    columnChange (row, column, index) {
      let key = `${index}-${column.prop}`
      if (!count[key]) {
        this.handleChange(column, row)
        if (typeof column.change === 'function' && column.cell == true) {
          column.change({ row, column, index, value: row[column.prop] })
        }
      }
      count[key] = true
      this.$nextTick(() => count[key] = false)
    },
    handleChange (column, row) {
      if (!column.cascader) return
      this.$nextTick(() => {
        const columnOption = [...this.crud.propOption];
        //本节点;
        const cascader = column.cascader;
        const str = cascader.join(",");
        cascader.forEach(item => {
          const columnNextProp = item;
          const value = row[column.prop];
          const rowIndex = row.$index;
          // 下一个节点
          const columnNext = this.findObject(this.columnOption, columnNextProp)
          if (this.validatenull(columnNext)) return
          // 如果本节点没有字典则创建节点数组
          if (this.validatenull(this.crud.cascaderDIC[rowIndex])) {
            this.crud.cascaderDIC[rowIndex] = {}
          }
          if (this.crud.cascaderIndexList.includes(rowIndex)) {
            //清空子类字典
            cascader.forEach(ele => {
              this.crud.cascaderDIC[rowIndex][ele] = []
              cascader.forEach(ele => {
                row[ele] = blankVal(row[ele])
              });
            });
          }
          //最后一级
          if (
            this.validatenull(cascader) ||
            this.validatenull(value) ||
            this.validatenull(columnNext)
          ) {
            return;
          }
          sendDic({
            column: columnNext,
            value: value,
            form: row
          }, this).then(res => {
            const dic = res || [];
            //首次加载的放入队列记录
            if (!this.crud.cascaderIndexList.includes(rowIndex)) {
              this.crud.cascaderIndexList.push(rowIndex);
            }
            if (!this.crud.cascaderDicList[rowIndex]) {
              this.crud.cascaderDicList[rowIndex] = {}
            }
            if (!this.crud.cascaderDicList[rowIndex][columnNextProp]) {
              this.crud.cascaderDicList[rowIndex][columnNextProp] = dic
            }
            // 修改字典
            this.crud.cascaderDIC[rowIndex][columnNextProp] = dic

            if (!this.validatenull(dic[columnNext.cascaderIndex]) && !this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex)) {
              row[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
            }
          });
        })
      })
    },
    handleDetail (row, column) {
      let result;
      let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop]
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC) && this.crud.tableOption.filterDic != true) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    corArray (row, column) {
      let list = this.handleDetail(row, column);
      if (!Array.isArray(list)) {
        list = this.validatenull(list) ? [] : list.split(DIC_SHOW_SPLIT);
      }
      return this.deepClone(list)
    },
    openImg (row, column, index) {
      let list = this.getImgList(row, column)
      list = list.map(ele => {
        return { thumbUrl: ele, url: ele, type: column.fileType }
      })
      this.$ImagePreview(list, index);
    },
    getImgList (row, column) {
      let url = column.propsHttp?.home || ''
      let value = column.props?.value || DIC_PROPS.value;
      let list = this.corArray(row, column);
      list.forEach((ele, index) => {
        list[index] = url + (ele[value] ? ele[value] : ele);
      })
      return list;
    },
  }
}
</script>

<style>
</style>