/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

const toCssSize = (value) => (typeof value === 'number' ? `${value}px` : value);

var script = src_core_create.default({
  name: 'iframe',
  emits: ['before-load', 'load', 'ready', 'error', 'timeout', 'reload', 'message'],
  props: {
    src: {
      type: String,
      default: '',
    },
    name: String,
    title: {
      type: String,
      default: '嵌入页面',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    loadingText: {
      type: String,
      default: '页面加载中...',
    },
    timeout: {
      type: Number,
      default: 0,
    },
    timeoutText: {
      type: String,
      default: '页面加载超时',
    },
    errorText: {
      type: String,
      default: '页面加载失败',
    },
  },
  data() {
    return {
      currentSrc: this.src,
      frameKey: 0,
      loading: false,
      loadError: null,
      isTimedOut: false,
      loadTimer: null,
      unmounted: false,
    };
  },
  computed: {
    hasSrc() {
      return Boolean(this.currentSrc);
    },
    styleName() {
      return {
        width: toCssSize(this.width),
        height: toCssSize(this.height),
      };
    },
  },
  watch: {
    src(value) {
      this.currentSrc = value || '';
      this.frameKey += 1;
      this.startLoading();
    },
    timeout() {
      if (this.loading) this.setLoadTimer();
    },
  },
  created() {
    this.startLoading();
  },
  mounted() {
    window.addEventListener('message', this.handleMessage);
  },
  beforeUnmount() {
    this.unmounted = true;
    this.clearLoadTimer();
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    startLoading() {
      this.clearLoadTimer();
      this.loadError = null;
      this.isTimedOut = false;
      this.loading = this.hasSrc;
      if (!this.hasSrc) return;

      this.$emit('before-load', this.getPayload());
      this.setLoadTimer();
    },
    setLoadTimer() {
      this.clearLoadTimer();
      if (!this.timeout || this.timeout < 1) return;

      this.loadTimer = window.setTimeout(() => {
        if (this.unmounted || !this.loading) return;
        this.loading = false;
        this.isTimedOut = true;
        this.$emit('timeout', {
          ...this.getPayload(),
          timeout: this.timeout,
        });
      }, this.timeout);
    },
    clearLoadTimer() {
      if (this.loadTimer !== null) window.clearTimeout(this.loadTimer);
      this.loadTimer = null;
    },
    handleLoad() {
      if (this.unmounted) return;
      this.clearLoadTimer();
      this.loading = false;
      this.loadError = null;
      this.isTimedOut = false;
      const payload = this.getPayload();
      this.$emit('load', payload);
      this.$emit('ready', payload);
    },
    handleError(event) {
      if (this.unmounted) return;
      this.clearLoadTimer();
      this.loading = false;
      this.isTimedOut = false;
      this.loadError = event;
      this.$emit('error', {
        ...this.getPayload(),
        error: event,
      });
    },
    handleMessage(event) {
      const frameWindow = this.getWindow();
      if (!frameWindow || event.source !== frameWindow) return;
      this.$emit('message', {
        data: event.data,
        origin: event.origin,
        source: event.source,
      });
    },
    getPayload() {
      return {
        src: this.currentSrc,
        iframe: this.getIframe(),
        window: this.getWindow(),
      };
    },
    getIframe() {
      return this.$refs.iframe || null;
    },
    getWindow() {
      const iframe = this.getIframe();
      return iframe ? iframe.contentWindow : null;
    },
    reload() {
      if (!this.hasSrc) return false;
      this.frameKey += 1;
      this.startLoading();
      this.$emit('reload', this.getPayload());
      return true;
    },
    focus() {
      const frameWindow = this.getWindow();
      if (!frameWindow) return false;
      frameWindow.focus();
      return true;
    },
    postMessage(data, targetOrigin = '*', transfer) {
      const frameWindow = this.getWindow();
      if (!frameWindow) return false;
      if (transfer) {
        frameWindow.postMessage(data, targetOrigin, transfer);
      } else {
        frameWindow.postMessage(data, targetOrigin);
      }
      return true;
    },
  },
});

exports.default = script;
