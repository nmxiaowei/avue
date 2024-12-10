<template>
  <el-drawer v-if="box"
             lock-scroll
             :class="['avue-dialog',b('filter')].join(' ')"
             :append-to-body="$AVUE.appendToBody"
             :title="t('crud.filterTitle')"
             :size="crud.isMobile?'100%':'60%'"
             v-model="box">
    <el-row :span="24">
      <el-col :md="24"
              :class="b('filter-menu')">
        <el-button-group>
          <el-button type="primary"
                     :size="crud.size"
                     @click="handleAdd">{{t('crud.filter.addBtn')}}</el-button>
          <el-button type="primary"
                     :size="crud.size"
                     @click="handleClear">{{t('crud.filter.resetBtn')}}</el-button>
          <el-button type="primary"
                     :size="crud.size"
                     @click="handleValueClear">{{t('crud.filter.clearBtn')}}</el-button>
        </el-button-group>
      </el-col>
      <el-col :md="12"
              :xs="24"
              :sm="12"
              v-for="(column,index) in list"
              :key="index"
              :class="b('filter-item')">
        <avue-select v-model="column.text"
                     :dic="columnOption"
                     :clearable="false"
                     @change="handleChange(index)"
                     :size="crud.size"
                     :class="b('filter-label')"></avue-select>
        <avue-select :class="b('filter-symbol')"
                     v-model="column.symbol"
                     :dic="symbolDic"
                     :clearable="false"
                     :size="crud.size"></avue-select>
        <avue-input :size="crud.size"
                    :class="b('filter-value')"
                    v-model="column.value">
        </avue-input>
        <el-button type="danger"
                   :class="b('filter-icon')"
                   :size="crud.size"
                   @click="handleDelete(index)"
                   circle
                   icon="el-icon-minus"></el-button>
      </el-col>
    </el-row>
    <span class="avue-dialog__footer">
      <el-button type="primary"
                 :size="crud.size"
                 @click="handleSubmit">{{t('crud.filter.submitBtn')}}</el-button>
      <el-button @click="box = false"
                 :size="crud.size">{{t('crud.filter.cancelBtn')}}</el-button>
    </span>
  </el-drawer>
</template>

<script>
import locale from "core/locale";
import create from "core/create";
export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      box: false,
      columnObj: {},
      symbolDic: [
        {
          label: "=",
          value: "="
        },
        {
          label: "≠",
          value: "≠"
        },
        {
          label: "like",
          value: "like"
        },
        {
          label: ">",
          value: ">"
        },
        {
          label: "≥",
          value: "≥"
        },
        {
          label: "<",
          value: "<"
        },
        {
          label: "≤",
          value: "≤"
        },
        {
          label: "∈",
          value: "∈"
        }
      ],
      list: [],
      columnOption: {}
    }
  },
  methods: {
    handleShow () {
      this.getColumnOption()
      this.box = true
    },
    getColumnOption () {
      let result = []
      let column = this.deepClone(this.crud.propOption)
      column.forEach(ele => {
        if (ele.showColumn !== false) result.push(Object.assign(ele, {
          value: ele.prop
        }))
      });
      this.columnOption = result
      this.columnObj = this.columnOption[0];
    },
    handleDelete (index) {
      this.list.splice(index, 1);
    },
    handleClear () {
      this.list = [];
    },
    handleValueClear () {
      this.list.forEach((ele, index) => ele.value = '');
    },
    handleSubmit () {
      let result = [];
      this.list.forEach(ele => {
        result.push([ele.text, ele.symbol, ele.value]);
      });
      this.crud.$emit("filter", result);
      this.box = false;
    },
    handleChange (index) {
      this.list[index].value = ''
    },
    handleAdd () {
      const prop = this.columnObj.prop;
      this.list.push({
        text: prop,
        value: '',
        symbol: this.symbolDic[0].value
      });
    }
  }
});
</script>

