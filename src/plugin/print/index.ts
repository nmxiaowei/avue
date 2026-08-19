import { buildTablePrintHtml } from 'utils/print';

interface PrintOptions {
  noPrint?: string;
  documentTitle?: string;
  title?: string;
  timeout?: number;
  onReady?: () => void;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  onError?: (error: Error) => void;
  [key: string]: any;
}

const toAbsoluteUrl = (value: string) => {
  try {
    return new URL(value, document.baseURI).href;
  } catch {
    return value;
  }
};

class PrintInstance {
  dom: HTMLElement;
  options: PrintOptions;
  iframe: HTMLIFrameElement | null = null;

  constructor(dom: any, options: PrintOptions = {}) {
    this.options = {
      noPrint: '.no-print',
      timeout: 15000,
      ...options
    };
    this.dom = this.resolveDom(dom);
    this.init();
  }

  resolveDom(dom: any) {
    const element = typeof dom === 'string'
      ? document.querySelector<HTMLElement>(dom)
      : dom instanceof HTMLElement ? dom : dom?.$el;
    if (!(element instanceof HTMLElement)) throw new TypeError('未找到可打印的 DOM 节点。');
    return element;
  }

  init() {
    try {
      const content = buildTablePrintHtml(this.dom, this.options) || this.getDocumentHtml();
      this.writeIframe(content);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown) {
    const normalized = error instanceof Error ? error : new Error(String(error || '打印失败。'));
    if (typeof this.options.onError === 'function') this.options.onError(normalized);
    else console.error(normalized);
  }

  getStyle() {
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((style) => (style as HTMLElement).outerHTML)
      .join('');
    const noPrint = this.options.noPrint || '.no-print';
    return `${styles}<style>
      ${noPrint}{display:none !important;}
      html,body{min-height:auto !important;background:#fff !important;}
      @media print{.avue-print-root{margin:0 !important;}}
    </style>`;
  }

  syncFormState(source: HTMLElement, clone: HTMLElement) {
    const sourceFields = Array.from(source.querySelectorAll('input, textarea, select'));
    const cloneFields = Array.from(clone.querySelectorAll('input, textarea, select'));
    sourceFields.forEach((field, index) => {
      const cloned = cloneFields[index];
      if (!cloned) return;
      if (field instanceof HTMLInputElement && cloned instanceof HTMLInputElement) {
        if (field.type === 'checkbox' || field.type === 'radio') cloned.checked = field.checked;
        else cloned.value = field.value;
      } else if (field instanceof HTMLTextAreaElement && cloned instanceof HTMLTextAreaElement) {
        cloned.value = field.value;
        cloned.textContent = field.value;
      } else if (field instanceof HTMLSelectElement && cloned instanceof HTMLSelectElement) {
        cloned.selectedIndex = field.selectedIndex;
        Array.from(cloned.options).forEach((option, optionIndex) => {
          option.selected = field.options[optionIndex]?.selected || false;
        });
      }
    });
  }

  sanitizeClone(clone: HTMLElement) {
    const noPrint = this.options.noPrint;
    if (noPrint) {
      try {
        clone.querySelectorAll(noPrint).forEach((element) => element.remove());
      } catch {
        // 自定义选择器无效时不影响正常打印。
      }
    }
    clone.querySelectorAll('script, noscript, style, [data-print-ignore="true"]').forEach((element) => element.remove());
    clone.querySelectorAll('*').forEach((element) => {
      Array.from(element.attributes)
        .filter((attribute) => attribute.name.toLowerCase().startsWith('on'))
        .forEach((attribute) => element.removeAttribute(attribute.name));
    });
    clone.querySelectorAll('img').forEach((image) => {
      const source = image.currentSrc || image.getAttribute('src');
      if (source) image.setAttribute('src', toAbsoluteUrl(source));
      image.removeAttribute('srcset');
    });
    clone.querySelectorAll('a').forEach((link) => {
      link.removeAttribute('target');
      const href = link.getAttribute('href');
      if (href) link.setAttribute('href', toAbsoluteUrl(href));
    });
  }

  getDocumentHtml() {
    const clone = this.dom.cloneNode(true) as HTMLElement;
    this.syncFormState(this.dom, clone);
    this.sanitizeClone(clone);
    const title = this.options.documentTitle || document.title || '打印预览';
    return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <base href="${document.baseURI}" />
    <title>${title}</title>
    ${this.getStyle()}
  </head>
  <body><main class="avue-print-root">${clone.outerHTML}</main></body>
</html>`;
  }

  writeIframe(content: string) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', '打印预览');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('style', 'position:fixed;width:1px;height:1px;right:0;bottom:0;border:0;opacity:0;pointer-events:none;');
    this.iframe = iframe;
    let settled = false;
    const cleanup = () => {
      if (!this.iframe) return;
      this.iframe.remove();
      this.iframe = null;
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      this.handleError(error);
    };
    const timer = window.setTimeout(() => fail(new Error('打印内容加载超时。')), Number(this.options.timeout) || 15000);
    iframe.onload = () => {
      if (settled) return;
      const frameWindow = iframe.contentWindow;
      const frameDocument = iframe.contentDocument;
      if (!frameWindow || !frameDocument) {
        fail(new Error('无法创建打印窗口。'));
        return;
      }
      this.waitForAssets(frameDocument, () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        try {
          this.options.onReady?.();
          this.options.onBeforePrint?.();
          let printFinished = false;
          const afterPrint = () => {
            if (printFinished) return;
            printFinished = true;
            cleanup();
            this.options.onAfterPrint?.();
          };
          frameWindow.addEventListener('afterprint', afterPrint, { once: true });
          frameWindow.focus();
          frameWindow.print();
          window.setTimeout(afterPrint, 60000);
        } catch (error) {
          cleanup();
          this.handleError(error);
        }
      });
    };
    iframe.onerror = () => fail(new Error('打印内容加载失败。'));
    iframe.srcdoc = content;
    document.body.appendChild(iframe);
  }

  waitForAssets(doc: Document, done: () => void) {
    const images = Array.from(doc.images);
    const fonts = (doc as any).fonts?.ready;
    const finish = () => Promise.resolve(fonts).catch(() => undefined).then(done);
    if (!images.length) {
      finish();
      return;
    }
    let completed = 0;
    const complete = () => {
      completed += 1;
      if (completed === images.length) finish();
    };
    images.forEach((image) => {
      if (image.complete) complete();
      else {
        image.addEventListener('load', complete, { once: true });
        image.addEventListener('error', complete, { once: true });
      }
    });
  }
}

/**
 * 保持 $Print(dom, options) 与 new $Print(dom, options) 两种历史调用方式。
 */
function Print(dom: any, options: PrintOptions = {}) {
  return new PrintInstance(dom, options);
}

export default Print;
