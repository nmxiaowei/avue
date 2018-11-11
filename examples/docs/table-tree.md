<script>
export default {
    data () {
    return {
      option: {
        expandAll: false,
        columns: [
          {
            text: '事件',
            value: 'event',
            width: 200
          },
          {
            text: 'ID',
            value: 'id',
            type:'dic',
            dicData:[{
              label:'零',
              value:0
            },{
              label:'一',
              value:1
            },{
              label:'二',
              value:2,
            }]
          },
          {
            text: '时间线',
            value: 'timeLine'
          },
          {
            text: '备注',
            value: 'comment'
          }
        ],
        data: [
          {
            id: 0,
            event: '事件1',
            timeLine: 50,
            comment: '无'
          },
          {
            id: 1,
            event: '事件1',
            timeLine: 100,
            comment: '无',
            children: [
              {
                id: 2,
                event: '事件2',
                timeLine: 10,
                comment: '无'
              },
              {
                id: 3,
                event: '事件3',
                timeLine: 90,
                comment: '无',
                children: [
                  {
                    id: 4,
                    event: '事件4',
                    timeLine: 5,
                    comment: '无'
                  },
                  {
                    id: 5,
                    event: '事件5',
                    timeLine: 10,
                    comment: '无'
                  },
                  {
                    id: 6,
                    event: '事件6',
                    timeLine: 75,
                    comment: '无',
                    children: [
                      {
                        id: 7,
                        event: '事件7',
                        timeLine: 50,
                        comment: '无',
                        children: [
                          {
                            id: 71,
                            event: '事件71',
                            timeLine: 25,
                            comment: 'xx'
                          },
                          {
                            id: 72,
                            event: '事件72',
                            timeLine: 5,
                            comment: 'xx'
                          },
                          {
                            id: 73,
                            event: '事件73',
                            timeLine: 20,
                            comment: 'xx'
                          }
                        ]
                      },
                      {
                        id: 8,
                        event: '事件8',
                        timeLine: 25,
                        comment: '无'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style>

</style>

## 表格树


### 例子


:::demo 传入`option`配置属性即可,`expandAll`是否全部展开,`columns`数据列,`data`为数据,同时还支持自定义列,具体看`avue-cli`的`demo`
```html
 <avue-tree-table :option="option"></avue-tree-table>

<script>
export default {
    data () {
    return {
      option: {
        expandAll: false,
        columns: [
          {
            text: '事件',
            value: 'event',
            width: 200
          },
          {
            text: 'ID',
            value: 'id',
            type:'dic',
            dicData:[{
              label:'零',
              value:0
            },{
              label:'一',
              value:1
            },{
              label:'二',
              value:2,
            }]
          },
          {
            text: '时间线',
            value: 'timeLine'
          },
          {
            text: '备注',
            value: 'comment'
          }
        ],
        data: [
          {
            id: 0,
            event: '事件1',
            timeLine: 50,
            comment: '无'
          },
          {
            id: 1,
            event: '事件1',
            timeLine: 100,
            comment: '无',
            children: [
              {
                id: 2,
                event: '事件2',
                timeLine: 10,
                comment: '无'
              },
              {
                id: 3,
                event: '事件3',
                timeLine: 90,
                comment: '无',
                children: [
                  {
                    id: 4,
                    event: '事件4',
                    timeLine: 5,
                    comment: '无'
                  },
                  {
                    id: 5,
                    event: '事件5',
                    timeLine: 10,
                    comment: '无'
                  },
                  {
                    id: 6,
                    event: '事件6',
                    timeLine: 75,
                    comment: '无',
                    children: [
                      {
                        id: 7,
                        event: '事件7',
                        timeLine: 50,
                        comment: '无',
                        children: [
                          {
                            id: 71,
                            event: '事件71',
                            timeLine: 25,
                            comment: 'xx'
                          },
                          {
                            id: 72,
                            event: '事件72',
                            timeLine: 5,
                            comment: 'xx'
                          },
                          {
                            id: 73,
                            event: '事件73',
                            timeLine: 20,
                            comment: 'xx'
                          }
                        ]
                      },
                      {
                        id: 8,
                        event: '事件8',
                        timeLine: 25,
                        comment: '无'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```
:::