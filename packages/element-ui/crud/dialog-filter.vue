<template>
  <el-dialog :class="b('dialog')"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             :fullscreen="$parent.isMobile"
             title="过滤条件"
             :width="$parent.isMobile?'100%':''"
             :visible.sync="box">
    <el-row :span="24"
            :class="b('dialog', ['overflow'])">
      <div :class="b('filter-menu')">
        <el-button-group>
          <el-button type="primary"
                     :size="$parent.isMediumSize"
                     @click="handleAdd">新增条件</el-button>
          <el-button type="primary"
                     :size="$parent.isMediumSize"
                     @click="handleClear">清空条件</el-button>
          <el-button type="primary"
                     :size="$parent.isMediumSize"
                     @click="handleValueClear">清空数据</el-button>
        </el-button-group>
      </div>
      <el-col :md="12"
              :xs="24"
              :sm="12"
              v-for="(column,index) in list"
              :key="index"
              :class="b('filter-item')">
        <avue-select v-model="column.text"
                     :dic="columnOption"
                     :props="columnProps"
                     :clearable="false"
                     @change="handleChange(column.text,index)"
                     :size="$parent.isMediumSize"
                     :class="b('filter-label')"></avue-select>
        <avue-select :class="b('filter-symbol')"
                     v-model="column.symbol"
                     :dic="symbolDic"
                     :clearable="false"
                     :size="$parent.isMediumSize"></avue-select>
        <component v-model="column.value"
                   :class="b('filter-value')"
                   :clearable="false"
                   :defaultExpandAll="columnList[index].defaultExpandAll"
                   :dic="$parent.DIC[columnList[index].prop]"
                   :format="columnList[index].format"
                   :is="getSearchType(columnList[index].type)"
                   multiple
                   placeholder="条件"
                   :parent="columnList[index].parent"
                   :props="columnList[index].props || $parent.tableOption.props"
                   :size="$parent.isMediumSize"
                   :type="getType(columnList[index])"
                   :value-format="columnList[index].valueFormat"></component>
        <el-button type="danger"
                   :class="b('filter-icon')"
                   size="mini"
                   @click="handleDelete(index)"
                   circle
                   icon="el-icon-minus"></el-button>
      </el-col>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="box = false"
                 :size="$parent.isMediumSize">取 消</el-button>
      <el-button type="primary"
                 :size="$parent.isMediumSize"
                 @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSearchType, getType } from "core/dataformat";
import create from "core/create";
import { dateList } from "core/dataformat";
export default create({
  name: "crud",
  data() {
    return {
      box: false,
      list: [],
      columnList: [],
      dateList: dateList,
      columnProps: {
        value: "prop"
      },
      symbolDic: [
        {
          label: "等于",
          value: "="
        },
        {
          label: "不等于",
          value: "≠"
        },
        {
          label: "相似",
          value: "like"
        },
        {
          label: "大于",
          value: ">"
        },
        {
          label: "大于等于",
          value: "≥"
        },
        {
          label: "小于",
          value: "<"
        },
        {
          label: "小于等于",
          value: "≤"
        },
        {
          label: "包含",
          value: "∈"
        }
      ]
    };
  },
  computed: {
    result() {
      let result = [];
      this.list.forEach(ele => {
        if (!this.validatenull(ele.value)) {
          result.push(`${ele.text}${ele.symbol}${ele.value}`);
        }
      });
      return result;
    },
    columnObj() {
      return this.columnOption[0];
    },
    columnOption() {
      return this.$parent.columnOption;
    }
  },
  created() {
    this.getSearchType = getSearchType;
    this.getType = getType;
  },
  methods: {
    handleDelete(index) {
      this.list.splice(index, 1);
      this.columnList.splice(index, 1);
    },
    handleClear() {
      this.list = [];
      this.columnList = [];
    },
    handleValueClear() {
      this.list.forEach((ele, index) => {
        ele.value = "";
        this.$set(this.list, index, ele);
      });
    },
    handleGetColumn(prop) {
      return (
        this.columnOption.filter(ele => {
          return ele.prop === prop;
        })[0] || {}
      );
    },
    handleSubmit() {
      this.$parent.$emit("filter-change", this.result);
      this.box = false;
    },
    handleChange(prop, index) {
      const column = this.handleGetColumn(prop);
      this.columnList[index] = column;
      this.list[index].value = "";
    },
    handleAdd() {
      const len = this.list.length;
      const prop = this.columnObj.prop;
      const column = this.handleGetColumn(prop);
      this.columnList.push(column);
      this.list.push({
        text: prop,
        symbol: this.symbolDic[0].value
      });
    }
  }
});
</script>

