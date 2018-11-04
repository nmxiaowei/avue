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

## 工具类



### JSON展示


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