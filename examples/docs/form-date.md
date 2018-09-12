<script>
export default {
    data() {
      return {
        form:{
            datetime:'1398250549123'
        },
        option:{
          labelWidth:110,
          column: [{
              label: "日期范围",
              prop: "daterange",
              type: "daterange",
              startPlaceholder: '日期开始范围自定义',
              endPlaceholder: '日期结束范围自定义',
          }, {
              label: "时间范围",
              value: 'timerange',
              type: 'timerange',
              startPlaceholder: '时间开始范围自定义',
              endPlaceholder: '时间结束范围自定义',
          }, {
              label: "时间日期范围",
              value: 'datetimerange',
              type: 'datetimerange',
              span:24,
              row:true,
              startPlaceholder: '时间日期开始范围自定义',
              endPlaceholder: '时间日期结束范围自定义',
          }, {
              label: "日期",
              prop: "date",
              type: "date"
          }, {
              label: "时间",
              prop: "time",
              type: "time",
          }, {
              label: "日期时间",
              prop: "datetime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "timestamp",//时间戳例子
          }, {
              label: "周",
              prop: "week",
              type: "week",
              format: "yyyy 第 WW 周"
          }, {
              label: "月",
              prop: "month",
              type: "month",
          }, {
              label: "年",
              prop: "year",
              type: "year",
          }, {
              label: "多个日期",
              prop: "dates",
              type: "dates",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
          }]
        },
      };
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
<style>

</style>

## Form 模块



### 日期

:::demo  
```html
<avue-form v-model="form" :option="option" @submit="submit"></avue-form>

<script>
export default {
    data() {
      return {
        form:{
            datetime:'1398250549123'//时间戳例子
        },
        option:{
          labelWidth:110,
          column: [{
              label: "日期范围",
              prop: "daterange",
              type: "daterange",
              startPlaceholder: '日期开始范围自定义',
              endPlaceholder: '日期结束范围自定义',
          }, {
              label: "时间范围",
              value: 'timerange',
              type: 'timerange',
              startPlaceholder: '时间开始范围自定义',
              endPlaceholder: '时间结束范围自定义',
          }, {
              label: "时间日期范围",
              value: 'datetimerange',
              type: 'datetimerange',
              span:24,
              row:true,
              startPlaceholder: '时间日期开始范围自定义',
              endPlaceholder: '时间日期结束范围自定义',
          }, {
              label: "日期",
              prop: "date",
              type: "date"
          }, {
              label: "时间",
              prop: "time",
              type: "time",
          }, {
              label: "日期时间",
              prop: "datetime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "timestamp",
          }, {
              label: "周",
              prop: "week",
              type: "week",
              format: "yyyy 第 WW 周"
          }, {
              label: "月",
              prop: "month",
              type: "month",
          }, {
              label: "年",
              prop: "year",
              type: "year",
          }, {
              label: "多个日期",
              prop: "dates",
              type: "dates",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
          }]
        },
      };
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
```
:::