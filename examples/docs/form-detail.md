<script>
export default {
    data() {
      return {
        form:{
          qhdh: '1000000000',
          zt: '110000',
          xsdh: '1234123421',
          zdd: '3214321432',
          yhxm: '付小小',
          lxdh: '18100000000',
          cykd: '菜鸟仓储',
          qhdz: '浙江省杭州市西湖区万塘路18号',
          bz: '无'
        },
        option:{
           option: [{
            label: '退款申请',
            prop: 'tksq',
            icon: 'el-icon-view',
            column: [{
                  label: '取货单号',
                  prop: 'qhdh',
                   formsolt:true,
              }, {
                  label: '地区',
                  prop: 'zt',
                 type:'select',
                  props: {
                    label: 'name',
                    value: 'code'
                  },
                  dicUrl:'https://cli2.avue.top/api/area/getProvince',
              }, {
                  label: '销售单号',
                  prop: 'xsdh'
              }, {
                  label: '子订单',
                  prop: 'zdd'
              }]
          },
          {
              label: '用户信息',
              prop: 'yhxx',
              icon: 'el-icon-edit-outline',
              column: [{
                  label: '用户姓名',
                  prop: 'yhxm'
              }, {
                  label: '联系电话',
                  prop: 'lxdh'
              }, {
                  label: '常用快递',
                  prop: 'cykd'
              }, {
                  label: '取货地址',
                  prop: 'qhdz'
              }, {
                  label: '备注',
                  prop: 'bz'
              }]
          },{
            label: '自定义分组',
            prop: 'test',
            solt:true,
            icon: 'el-icon-view',
            column: []
          }]
        }
      };
    }
}
</script>
<style>

</style>

## Form 模块



### 详情

:::demo 支持`本地字典`和`网络字典`以及`solt`卡槽自定义
```html
<avue-form-detail  v-model="form" :option="option" >
    <template slot="qhdhForm" slot-scope="scope">
        <el-tag>{{scope.row.qhdh}}</el-tag>
    </template>
     <template slot="test" slot-scope="scope">
        <span>{{scope.row}}</span>
    </template>
</avue-form-detail>

<script>
export default {
    data() {
      return {
        form:{
          qhdh: '1000000000',
          zt: '110000',
          xsdh: '1234123421',
          zdd: '3214321432',
          yhxm: '付小小',
          lxdh: '18100000000',
          cykd: '菜鸟仓储',
          qhdz: '浙江省杭州市西湖区万塘路18号',
          bz: '无'
        },
        option:{
           option: [{
            label: '退款申请',
            prop: 'tksq',
            icon: 'el-icon-view',
            column: [{
                  label: '取货单号',
                  prop: 'qhdh',
                  formsolt:true,
              }, {
                  label: '地区',
                  prop: 'zt',
                  props: {
                    label: 'name',
                    value: 'code'
                  },
                  type:'select',
                  dicUrl:'https://cli2.avue.top/api/area/getProvince',
              }, {
                  label: '销售单号',
                  prop: 'xsdh'
              }, {
                  label: '子订单',
                  prop: 'zdd'
              }]
          },
          {
              label: '用户信息',
              prop: 'yhxx',
              icon: 'el-icon-edit-outline',
              column: [{
                  label: '用户姓名',
                  prop: 'yhxm'
              }, {
                  label: '联系电话',
                  prop: 'lxdh'
              }, {
                  label: '常用快递',
                  prop: 'cykd'
              }, {
                  label: '取货地址',
                  prop: 'qhdz'
              }, {
                  label: '备注',
                  prop: 'bz'
              }]
          },{
            label: '自定义分组',
            prop: 'test',
            solt:true,
            icon: 'el-icon-view',
            column: []
          }]
        }
      };
    }
}
</script>
```
:::



## Variables

|参数|说明|类型|可选值|默认值|
|----------------------|--------------------------------|--------|------------|------|
|solt|开启某一分组的自定义组件|Boolean|true / false|false|
|formsolt|开启某一列的自定义组件|Boolean|true / false|false|

|name|说明|
|----|---|
|分组的名称|列自定义列的内容，参数为{row}|
|分组列的名称+Form(nameForm)|表单自定义列的内容，参数为{row}|
