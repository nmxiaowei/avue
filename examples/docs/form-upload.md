<script>
export default {
    data() {
      return {
        form:{
          img:[
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=1',
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=2'
          ],
          imgUrl:[{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=1'
          },{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=2'
          }],
          imgUrl3:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=3'
        },
        option:{
          labelWidth: 120,
          column: [{
              label: '附件上传',
              prop: 'imgUrl',
              type: 'upload',
              loadText:'附件上传中，请稍等',
              span: 24,
              propsHttp:{
                  name:'label',
                  url:'value'
              },
              props:{
                  label:'label',
                  value:'value'
              },
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '用户头像',
              prop: 'imgUrl3',
              type: 'upload',
              showFileList: false,
              listType: 'picture-img',
              span: 24,
              tip: '只能上传jpg/png用户头像，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '照片墙',
              prop: 'imgUrl',
              type: 'upload',
              span: 24,
              listType: 'picture-card',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '数组图片组',
              prop: 'img',
              dataType:'array',
              type: 'upload',
              span: 24,
              listType: 'picture-card',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '拖拽上传',
              prop: 'imgUrl',
              type: 'upload',
              span: 24,
              drag: true,
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '缩略图上传',
              prop: 'imgUrl',
              type: 'upload',
              limit: 3,
              span: 24,
              listType: 'picture',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/', //上传图片地址
          }]
      }
      };
    },
    methods: {
        uploadBefore(file,done){
            console.log(file);
            done();
            this.$message.success('上传前的方法')
        },
        uploadAfter(res,done){
            console.log(res);
            done();
            this.$message.success('上传后的方法')
        },
        submit(){
            this.$message.success('当前数据'+JSON.stringify(this.form))
        }
    }
}
</script>
<style>

</style>

## Form 模块



### 上传

:::demo  有`upload-after`和`upload-before`方法来拦截请求的，返回数据和done方法,其中propsHttp配置图片服务器返回的`url`图片地址和`name`图片名称属性，`props`配置回显的`label`图片名称和`value`图片地址。可以根据dataType设置是`array`还是`json`
```html
<avue-form v-model="form" :option="option" @submit="submit" :upload-before="uploadBefore" :upload-after="uploadAfter"></avue-form>

<script>
export default {
    data() {
      return {
        form:{
          img:[
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=1',
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=2'
          ],
          imgUrl:[{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=1'
          },{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=2'
          }],
          imgUrl3:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?a=3'
        },
        option:{
          labelWidth: 120,
          column: [{
              label: '附件上传',
              prop: 'imgUrl',
              type: 'upload',
              loadText:'附件上传中，请稍等',
              span: 24,
              propsHttp:{
                  name:'label',
                  url:'value'
              },
              props:{
                  label:'label',
                  value:'value'
              },
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '用户头像',
              prop: 'imgUrl3',
              type: 'upload',
              showFileList: false,
              listType: 'picture-img',
              span: 24,
              tip: '只能上传jpg/png用户头像，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '照片墙',
              prop: 'imgUrl',
              type: 'upload',
              span: 24,
              listType: 'picture-card',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '数组图片组',
              prop: 'img',
              dataType:'array',
              type: 'upload',
              span: 24,
              listType: 'picture-card',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '拖拽上传',
              prop: 'imgUrl',
              type: 'upload',
              span: 24,
              drag: true,
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/',
          }, {
              label: '缩略图上传',
              prop: 'imgUrl',
              type: 'upload',
              limit: 3,
              span: 24,
              listType: 'picture',
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: 'https://jsonplaceholder.typicode.com/posts/', //上传图片地址
          }]
      }
      };
    },
    methods: {
        uploadBefore(file,done){
            console.log(file);
            done();
            this.$message.success('上传前的方法')
        },
        uploadAfter(res,done){
            console.log(res);
            done();
            this.$message.success('上传后的方法')
        },
        submit(){
            this.$message.success('当前数据'+JSON.stringify(this.form))
        }
    }
}
</script>
```
:::

### Avue-upload Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| propsHttp | 上传后返回名称和路径的配置属性，详情见下面propsHttp属性 | Object | -  | - |
| props | 回显的名称和路径配置属性，详情见下面props属性 | Object | -  | - |
| dataType | 图片格式的类型，默认为json | String | array / json | json |
| listType | 上传框的类型 | String | picture-img / picture-card / picture / file  | file |
| action | 上传图片的地址 | String | - | - |
| tip | 上传控件的提示语 | String | - | 文件上传中,请稍等 |
| limit | 最大上传个数 | Number | - | 3 |
| showFileList | 文件列表(当为picture-img和picture-card时默认为false) | Boolean | false / true | true |
| loadText | 上传提示语 | String | - | - |

### Avue-upload props Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 回显图片的名称 | string| — | — |
| value | 图片的地址 | string | — | — |

### Avue-upload propsHttp Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 回显图片的名称 | string| — | — |
| value | 图片的地址 | string | — | — |


### Avue-upload Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| upload-before | 上传前的回调 | file,done |
| upload-after | 上传后的回调 | res,done |

