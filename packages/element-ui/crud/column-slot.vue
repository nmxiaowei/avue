<template>
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
    <template #header="{$index}">
      <slot :name="crud.getSlotName(column,'H')"
            v-if="crud.getSlotName(column,'H',crud.$scopedSlots)"
            v-bind="{column,$index}"></slot>
      <el-popover placement="bottom"
                  v-else
                  :disabled="(crud.objectOption[column.prop] || {}).screen!==true"
                  trigger="hover">
        <el-input type="text"
                  :placeholder="`请输入 ${column.label} 筛选关键字`"
                  v-model="(crud.objectOption[column.prop] || {}).screenValue"
                  size="mini"></el-input>
        <span slot="reference">{{column.label}}</span>
      </el-popover>
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
                      label:handleShowLabel(row,column,crud.DIC[column.prop]),
                      '$cell':row.$cellEdit
                    }"
                :name="crud.getSlotName(column,'F')"
                v-if="crud.getSlotName(column,'F',crud.$scopedSlots)"></slot>
          <form-temp v-else
                     :column="column"
                     :size="crud.isMediumSize"
                     :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                     :props="column.props || crud.tableOption.props"
                     :readonly="column.readonly"
                     :disabled="crud.disabled || crud.tableOption.disabled || column.disabled  || crud.btnDisabledList[$index]"
                     :clearable="vaildData(column.clearable,false)"
                     v-bind="$uploadFun(column,crud)"
                     v-model="row[column.prop]"
                     :column-slot="crud.mainSlot"
                     @change="columnChange($index,row,column,index)">
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
            :label="handleShowLabel(row,column,crud.DIC[column.prop])"
            :name="column.prop"
            v-else-if="crud.$scopedSlots[column.prop]"></slot>
      <template v-else>
        <span v-if="['img','upload'].includes(column.type)">
          <div class="avue-crud__img">
            <img v-for="(item,index) in getImgList(row,column)"
                 :src="item"
                 v-bind="allParams(item)"
                 :key="index"
                 @click.stop="openImg(getImgList(row,column),index)" />
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

<script>
let count = {}
import { detail } from "core/detail";
import { DIC_PROPS, DIC_SPLIT } from 'global/variable'
import { sendDic } from "core/dic";
import formTemp from '../../core/components/form/index'
export default {
  name: 'column-slot',
  inject: ["dynamic", 'crud'],
  components: {
    formTemp
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
    allParams (item) {
      return {
        is: this.$typeList.video.test(item) ? 'video' : 'img'
      }
    },
    vaildLabel (column, row, val) {
      if (column.rules && row.$cellEdit) {
        return val
      }
    },
    handleShowLabel (row, column, DIC) {
      let result = "";
      if (!this.validatenull(DIC)) {
        result = detail(row, column, this.crud.tableOption, DIC);
        row["$" + column.prop] = result;
      }
      return result;
    },
    columnChange ($index, row, column, index) {
      if (this.validatenull(count[$index])) count[$index] = 0
      count[$index] = count[$index] + 1;
      if (column.cascader) this.handleChange(index, row)
      if (count[$index] % this.crud.cellChangeCount === 0) {
        if (typeof column.change === 'function' && column.cell === true) {
          column.change({ row, column, index: $index, value: row[column.prop] })
        }
        this.crud.$emit('column-change', { row, column, index: $index, value: row[column.prop] })
      }
    },
    handleChange (index, row) {
      this.$nextTick(() => {
        const columnOption = [...this.crud.propOption];
        //本节点;
        const column = columnOption[index];
        const cascader = column.cascader;
        const str = cascader.join(",");
        const columnNextProp = cascader[0];
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
        }).then(
          res => {
            //首次加载的放入队列记录
            if (!this.crud.formIndexList.includes(rowIndex)) this.crud.formIndexList.push(rowIndex);
            const dic = Array.isArray(res) ? res : [];
            // 修改字典
            this.$set(this.crud.cascaderDIC[rowIndex], columnNextProp, dic);

            if (!this.validatenull(dic[columnNext.cascaderIndex]) && !this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex)) {
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
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    getImgList (row, column) {
      let url = (column.propsHttp || {}).home || ''
      let value = (column.props || {}).value || DIC_PROPS.value;
      if (this.validatenull(row[column.prop])) return []
      if (column.listType == 'picture-img') return [url + row[column.prop]]
      let list = this.corArray(this.deepClone(row[column.prop]), column.separator);
      list.forEach((ele, index) => {
        if (typeof ele === 'object') {
          list[index] = url + ele[value];
        } else {
          list[index] = url + ele;
        }
      })
      return list;
    },
  }
}
</script>

<style>
</style>