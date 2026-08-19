/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import WaterMark from './watermark.mjs';
import { dataURLtoFile } from '../../utils/util.mjs';

const detailDefault = {
    text: 'avueJS',
    fontFamily: 'Microsoft YaHei, sans-serif',
    color: '#999999',
    fontSize: 16,
    opacity: 100,
    bottom: 10,
    right: 10,
    ratio: 0.92,
    scaleWithImage: true
};
function $Watermark (opt = {}) {
    return new WaterMark(opt);
}
const loadFileImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('图片读取失败。'));
        reader.onload = () => {
            const image = new Image();
            image.onerror = () => reject(new Error('图片解析失败。'));
            image.onload = () => resolve(image);
            image.src = String(reader.result || '');
        };
        reader.readAsDataURL(file);
    });
};
/**
 * 为图片生成水印文件。每次调用使用独立 Canvas，避免并发任务互相覆盖。
 */
async function detailImg(file, option = {}) {
    if (typeof File === 'undefined' || !(file instanceof File))
        throw new TypeError('请传入有效的图片文件。');
    if (!file.type.startsWith('image/'))
        throw new TypeError('仅支持图片文件添加水印。');
    const config = { ...detailDefault, ...option };
    const image = await loadFileImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const context = canvas.getContext('2d');
    if (!context)
        throw new Error('当前浏览器不支持 Canvas。');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const scale = config.scaleWithImage ? canvas.width / 200 : 1;
    const fontSize = Math.max(1, Number(config.fontSize) * scale);
    const ratio = Math.min(1, Math.max(0, Number(config.ratio) || detailDefault.ratio));
    const opacity = Math.min(1, Math.max(0, Number(config.opacity) / 100));
    context.save();
    context.font = `${fontSize}px ${config.fontFamily}`;
    context.fillStyle = config.color;
    context.globalAlpha = opacity;
    context.textBaseline = 'alphabetic';
    const text = String(config.text || '');
    const textWidth = context.measureText(text).width;
    const hasLeft = option.left !== undefined && option.left !== null;
    const hasTop = option.top !== undefined && option.top !== null;
    const x = hasLeft
        ? Number(option.left) * scale
        : canvas.width - Number(config.right) * scale - textWidth;
    const y = hasTop
        ? Number(option.top) * scale + fontSize
        : canvas.height - Number(config.bottom) * scale;
    context.fillText(text, x, y);
    context.restore();
    const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    return dataURLtoFile(canvas.toDataURL(type, ratio), file.name);
}

export { $Watermark as default, detailImg };
