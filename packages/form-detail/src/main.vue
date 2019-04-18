<template>
  <div :class="b()">
    <el-row span="24"
            :class="b('item')"
            v-for="(item,index) in columnOption"
            :key="index">
      <div :class="b('header')">
        <i :class="[item.icon,b('icon')]"></i>
        <h1 :class="b('title')">{{item.label}}</h1>
      </div>
      <slot :name="item.prop"
            :row="form"
            :column="item"
            v-if="item.solt"></slot>
      <el-col :md="column.span||8"
              :xs="24"
              v-else
              v-for="(column,cindex) in item.column"
              :key="cindex">
        <div :class="b('box')">
          <span :class="b('label',[labelPostion])"
                :style="{width:`${item.labelWidth}px`}">{{column.label}}:</span>
          <slot :name="column.prop+'Form'"
                :column="column"
                :row="form"
                v-if="column.formsolt"></slot>
          <span v-else
                :class="b('content')">{{detail(form,column)}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "../../utils/create";
import crud from "../../mixins/crud.js";
import column from "../../mixins/column.js";
import { validatenull } from "../../utils/validate.js";
export default create({
  name: "form-detail",
  mixins: [crud(), column()],
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    value: {}
  },
  computed: {
    propOption() {
      let result = {
        column: []
      };
      this.columnOption.forEach(ele => {
        result.column = result.column.concat(ele.column);
      });
      return result;
    },
    labelPostion: function() {
      if (this.option.labelPostion) {
        return this.option.labelPostion;
      }
      return "left";
    },
    columnOption() {
      return this.option.option || [];
    }
  },
  watch: {
    value: {
      handler(n) {
        this.form = n;
      },
      deep: true
    }
  },
  data() {
    return {
      tableOption: {},
      form: {}
    };
  },
  created() {
    this.handleLoadDic(this.propOption);
    this.formInit();
  },
  methods: {
    rulesInit() {},
    formInit() {
      this.form = this.value;
    }
  }
});
</script>