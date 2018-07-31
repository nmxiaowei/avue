<template>
  <div class="form-detail">
    <el-row span="24"
            class="item"
            v-for="(item,index) in columnOption"
            :key="index">
      <div class="item_header">
        <i class="item_icon"
           :class="item.icon"></i>
        <h1 class="item_title">{{item.label}}</h1>
      </div>
      <slot :name="item.prop"
            :form="form"
            :column="item"
            v-if="item.slot"></slot>
      <el-col :span="column.span || 8"
              v-else
              v-for="(column,cindex) in item.column"
              :key="cindex">
        <div class="item_box">
          <span for=""
                class="item_label"
                :class="labelPostion"
                :style="{width:`${item.labelWidth}px`}">{{column.label}}:</span>
          <slot :name="column.prop+'Form'"
                :column="column"
                :form="form"
                v-if="column.slot"></slot>
          <span v-else
                class="item_content">{{form[column.prop]}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AvueFormDetail",
  props: {
    option: {
      type: Object,
      default: () => { }
    },
    value: {}
  },
  computed: {
    labelPostion: function () {
      if (this.option.labelPostion) {
        return "is-" + this.option.labelPostion;
      }
      return 'is-left'
    },
    columnOption () {
      return this.option.option || []
    }
  },
  watch: {
    value: {
      handler (n) {
        this.form = n;
      },
      deep: true
    },
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.formInit();
  },
  methods: {
    formInit () {
      this.form = this.value;
    }
  }
}
</script>