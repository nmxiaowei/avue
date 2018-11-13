<template>
  <div class="avue-content">
    <div class="avue-item">
      <p class="avue-content__title">穿梭框插件</p>
    </div>
    <avue-transfer v-model="test"
                   :dic="dic"></avue-transfer>
    <div class="avue-item">
      <p class="avue-content__title">数据</p>
      <p class="avue-content__data">{{test || '暂无数据'}}</p>
    </div>
    <div class="avue-item">
      <p class="avue-content__title">代码</p>
      <highlight :code="code"></highlight>
    </div>
  </div>
</template>

<script>
const code = `
<template>
  <div class="avue-content">
    <p class="avue-content__title">穿梭框插件</p>
    <avue-transfer v-model="test"
                   :dic="dic"></avue-transfer>
    <p>{{test}}</p>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  data () {
    return {
      test: [],
      dic: [{
        label: '测试1',
        key: 0
      }, {
        label: '测试2',
        key: 1
      }],
    }
  }
}
<script>
`
export default {
  name: 'transfer',
  data () {
    return {
      test: [],
      code: code,
      dic: [{
        label: '测试1',
        key: 0
      }, {
        label: '测试2',
        key: 1
      }],
    }
  }
}
</script>

<style>
</style>
