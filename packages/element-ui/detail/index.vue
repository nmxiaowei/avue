<template>
  <div :class="b()">
    <avue-group v-for="(item,index) in columnOption"
                :key="item.prop"
                :card="parentOption.card"
                :icon="item.icon"
                :label="item.label">
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
            <span v-if="column.parentProp"
                  :class="b('content')">{{handleDetail(column,item,((cascaderDIC[0] || {})[0] || {})[column.prop])}}</span>

            <span v-else
                  :class="b('content')">{{handleDetail(column,item,DIC[column.prop])}}</span>
          </div>
        </el-col>
        <div :class="b('line')"
             :key="index"
             :style="{width:(column.count/24*100)+'%'}"
             v-if="!isMobile && column.row && column.span!==24 && column.count"></div>
      </template>
    </avue-group>
  </div>
</template>

<script>
import create from "core/create";
import init from "../../core/crud/init.js";
import { calcCount, calcCascader } from "core/dataformat";
export default create({
  name: "detail",
  mixins: [init()],
  props: {
    value: {}
  },
  data() {
    return {
      form: {},
      itemSpanDefault: 8
    };
  },
  computed: {
    parentOption() {
      let option = this.deepClone(this.tableOption);
      let group = option.group;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      delete option.column;
      return option;
    },
    labelPostion: function() {
      if (this.option.labelPostion) {
        return this.tableOption.labelPostion;
      }
      return "right";
    },
    columnOption() {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        (ele.column || []).forEach((column, cindex) => {
          if (column.visdiplay !== false)
            column = calcCount(column, this.itemSpanDefault, cindex === 0);
        });
        //处理级联地址
        ele.column = calcCascader(ele.column);
      });
      return list;
    }
  },
  watch: {
    value: {
      handler() {
        this.form = this.value;
        this.loadDic();
      },
      deep: true
    }
  },
  created() {
    this.form = this.value;
    this.loadDic();
  },
  methods: {
    loadDic() {
      //初始化字典
      this.columnOption.forEach(ele => {
        this.handleLoadDic(ele);
        this.handleLoadCascaderDic(ele.column, this.form);
      });
    },
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
