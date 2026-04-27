/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import WaterMark from './watermark.mjs';
import { dataURLtoFile } from '../../utils/util.mjs';

let canvas;
let ctx;
const configDefault = {
    width: 200,
    height: 200,
};
const config = {
    text: 'avueJS',
    fontFamily: 'microsoft yahei',
    color: '#999',
    fontSize: 16,
    opacity: 100,
    bottom: 10,
    right: 10,
    ratio: 1,
};
function $Watermark (opt = {}) {
    return new WaterMark(opt);
}
function detailImg(file, option = {}) {
    return new Promise((resolve) => {
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
        function initImg(data) {
            const img = new Image();
            img.src = data;
            img.onload = function () {
                const width = img.width;
                const height = img.height;
                cretedCanvas(width, height);
                ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
                setText(width, height);
                const currentCanvas = document.getElementById('canvas');
                resolve(dataURLtoFile(currentCanvas.toDataURL(file.type, config.ratio), file.name));
            };
        }
        function cretedCanvas(width, height) {
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
        function setText(width, height) {
            const txt = config.text;
            const param = calcParam(txt, width, height);
            if (!ctx)
                return;
            ctx.font = param.fontSize + 'px ' + config.fontFamily;
            ctx.fillStyle = config.color;
            ctx.globalAlpha = config.opacity / 100;
            ctx.fillText(txt, param.x, param.y);
        }
        function calcParam(txt, width, height) {
            let x;
            let y;
            const calcFontSize = config.fontSize / configDefault.width;
            const fontSize = calcFontSize * width;
            if (config.bottom) {
                y = configDefault.height - config.bottom;
            }
            else {
                y = config.top;
            }
            if (config.right) {
                x = configDefault.width - config.right;
            }
            else {
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
        function fileToBase64(rawFile, callback) {
            const reader = new FileReader();
            reader.readAsDataURL(rawFile);
            reader.onload = function (e) {
                var _a;
                callback((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
        }
    });
}

export { $Watermark as default, detailImg };
