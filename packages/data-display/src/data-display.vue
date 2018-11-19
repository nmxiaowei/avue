<template>
  <div class="avue-data-display">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="12"
              :sm="12">
        <div class="item"
             :style="{color:color}">
          <a :href="item.href?item.href:'javascript:void(0);'"
             :target="item.target">
            <h5 class="count">{{item.count}}</h5>
            <span class="splitLine" />
            <p class="title">{{item.title}}</p>
          </a>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import create from '../../utils/create';
export default create({
  name: 'data-display',
  data () {
    return {

    };
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    },
    color () {
      return this.option.color || 'rgb(63, 161, 255)';
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  created () { },
  methods: {}
});
</script>
