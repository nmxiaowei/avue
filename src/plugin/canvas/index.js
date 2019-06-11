//标准参数
var canvas, ctx, configDefault = {
  width: 200,
  height: 200
};
let config = {
  text: 'avue.top',//文字
  fontFamily: 'microsoft yahei',//字体
  color: "#999",//颜色
  fontSize: 16,//大小
  opacity: 100,//透明度
  bottom: 10,//下边位置
  right: 10,//右边位置
  ratio: 1//压缩比
}
export const watermark = function(text = 'avue商用通用无敌大水印') {
  new _waterMark({text});
};

//将base64转换为文件

export function detailImg(file, option = {}) {
  return new Promise(function (resolve, reject) {
    const { text, fontFamily, color, fontSize, opacity, bottom, right, ratio } = option
    initParams();
    fileToBase64(file, initImg)
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }
    //参数初始化 
    function initParams() {
      config.text = text || config.text;
      config.fontFamily = fontFamily || config.fontFamily;
      config.color = color || config.color;
      config.fontSize = fontSize || config.fontSize;
      config.opacity = opacity || config.opacity;
      config.bottom = bottom || config.bottom;
      config.right = right || config.right;
      config.ratio = ratio || config.ratio;
    }
    //加载图片
    function initImg(data) {
      var img = new Image();
      img.src = data;
      img.onload = function () {
        var width = img.width;
        var height = img.height;
        cretedCanvas(width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setText(width, height);
        resolve(dataURLtoFile(document.getElementById('canvas').toDataURL(file.type, config.ratio), file.name));
      }
    }
    //创建画板
    function cretedCanvas(width, height) {
      canvas = document.getElementById("canvas");
      if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.className = "avue-canvas";
        document.body.appendChild(canvas);
      }
      ctx = canvas.getContext("2d");
      canvas.width = width
      canvas.height = height

    }
    //添加水印
    function setText(width, height) {
      var txt = config.text;
      var param = calcParam(txt, width, height);
      ctx.font = param.fontSize + "px " + config.fontFamily;
      ctx.fillStyle = config.color;
      ctx.globalAlpha = config.opacity / 100;
      ctx.fillText(txt, param.x, param.y);
    }
    //计算比例
    function calcParam(txt, width, height) {
      var x, y;

      //字体的比例
      var calcFontSize = config.fontSize / configDefault.width;
      var fontSize = calcFontSize * width;


      if (config.bottom) {
        y = configDefault.height - config.bottom;
      } else {
        y = config.top;
      }

      if (config.right) {
        x = configDefault.width - config.right;
      } else {
        x = config.left;
      }
      ctx.font = config.fontSize + "px " + config.fontFamily;
      var txtWidth = Number(ctx.measureText(txt).width)

      x = x - txtWidth;

      var calcPosX = x / configDefault.width;
      var calcPosY = y / configDefault.height;

      x = calcPosX * width;
      y = calcPosY * height;
      return {
        x: x,
        y: y,
        fontSize: fontSize
      }

    }
    //file转base64
    function fileToBase64(file, callback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        callback(e.target.result)
      }
    }
  })
}