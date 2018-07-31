<template>
  <div class="data-card">
    <el-row :span="24">
      <el-col :span="span"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <img :src="item.src"
               class="item-img" />
          <div class="item-text"
               :style="{color:colorText,backgroundColor:bgText}">
            <h3>{{item.name}}</h3>
            <p>{{item.text}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AvueDataCard',
  data () {
    return {

    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    span () {
      return this.option.span || 6
    },
    data () {
      return this.option.data || []
    },
    colorText () {
      return this.option.colorText || '#fff'
    },
    bgText () {
      return this.option.bgText || '#2e323f';
    },
    borderColor () {
      return this.option.borderColor || '#2e323f';
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
}
</script>