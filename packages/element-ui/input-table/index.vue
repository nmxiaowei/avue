<template>
  <div :class="b()">
    <el-input :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :size="size"
              :model-value="labelShow"
              :clearable="disabled?false:clearable"
              :placeholder="placeholder"
              ref="main"
              @clear="handleClear"
              @focus="handleShow"
              @click="handleClick"
              :disabled="disabled">
    </el-input>
    <div v-if="box">
      <el-dialog class="avue-dialog"
                 :class="b()"
                 :width="dialogWidth"
                 :append-to-body="$AVUE.appendToBody"
                 lock-scroll
                 :title="placeholder"
                 v-model="box">
        <avue-crud :class="b('crud')"
                   ref="crud"
                   v-if="box"
                   :option="option"
                   :data="data"
                   :table-loading="loading"
                   @on-load="onList"
                   @search-change="handleSearchChange"
                   @search-reset="handleSearchChange"
                   @selection-change="handleSelectionChange"
                   :rowClassName="handleRowClassName"
                   @current-row-change="handleCurrentChange"
                   v-model:page="page"></avue-crud>
        <span class="avue-dialog__footer">
          <el-button type="primary"
                     :size="size"
                     icon="el-icon-check"
                     @click="setVal">{{t("common.submitBtn")}}</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import locale from "core/locale";
export default create({
  name: "input-table",
  mixins: [props(), event(), locale],
  data () {
    return {
      object: [],
      active: [],
      page: {},
      loading: false,
      box: false,
      created: false,
      data: []
    };
  },
  props: {
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    formatter: Function,
    onLoad: Function,
    children: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogWidth: {
      type: String,
      default: '80%'
    },
  },
  computed: {
    isMultiple () {
      return this.multiple
    },
    title () {
      return (this.disabled || this.readonly) ? "查看" : '选择'
    },
    labelShow () {
      if (typeof this.formatter == 'function') {
        return this.formatter(this.isMultiple ? this.object : (this.object[0] || {}))
      }
      return this.object.map(ele => ele[this.labelKey]).join(',')

    },
    option () {
      return Object.assign({
        menu: false,
        header: false,
        size: this.size,
        headerAlign: 'center',
        align: 'center',
        highlightCurrentRow: !this.isMultiple,
        reserveSelection: this.isMultiple,
        selection: this.isMultiple,
        selectable: (row, index) => {
          return !row.disabled
        },
      }, this.children)
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.active = val
    },
    handleModelValue (val) {
      if (this.validatenull(val)) {
        this.active = []
        this.object = []
      }
    },
    handleTextValue (val) {
      if (this.created || this.validatenull(val)) return
      if (typeof this.onLoad == 'function') {
        this.onLoad({ value: this.text }, data => {
          let result = Array.isArray(data) ? data : [data]
          this.active = result
          this.object = result
          this.created = true;
        })
      }
    },
    handleClear () {
      this.active = []
      this.setVal()
      setTimeout(() => {
        this.box = false;
      }, 0)
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.page = {
        currentPage: 1,
        total: 0
      }
      this.box = true;
    },
    setVal () {
      this.object = this.active
      this.text = this.active.map(ele => ele[this.valueKey])
      this.box = false
    },
    handleRowClassName ({ row, rowIndex }) {
      if (row[this.disabledKey]) return 'disabled'
    },
    handleCurrentChange (val) {
      if (this.isMultiple) {
        this.$refs.crud.setCurrentRow(null)
      } else {
        if (val[this.disabledKey]) {
          this.$refs.crud.setCurrentRow(this.active[0])
        } else {
          this.active = [val];
        }
      }
    },
    handleSearchChange (form, done) {
      this.loading = true;
      this.page.currentPage = 1;
      this.onList({ data: form }, () => {
        done && done()
      })
    },
    onList (params = {}, callback) {
      this.loading = true;
      if (typeof this.onLoad == 'function') {
        this.onLoad(Object.assign({ page: this.page }, params), data => {
          callback && callback()
          this.page.total = data.total;
          this.data = data.data
          this.loading = false;
          if (this.isMultiple) {
            let ids = this.object.map(ele => ele[this.valueKey])
            let data = this.data.filter(ele => ids.includes(ele[this.valueKey]))
            this.$nextTick(() => {
              this.$refs.crud.toggleSelection(data, true);
            })
          } else {
            let active = this.data.find(ele => ele[this.valueKey] == this.text)
            setTimeout(() => this.$refs.crud.setCurrentRow(active))
          }
        })
      }
    }
  }
});
</script>
