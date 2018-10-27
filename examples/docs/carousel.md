<script>
export default {
    data() {
      return {
        option:{
          data:[
            {
              title: '这是跑马灯的标题1',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
              title: '这是跑马灯的标题2',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
             title: '这是跑马灯的标题3',
             href:"https://avue.top",
             src:'http://pic.soutu123.com/back_pic/18/10/19/9ce53f1e0215b15e996b856e098d4c88.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            }
          ]
        },
        option1:{
          type:'card',
          height:250,
          autoplay:true,
          interval:3000,
          data:[
            {
              title: '这是跑马灯的标题1',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
              title: '这是跑马灯的标题2',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
             title: '这是跑马灯的标题3',
             href:"https://avue.top",
             src:'http://pic.soutu123.com/back_pic/18/10/19/9ce53f1e0215b15e996b856e098d4c88.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            }
          ]
        },
      };
    }
}
</script>
<style>

</style>

## 工具类



### 跑马灯


:::demo  
```html
<avue-carousel :option="option"></avue-carousel>

<script>
export default {
    data() {
      return {
        option:{
          data:[
            {
              title: '这是跑马灯的标题1',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
              title: '这是跑马灯的标题2',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
             title: '这是跑马灯的标题3',
             href:"https://avue.top",
             src:'http://pic.soutu123.com/back_pic/18/10/19/9ce53f1e0215b15e996b856e098d4c88.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            }
          ]
        },
      };
    }
}
</script>
```
:::


### 旋转展示


:::demo  
```html
<avue-carousel :option="option1"></avue-carousel>

<script>
export default {
    data() {
      return {
        option1:{
          type:'card',
          height:250,
          autoplay:true,
          interval:3000,
          data:[
            {
              title: '这是跑马灯的标题1',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/07/06/514e96eedb99a663e02ab32614713243.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
              title: '这是跑马灯的标题2',
              href:"https://avue.top",
              src:'http://pic.soutu123.com/back_pic/18/09/18/0ca02eb9c35f095481196354a1f455c8.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            },
            {
             title: '这是跑马灯的标题3',
             href:"https://avue.top",
             src:'http://pic.soutu123.com/back_pic/18/10/19/9ce53f1e0215b15e996b856e098d4c88.jpg!/fw/700/quality/90/unsharp/true/compress/true'
            }
          ]
        },
      };
    }
}
</script>
```
:::