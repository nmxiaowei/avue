<template>
  <div :class="b()">
    <el-input :size="size"
              :value="labelShow"
              :clearable="clearableVal"
              :placeholder="placeholder"
              ref="main"
              @clear="handleClear"
              @focus="handleShow"
              @click.native="handleClick"
              :disabled="disabled">
    </el-input>
    <div v-if="box">
      <el-dialog class="avue-dialog avue-dialog--none"
                 :width="dialogWidth"
                 :modal-append-to-body="$AVUE.modalAppendToBody"
                 :append-to-body="$AVUE.appendToBody"
                 :title="placeholder"
                 :visible.sync="box">
        <avue-crud :class="b('crud')"
                   ref="crud"
                   v-if="box"
                   :option="option"
                   :data="data"
                   :table-loading="loading"
                   @on-load="onList"
                   @search-change="handleSearchChange"
                   @search-reset="handleSearchChange"
                   @current-row-change="handleCurrentRowChange"
                   :search.sync="search"
                   :page.sync="page"></avue-crud>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     :size="size"
                     icon="el-icon-check"
                     @click="setVal">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-table",
  mixins: [props(), event()],
  data () {
    return {
      object: {},
      active: {},
      search: {},
      page: {},
      loading: false,
      box: false,
      created: false,
      data: []
    };
  },
  props: {
    formatter: Function,
    onLoad: Function,
    dialogWidth: {
      type: String,
      default: '80%'
    },
  },
  watch: {
    value (val) {
      if (this.validatenull(val)) {
        this.active = {}
        this.object = {}
      }
    },
    text (val) {
      if (this.created || this.validatenull(val)) return
      if (typeof this.onLoad == 'function') {
        this.onLoad({ value: this.text }, data => {
          this.active = data
          this.object = data
          this.created = true;
        })
      }
    }
  },
  computed: {
    title () {
      return (this.disabled || this.readonly) ? "查看" : '选择'
    },
    labelShow () {
      if (typeof this.formatter == 'function') {
        return this.formatter(this.object)
      }
      return this.object[this.labelKey] || ''
    },
    option () {
      return Object.assign({
        menu: false,
        header: false,
        size: 'mini',
        headerAlign: 'center',
        align: 'center',
        highlightCurrentRow: true,
      }, this.column.children)
    }
  },
  methods: {
    handleClear () {
      this.active = {}
      this.setVal()
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.page = {
        currentPage: 1,
        total: 0
      }
      this.data = []
      this.box = true;
    },
    setVal () {
      this.object = this.active
      this.text = this.active[this.valueKey] || ''
      this.box = false
    },
    handleCurrentRowChange (val) {
      this.active = val;
    },
    handleSearchChange (form, done) {
      this.page.page = 1;
      this.onList()
      done && done()
    },
    onList () {
      this.loading = true;
      if (typeof this.onLoad == 'function') {
        this.onLoad({ page: this.page, data: this.search }, data => {
          this.page.total = data.total;
          this.data = data.data
          this.loading = false;
          let active = this.data.find(ele => ele[this.valueKey] == this.object[this.valueKey])
          setTimeout(() => this.$refs.crud.setCurrentRow(active))
        })
      }
    }
  }
});
</script>
