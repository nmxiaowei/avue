<template>
  <div class="data-box">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href?item.href:'javascript:void(0);'"
             :target="item.target">
            <div class="item-icon"
                 :style="{backgroundColor:item.color}">
              <i :class="item.icon"></i>
            </div>
            <div class="item-info">
              <div :style="{color:item.color}"
                   class="title">{{item.count}}</div>
              <div class="info">{{item.title}}</div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from '../../utils/create';
export default create({
  name: 'data-box',
  data () {
    return {

    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    span () { return this.option.span || 8; },
    data () { return this.option.data || []; }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});
</script>