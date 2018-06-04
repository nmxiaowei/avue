<template>
  <div>
    <el-tag>具体配置build/webpack.base.conf.js配置环境变量的地方</el-tag>
    <h4>{{envText}}</h4>
  </div>
</template>

<script>
export default {
  name: 'dev',
  data() {
    return {}
  },
  computed: {
    envText: function() {
      return this.env
    }
  }
}
</script>

<style>
</style>
