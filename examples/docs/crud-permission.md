<script>
export default {
 data() {
      return {
        text: false,
        permission: {},
        option: {
          expand: true,
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }]
      }
    },
    watch: {
      text() {
        if (this.text === true) {
          this.permission = {
            delBtn: false,
            addBtn: false,
          }
        } else {
          this.permission = {
            delBtn: true,
            addBtn: true,
          }
        }
      }
    }
}
</script>

# 权限
控制封装中的按钮权限

:::demo 
```html
权限开关
<el-switch :active-value="false" :inactive-value="true" v-model="text" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
<avue-crud :option="option" :permission="permission" :data="data"></avue-crud>
<script>
export default {
 data() {
      return {
        text: false,
        permission: {},
        option: {
          expand: true,
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }]
      }
    },
    watch: {
      text() {
        if (this.text === true) {
          this.permission = {
            delBtn: false,
            addBtn: false,
          }
        } else {
          this.permission = {
            delBtn: true,
            addBtn: true,
          }
        }
      }
    }
}
</script>

```
:::


### Permission Attributes

|参数|说明|类型|可选值|默认值|
|----------------|-----------------------|--------------------|------------------|---------------------|
|viewBtn|查看按钮|Boolean|false / true|true|
|editBtn|编辑按钮|Boolean|false / true|true|
|addBtn|新增按钮|Boolean|false / true|true|
|delBtn|删除按钮|Boolean|false / true|true|
|cellBtn|行编辑按钮|Boolean|false / true|true|
|dateBtn|日期按钮|Boolean|false / true|true|
|refreshBtn|刷新按钮|Boolean|false / true|true|
|columnBtn|列显隐按钮|Boolean|false / true|true|
|searchBtn|搜索按钮|Boolean|false / true|true|
|selectClearBtn|选择清空按钮|Boolean|false / true|true|
