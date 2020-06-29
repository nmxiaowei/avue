<template>
  <el-popover v-model="show">
    <el-input slot="reference"
              :class="b()"
              :size="size"
              :value="labelShow"
              :clearable="disabled?false:clearable"
              :placeholder="placeholder"
              @focus="handleFocus"
              @blur="handleBlur"
              @clear="handleClear"
              :disabled="disabled"
              readonly>
    </el-input>
    <avue-crud :class="b('crud')"
               :option="option"
               :data="data"
               @on-load="onList"
               @search-change="handleSearchChange"
               @search-reset="handleSearchChange"
               @current-row-change="handleCurrentRowChange"
               :page.sync="page"></avue-crud>
  </el-popover>
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
      show: false,
      created: false,
      data: []
    };
  },
  props: {
    formatter: Function,
    onLoad: Function
  },
  watch: {
    text (val) {
      if (this.create || this.validatenull(val)) return
      this.onList(val => {
        this.active = val
        this.create = true;
      });
    }
  },
  computed: {
    labelShow () {
      if (typeof this.formatter == 'function') {
        return this.formatter(this.active)
      }
      return this.active[this.labelKey] || ''
    },
    option () {
      let option = Object.assign({
        menu: false,
        header: false,
        size: 'mini',
        headerAlign: 'center',
        align: 'center',
      }, this.column.children)
      option.column.forEach(ele => {
        ele.searchSpan = 12
      })
      return option
    }
  },
  methods: {
    handleClear () {
      this.handleCurrentRowChange({})
    },
    handleCurrentRowChange (val) {
      this.active = val;
      this.text = this.active[this.valueKey] || ''
      this.handleChange(this.text)
      this.show = false;
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
        this.onLoad({ page: this.page, value: this.text }, data => {
          if (typeof callback == 'function') {
            callback(data.data[0])
          } else {
            this.page.total = data.total;
            this.data = data.data;
          }
        })
      }
    }
  }
});
</script>
