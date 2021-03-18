<template>
  <div>
    <slot name="header"></slot>
    <!-- 动态列 -->
    <template v-for="(column,index) in list">
      <column-dynamic v-if="column.children && column.children.length"
                      :columnOption="column"
                      :key="column.label">
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot v-bind="scope"
                :name="item.prop"></slot>
        </template>
        <template v-for="item in crud.headerSlot"
                  slot-scope="scope"
                  :slot="crud.getSlotName(item,'H')">
          <slot v-bind="scope"
                :name="crud.getSlotName(item,'H')"></slot>
        </template>
        <template v-for="item in crud.mainSlot"
                  slot-scope="scope"
                  :slot="crud.getSlotName(item,'F')">
          <slot v-bind="scope"
                :name="crud.getSlotName(item,'F')"></slot>
        </template>
      </column-dynamic>
      <template v-else-if="!['dynamic'].includes(column.type)">
        <el-table-column v-if="vaildColumn(column)"
                         :key="column.prop"
                         :prop="column.prop"
                         :label="column.label"
                         filter-placement="bottom-end"
                         :filters="getColumnProp(column,'filters')"
                         :filter-method="crud.default[column.prop].filters?handleFiltersMethod:undefined"
                         :filter-multiple="vaildData(column.filterMultiple,true)"
                         :show-overflow-tooltip="column.overHidden"
                         :min-width="column.minWidth"
                         :sortable="getColumnProp(column,'sortable')"
                         :render-header="column.renderHeader"
                         :align="column.align || tableOption.align"
                         :header-align="column.headerAlign || tableOption.headerAlign"
                         :width="getColumnProp(column,'width')"
                         :fixed="getColumnProp(column,'fixed')">
          <template slot="header"
                    slot-scope="scope">
            <slot :name="crud.getSlotName(column,'H')"
                  v-if="crud.$scopedSlots[crud.getSlotName(column,'H')]"
                  v-bind="Object.assign(scope,{column})"></slot>
            <template v-else>
              <span>{{column.label}}</span>
              <div v-if="crud.default[column.prop].screen">
                <el-input type="text"
                          :placeholder="`请输入 ${column.label} 筛选关键字`"
                          v-model="crud.default[column.prop].screenValue"
                          size="mini"></el-input>
              </div>
            </template>
          </template>
          <template slot-scope="{row,$index}">
            <el-form-item :prop="crud.isTree?'':`list.${$index}.${column.prop}`"
                          :label="vaildLabel(column,row,' ')"
                          v-if="row.$cellEdit && column.cell"
                          :label-width="vaildLabel(column,row,'1px')"
                          :rules='column.rules'>
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
                    v-if="crud.$scopedSlots[crud.getSlotName(column,'F')]"></slot>
              <form-temp v-else
                         :column="column"
                         :size="crud.isMediumSize"
                         :dic="(crud.cascaderDIC[$index] || {})[column.prop] || crud.DIC[column.prop]"
                         :props="column.props || tableOption.props"
                         :readonly="column.readonly"
                         :disabled="crud.disabled || tableOption.disabled || column.disabled  || crud.btnDisabledList[$index]"
                         :clearable="vaildData(column.clearable,false)"
                         v-bind="$uploadFun(column,crud)"
                         v-model="row[column.prop]"
                         @change="columnChange(index,row,column)">
              </form-temp>
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
          </template>
        </el-table-column>
      </template>
    </template>
    <slot name="footer"></slot>
  </div>

</template>

<script>

import create from "core/create";
import { detail } from "core/detail";
import { sendDic } from "core/dic";
import { DIC_PROPS, DIC_SPLIT } from 'global/variable'
import columnDynamic from "./column-dynamic";
import formTemp from '../../core/components/form/index'
export default create({
  name: "crud",
  data () {
    return {
      count: {}
    }
  },
  components: {
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
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
      result = result.sort((a, b) => (this.crud.default[a.prop].order || 0) - (this.crud.default[b.prop].order || 0));
      return result;
    }
  },
  methods: {
    getColumnProp (column, type) {
      if (this.crud.isMobile && ['fixed'].includes(type)) return false;
      let result = this.crud.default[column.prop][type]
      if (type == 'filters') return this.handleFilters(column, result)
      else return result;
    },
    vaildLabel (column, row, val) {
      if (column.rules && row.$cellEdit) {
        return val
      }
    },
    vaildColumn (item) {
      return this.crud.default[item.prop].hide !== true;
    },
    corArray (list, separator = DIC_SPLIT) {
      if (this.validatenull(list)) {
        return []
      } else if (!Array.isArray(list)) {
        return list.split(separator);
      }
      return list
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
    handleDetail (row, column) {
      let result = row[column.prop];
      let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop]
      result = detail(row, column, this.tableOption, DIC);
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
    columnChange (index, row, column) {
      if (this.validatenull(this.count[column.prop])) this.count[column.prop] = 0
      this.count[column.prop] = this.count[column.prop] + 1;
      if (column.cascader) this.handleChange(index, row)
      if (this.count[column.prop] % 3 === 0 && typeof column.change === 'function' && column.cell === true) {
        column.change({ row, column, index: row.$index, value: row[column.prop] })
      }
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
        //最后一级
        if (
          this.validatenull(list) ||
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
          const props = column.props || this.tableOption.props || {};
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

