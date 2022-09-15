import _waterMark from './watermark';
import { dataURLtoFile } from 'utils/util';
// 标准参数
var canvas, ctx, configDefault = {
  width: 200,
  height: 200
};
let config = {
  text: 'avueJS', // 文字
  fontFamily: 'microsoft yahei', // 字体
  color: '#999', // 颜色
  fontSize: 16, // 大小
  opacity: 100, // 透明度
  bottom: 10, // 下边位置
  right: 10, // 右边位置
  ratio: 1// 压缩比
};

/**
 * 参数 {Object} opt
 * @param {String} text    水印文本，默认'avue商用通用无敌大水印'
 * @param {String} font    水印字体，默认'30px 黑体'
 * @param {Int} canvasWidth    单个水印容器宽度，默认500
 * @param {Int} canvasHeight    单个水印容器高度，默认200
 * @param {String} textAlign    水印文本对齐方式，默认'center'
 * @param {String} textStyle    水印文本样式，默认'rgba(100,100,100,0.15)'
 * @param {Int} degree    水印文本旋转角度，默认 -20
 * @param return
 **/
export const watermark = function (opt = {}) {
  return new _waterMark(opt);
};

// file转base64
export function fileToBase64 (file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    callback(e.target.result);
  };
}

// 图片加水印
export function detailImg (file, option = {}, callback) {
  const { text, fontFamily, color, fontSize, opacity, bottom, right, ratio } = option;
  initParams();
  fileToBase64(file, initImg);
  // 参数初始化
  function initParams () {
    config.text = text || config.text;
    config.fontFamily = fontFamily || config.fontFamily;
    config.color = color || config.color;
    config.fontSize = fontSize || config.fontSize;
    config.opacity = opacity || config.opacity;
    config.bottom = bottom || config.bottom;
    config.right = right || config.right;
    config.ratio = ratio || config.ratio;
  }
  // 加载图片
  function initImg (data) {
    var img = new Image();
    img.src = data;
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      cretedCanvas(width, height);
      ctx.drawImage(img, 0, 0, width, height);
      setText(width, height);
      const base64 = document.getElementById('canvas').toDataURL(file.type, config.ratio)
      const result = dataURLtoFile(base64, file.name)
      callback && callback(result);
    };
  }
  // 创建画板
  function cretedCanvas (width, height) {
    canvas = document.getElementById('canvas');
    if (canvas === null) {
      canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.className = 'avue-canvas';
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

  }
  // 添加水印
  function setText (width, height) {
    var txt = config.text;
    var param = calcParam(txt, width, height);
    ctx.font = param.fontSize + 'px ' + config.fontFamily;
    ctx.fillStyle = config.color;
    ctx.globalAlpha = config.opacity / 100;
    ctx.fillText(txt, param.x, param.y);
  }
  // 计算比例
  function calcParam (txt, width, height) {
    var x, y;

    // 字体的比例
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
    ctx.font = config.fontSize + 'px ' + config.fontFamily;
    var txtWidth = Number(ctx.measureText(txt).width);

    x = x - txtWidth;

    var calcPosX = x / configDefault.width;
    var calcPosY = y / configDefault.height;

    x = calcPosX * width;
    y = calcPosY * height;
    return {
      x: x,
      y: y,
      fontSize: fontSize
    };
  }
}
