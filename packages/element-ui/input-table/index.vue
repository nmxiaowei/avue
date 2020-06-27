<template>
  <el-select :class="b()"
             :size="size"
             :value="labelShow"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder"
             @focus="handleFocus"
             @blur="handleBlur"
             :disabled="disabled"
             readonly>
    <el-option :value="text">
      <avue-crud :class="b('crud')"
                 :option="option"
                 :data="data"
                 @on-load="onList"
                 @current-row-change="handleCurrentRowChange"
                 :page.sync="page"></avue-crud>
    </el-option>
  </el-select>
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
      return this.active[this.labelKey]
    },
    option () {
      return Object.assign({
        menu: false,
        header: false,
        size: 'mini',
        headerAlign: 'center',
        align: 'center',
      }, this.column.option)
    }
  },
  methods: {
    handleCurrentRowChange (val) {
      this.active = val;
      this.text = this.active[this.valueKey]
      this.handleChange(this.text)
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
