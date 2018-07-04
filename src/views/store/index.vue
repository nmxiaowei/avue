<template>
  <div>
    <basic-container>
      <el-tag class="title">基本读写删(持久化存储)</el-tag>
      <div class="box">
        <el-button type="primary"
                   @click="setItem({name:'test-user-name', value:'normalValue'});">set('test-user-name', 'normalValue')</el-button>

        <el-button type="success"
                   @click="getItem({name:'test-user-name'});">get('test-user-name')</el-button>

        <el-button type="danger"
                   @click="delItem({name:'test-user-name'});">remove('test-user-name')</el-button>
      </div>
      <el-tag class="title">设置session(session存储)</el-tag>
      <div class="box">
        <el-button type="primary"
                   @click="setItem({name:'test-user-pwd', value:'123456',type:'session'});">set('test-user-name', 'normalValue')</el-button>

        <el-button type="success"
                   @click="getItem({name:'test-user-pwd',type:'session'});">get('test-user-name')</el-button>

        <el-button type="danger"
                   @click="delItem({name:'test-user-pwd'});">remove('test-user-name')</el-button>
      </div>
      <el-tag class="title">获取所有可以获得的数据</el-tag>
      <div class="box">
        <el-button type="success"
                   @click="getAll">getAll(持久化存储)</el-button>
        <el-button type="success"
                   @click="getAll({type:'session'})">getAll(session存储)</el-button>
        <el-button type="danger"
                   @click="clearAll">delAll(持久化存储)</el-button>
        <el-button type="danger"
                   @click="clearAll({type:'session'})">delAll(session存储)</el-button>
      </div>
    </basic-container>
  </div>
</template>

<script>
import {
  setStore,
  getStore,
  removeStore,
  clearStore,
  getAllStore
} from '@/util/store'
export default {
  name: 'store',
  methods: {
    setItem (params) {
      const { name, value, type } = params
      setStore({
        name: name,
        content: value,
        type: type
      })
      this.$message(`设置数据 ${name} = ${value}`)
    },
    getItem (params) {
      const { name, type } = params
      const content = getStore({
        name: name,
        type: type
      })
      this.$message(`获取数据 ${name} = ${content}`)
    },
    delItem (params) {
      const { name } = params
      removeStore({ name })
      this.$message(`删除数据 ${name}`)
    },
    clearAll (params) {
      clearStore(params)
      this.$message(`清除全部数据完成`)
    },
    getAll (params) {
      const list = getAllStore(params)
      console.log(list)
      this.$message(`结果已经打印到控制台`)
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

