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
    option () {
      let columnList = this.crud.propOption.filter(ele => {
        return ele.showColumn !== false && ele.hide !== true
      })
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
              label: '当前数据(当前页全部数据)',
              value: 0
            }, {
              label: '选中的数据(当前页选中的数据)',
              value: 1
            }]
          }, {
            label: '选择字段',
            prop: "prop",
            type: 'checkbox',
            span: 24,
            value: columnList.map(ele => ele.prop),
            props: {
              value: 'prop'
            },
            dicData: columnList
          }, {
            label: '参数设置',
            prop: 'params',
            type: 'checkbox',
            span: 24,
            value: ['headers', 'data'],
            dicData: [{
              label: '表头',
              disabled: true,
              value: 'headers'
            }, {
              label: '数据源',
              value: 'data'
            }, {
              label: '合计统计',
              value: 'sum'
            }]
          }
        ]
      }
    }
  },
  methods: {
    handleShow () {
      this.box = true
    },
    handleSubmit () {
      let columns = [];
      this.form.prop.forEach(ele => columns.push(this.crud.objectOption[ele]))
      this.$Export.excel({
        title: this.form.name,
        columns: columns,
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

<style>
</style>