<template>
  <div>
    <basic-container>
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="复制内容">
          <el-input v-model="message"
                    placeholder="复制内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-clipboard:copy="message"
                     v-clipboard:success="onCopy"
                     v-clipboard:error="onError">复制</el-button>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>

</template>

<script>
export default {
  name: 'store',
  data () {
    return {
      message: 'Hello Avue!!'
    }
  },
  methods: {
    onCopy (e) {
      this.$message(`复制成功${e.text}`)
    },
    onError (e) {
      this.$message.error(`复制失败`)
    }
  }
}
</script>

<style lang="scss">
.title {
  margin-bottom: 10px;
}
.box {
  margin-bottom: 20px;
}
</style>

