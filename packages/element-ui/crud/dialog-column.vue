<template>
  <el-drawer :class="[b('dialog'),b('column')]"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             class="avue-dialog"
             :title="t('crud.showTitle')"
             :size="crud.isMobile?'100%':'50%'"
             :visible.sync="columnBox">
    <el-transfer :titles="[ t('crud.hide'),t('crud.show')]"
                 ref="transfer"
                 filterable
                 v-model="columnIndex"
                 :data="columnList">
    </el-transfer>
  </el-drawer>
</template>
<script>
import create from "core/create";
import packages from "core/packages";
import locale from "../../core/common/locale";
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
      if (val && this.crud.isSortable) {
        this.$nextTick(() => {
          this.setSort()
        })
      }
    }
  },
  created () {
    this.columnInit()
  },
  methods: {
    initData () {
      if (!this.validatenull(this.showColumn)) this.columnIndex = this.showColumn
    },
    //开启排序
    setSort () {
      if (!window.Sortable) {
        packages.logs("Sortable")
        return
      }
      const el = this.$refs.transfer.$el.querySelectorAll('.el-checkbox-group')[1]
      this.sortable = window.Sortable.create(el, {
        sort: true,
        handle: '.el-checkbox',
        onEnd: evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          let column = this.crud.propOption;
          let targetRow = column.splice(oldIndex, 1)[0]
          column.splice(newIndex, 0, targetRow)
          this.crud.refreshTable()
        }
      })
    },
    columnInit () {
      this.columnIndex = [];
      this.columnList = [];
      this.crud.propOption.forEach((ele, index) => {
        if (ele.showColumn !== false) {
          if (ele.hide !== true) this.columnIndex.push(ele.prop);
          let obj = {
            label: ele.label,
            key: ele.prop,
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

