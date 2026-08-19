/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_utils_util = require('../../utils/util.js');

const defaultOption = {
    width: 400,
    height: 200,
    text: 'avueJS',
    fontSize: '30px',
    fontStyle: 'Microsoft YaHei, sans-serif',
    textAlign: 'center',
    color: 'rgba(100,100,100,0.15)',
    degree: -20,
    zIndex: 9999,
    id: ''
};
class WaterMark {
    constructor(opt = {}) {
        this.styleStr = '';
        this.isOberserve = false;
        this.container = null;
        this.parent = null;
        this.overlayObserver = null;
        this.parentObserver = null;
        this.parentOriginalPosition = null;
        this.removed = false;
        this.CONTAINERID = `avue-watermark-${src_utils_util.randomId()}`;
        this.option = { ...defaultOption, ...opt };
        if (typeof document !== 'undefined')
            this.drawCanvas();
    }
    getParent() {
        const target = this.option.id;
        if (!target)
            return document.body;
        if (target instanceof HTMLElement)
            return target;
        return document.getElementById(String(target)) || document.body;
    }
    getBackgroundUrl() {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Number(this.option.width) || defaultOption.width);
        canvas.height = Math.max(1, Number(this.option.height) || defaultOption.height);
        const context = canvas.getContext('2d');
        if (!context)
            return '';
        context.font = `${this.option.fontSize} ${this.option.fontStyle}`;
        context.textAlign = this.option.textAlign;
        context.textBaseline = 'middle';
        context.fillStyle = this.option.color;
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((Number(this.option.degree) * Math.PI) / 180);
        context.fillText(String(this.option.text || ''), 0, 0);
        return canvas.toDataURL('image/png');
    }
    getStyle(parent, backgroundUrl) {
        const local = Boolean(this.option.id) && parent !== document.body;
        return [
            `position:${local ? 'absolute' : 'fixed'}`,
            'inset:0',
            'display:block',
            'overflow:hidden',
            `z-index:${Number(this.option.zIndex) || defaultOption.zIndex}`,
            'pointer-events:none',
            'user-select:none',
            `background-repeat:repeat`,
            `background-size:${Math.max(1, Number(this.option.width) || defaultOption.width)}px ${Math.max(1, Number(this.option.height) || defaultOption.height)}px`,
            `background-image:url("${backgroundUrl}")`
        ].join(';');
    }
    prepareParent(parent) {
        if (!this.option.id || parent === document.body || typeof window === 'undefined')
            return;
        if (window.getComputedStyle(parent).position === 'static') {
            this.parentOriginalPosition = parent.style.position;
            parent.style.position = 'relative';
        }
    }
    observe() {
        this.disconnectObservers();
        if (!this.container || !this.parent || typeof MutationObserver === 'undefined')
            return;
        this.overlayObserver = new MutationObserver(() => {
            if (this.isOberserve || !this.container)
                return;
            this.isOberserve = true;
            if (this.container.id !== this.CONTAINERID)
                this.container.id = this.CONTAINERID;
            if (this.container.getAttribute('style') !== this.styleStr) {
                this.container.setAttribute('style', this.styleStr);
            }
            this.isOberserve = false;
        });
        this.overlayObserver.observe(this.container, { attributes: true, attributeFilter: ['id', 'style'] });
        this.parentObserver = new MutationObserver(() => {
            var _a;
            if (!this.isOberserve && this.container && !((_a = this.parent) === null || _a === void 0 ? void 0 : _a.contains(this.container)))
                this.drawCanvas();
        });
        this.parentObserver.observe(this.parent, { childList: true });
    }
    disconnectObservers() {
        var _a, _b;
        (_a = this.overlayObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.parentObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        this.overlayObserver = null;
        this.parentObserver = null;
    }
    restoreParentPosition() {
        if (this.parent && this.parentOriginalPosition !== null && this.parent.style.position === 'relative') {
            this.parent.style.position = this.parentOriginalPosition;
        }
        this.parentOriginalPosition = null;
    }
    drawCanvas() {
        var _a;
        if (typeof document === 'undefined')
            return;
        this.removed = false;
        this.isOberserve = true;
        this.disconnectObservers();
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        this.restoreParentPosition();
        const parent = this.getParent();
        this.prepareParent(parent);
        const container = document.createElement('div');
        container.id = this.CONTAINERID;
        container.className = 'avue-watermark';
        container.setAttribute('aria-hidden', 'true');
        this.styleStr = this.getStyle(parent, this.getBackgroundUrl());
        container.setAttribute('style', this.styleStr);
        parent.appendChild(container);
        this.container = container;
        this.parent = parent;
        this.isOberserve = false;
        this.observe();
    }
    Repaint(opt = {}) {
        this.option = { ...this.option, ...opt };
        this.drawCanvas();
        return this;
    }
    remove() {
        var _a;
        this.removed = true;
        this.isOberserve = true;
        this.disconnectObservers();
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        this.restoreParentPosition();
        this.container = null;
        this.parent = null;
        this.isOberserve = false;
    }
}

exports.default = WaterMark;
