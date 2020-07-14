<template>
  <div :class="b()">
    <el-input :size="size"
              :value="labelShow"
              :clearable="disabled?false:clearable"
              :placeholder="placeholder"
              ref="main"
              @clear="handleClear"
              @focus="handleShow"
              :disabled="disabled">
    </el-input>
    <el-dialog class="avue-dialog"
               width="80%"
               append-to-body
               :title="placeholder"
               :visible.sync="box">
      <avue-crud :class="b('crud')"
                 :option="option"
                 :data="data"
                 @on-load="onList"
                 @search-change="handleSearchChange"
                 @search-reset="handleSearchChange"
                 @current-row-change="handleCurrentRowChange"
                 :page.sync="page"></avue-crud>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-table",
  mixins: [props(), event()],
  data () {
    return {
      active: {},
      page: {},
      box: false,
      created: false,
      data: []
    };
  },
  props: {
    formatter: Function,
    onLoad: Function
  },
  watch: {
    value (val) {
      if (this.validatenull(val)) {
        this.active = {}
      }
    },
    text (val) {
      if (this.create || this.validatenull(val)) return
      if (typeof this.onLoad == 'function') {
        this.onLoad({ value: this.text }, data => {
          this.active = data
          this.create = true;
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
        return this.formatter(this.active)
      }
      return this.active[this.labelKey] || ''
    },
    option () {
      return Object.assign({
        menu: false,
        header: false,
        size: 'mini',
        headerAlign: 'center',
        align: 'center',
      }, this.column.children)
    }
  },
  methods: {
    handleClear () {
      this.handleCurrentRowChange({})
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.box = true;
    },
    handleCurrentRowChange (val) {
      this.active = val;
      this.text = this.active[this.valueKey] || ''
      this.handleChange(this.text)
      this.box = false;
    },
    handleSearchChange (form, done) {
      this.onLoad({ page: this.page, data: form }, data => {
        this.page.total = data.total;
        this.data = data.data;
      })
      done && done()
    },
    onList (callback) {
      if (typeof this.onLoad == 'function') {
        this.onLoad({ page: this.page }, data => {
          this.page.total = data.total;
          this.data = data.data;
        })
      }
    }
  }
});
</script>
