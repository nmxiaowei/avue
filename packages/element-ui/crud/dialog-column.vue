<template>
  <el-dialog :class="b('column')"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             :fullscreen="crud.isMobile"
             :title="t('crud.columnBtn')"
             :width="crud.isMobile?'100%':'600px'"
             :visible.sync="columnBox">
    <avue-checkbox ref="transfer"
                   size="small"
                   v-model="columnIndex"
                   :props="defaultProps"
                   :dic="columnList">
    </avue-checkbox>
  </el-dialog>
</template>
<script>
import config from "./config";
import create from "core/create";
import packages from "core/packages";
import locale from "../../core/common/locale";
import { validatenull } from "utils/validate";
export default create({
  name: 'crud',
  mixins: [locale],
  inject: ["crud"],
  props: {
    showColumn: {
      type: Array,
      default () {
        return [];
      }
    },
  },
  data () {
    return {
      config: config,
      columnBox: false,
      defaultProps: {
        value: 'prop'
      },
      columnList: [],
      columnIndex: []
    };
  },
  watch: {
    showColumn () {
      this.initData()
    },
    columnIndex (val) {
      this.crud.refreshTable();
      this.crud.$emit('update:showColumn', val)
    },
    columnBox (val) {
      if (val) {
        this.$nextTick(() => {
          this.setSort()
        })
      }
    }
  },
  methods: {
    initData () {
      if (!this.validatenull(this.showColumn)) {
        this.columnIndex = this.showColumn
      }
    },
    //开启排序
    setSort () {
      if (!window.Sortable) {
        packages.logs("Sortable")
        return
      }
      const el = this.$refs.transfer.$el.querySelectorAll('.el-checkbox-group')[0]
      this.sortable = window.Sortable.create(el, {
        sort: true,
        handle: '.el-checkbox',
        onEnd: evt => {
          const oldindex = evt.oldIndex;
          const newindex = evt.newIndex;
          let targetRow = this.columnIndex.splice(oldindex, 1)[0]
          this.columnIndex.splice(newindex, 0, targetRow)
          let column = this.crud.columnOption;
          targetRow = column.splice(oldindex, 1)[0]
          column.splice(newindex, 0, targetRow)
          this.crud.refreshTable();
        }
      })
    },
    columnInit () {
      this.columnIndex = [];
      this.columnList = [];
      this.crud.propOption.forEach((ele, index) => {
        if (!this.vaildData(ele.hide, false)) this.columnIndex.push(ele.prop);
        if (this.vaildData(ele.showColumn, true)) {
          let obj = {
            label: ele.label,
            prop: ele.prop,
            index: index
          };
          this.columnList.push(this.deepClone(obj));
        }
      });
      this.initData();
    }
  }
});
</script>

