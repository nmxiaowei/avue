<template>
  <div v-if="box"> 
    <el-dialog :title="t('crud.excelBtn')"
               lock-scroll
               :modal-append-to-body="$AVUE.modalAppendToBody"
               :append-to-body="$AVUE.appendToBody"
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
  </div>
</template>

<script>
import locale from "core/locale";
import { getAsVal } from "utils/util";
export default {
  name: 'crud',
  mixins: [locale],
  inject: ['crud'],
  data () {
    return {
      option: {},
      columnOption: {},
      box: false,
      form: {
        name: this.crud.tableOption.title
      }
    }
  },
  methods: {
    handleShow () {
      this.getColumnOption()
      this.getOption()
      this.box = true
    },
    handleSubmit () {
      this.$Export.excel({
        title: this.form.name,
        columns: this.getColumn(),
        data: this.handleSum()
      });
      this.box = false;
    },
    //计算统计
    handleSum () {
      const option = this.crud.tableOption;
      const columnOption = this.crud.propOption;
      let list = this.form.type ? this.crud.list : this.crud.tableSelect;
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
      if (this.form.params.includes('sum') && option.showSummary) {
        data.push(this.crud.sumsList);
      }
      return data;
    },
    getOption () {
      this.option = {
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
            dicData: [{
              label: '当前数据(当前页全部的数据)',
              value: true
            }, {
              label: '选中的数据(当前页选中的数据)',
              value: false
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
      this.form.type = this.crud.selectLen == 0
    },
    getColumnOption () {
      let result = []
      let column = this.deepClone(this.crud.columnOption)
      column.forEach(ele => {
        let children = ele.children
        if (children && !Array.isArray(children)) {
          delete ele.children
        }
        if (ele.showColumn !== false) result.push(ele)
      })
      this.columnOption = result;
      this.form.prop = this.columnOption.map(ele => ele.prop)
    },
    getColumn () {
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
    }
  }
}
</script>
