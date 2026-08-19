/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { buildTablePrintHtml } from '../../utils/print.mjs';

const toAbsoluteUrl = (value) => {
    try {
        return new URL(value, document.baseURI).href;
    }
    catch (_a) {
        return value;
    }
};
class PrintInstance {
    constructor(dom, options = {}) {
        this.iframe = null;
        this.options = {
            noPrint: '.no-print',
            timeout: 15000,
            ...options
        };
        this.dom = this.resolveDom(dom);
        this.init();
    }
    resolveDom(dom) {
        const element = typeof dom === 'string'
            ? document.querySelector(dom)
            : dom instanceof HTMLElement ? dom : dom === null || dom === void 0 ? void 0 : dom.$el;
        if (!(element instanceof HTMLElement))
            throw new TypeError('未找到可打印的 DOM 节点。');
        return element;
    }
    init() {
        try {
            const content = buildTablePrintHtml(this.dom, this.options) || this.getDocumentHtml();
            this.writeIframe(content);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        const normalized = error instanceof Error ? error : new Error(String(error || '打印失败。'));
        if (typeof this.options.onError === 'function')
            this.options.onError(normalized);
        else
            console.error(normalized);
    }
    getStyle() {
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map((style) => style.outerHTML)
            .join('');
        const noPrint = this.options.noPrint || '.no-print';
        return `${styles}<style>
      ${noPrint}{display:none !important;}
      html,body{min-height:auto !important;background:#fff !important;}
      @media print{.avue-print-root{margin:0 !important;}}
    </style>`;
    }
    syncFormState(source, clone) {
        const sourceFields = Array.from(source.querySelectorAll('input, textarea, select'));
        const cloneFields = Array.from(clone.querySelectorAll('input, textarea, select'));
        sourceFields.forEach((field, index) => {
            const cloned = cloneFields[index];
            if (!cloned)
                return;
            if (field instanceof HTMLInputElement && cloned instanceof HTMLInputElement) {
                if (field.type === 'checkbox' || field.type === 'radio')
                    cloned.checked = field.checked;
                else
                    cloned.value = field.value;
            }
            else if (field instanceof HTMLTextAreaElement && cloned instanceof HTMLTextAreaElement) {
                cloned.value = field.value;
                cloned.textContent = field.value;
            }
            else if (field instanceof HTMLSelectElement && cloned instanceof HTMLSelectElement) {
                cloned.selectedIndex = field.selectedIndex;
                Array.from(cloned.options).forEach((option, optionIndex) => {
                    var _a;
                    option.selected = ((_a = field.options[optionIndex]) === null || _a === void 0 ? void 0 : _a.selected) || false;
                });
            }
        });
    }
    sanitizeClone(clone) {
        const noPrint = this.options.noPrint;
        if (noPrint) {
            try {
                clone.querySelectorAll(noPrint).forEach((element) => element.remove());
            }
            catch (_a) {
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
            if (source)
                image.setAttribute('src', toAbsoluteUrl(source));
            image.removeAttribute('srcset');
        });
        clone.querySelectorAll('a').forEach((link) => {
            link.removeAttribute('target');
            const href = link.getAttribute('href');
            if (href)
                link.setAttribute('href', toAbsoluteUrl(href));
        });
    }
    getDocumentHtml() {
        const clone = this.dom.cloneNode(true);
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
    writeIframe(content) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('title', '打印预览');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.setAttribute('style', 'position:fixed;width:1px;height:1px;right:0;bottom:0;border:0;opacity:0;pointer-events:none;');
        this.iframe = iframe;
        let settled = false;
        const cleanup = () => {
            if (!this.iframe)
                return;
            this.iframe.remove();
            this.iframe = null;
        };
        const fail = (error) => {
            if (settled)
                return;
            settled = true;
            cleanup();
            this.handleError(error);
        };
        const timer = window.setTimeout(() => fail(new Error('打印内容加载超时。')), Number(this.options.timeout) || 15000);
        iframe.onload = () => {
            if (settled)
                return;
            const frameWindow = iframe.contentWindow;
            const frameDocument = iframe.contentDocument;
            if (!frameWindow || !frameDocument) {
                fail(new Error('无法创建打印窗口。'));
                return;
            }
            this.waitForAssets(frameDocument, () => {
                var _a, _b, _c, _d;
                if (settled)
                    return;
                settled = true;
                window.clearTimeout(timer);
                try {
                    (_b = (_a = this.options).onReady) === null || _b === void 0 ? void 0 : _b.call(_a);
                    (_d = (_c = this.options).onBeforePrint) === null || _d === void 0 ? void 0 : _d.call(_c);
                    let printFinished = false;
                    const afterPrint = () => {
                        var _a, _b;
                        if (printFinished)
                            return;
                        printFinished = true;
                        cleanup();
                        (_b = (_a = this.options).onAfterPrint) === null || _b === void 0 ? void 0 : _b.call(_a);
                    };
                    frameWindow.addEventListener('afterprint', afterPrint, { once: true });
                    frameWindow.focus();
                    frameWindow.print();
                    window.setTimeout(afterPrint, 60000);
                }
                catch (error) {
                    cleanup();
                    this.handleError(error);
                }
            });
        };
        iframe.onerror = () => fail(new Error('打印内容加载失败。'));
        iframe.srcdoc = content;
        document.body.appendChild(iframe);
    }
    waitForAssets(doc, done) {
        var _a;
        const images = Array.from(doc.images);
        const fonts = (_a = doc.fonts) === null || _a === void 0 ? void 0 : _a.ready;
        const finish = () => Promise.resolve(fonts).catch(() => undefined).then(done);
        if (!images.length) {
            finish();
            return;
        }
        let completed = 0;
        const complete = () => {
            completed += 1;
            if (completed === images.length)
                finish();
        };
        images.forEach((image) => {
            if (image.complete)
                complete();
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
function Print(dom, options = {}) {
    return new PrintInstance(dom, options);
}

export { Print as default };
