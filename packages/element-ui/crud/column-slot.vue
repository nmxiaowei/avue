<template>
  <el-table-column v-if="getColumnProp(column,'hide')"
                   :key="column.prop"
                   :prop="column.prop"
                   :label="column.label"
                   :column-key="column.prop"
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
    <template slot="header"
              slot-scope="{$index}">
      <slot :name="crud.getSlotName(column,'H')"
            v-if="crud.getSlotName(column,'H',crud.$scopedSlots)"
            v-bind="{column,$index}"></slot>
      <span v-else>{{column.label}}</span>
    </template>
    <template slot-scope="{row,$index}">
      <el-form-item :prop="crud.isTree?'':`list.${$index}.${column.prop}`"
                    :label="vaildLabel(column,row,' ')"
                    v-if="row.$cellEdit && column.cell"
                    :label-width="vaildLabel(column,row,'1px')"
                    :rules='column.rules'>
        <el-tooltip :content="(crud.listError[`list.${$index}.${column.prop}`] || {}).msg"
                    :disabled="!(crud.listError[`list.${$index}.${column.prop}`] || {}).valid"
                    placement="top">
          <slot v-bind="{
                      row:row,
                      dic:crud.DIC[column.prop],
                      size:crud.isMediumSize,
                      index:$index,
                      disabled:crud.btnDisabledList[$index],
                      label:handleDetail(row,column),
                      '$cell':row.$cellEdit
                    }"
                :name="crud.getSlotName(column,'F')"
                v-if="crud.getSlotName(column,'F',crud.$scopedSlots)"></slot>
          <form-temp v-else
                     :column="column"
                     :size="crud.isMediumSize"
                     :table-data="{index:$index,row:row,label:handleDetail(row,column)}"
                     :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                     :props="column.props || crud.tableOption.props"
                     :readonly="column.readonly"
                     :disabled="crud.disabled || crud.tableOption.disabled || column.disabled  || crud.btnDisabledList[$index]"
                     :clearable="vaildData(column.clearable,false)"
                     v-bind="$uploadFun(column,crud)"
                     v-model="row[column.prop]"
                     :column-slot="crud.mainSlot"
                     @change="columnChange(row,column,$index)">
            <template v-for="item in crud.mainSlot"
                      slot-scope="scope"
                      :slot="item">
              <slot v-bind="scope"
                    :name="item"></slot>
            </template>
          </form-temp>
        </el-tooltip>
      </el-form-item>
      <slot :row="row"
            :index="$index"
            :dic="crud.DIC[column.prop]"
            :size="crud.isMediumSize"
            :label="handleDetail(row,column)"
            :name="column.prop"
            v-else-if="crud.$scopedSlots[column.prop]"></slot>
      <template v-else>
        <span v-if="['img','upload'].includes(column.type)">
          <div class="avue-crud__img">
            <component v-for="(item,index) in getImgList(row,column)"
                       :src="item"
                       :is="getIsVideo(item)"
                       :key="index"
                       @click.stop="openImg(getImgList(row,column),index)"></component>
          </div>
        </span>
        <span v-else-if="'url' ===column.type">
          <el-link v-for="(item,index) in corArray(row[column.prop],column.separator)"
                   type="primary"
                   :key="index"
                   :href="item"
                   :target="column.target || '_blank'">{{item}}</el-link>
        </span>
        <span v-else-if="'rate'===column.type">
          <avue-rate disabled
                     v-model="row[column.prop]" />
        </span>
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
  </el-table-column>
</template>

<script>
let count = {}
import { detail } from "core/detail";
import { DIC_PROPS, DIC_SPLIT, typeList } from 'global/variable'
import { sendDic } from "core/dic";
import formTemp from 'common/components/form/index'
import iconTemp from 'common/components/icon/index'
export default {
  name: 'column-slot',
  inject: ["dynamic", 'crud'],
  components: {
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
      "handleFiltersMethod",
      "handleFilters"
    ];
    Object.keys(this.dynamic).forEach(ele => {
      if (list.includes(ele)) {
        this[ele] = this.dynamic[ele];
      }
    });
  },
  methods: {
    getIsVideo (item) {
      return typeList.video.test(item) ? 'video' : 'img'
    },
    vaildLabel (column, row, val) {
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
            this.$set(this.crud.cascaderDIC, rowIndex, {});
          }
          if (this.crud.formIndexList.includes(rowIndex)) {
            //清空子类字典
            cascader.forEach(ele => {
              this.$set(this.crud.cascaderDIC[rowIndex], ele.prop, []);
              cascader.forEach(ele => (row[ele] = ""));
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
          }).then(res => {
            //首次加载的放入队列记录
            if (!this.crud.formIndexList.includes(rowIndex)) this.crud.formIndexList.push(rowIndex);
            const dic = res || [];
            // 修改字典
            this.$set(this.crud.cascaderDIC[rowIndex], columnNextProp, dic);

            if (!this.validatenull(dic[columnNext.cascaderIndex]) && !this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex)) {
              row[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
            }
          }
          );
        })
      })
    },
    openImg (list, index) {
      list = list.map(ele => {
        return { thumbUrl: ele, url: ele }
      })
      this.$ImagePreview(list, index);
    },
    corArray (list, separator = DIC_SPLIT) {
      if (this.validatenull(list)) {
        return []
      } else if (!Array.isArray(list)) {
        return list.split(separator);
      }
      return list
    },
    handleDetail (row, column) {
      let result = row[column.prop];
      let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop]
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC) && this.crud.tableOption.filterDic !== true) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    getImgList (row, column) {
      let url = (column.propsHttp || {}).home || ''
      let value = (column.props || {}).value || DIC_PROPS.value;
      let result = this.handleDetail(row, column);
      if (this.validatenull(result)) return []
      if (column.listType == 'picture-img') return [url + result]
      let list = this.corArray(this.deepClone(result), column.separator);
      list.forEach((ele, index) => {
        list[index] = url + (typeof ele === 'object' ? ele[value] : ele);
      })
      return list;
    },
  }
}
</script>

<style>
</style>