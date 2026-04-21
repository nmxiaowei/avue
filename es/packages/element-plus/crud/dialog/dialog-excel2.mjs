/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import locale from '../../../../src/core/locale.mjs';
import { detail } from '../../../../src/core/detail.mjs';
import { uuid } from '../../../../src/utils/util.mjs';

var script = {
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
      this.getColumnOption();
      this.getOption();
      this.box = true;
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
      let data = [];
      if (this.form.params.includes('data')) {
        list.forEach(ele => {
          let row = this.deepClone(ele);
          columnOption.forEach(column => {
            let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop];
            row[column.prop] = detail(row, column, option, DIC);
          });
          data.push(row);
        });
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
            label: this.t('crud.excel.name'),
            prop: 'name',
            span: 24,
          }, {
            label: this.t('crud.excel.type'),
            prop: "type",
            span: 24,
            type: 'select',
            dicData: [{
              label: this.t('crud.excel.typeDic.true'),
              value: true
            }, {
              label: this.t('crud.excel.typeDic.false'),
              disabled: this.crud.tableOption.selection != true,
              value: false
            }]
          }, {
            label: this.t('crud.excel.prop'),
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
            label: this.t('crud.excel.params'),
            prop: 'params',
            type: 'checkbox',
            span: 24,
            value: ['header', 'data'].concat((() => {
              let result = [];
              if (this.crud.isHeader) result.push('headers');
              if (this.crud.isShowSummary) result.push('sum');
              return result
            })()),
            dicData: [{
              label: this.t('crud.excel.paramsDic.header'),
              disabled: true,
              value: 'header'
            }, {
              label: this.t('crud.excel.paramsDic.data'),
              value: 'data'
            }].concat((() => {
              let result = [];
              result.push({
                label: this.t('crud.excel.paramsDic.headers'),
                value: 'headers',
                disabled: !this.crud.isHeader
              });
              result.push({
                label: this.t('crud.excel.paramsDic.sum'),
                value: 'sum',
                disabled: !this.crud.isShowSummary
              });
              return result
            })())
          }
        ]
      };
      this.form.type = this.crud.selectLen == 0;
    },
    getColumnOption () {
      let column = this.deepClone(this.crud.columnOption);
      let prop = [];
      const findProp = (list = []) => {
        let count = [];
        list.forEach((ele, index) => {
          let children = ele.children;
          if (children && !Array.isArray(children)) delete ele.children;
          else if (ele.showColumn === false) count.push(index);
          else {
            ele.prop = ele.prop || uuid();
            prop.push(ele.prop);
            if (ele.children) findProp(children);
          }
        });
        for (let i = count.length - 1; i >= 0; i--) {
          list.splice(count[i], 1);
        }
      };
      findProp(column);
      this.columnOption = column;
      this.form.prop = prop;
    },
    getColumn () {
      let columns = this.deepClone(this.columnOption);
      let props = this.$refs.form.getPropRef('prop').$refs.temp.getHalfList();
      if (!this.form.params) return []
      if (this.form.params.includes('headers')) {
        const findProp = (list = []) => {
          list.forEach((ele, index) => {
            if (!props.includes(ele.prop)) {
              list.splice(index, 1);
            } else if (ele.children) {
              findProp(ele.children);
            }
          });
        };
        findProp(columns);
        return columns
      } else {
        let result = [];
        const findProp = (list = []) => {
          list.forEach((ele, index) => {
            if (ele.children) {
              findProp(ele.children);
            } else if (props.includes(ele.prop)) {
              result.push(ele);
            }
          });
        };
        findProp(columns);
        return result
      }
    }
  }
};

export { script as default };
