import packages from 'core/packages';
import { downFile } from 'utils/util';

export interface ScreenshotOption {
  download?: boolean;
  filename?: string;
  type?: string;
  quality?: number;
  onSuccess?: (canvas: HTMLCanvasElement) => void;
  onError?: (error: Error) => void;
  [key: string]: any;
}

export default function (doc: HTMLElement, option: ScreenshotOption = {}) {
  if (typeof window === 'undefined' || typeof HTMLElement === 'undefined' || !(doc instanceof HTMLElement)) {
    return Promise.reject(new TypeError('请传入需要截图的 DOM 节点。'));
  }
  const renderer = option.renderer || (window as any).html2canvas;
  if (typeof renderer !== 'function') {
    packages.logs('Screenshot');
    const error = new Error('未检测到 html2canvas，请先引入 html2canvas。');
    option.onError?.(error);
    return Promise.reject(error);
  }

  const {
    download,
    filename = `screenshot-${Date.now()}.png`,
    type = 'image/png',
    quality,
    onSuccess,
    onError,
    renderer: _renderer,
    ...rendererOption
  } = option;

  return Promise.resolve(renderer(doc, rendererOption))
    .then((canvas: HTMLCanvasElement) => {
      if (!(canvas instanceof HTMLCanvasElement)) throw new Error('截图插件未返回 Canvas。');
      if (download) downFile(canvas.toDataURL(type, quality), filename);
      onSuccess?.(canvas);
      return canvas;
    })
    .catch((error: unknown) => {
      const normalized = error instanceof Error ? error : new Error(String(error || '截图失败。'));
      onError?.(normalized);
      throw normalized;
    });
}
