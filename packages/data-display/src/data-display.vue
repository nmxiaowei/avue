<template>
  <div class="avue-data-display">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :span="span">
        <div class="item"
             :style="{color:color}">
          <h5 class="count">{{item.count}}</h5>
          <span class="splitLine" />
          <p class="title">{{item.title}}</p>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'AvueDataDisplay',
  data () {
    return {

    }
  },
  computed: {
    span () {
      return this.option.span || 8
    },
    data () {
      return this.option.data || []
    },
    color () {
      return this.option.color || 'rgb(63, 161, 255)'
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
}
</script>
