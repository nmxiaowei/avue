<template>
  <div class="avue-content">
    <p class="avue-content__title">地图插件</p>
    <p>需要在项目中引入高德地图的api</p>
    <p>
      http://webapi.amap.com/maps?v=1.4.11&key=7ab53b28352e55dc5754699add0ad862&plugin=AMap.PlaceSearch</br>
      http://webapi.amap.com/ui/1.0/main.js?v=1.0.11
    </p>
    <avue-map v-model="obj"></avue-map>
    <el-tag style="margin-top:10px;">{{obj}}</el-tag>
  </div>
</template>

<script>
const code = `
<template>
  <div class="avue-content">
    <p class="avue-content__title">地图插件</p>
    <avue-map v-model="obj" ></avue-map>
    <el-tag>{{obj}}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'map',
  data () {
    return {
      obj:{}
    }
  }
}
<script>
`
export default {
  name: 'map',
  data () {
    return {
      obj: {}
    }
  }
}
</script>

<style>
</style>
