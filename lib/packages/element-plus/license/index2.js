/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_utils_util = require('../../../src/utils/util.js');

var script = src_core_create.default({
  name: "license",
  emits: ["ready", "change", "error", "asset-error", "download"],
  props: {
    id: {
      type: [String, Number],
      default: ""
    },
    option: {
      type: Object,
      default: () => ({})
    },
    showStatus: Boolean
  },
  data() {
    return {
      base64: "",
      draw: false,
      canvas: null,
      context: null,
      loading: false,
      error: "",
      renderVersion: 0,
      renderPromise: Promise.resolve(null)
    };
  },
  computed: {
    img() {
      return this.option.img;
    },
    list() {
      return Array.isArray(this.option.list) ? this.option.list : [];
    },
    mimeType() {
      return this.option.mimeType || this.option.type || "image/jpeg";
    },
    imageQuality() {
      const quality = Number(this.option.quality);
      return Number.isFinite(quality) ? Math.min(1, Math.max(0, quality)) : 0.92;
    }
  },
  watch: {
    option: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas && this.canvas.getContext("2d");
    this.init();
  },
  beforeUnmount() {
    this.renderVersion += 1;
  },
  methods: {
    init() {
      if (!this.canvas) return Promise.resolve(null);
      const version = ++this.renderVersion;
      this.renderPromise = this.render(version);
      return this.renderPromise;
    },
    async render(version) {
      this.draw = false;
      this.loading = true;
      this.error = "";
      this.base64 = "";

      try {
        const background = this.img ? await this.loadImage(this.img, this.option.crossOrigin) : null;
        if (version !== this.renderVersion) return null;

        const width = this.getSize(this.option.width, background ? background.width : 600);
        const height = this.getHeight(background, width);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = true;
        this.clearCanvas(width, height);

        if (background) this.context.drawImage(background, 0, 0, width, height);
        for (let index = 0; index < this.list.length; index++) {
          if (version !== this.renderVersion) return null;
          await this.drawLayer(this.list[index], index);
        }
        if (version !== this.renderVersion) return null;

        this.base64 = this.toDataURL();
        this.draw = true;
        this.loading = false;
        const payload = { base64: this.base64, width, height };
        this.$emit("change", payload);
        this.$emit("ready", payload);
        return payload;
      } catch (error) {
        if (version !== this.renderVersion) return null;
        this.draw = false;
        this.loading = false;
        this.error = error && error.message ? error.message : "授权凭证生成失败，请检查素材地址。";
        this.$emit("error", { error, message: this.error });
        return null;
      }
    },
    getSize(value, fallback) {
      const size = Number(value);
      return Number.isFinite(size) && size > 0 ? Math.round(size) : Math.max(1, Math.round(fallback));
    },
    getHeight(background, width) {
      if (this.option.height !== undefined && this.option.height !== null && this.option.height !== "") {
        return this.getSize(this.option.height, 340);
      }
      if (background && this.option.width) {
        return Math.max(1, Math.round((background.height / background.width) * width));
      }
      return background ? background.height : 340;
    },
    clearCanvas(width, height) {
      this.context.clearRect(0, 0, width, height);
      if (this.option.backgroundColor !== "transparent") {
        this.context.save();
        this.context.fillStyle = this.option.backgroundColor || "#ffffff";
        this.context.fillRect(0, 0, width, height);
        this.context.restore();
      }
    },
    loadImage(src, crossOrigin) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        if (crossOrigin) image.crossOrigin = crossOrigin;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`素材加载失败：${src}`));
        image.src = src;
      });
    },
    async drawLayer(layer, index) {
      if (!layer || typeof layer !== "object") return;
      if (layer.img) {
        try {
          const image = await this.loadImage(layer.img, layer.crossOrigin || this.option.crossOrigin);
          const width = this.getSize(layer.width, image.width);
          const height = layer.height !== undefined && layer.height !== null && layer.height !== ""
            ? this.getSize(layer.height, image.height)
            : Math.max(1, Math.round((image.height / image.width) * width));
          this.context.drawImage(image, this.toNumber(layer.left), this.toNumber(layer.top), width, height);
        } catch (error) {
          this.$emit("asset-error", { error, layer, index });
        }
        return;
      }
      this.drawText(layer);
    },
    drawText(layer) {
      const size = this.getSize(layer.size, 16);
      const lineHeight = this.getSize(layer.lineHeight, Math.round(size * 1.5));
      const maxWidth = Number(layer.maxWidth);
      const text = String(layer.text === undefined || layer.text === null ? "" : layer.text);
      this.context.save();
      this.context.translate(this.toNumber(layer.left), this.toNumber(layer.top));
      if (layer.rotate) this.context.rotate((Number(layer.rotate) * Math.PI) / 180);
      this.context.font = `${layer.bold ? "bold " : ""}${size}px ${layer.style || layer.fontFamily || "sans-serif"}`;
      this.context.fillStyle = layer.color || "#000000";
      this.context.globalAlpha = layer.opacity === undefined ? 1 : Math.min(1, Math.max(0, Number(layer.opacity)));
      this.context.textAlign = layer.align || "left";
      this.context.textBaseline = layer.baseline || "alphabetic";

      const lines = maxWidth > 0 ? this.wrapText(text, maxWidth) : text.split(/\r?\n/);
      lines.forEach((line, index) => this.context.fillText(line, 0, index * lineHeight, maxWidth > 0 ? maxWidth : undefined));
      this.context.restore();
    },
    wrapText(text, maxWidth) {
      const lines = [];
      text.split(/\r?\n/).forEach((paragraph) => {
        let line = "";
        Array.from(paragraph).forEach((char) => {
          const next = line + char;
          if (line && this.context.measureText(next).width > maxWidth) {
            lines.push(line);
            line = char;
          } else {
            line = next;
          }
        });
        lines.push(line);
      });
      return lines;
    },
    toNumber(value, fallback = 0) {
      const number = Number(value);
      return Number.isFinite(number) ? number : fallback;
    },
    toDataURL(type = this.mimeType, quality = this.imageQuality) {
      if (!this.canvas) return "";
      return this.canvas.toDataURL(type || "image/jpeg", quality);
    },
    async waitForRender() {
      const result = await this.renderPromise;
      if (!result || !this.draw) throw new Error(this.error || "授权凭证尚未生成完成。");
      return result;
    },
    async getFile(name = `${Date.now()}.jpg`, type, quality) {
      await this.waitForRender();
      const data = this.toDataURL(type, quality);
      this.base64 = data;
      return this.dataURLtoFile(data, name);
    },
    async downFile(filename = `${Date.now()}.jpg`, type, quality) {
      await this.waitForRender();
      const data = this.toDataURL(type, quality);
      this.base64 = data;
      src_utils_util.downFile(data, filename);
      this.$emit("download", { type: "image", filename, base64: data });
      return data;
    },
    async getBase64(type, quality) {
      await this.waitForRender();
      const data = this.toDataURL(type, quality);
      this.base64 = data;
      return data;
    },
    async getPdf(name = Date.now()) {
      await this.waitForRender();
      if (typeof window === "undefined" || !window.jsPDF) {
        const error = new Error("未检测到 jsPDF，请先引入 jsPDF 后再导出 PDF。");
        this.$emit("error", { error, message: error.message });
        throw error;
      }
      const contentWidth = this.canvas.width;
      const contentHeight = this.canvas.height;
      const pageHeight = (contentWidth / 592.28) * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      const imgWidth = 595.28;
      const imgHeight = (592.28 / contentWidth) * contentHeight;
      const pageData = this.toDataURL("image/jpeg", 1);
      const PDF = new window.jsPDF("", "pt", "a4");
      while (leftHeight > 0) {
        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) PDF.addPage();
      }
      const filename = `${name}.pdf`;
      PDF.save(filename);
      this.$emit("download", { type: "pdf", filename });
    }
  }
});

exports.default = script;
