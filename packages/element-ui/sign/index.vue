<template>
  <div :class="b()">
    <canvas :class="b('canvas')"
            :width="width"
            :height="height"
            ref="canvas"></canvas>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "sign",
  props: {
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      linex: [],
      liney: [],
      linen: [],
      canvas: {},
      context: {},
    }
  },
  computed: {
    styleName () {
      return {
        width: this.setPx(this.width),
        height: this.setPx(this.height)
      }
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    getStar (text, text1, text2) {
      var canvas = this.canvas;
      var context = this.context
      // 绘制印章边框   
      var width = canvas.width / 2;
      var height = canvas.height / 2;
      context.lineWidth = 7;
      context.strokeStyle = "#f00";
      context.beginPath();
      context.arc(width, height, 110, 0, Math.PI * 2);
      context.stroke();

      //画五角星
      create5star(context, width, height, 20, "#f00", 0);

      // 绘制印章名称   
      context.font = '18px 黑体';
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth = 1;
      context.strokeStyle = '#f00';
      context.strokeText(text, width, height + 50);

      // 绘制印章副属性名称   
      context.font = '14px 黑体';
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth = 1;
      context.strokeStyle = '#f00';
      context.strokeText(text2, width, height + 80);

      // 绘制印章单位   
      context.translate(width, height);// 平移到此位置,
      context.font = '22px 黑体'
      var count = text1.length;// 字数   
      var angle = 4 * Math.PI / (3 * (count - 1));// 字间角度   
      var chars = text1.split("");
      var c;
      for (var i = 0; i < count; i++) {
        c = chars[i];// 需要绘制的字符   
        if (i == 0) context.rotate(5 * Math.PI / 6);
        else
          context.rotate(angle);// 
        context.save();
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直   
        context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴   
        context.strokeText(c, 0, 0);// 此点为字的中心点   
        context.restore();
        context.save();//锁画布(为了保存之前的画布状态)  
      }

      //绘制五角星  
      /** 
       * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
       * rotate:绕对称轴旋转rotate弧度 
       */
      function create5star (context, sx, sy, radius, color, rotato) {
        context.save();
        context.fillStyle = color;
        context.translate(sx, sy);//移动坐标原点  
        context.rotate(Math.PI + rotato);//旋转  
        context.beginPath();//创建路径  
        var x = Math.sin(0);
        var y = Math.cos(0);
        var dig = Math.PI / 5 * 4;
        for (var i = 0; i < 5; i++) {//画五角星的五条边  
          var x = Math.sin(i * dig);
          var y = Math.cos(i * dig);
          context.lineTo(x * radius, y * radius);
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
      }
    },
    submit (width, height) {
      if (!width) width = this.width;
      if (!height) height = this.height;
      return this.canvas.toDataURL("i/png");
    },
    clear () {
      this.linex = new Array();
      this.liney = new Array();
      this.linen = new Array();
      this.canvas.width = this.canvas.width

    },
    init () {
      this.canvas = this.$refs.canvas;
      var canvas = this.canvas;
      var _safe = this;
      //注册相关事件
      if (typeof document.ontouchstart != "undefined") {      //适配移动设备
        canvas.addEventListener('touchmove', onMouseMove, false);
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
      } else {      //适配电脑
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseleave', onMouseUp, false);
      }
      //初始化上下文和参数
      this.context = canvas.getContext('2d');
      var context = this.context;
      this.linex = new Array();
      this.liney = new Array();
      this.linen = new Array();
      var lastX = 1;
      var lastY = 30;
      var flag = 0;



      //根据鼠标坐标获取绘图坐标
      function getCanvasPos (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        var x, y;
        if (evt.targetTouches) {
          x = evt.targetTouches[0].clientX;
          y = evt.targetTouches[0].clientY;
        } else {
          x = evt.clientX;
          y = evt.clientY;
        }
        return {
          x: (x - rect.left) * (canvas.width / rect.width),
          y: (y - rect.top) * (canvas.height / rect.height)
        }
      }

      //鼠标移动的时候
      function onMouseMove (evt) {
        var x = getCanvasPos(canvas, evt).x,
          y = getCanvasPos(canvas, evt).y;

        //判断是否处于按下状态
        if (flag == 1) {
          //如果是则画图
          _safe.linex.push(x);
          _safe.liney.push(y);
          _safe.linen.push(1);
          context.save();
          context.translate(context.canvas.width / 2, context.canvas.height / 2);
          context.translate(-context.canvas.width / 2, -context.canvas.height / 2);
          context.beginPath();
          context.lineWidth = 2;
          for (var i = 1; i < _safe.linex.length; i++) {
            lastX = _safe.linex[i];
            lastY = _safe.liney[i];
            if (_safe.linen[i] == 0)
              context.moveTo(lastX, lastY);
            else
              context.lineTo(lastX, lastY);
          }
          context.shadowBlur = 10;
          context.stroke();
          context.restore();
        }
        evt.preventDefault();
      }

      //当鼠标按下的时候修改按下标志，并开始记录坐标
      function onMouseDown (evt) {
        var x = getCanvasPos(canvas, evt).x,
          y = getCanvasPos(canvas, evt).y;
        flag = 1;
        _safe.linex.push(x);
        _safe.liney.push(y);
        _safe.linen.push(0);
      }

      //鼠标松开清除标志
      function onMouseUp () {
        flag = 0;
      }
    }
  }
});
</script>