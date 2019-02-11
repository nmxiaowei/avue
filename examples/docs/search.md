<script>
export default {
    data() {
       return {
        form: {
          zt: ["370000", "620000", "610000", "110000", "410000"],
          checkbox: 0,
          jtgj: [0, 1, 2, 3, 4]
        },
        option: {
          card: true,
          column: [{
            label: '地区',
            prop: 'zt',
            dicUrl: 'https://cli2.avue.top/api/area/getProvince',
            dicData:'zt',
            props: {
              label: 'name',
              value: 'code'
            }
          }, {
            label: '多选',
            prop: 'checkbox',
            multiple: false,
            dicData: [{
              label: '单层',
              value: 0
            }, {
              label: '多层',
              value: 1
            }]
          }, {
            label: '交通工具',
            prop: 'jtgj',
            dicData: [{
              label: '飞机',
              value: 0
            }, {
              label: '动车',
              value: 1
            }, {
              label: '驾车',
              value: 2
            }, {
              label: '其他',
              value: 3
            }]
          }]
        }
      }
    },
    methods: {
      handleChange(form) {
        this.$message.success(JSON.stringify(form))
      }
    }
}
</script>
<style>

</style>

## 搜索



### 例子


:::demo  用法和crud组件用法一致
```html
<avue-search :option="option" v-model="form" @change="handleChange"></avue-search>

<script>
export default {
    data() {
       return {
        form: {
          zt: ["370000", "620000", "610000", "110000", "410000"],
          checkbox: 0,
          jtgj: [0, 1, 2, 3, 4]
        },
        option: {
          card: true,
          column: [{
            label: '地区',
            prop: 'zt',
            dicData:'zt',
            dicUrl: 'https://cli2.avue.top/api/area/getProvince',
            props: {
              label: 'name',
              value: 'code'
            }
          }, {
            label: '多选',
            prop: 'checkbox',
            multiple: false,
            dicData: [{
              label: '单层',
              value: 0
            }, {
              label: '多层',
              value: 1
            }]
          }, {
            label: '交通工具',
            prop: 'jtgj',
            dicData: [{
              label: '飞机',
              value: 0
            }, {
              label: '动车',
              value: 1
            }, {
              label: '驾车',
              value: 2
            }, {
              label: '其他',
              value: 3
            }]
          }]
        }
      }
    },
    methods: {
      handleChange(form) {
        this.$message.success(JSON.stringify(form))
      }
    }
}
</script>
```
:::


### Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| change | 当搜索的值发生改变时的回调 | form |
