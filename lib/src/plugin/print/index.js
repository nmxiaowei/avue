/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_utils_print = require('../../utils/print.js');

const Print = function (dom, options) {
    if (!(this instanceof Print))
        return new Print(dom, options);
    this.options = this.extend({
        noPrint: '.no-print',
    }, options || {});
    if (typeof dom === 'string') {
        this.dom = document.querySelector(dom);
    }
    else {
        this.isDOM(dom);
        this.dom = this.isDOM(dom) ? dom : dom.$el;
    }
    this.init();
};
Print.prototype = {
    init: function () {
        try {
            const content = src_utils_print.buildTablePrintHtml(this.dom, this.options) || this.getStyle() + this.getHtml();
            this.writeIframe(content);
        }
        catch (error) {
            this.handleError(error);
        }
    },
    handleReady: function () {
        if (typeof this.options.onReady === 'function')
            this.options.onReady();
    },
    handleError: function (error) {
        if (typeof this.options.onError === 'function') {
            this.options.onError(error);
            return;
        }
        console.error(error);
    },
    extend: function (obj, obj2) {
        for (const k in obj2) {
            obj[k] = obj2[k];
        }
        return obj;
    },
    getStyle: function () {
        let str = '';
        const styles = document.querySelectorAll('style,link');
        for (let i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML;
        }
        str += `<style>${this.options.noPrint ? this.options.noPrint : '.no-print'}{display:none;}</style>`;
        return str;
    },
    getHtml: function () {
        const inputs = document.querySelectorAll('input');
        const textareas = document.querySelectorAll('textarea');
        const selects = document.querySelectorAll('select');
        for (let k = 0; k < inputs.length; k++) {
            const input = inputs[k];
            if (input.type == 'checkbox' || input.type == 'radio') {
                if (input.checked == true) {
                    input.setAttribute('checked', 'checked');
                }
                else {
                    input.removeAttribute('checked');
                }
            }
            else {
                input.setAttribute('value', input.value);
            }
        }
        for (let k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type == 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value;
            }
        }
        for (let k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type == 'select-one') {
                const child = selects[k3].children;
                for (const i in child) {
                    const option = child[i];
                    if (option && option.tagName == 'OPTION') {
                        if (option.selected == true) {
                            option.setAttribute('selected', 'selected');
                        }
                        else {
                            option.removeAttribute('selected');
                        }
                    }
                }
            }
        }
        return this.wrapperRefDom(this.dom).outerHTML;
    },
    wrapperRefDom: function (refDom) {
        let prevDom = null;
        let currDom = refDom;
        if (!this.isInBody(currDom))
            return currDom;
        while (currDom) {
            if (prevDom) {
                const element = currDom.cloneNode(false);
                element.appendChild(prevDom);
                prevDom = element;
            }
            else {
                prevDom = currDom.cloneNode(true);
            }
            currDom = currDom.parentElement;
        }
        return prevDom;
    },
    writeIframe: function (content) {
        let w;
        let doc;
        const iframe = document.createElement('iframe');
        const f = document.body.appendChild(iframe);
        let loaded = false;
        let failed = false;
        let loadTimer;
        iframe.id = 'myIframe';
        iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        const _this = this;
        iframe.onload = function () {
            if (loaded || failed)
                return;
            loaded = true;
            if (loadTimer !== undefined)
                window.clearTimeout(loadTimer);
            _this.waitForImages(doc, function () {
                _this.handleReady();
                _this.toPrint(w);
                setTimeout(function () {
                    if (iframe.parentNode)
                        iframe.parentNode.removeChild(iframe);
                }, 1000);
            });
        };
        iframe.onerror = function () {
            if (failed)
                return;
            failed = true;
            if (loadTimer !== undefined)
                window.clearTimeout(loadTimer);
            _this.handleError(new Error('打印内容加载失败'));
            if (iframe.parentNode)
                iframe.parentNode.removeChild(iframe);
        };
        doc.open();
        doc.write(content);
        doc.close();
        if (!loaded) {
            loadTimer = window.setTimeout(function () {
                if (loaded || failed)
                    return;
                failed = true;
                _this.handleError(new Error('打印内容加载超时'));
                if (iframe.parentNode)
                    iframe.parentNode.removeChild(iframe);
            }, 15000);
        }
    },
    waitForImages: function (doc, callback) {
        const images = Array.from(doc.images);
        if (images.length === 0) {
            callback();
            return;
        }
        let completed = 0;
        let finished = false;
        let timer;
        const finish = function () {
            if (finished)
                return;
            finished = true;
            if (timer !== undefined)
                window.clearTimeout(timer);
            callback();
        };
        const done = function () {
            completed++;
            if (completed === images.length)
                finish();
        };
        images.forEach((image) => {
            if (image.complete) {
                done();
            }
            else {
                image.addEventListener('load', done, { once: true });
                image.addEventListener('error', done, { once: true });
            }
        });
        if (!finished) {
            timer = window.setTimeout(finish, 10000);
        }
    },
    toPrint: function (frameWindow) {
        const _this = this;
        setTimeout(function () {
            try {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        frameWindow.print();
                    }
                }
                catch (_a) {
                    frameWindow.print();
                }
                frameWindow.close();
            }
            catch (error) {
                _this.handleError(error);
            }
        }, 10);
    },
    isInBody: function (node) {
        return node === document.body ? false : document.body.contains(node);
    },
    isDOM: typeof HTMLElement === 'object'
        ? function (obj) {
            return obj instanceof HTMLElement;
        }
        : function (obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        },
};

exports.default = Print;
