<template>
  <div class="avue-content">
    <div class="avue-item">
      <p class="avue-content__title">富文本插件</p>
    </div>
    <avue-ueditor v-model="test"></avue-ueditor>
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
    <avue-ueditor v-model="test" ></avue-ueditor>
    <p>{{test}}</p>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  data () {
    return {
      test: '<h1>Hello Avue!</h1>',
      code: code
    }
  }
}
<script>
`
export default {
  name: 'transfer',
  data () {
    return {
      test: '<h1>Hello Avue!</h1>',
      code: code
    }
  }
}
</script>

<style>
</style>
