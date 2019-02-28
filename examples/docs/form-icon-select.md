<script>
export default{
  data() {
    return {
      form: { 
        icon:'el-icon-error'
      },
      option: {
        labelWidth: 120,
        column: [
          {
            label: '图标选择器',
            prop: 'icon',
            type: 'icon-select',
            iconList: [{
              label: '基本图标',
              list: ['el-icon-info', 'el-icon-error', 'el-icon-error', 'el-icon-success', 'el-icon-warning', 'el-icon-question']
            }, {
              label: '方向图标',
              list: ['el-icon-info', 'el-icon-back', 'el-icon-arrow-left', 'el-icon-arrow-down', 'el-icon-arrow-right', 'el-icon-arrow-up']
            }, {
              label: '符号图标',
              list: ['el-icon-plus', 'el-icon-minus', 'el-icon-close', 'el-icon-check']
            },{
              label: '阿里云图标',
              list: ['iconfont icon-zhongyingwen', 'iconfont icon-rizhi1', 'iconfont icon-bug', 'iconfont icon-qq1', 'iconfont icon-weixin1']
            }]
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$message.success('当前数据' + JSON.stringify(this.form))
    }
  }
}
</script>

# 图标选择器



:::demo  配置`type`为`icon-select`，图标集合参考例子配置`iconList`属性
```html
<avue-form :option="option" v-model="form" > </avue-form>

<script>
// 引入阿里巴巴的图表库后，直接使用图标名即可，记得加前缀
// <link rel="stylesheet" href="https://at.alicdn.com/t/font_567566_pwc3oottzol.css">

// 同时给你的图标加统一样式
// .avue-icon-select__list .iconfont{
//     padding: 20px;
//     font-size: 24px;
// }
// .avue-icon-select__list .iconfont:hover{
//    transform: scale(1.4);
//    webkit-transform: scale(1.4);
// }
export default{
  data() {
    return {
      form: { 
        icon:'el-icon-error'
      },
      option: {
        labelWidth: 120,
        column: [
          {
            label: '图标选择器',
            prop: 'icon',
            type: 'icon-select',
            iconList: [{
              label: '基本图标',
              list: ['el-icon-info', 'el-icon-error', 'el-icon-error', 'el-icon-success', 'el-icon-warning', 'el-icon-question']
            }, {
              label: '方向图标',
              list: ['el-icon-info', 'el-icon-back', 'el-icon-arrow-left', 'el-icon-arrow-down', 'el-icon-arrow-right', 'el-icon-arrow-up']
            }, {
              label: '符号图标',
              list: ['el-icon-plus', 'el-icon-minus', 'el-icon-close', 'el-icon-check']
            },{
              label: '阿里云图标',
              list: ['iconfont icon-zhongyingwen', 'iconfont icon-rizhi1', 'iconfont icon-bug', 'iconfont icon-qq1', 'iconfont icon-weixin1']
            }]
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$message.success('当前数据' + JSON.stringify(this.form))
    }
  }
}
</script>

```
:::