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
            :form="form"
            :column="item"
            v-if="item.slot"></slot>
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
                :form="form"
                v-if="column.slot"></slot>
          <span v-else
                :class="b('content')">{{detail(form,column)}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import create from '../../utils/create';
import crud from '../../mixins/crud.js';
import column from '../../mixins/column.js';
import { validatenull } from '../../utils/validate.js';
export default create({
  name: 'form-detail',
  mixins: [crud(), column()],
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
        return this.option.labelPostion;
      }
      return 'left';
    },
    columnOption () {
      return this.option.option || [];
    }
  },
  watch: {
    value: {
      handler (n) {
        this.form = n;
      },
      deep: true
    }
  },
  data () {
    return {
      tableOption: {},
      form: {}
    };
  },
  created () {
    this.formInit();
  },
  methods: {
    dicInit () {
      let locaDic = this.tableOption.dicData || {};
      this.columnOption.forEach(child => {
        child.column.forEach(ele => {
          if (this.vaildData(ele.dicFlag, true)) {
            if (!validatenull(ele.dicUrl)) {
              this.dicCascaderList.push({
                dicUrl: ele.dicUrl,
                dicData: ele.dicData
              });
            } else if (!validatenull(this.tableOption.dicUrl) && typeof ele.dicData === 'string') {
              this.dicCascaderList.push({
                dicUrl: this.tableOption.dicUrl,
                dicData: ele.dicData
              });
            }
          }
        })
      });
      this.GetDic().then(data => {
        this.DIC = Object.assign({}, locaDic, data);
      });
    },
    rulesInit () {

    },
    formInit () {
      this.form = this.value;
    }
  }
});
</script>