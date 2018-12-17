<template>
  <div :class="b()">
    <el-row span="24"
            :class="b('item')"
            v-for="(item,index) in columnOption"
            :key="item.prop">
      <div :class="b('header')">
        <i :class="[item.icon,b('icon')]"></i>
        <h1 :class="b('title')">{{item.label}}</h1>
      </div>
      <slot :name="item.prop"
            :form="form"
            :column="item"
            v-if="item.slot"></slot>
      <template v-if="!item.slot && vaildData(column.visdiplay,true)"
                v-for="(column,cindex) in item.column">
        <el-col :md="column.span || 8"
                :xs="24"
                :key="column.prop">
          <div :class="b('box')">
            <span :class="b('label',[labelPostion])"
                  :style="{width:`${item.labelWidth}px`}">{{column.label}}:</span>
            <slot :name="column.prop"
                  :column="column"
                  :form="form"
                  :label="form['$'+column.prop]"
                  v-if="column.slot"></slot>
            <span v-else
                  :class="b('content')">{{handleDetail(column,item,DIC[column.prop])}}</span>
          </div>
        </el-col>
        <div class="avue-form__line"
             :key="index"
             :style="{width:(column.count/24*100)+'%'}"
             v-if="column.row && column.span!==24 && column.count"></div>
      </template>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
import init from "../../core/crud/init.js";
import { calcCount } from "core/dataformat";
export default create({
  name: "detail",
  mixins: [init()],
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    value: {}
  },

  data() {
    return {
      form: {}
    };
  },
  computed: {
    labelPostion: function() {
      if (this.option.labelPostion) {
        return this.tableOption.labelPostion;
      }
      return "left";
    },
    columnOption() {
      let list = [...this.tableOption.group] || [];
      let count = 0;
      list.forEach((ele, index) => {
        (ele.column || []).forEach((column, cindex) => {
          if (this.vaildData(column.visdiplay, true))
            calcCount(column, 8, cindex === 0);
        });
      });
      return list;
    }
  },
  watch: {
    value: {
      handler() {
        this.form = this.value;
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    //初始化字典
    this.columnOption.forEach(ele => {
      this.handleLoadDic(ele);
    });
  },
  methods: {
    handleDetail(column, option, DIC) {
      if (!this.validatenull(DIC)) {
        const result = this.detail(this.form, column, option, DIC);
        this.form["$" + column.prop] = result;
        return result;
      }
      return this.form[column.prop];
    }
  }
});
</script>
