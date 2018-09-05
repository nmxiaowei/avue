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
      <el-col :span="column.span || 8"
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
                :class="b('content')">{{form[column.prop]}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import create from '../../utils/create';
export default create({
  name: 'form-detail',
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
      form: {}
    };
  },
  created () {
    this.formInit();
  },
  methods: {
    formInit () {
      this.form = this.value;
    }
  }
});
</script>