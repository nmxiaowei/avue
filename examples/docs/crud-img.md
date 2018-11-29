<script>
export default {
    data() {
      return {
        loading:true,
        data: [
          {
            img:'https://gitee.com/smallweigit/avue/badge/star.svg?theme=white',
            img1:[{
              label:'test',
              value:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true',
            },{
              label:'test',
              value:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true',
            }],
            img2:['http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true','http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true']
          }
        ],
        option:{
          page:false,
          align:'center',
          index:true,
          menuAlign:'center',
          column:[
             {
              label:'图片',
              prop:'img',
              type:'upload',
              imgWidth:100,
              listType:'picture-img'
            },{
              label:'JSON图片',
              prop:'img1',
              type:'upload',
              imgFullscreen:true,
              imgType:'card',
              listType:'picture-card',
              span:24,
            },{
              label:'Array图片',
              prop:'img2',
              type:'upload',
              dataType:'array',
              listType:'picture-card',
              span:24,
            }
          ]
        }
      };
    }
}
</script>

<style>

</style>

## Crud 模块



### 图片显示

:::demo `imgWidth`和`imgHeight`为图片的宽度和高度,`imgFullscreen`是否为全屏,`imgType`为展示图片类型
```html
<avue-crud :data="data" :option="option" ></avue-crud>
<script>
export default {
    data() {
      return {
        loading:true,
        data: [
          {
            img:'https://gitee.com/smallweigit/avue/badge/star.svg?theme=white',
            img1:[{
              label:'test',
              value:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true',
            },{
              label:'test',
              value:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true',
            }],
            img2:['http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true','http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true']
          }
        ],
        option:{
          page:false,
          align:'center',
          index:true,
          menuAlign:'center',
          column:[
             {
              label:'图片',
              prop:'img',
              type:'upload',
              imgWidth:100,
              listType:'picture-img'
            },{
              label:'JSON图片',
              prop:'img1',
              type:'upload',
              imgFullscreen:true,
              imgType:'card',
              listType:'picture-card',
              span:24,
            },{
              label:'Array图片',
              prop:'img2',
              type:'upload',
              dataType:'array',
              listType:'picture-card',
              span:24,
            }
          ]
        }
      };
    }
}
</script>
```
:::

### Avue-upload Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| imgWidth | 图片的宽度（listType = picture-img） | String / Number | -  | - |
| imgHeight | 图片的高度 （listType = picture-img）| String / Number | -  | - |
| imgFullscreen | 是否全屏展示 （listType ！= picture-img）| Boolean | true / false | false |
| imgType | 多图展示类型  （listType ！= picture-img） | String | box / card  | box |