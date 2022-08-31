<template>
  <div v-if="box">
    <el-drawer :class="[b('dialog'),b('filter')]"
               lock-scroll
               class="avue-dialog"
               :modal-append-to-body="$AVUE.modalAppendToBody"
               :append-to-body="$AVUE.appendToBody"
               :title="t('crud.filterTitle')"
               :size="crud.isMobile?'100%':'60%'"
               :visible.sync="box">
      <el-row :span="24">
        <div :class="b('filter-menu')">
          <el-button-group>
            <el-button type="primary"
                       :size="crud.isMediumSize"
                       @click="handleAdd">{{t('crud.filter.addBtn')}}</el-button>
            <el-button type="primary"
                       :size="crud.isMediumSize"
                       @click="handleClear">{{t('crud.filter.resetBtn')}}</el-button>
            <el-button type="primary"
                       :size="crud.isMediumSize"
                       @click="handleValueClear">{{t('crud.filter.clearBtn')}}</el-button>
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
                       :clearable="false"
                       @change="handleChange(index)"
                       :size="crud.isMediumSize"
                       :class="b('filter-label')"></avue-select>
          <avue-select :class="b('filter-symbol')"
                       v-model="column.symbol"
                       :dic="symbolDic"
                       :clearable="false"
                       :size="crud.isMediumSize"></avue-select>
          <avue-input :size="crud.isMediumSize"
                      :class="b('filter-value')"
                      v-model="column.value">
          </avue-input>
          <el-button type="danger"
                     :class="b('filter-icon')"
                     size="mini"
                     @click="handleDelete(index)"
                     circle
                     icon="el-icon-minus"></el-button>
        </el-col>
        <el-col :span="24"
                class="avue-form__menu avue-form__menu--right">
          <el-button type="primary"
                     :size="crud.isMediumSize"
                     @click="handleSubmit">{{t('crud.filter.submitBtn')}}</el-button>
          <el-button @click="box = false"
                     :size="crud.isMediumSize">{{t('crud.filter.cancelBtn')}}</el-button>
        </el-col>
      </el-row>

    </el-drawer>
  </div>

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

