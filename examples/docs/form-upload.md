<script>
export default {
    data() {
      return {
        form:{
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
        uploadAfter(error,done){
            console.log(error);
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

:::demo  有`upload-after`和`upload-before`方法来拦截请求的，返回数据和done方法
```html
<avue-form v-model="form" :option="option" @submit="submit" :upload-before="uploadBefore" :upload-after="uploadAfter"></avue-form>

<script>
export default {
    data() {
      return {
        form:{
          imgUrl:[{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
          },{
            label:'图片名称',
            value:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
          }],
          imgUrl3:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
        },
        option:{
          labelWidth: 120,
          column: [{
              label: '附件上传',
              prop: 'imgUrl',
              type: 'upload',
              span: 24,
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
        uploadAfter(error,done){
            console.log(error);
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