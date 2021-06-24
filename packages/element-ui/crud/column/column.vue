<template>
  <slot name="$header"></slot>
  <!-- 动态列 -->
  <template v-for="(column,index) in list">
    <column-dynamic v-if="column.children && column.children.length>0"
                    :columnOption="column"
                    :key="column.label">
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
      <template #header="{$index}">
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
                         :disabled="crud.disabled || crud.tableOption.disabled || column.disabled  || crud.btnDisabledList[$index]"
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
              v-else-if="crud.$slots[column.prop]"></slot>
        <column-temp v-else
                     v-bind="{row,column}"></column-temp>
      </template>
    </el-table-column>
  </template>
  <slot name="$footer"></slot>
</template>

<script>

let count = {}
import create from "core/create";
import { detail } from "core/detail";
import { sendDic } from "core/dic";
import formTemp from 'common/components/form/index'
import { DIC_PROPS } from 'global/variable'
import columnDynamic from "./column-dynamic";
import { arraySort } from 'utils/util'
import columnTemp from './menu'
export default create({
  name: "crud",
  data () {
    return {}
  },
  components: {
    columnTemp,
    formTemp,
    columnDynamic
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
      result = arraySort(result, 'index', (a, b) => this.crud.objectOption[a.prop]?.index - this.crud.objectOption[b.prop]?.index)
      return result;
    }
  },
  methods: {
    getColumnProp (column, type) {
      let obj = this.crud.objectOption[column.prop] || {}
      if (type === 'filterMethod') return obj?.filters
      if (this.crud.isMobile && ['fixed'].includes(type)) return false;
      let result = obj?.[type]
      if (type == 'width' && result == 0) { return undefined }
      if (type == 'filters') return this.handleFilters(column, result)
      if (type == 'hide') return column.hide !== true
      else return result;
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
          this.crud.cascaderDIC[rowIndex] = {}
        }
        if (this.crud.formIndexList.includes(rowIndex)) {
          //清空子类字典
          cascader.forEach(ele => {
            this.crud.cascaderDIC[rowIndex][ele.prop] = []
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
            this.crud.cascaderDIC[rowIndex][columnNextProp] = dic;

            if (!this.validatenull(dic[columnNext.cascaderIndex]) && !this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex)) {
              row[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
            }
          }
        );
      })

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
    handleFilters (column, flag) {
      if (flag !== true) return undefined;
      let DIC = this.crud.DIC[column.prop] || []
      let list = [];
      if (!this.validatenull(DIC)) {
        DIC.forEach(ele => {
          const props = column.props || this.crud.tableOption.props || {};
          list.push({
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value]
          });
        });
      } else {
        this.crud.cellForm.list.forEach(ele => {
          if (!list.map(item => item.text).includes(ele[column.prop])) {
            list.push({
              text: ele[column.prop],
              value: ele[column.prop]
            });
          }
        });
      }
      return list;
    }
  }
});
</script>

