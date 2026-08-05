/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var qrcode = require('../../../node_modules/.pnpm/qrcode-generator@2.0.4/node_modules/qrcode-generator/dist/qrcode.js');

const QUIET_ZONE_SIZE = 4;

qrcode.default.stringToBytes = (value) => {
  if (typeof TextEncoder !== 'undefined') {
    return Array.from(new TextEncoder().encode(value));
  }

  const bytes = [];
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    } else {
      index += 1;
      const surrogate = value.charCodeAt(index);
      const point = 0x10000 + (((code & 0x3ff) << 10) | (surrogate & 0x3ff));
      bytes.push(
        0xf0 | (point >> 18),
        0x80 | ((point >> 12) & 0x3f),
        0x80 | ((point >> 6) & 0x3f),
        0x80 | (point & 0x3f),
      );
    }
  }
  return bytes;
};

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };
    return entities[character];
  });
}

var script = src_core_create.default({
  name: 'qrcode',
  emits: ['refresh', 'error', 'icon-error'],
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'canvas',
      validator: (value) => ['canvas', 'svg'].includes(value),
    },
    icon: String,
    size: {
      type: Number,
      default: 160,
    },
    iconSize: {
      type: Number,
      default: 40,
    },
    color: {
      type: String,
      default: '#000',
    },
    bgColor: {
      type: String,
      default: 'transparent',
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    errorLevel: {
      type: String,
      default: 'M',
      validator: (value) => ['L', 'M', 'Q', 'H'].includes(value),
    },
    status: {
      type: String,
      default: 'active',
      validator: (value) => ['active', 'expired', 'loading', 'scanned'].includes(value),
    },
  },
  data() {
    return {
      qrcode: null,
      errorMessage: '',
      renderSequence: 0,
    };
  },
  computed: {
    displaySize() {
      return Math.max(1, Number(this.size) || 160);
    },
    displayIconSize() {
      return Math.min(Math.max(0, Number(this.iconSize) || 0), this.displaySize / 2);
    },
    styleName() {
      return {
        width: `${this.displaySize}px`,
        height: `${this.displaySize}px`,
        backgroundColor: this.bgColor,
      };
    },
    svgContent() {
      if (!this.qrcode) return '';

      const moduleCount = this.qrcode.getModuleCount();
      const totalSize = moduleCount + QUIET_ZONE_SIZE * 2;
      let path = '';

      for (let row = 0; row < moduleCount; row += 1) {
        for (let column = 0; column < moduleCount; column += 1) {
          if (this.qrcode.isDark(row, column)) {
            path += `M${column + QUIET_ZONE_SIZE} ${row + QUIET_ZONE_SIZE}h1v1h-1z`;
          }
        }
      }

      let icon = '';
      if (this.icon && this.displayIconSize > 0) {
        const iconSize = (this.displayIconSize / this.displaySize) * totalSize;
        const iconPadding = Math.max(totalSize * 0.025, 0.5);
        const backgroundSize = iconSize + iconPadding * 2;
        const position = (totalSize - backgroundSize) / 2;
        const iconPosition = position + iconPadding;
        const background = this.bgColor === 'transparent' ? '#fff' : this.bgColor;
        icon = `<rect x="${position}" y="${position}" width="${backgroundSize}" height="${backgroundSize}" fill="${escapeXml(background)}"/><image x="${iconPosition}" y="${iconPosition}" width="${iconSize}" height="${iconSize}" href="${escapeXml(this.icon)}" preserveAspectRatio="xMidYMid meet"/>`;
      }

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="${escapeXml(this.bgColor)}"/><path d="${path}" fill="${escapeXml(this.color)}"/>${icon}</svg>`;
    },
  },
  watch: {
    value() {
      this.updateQRCode();
    },
    errorLevel() {
      this.updateQRCode();
    },
    type() {
      this.scheduleCanvasRender();
    },
    size() {
      this.scheduleCanvasRender();
    },
    icon() {
      this.scheduleCanvasRender();
    },
    iconSize() {
      this.scheduleCanvasRender();
    },
    color() {
      this.scheduleCanvasRender();
    },
    bgColor() {
      this.scheduleCanvasRender();
    },
  },
  created() {
    this.updateQRCode();
  },
  mounted() {
    this.scheduleCanvasRender();
  },
  beforeUnmount() {
    this.renderSequence += 1;
  },
  methods: {
    updateQRCode() {
      try {
        const instance = qrcode.default(0, this.errorLevel);
        instance.addData(this.value || '');
        instance.make();
        this.qrcode = instance;
        this.errorMessage = '';
      } catch (error) {
        this.qrcode = null;
        this.errorMessage = '二维码内容过长，请缩短内容后重试';
        this.$emit('error', error);
      }
      this.scheduleCanvasRender();
    },
    scheduleCanvasRender() {
      if (this.type !== 'canvas') return;
      this.$nextTick(() => this.renderCanvas());
    },
    renderCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas || !this.qrcode) return;

      const renderSequence = this.renderSequence + 1;
      this.renderSequence = renderSequence;
      const devicePixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
      const width = Math.round(this.displaySize * devicePixelRatio);
      canvas.width = width;
      canvas.height = width;
      const context = canvas.getContext('2d');
      const scale = width / this.displaySize;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, this.displaySize, this.displaySize);
      context.fillStyle = this.bgColor;
      context.fillRect(0, 0, this.displaySize, this.displaySize);

      const moduleCount = this.qrcode.getModuleCount();
      const cellSize = this.displaySize / (moduleCount + QUIET_ZONE_SIZE * 2);
      context.fillStyle = this.color;
      for (let row = 0; row < moduleCount; row += 1) {
        for (let column = 0; column < moduleCount; column += 1) {
          if (!this.qrcode.isDark(row, column)) continue;
          const left = Math.round((column + QUIET_ZONE_SIZE) * cellSize);
          const top = Math.round((row + QUIET_ZONE_SIZE) * cellSize);
          const right = Math.round((column + QUIET_ZONE_SIZE + 1) * cellSize);
          const bottom = Math.round((row + QUIET_ZONE_SIZE + 1) * cellSize);
          context.fillRect(left, top, right - left, bottom - top);
        }
      }

      this.renderCanvasIcon(context, renderSequence);
    },
    renderCanvasIcon(context, renderSequence) {
      if (!this.icon || !this.displayIconSize) return;

      const image = new Image();
      image.onload = () => {
        if (renderSequence !== this.renderSequence) return;
        const iconPadding = Math.max(this.displaySize * 0.025, 2);
        const backgroundSize = this.displayIconSize + iconPadding * 2;
        const position = (this.displaySize - backgroundSize) / 2;
        context.fillStyle = this.bgColor === 'transparent' ? '#fff' : this.bgColor;
        context.fillRect(position, position, backgroundSize, backgroundSize);
        context.drawImage(
          image,
          position + iconPadding,
          position + iconPadding,
          this.displayIconSize,
          this.displayIconSize,
        );
      };
      image.onerror = () => {
        if (renderSequence === this.renderSequence) this.$emit('icon-error');
      };
      image.src = this.icon;
    },
    refresh() {
      this.$emit('refresh');
    },
    async toDataURL(type = 'image/png', quality) {
      await this.$nextTick();
      if (this.type === 'svg') {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.svgContent)}`;
      }
      const canvas = this.$refs.canvas;
      if (!canvas) throw new Error('二维码画布尚未初始化');
      return canvas.toDataURL(type, quality);
    },
  },
});

exports.default = script;
