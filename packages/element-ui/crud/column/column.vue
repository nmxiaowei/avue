<template>
  <div>
    <slot name="header"></slot>
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
      <column-slot v-else
                   :column="column"
                   :column-option="columnOption">
        <template v-for="item in crud.mainSlot"
                  #[item]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </column-slot>
    </template>
    <slot name="footer"></slot>
  </div>
</template>

<script>

import create from "core/create";
import columnDynamic from "./column-dynamic";
import columnSlot from './column-slot'
import { arraySort } from 'utils/util'
import columnTemp from './menu'
export default create({
  name: "crud",
  data () {
    return {}
  },
  components: {
    columnSlot,
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
    columnOption: Array
  },
  computed: {
    list () {
      let result = [...this.columnOption];
      result = arraySort(result, 'index', (a, b) => this.crud.objectOption[a.prop]?.index - this.crud.objectOption[b.prop]?.index)
      return result;
    }
  },
  methods: {
<<<<<<< HEAD:packages/element-ui/crud/column.vue

=======
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
>>>>>>> 5be5e96bbe2e5aff645c14f7784b0eeb6d23f924:packages/element-ui/crud/column/column.vue
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
    },
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
  }
});
</script>
