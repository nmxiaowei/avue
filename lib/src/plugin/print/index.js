/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Print = function (dom, options) {
    if (!(this instanceof Print))
        return new Print(dom, options);
    this.options = this.extend({
        noPrint: '.no-print',
    }, options);
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
        const content = this.getStyle() + this.getHtml();
        this.writeIframe(content);
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
        iframe.id = 'myIframe';
        iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
        const _this = this;
        iframe.onload = function () {
            _this.toPrint(w);
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 100);
        };
    },
    toPrint: function (frameWindow) {
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        frameWindow.print();
                    }
                }
                catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        }
        catch (err) {
            console.log('err', err);
        }
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
