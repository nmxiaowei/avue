import WaterMark from './watermark';
import { dataURLtoFile } from 'utils/util';

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

const configDefault = {
  width: 200,
  height: 200,
};

const config: Record<string, any> = {
  text: 'avueJS',
  fontFamily: 'microsoft yahei',
  color: '#999',
  fontSize: 16,
  opacity: 100,
  bottom: 10,
  right: 10,
  ratio: 1,
};

export default function (opt: Record<string, any> = {}) {
  return new WaterMark(opt);
}

export function detailImg(file: File, option: Record<string, any> = {}) {
  return new Promise<File>((resolve) => {
    const { text, fontFamily, color, fontSize, opacity, bottom, right, ratio } = option;
    initParams();
    fileToBase64(file, initImg);

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

    function initImg(data: string) {
      const img = new Image();
      img.src = data;
      img.onload = function () {
        const width = img.width;
        const height = img.height;
        cretedCanvas(width, height);
        ctx?.drawImage(img, 0, 0, width, height);
        setText(width, height);
        const currentCanvas = document.getElementById('canvas') as HTMLCanvasElement | null;
        resolve(dataURLtoFile(currentCanvas!.toDataURL(file.type, config.ratio), file.name));
      };
    }

    function cretedCanvas(width: number, height: number) {
      canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
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

    function setText(width: number, height: number) {
      const txt = config.text;
      const param = calcParam(txt, width, height);
      if (!ctx) return;
      ctx.font = param.fontSize + 'px ' + config.fontFamily;
      ctx.fillStyle = config.color;
      ctx.globalAlpha = config.opacity / 100;
      ctx.fillText(txt, param.x, param.y);
    }

    function calcParam(txt: string, width: number, height: number) {
      let x;
      let y;

      const calcFontSize = config.fontSize / configDefault.width;
      const fontSize = calcFontSize * width;

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
      if (!ctx) {
        return { x: 0, y: 0, fontSize };
      }
      ctx.font = config.fontSize + 'px ' + config.fontFamily;
      const txtWidth = Number(ctx.measureText(txt).width);

      x = x - txtWidth;

      const calcPosX = x / configDefault.width;
      const calcPosY = y / configDefault.height;

      x = calcPosX * width;
      y = calcPosY * height;
      return {
        x,
        y,
        fontSize,
      };
    }

    function fileToBase64(rawFile: File, callback: (data: string) => void) {
      const reader = new FileReader();
      reader.readAsDataURL(rawFile);
      reader.onload = function (e) {
        callback(e.target?.result as string);
      };
    }
  });
}
