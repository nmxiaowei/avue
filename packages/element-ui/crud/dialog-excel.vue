<template>
  <el-dialog :title="t('crud.excelBtn')"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             class="avue-dialog"
             :visible.sync="box"
             :width="crud.isMobile?'100%':'30%'">
    <avue-form v-model="form"
               :option="option"></avue-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 :size="crud.isMediumSize"
                 @click="handleSubmit">{{t('crud.filter.submitBtn')}}</el-button>
      <el-button @click="box = false"
                 :size="crud.isMediumSize">{{t('crud.filter.cancelBtn')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import locale from "../../core/common/locale";
export default {
  name: 'crud',
  mixins: [locale],
  inject: ['crud'],
  data () {
    return {
      box: false,
      form: {
        name: this.crud.tableOption.title
      }
    }
  },
  computed: {
    columnOption () {
      let column = this.deepClone(this.crud.columnOption)
      column.forEach(ele => {
        let children = ele.children
        if (children && !Array.isArray(children)) {
          delete ele.children
        }
      })
      return column;
    },
    columnList () {
      if (!this.form.params) return []
      if (this.form.params.includes('headers')) {
        return this.crud.propOption
      } else {
        let result = [];
        const findProp = (list = []) => {
          list.forEach((ele, index) => {
            if (ele.children) findProp(ele.children)
            else result.push(ele)
          })
        }
        findProp(this.columnOption);
        return result;
      }
    },
    columns () {
      let columns = this.deepClone(this.columnOption);
      if (!this.form.params) return []
      if (this.form.params.includes('headers')) {
        const findProp = (list = []) => {
          list.forEach((ele, index) => {
            if (ele.children) {
              findProp(ele.children)
            } else if (!this.form.prop.includes(ele.prop)) {
              list.splice(index, 1);
            }
          })
        }
        findProp(columns);
        return columns
      } else {
        let result = [];
        const findProp = (list = []) => {
          list.forEach((ele, index) => {
            if (ele.children) {
              findProp(ele.children)
            } else if (this.form.prop.includes(ele.prop)) {
              result.push(ele)
            }
          })
        }
        findProp(columns);
        return result
      }
    },
    option () {
      return {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: '文件名',
            prop: 'name',
            span: 24,
          }, {
            label: '选择数据',
            prop: "type",
            span: 24,
            type: 'select',
            value: 0,
            dicData: [{
              label: '当前数据(当前页全部的数据)',
              value: 0
            }, {
              label: '选中的数据(当前页选中的数据)',
              value: 1
            }]
          }, {
            label: '选择字段',
            prop: "prop",
            type: 'tree',
            multiple: true,
            checkStrictly: true,
            span: 24,
            props: {
              value: 'prop'
            },
            dicData: this.columnOption
          }, {
            label: '参数设置',
            prop: 'params',
            type: 'checkbox',
            span: 24,
            value: ['header', 'data'].concat((() => {
              let result = []
              if (this.crud.isHeader) result.push('headers')
              if (this.crud.isShowSummary) result.push('sum')
              return result
            })()),
            dicData: [{
              label: '表头',
              disabled: true,
              value: 'header'
            }, {
              label: '数据源',
              value: 'data'
            }].concat((() => {
              let result = []
              result.push({
                label: '复杂表头',
                value: 'headers',
                disabled: !this.crud.isHeader
              })
              result.push({
                label: '合计统计',
                value: 'sum',
                disabled: !this.crud.isShowSummary
              })
              return result
            })())
          }
        ]
      }
    }
  },
  watch: {
    columnList () {
      this.form.prop = this.columnList.map(ele => ele.prop)
    }
  },
  methods: {
    handleShow () {
      this.box = true
    },
    handleSubmit () {
      this.$Export.excel({
        title: this.form.name,
        columns: this.columns,
        data: this.handleSum()
      });
      this.box = false;
    },
    //计算统计
    handleSum () {
      const option = this.crud.tableOption;
      const columnOption = this.crud.propOption;
      let count = 0;
      let sumsList = [...this.crud.sumsList];
      let list = this.form.type == 0 ? this.crud.list : this.crud.tableSelect;
      let data = []
      if (this.form.params.includes('data')) {
        list.forEach(ele => {
          let obj = this.deepClone(ele);
          columnOption.forEach(column => {
            if (column.bind) obj[column.prop] = getAsVal(obj, column.bind);
            if (!this.validatenull(obj['$' + column.prop])) obj[column.prop] = obj['$' + column.prop];
          })
          data.push(obj);
        })
      }
      if (option.index) count++;
      if (option.selection) count++;
      if (option.expand) count++;
      sumsList.splice(0, count);
      sumsList.splice(sumsList.length - 1, 1);
      if (this.form.params.includes('sum') && option.showSummary) {
        let sumsObj = {};
        sumsList.forEach((ele, index) => {
          if ((columnOption[index] || {}).prop) {
            sumsObj[columnOption[index].prop] = ele;
          }
        });
        data.push(sumsObj);
      }
      return data;
    },
  }
}
</script>
