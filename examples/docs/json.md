<script>
export default {
    data() {
      return {
       data:{
          "pigx-upms": {
            "id": "pigx-upms",
            "predicates": [{
              "name": "Path",
              "args": {
                "_genkey_0": "/admin/**"
              }
            }],
            "filters": [{
              "name": "RequestRateLimiter",
              "args": {
                "key-resolver": "#{@remoteAddrKeyResolver}",
                "redis-rate-limiter.replenishRate": "10",
                "redis-rate-limiter.burstCapacity": "20"
              }
            }, {
              "name": "Hystrix",
              "args": {
                "name": "default",
                "fallbackUri": "forward:/fallback"
              }
            }],
            "uri": "lb://pigx-upms",
            "order": 0
          }
         }
      };
    }
}
</script>
<style>

</style>

## JSON展示



### 例子


:::demo  data放json对象，level为展开到第几节点
```html
<avue-json-tree :data="data" ></avue-json-tree>

<script>
export default {
    data() {
      return {
        data:{
          "pigx-upms": {
            "id": "pigx-upms",
            "predicates": [{
              "name": "Path",
              "args": {
                "_genkey_0": "/admin/**"
              }
            }],
            "filters": [{
              "name": "RequestRateLimiter",
              "args": {
                "key-resolver": "#{@remoteAddrKeyResolver}",
                "redis-rate-limiter.replenishRate": "10",
                "redis-rate-limiter.burstCapacity": "20"
              }
            }, {
              "name": "Hystrix",
              "args": {
                "name": "default",
                "fallbackUri": "forward:/fallback"
              }
            }],
            "uri": "lb://pigx-upms",
            "order": 0
          }
        }
      };
    }
}
</script>
```
:::

### Avue-json Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | json对象 | JSON | -  | - |
| raw | json字符串 | String | -  | - |
