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
    submit (width, height) {
      if (!width) width = this.width;
      if (!height) height = this.height;
      return this.canvas.toDataURL("i/png");;
    },
    clear () {
      this.linex = new Array();
      this.liney = new Array();
      this.linen = new Array();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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