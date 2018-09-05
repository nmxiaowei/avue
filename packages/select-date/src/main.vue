<template>
  <div :class="b()">
    <div :class="b('radio')">
      <el-radio-group size="medium"
                      v-model="text">
        <el-radio-button :label="item.value"
                         v-for="(item,index) in menu"
                         :key="index">{{item.label}}</el-radio-button>
      </el-radio-group>
    </div>
    <div :class="b('date')">
      <el-date-picker v-model="datetime"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import create from '../../utils/create';
import { GetDateStr } from '../../utils/dateUtil.js';
export default create({
  name: 'select-date',
  data () {
    return {
      menu: [],
      text: GetDateStr(0),
      datetime: [GetDateStr(0), GetDateStr(30)]
    };
  },
  watch: {
    datetime (n) {
      this.text = '';
      this.$emit('input', n);
    },
    text (n) {
      this.$emit('input', [n]);
    }
  },
  computed: {

  },
  props: {

  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.menu = [
        {
          label: '今天',
          value: GetDateStr(0)
        }, {
          label: '昨天',
          value: GetDateStr(-1)
        }, {
          label: '近7天',
          value: GetDateStr(-7)
        }, {
          label: '全部',
          value: '-1'
        }
      ];

    }
  }
});
</script>