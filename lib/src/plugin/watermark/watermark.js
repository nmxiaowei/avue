/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_utils_util = require('../../utils/util.js');

class WaterMark {
    constructor(opt = {}) {
        this.CONTAINERID = src_utils_util.randomId();
        this.drawCanvas = this.drawCanvas.bind(this);
        this.parentObserver = this.parentObserver.bind(this);
        this.Repaint = this.Repaint.bind(this);
        this.styleStr = '';
        this.isOberserve = false;
        this.init(opt);
        this.drawCanvas();
        this.parentObserver();
    }
    init(opt) {
        this.option = Object.assign({
            width: 400,
            height: 200,
            text: 'avueJS',
            fontSize: '30px',
            fontStyle: 'microsoft yahei',
            textAlign: 'center',
            color: 'rgba(100,100,100,0.15)',
            degree: -20,
        }, opt);
    }
    drawCanvas() {
        this.isOberserve = true;
        const divContainer = document.createElement('div');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        divContainer.id = this.CONTAINERID;
        canvas.width = this.option.width;
        canvas.height = this.option.height;
        if (!context)
            return;
        context.font = `${this.option.fontSize} ${this.option.fontStyle}`;
        context.textAlign = this.option.textAlign;
        context.fillStyle = this.option.color;
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((this.option.degree * Math.PI) / 180);
        context.fillText(this.option.text, 0, 0);
        const backgroundUrl = canvas.toDataURL('image/png');
        const flag = this.option.id;
        let el = null;
        if (flag)
            el = document.getElementById(flag);
        this.styleStr = `
      position:${flag ? 'absolute' : 'fixed'};
      top:0;
      left:0;
      width:${flag && el ? el.offsetWidth + 'px' : '100%'};
      height:${flag && el ? el.offsetHeight + 'px' : '100%'};
      z-index:9999;
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${backgroundUrl}')`;
        divContainer.setAttribute('style', this.styleStr);
        if (flag && el) {
            el.appendChild(divContainer);
        }
        else {
            document.body.appendChild(divContainer);
        }
        this.wmObserver(divContainer);
        this.isOberserve = false;
    }
    wmObserver(divContainer) {
        const wmConf = { attributes: true, childList: true, characterData: true };
        const wmObserver = new MutationObserver((mo) => {
            if (!this.isOberserve) {
                const target = mo[0].target;
                target.setAttribute('style', this.styleStr);
                target.setAttribute('id', this.CONTAINERID);
                wmObserver.takeRecords();
            }
        });
        wmObserver.observe(divContainer, wmConf);
    }
    parentObserver() {
        var _a;
        const bodyObserver = new MutationObserver(() => {
            if (!this.isOberserve) {
                const wm = document.querySelector(`#${this.CONTAINERID}`);
                if (!wm) {
                    this.drawCanvas();
                }
                else if (wm.getAttribute('style') !== this.styleStr) {
                    wm.setAttribute('style', this.styleStr);
                }
            }
        });
        const parentNode = (_a = document.querySelector(`#${this.CONTAINERID}`)) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (parentNode) {
            bodyObserver.observe(parentNode, { childList: true });
        }
    }
    Repaint(opt = {}) {
        this.remove();
        this.init(opt);
        this.drawCanvas();
    }
    remove() {
        var _a;
        this.isOberserve = true;
        const wm = document.querySelector(`#${this.CONTAINERID}`);
        (_a = wm === null || wm === void 0 ? void 0 : wm.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(wm);
    }
}

exports.default = WaterMark;
