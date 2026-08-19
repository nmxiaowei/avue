/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

function create5star(context, sx, sy, radius, color) {
  context.save();
  context.fillStyle = color;
  context.beginPath();
  for (let index = 0; index < 10; index++) {
    const angle = -Math.PI / 2 + index * Math.PI / 5;
    const currentRadius = index % 2 === 0 ? radius : radius * 0.42;
    const x = sx + Math.cos(angle) * currentRadius;
    const y = sy + Math.sin(angle) * currentRadius;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
  context.restore();
}

function drawArcText(context, value, centerX, centerY, radius) {
  const chars = Array.from(String(value || ""));
  if (!chars.length) return;

  const totalAngle = Math.min(Math.PI * 1.08, Math.max(Math.PI / 7, chars.length * Math.PI / 12));
  const startAngle = -Math.PI / 2 - totalAngle / 2;
  const step = chars.length === 1 ? 0 : totalAngle / (chars.length - 1);

  chars.forEach((char, index) => {
    const angle = startAngle + index * step;
    context.save();
    context.translate(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    context.rotate(angle + Math.PI / 2);
    context.fillText(char, 0, 0);
    context.restore();
  });
}

var script = src_core_create.default({
  name: "sign",
  props: {
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 400,
    },
    disabled: Boolean,
    readonly: Boolean,
    lineWidth: {
      type: Number,
      default: 3,
    },
    lineColor: {
      type: String,
      default: "#1f2937",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    title: String,
    placeholder: {
      type: String,
      default: "请在此处签名",
    },
    clearText: {
      type: String,
      default: "清空",
    },
    showToolbar: Boolean,
    ariaLabel: {
      type: String,
      default: "签名画板",
    },
  },
  emits: ["start", "change", "end", "clear", "seal", "update:modelValue"],
  data() {
    return {
      canvas: null,
      context: null,
      isDrawing: false,
      activePointerId: null,
      hasDrawn: false,
      sealed: false,
      lastPoint: null,
    };
  },
  computed: {
    canvasWidth() {
      return this.getCanvasSize(this.width, 600);
    },
    canvasHeight() {
      return this.getCanvasSize(this.height, 400);
    },
    styleName() {
      return {
        width: `min(100%, ${this.canvasWidth}px)`,
      };
    },
    surfaceStyle() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
    canvasStyle() {
      return {
        aspectRatio: `${this.canvasWidth} / ${this.canvasHeight}`,
      };
    },
    isDisabled() {
      return this.disabled || this.readonly || this.sealed;
    },
    isEmpty() {
      return !this.hasDrawn;
    },
    statusText() {
      if (this.sealed) return "已生成印章";
      return this.hasDrawn ? "签名已填写" : "待签名";
    },
  },
  watch: {
    width() {
      this.resizeCanvas();
    },
    height() {
      this.resizeCanvas();
    },
    backgroundColor() {
      if (!this.hasDrawn) this.clearCanvas();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    getCanvasSize(value, fallback) {
      const size = Number(value);
      return Number.isFinite(size) && size > 0 ? Math.round(size) : fallback;
    },
    init() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas && this.canvas.getContext("2d");
      this.clearCanvas();
    },
    resizeCanvas() {
      if (!this.canvas || !this.context) return;

      const image = document.createElement("canvas");
      image.width = this.canvas.width;
      image.height = this.canvas.height;
      image.getContext("2d").drawImage(this.canvas, 0, 0);
      const hasDrawn = this.hasDrawn;

      this.$nextTick(() => {
        this.context = this.canvas.getContext("2d");
        this.clearCanvas();
        if (hasDrawn) {
          this.context.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
        }
      });
    },
    clearCanvas() {
      if (!this.context || !this.canvas) return;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.backgroundColor && this.backgroundColor !== "transparent") {
        this.context.save();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
      }
    },
    getPoint(event) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (this.canvas.width / rect.width),
        y: (event.clientY - rect.top) * (this.canvas.height / rect.height),
      };
    },
    setPenStyle() {
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = Math.max(1, Number(this.lineWidth) || 1);
      this.context.strokeStyle = this.lineColor;
      this.context.fillStyle = this.lineColor;
    },
    drawPoint(point) {
      this.setPenStyle();
      this.context.beginPath();
      this.context.arc(point.x, point.y, this.context.lineWidth / 2, 0, Math.PI * 2);
      this.context.fill();
    },
    onPointerDown(event) {
      if (this.isDisabled || event.button > 0 || event.isPrimary === false) return;

      event.preventDefault();
      this.isDrawing = true;
      this.activePointerId = event.pointerId;
      this.lastPoint = this.getPoint(event);
      this.drawPoint(this.lastPoint);
      this.hasDrawn = true;
      this.canvas.setPointerCapture && this.canvas.setPointerCapture(event.pointerId);
      this.$emit("start", this.lastPoint);
    },
    onPointerMove(event) {
      if (!this.isDrawing || event.pointerId !== this.activePointerId || this.isDisabled) return;

      event.preventDefault();
      const point = this.getPoint(event);
      this.setPenStyle();
      this.context.beginPath();
      this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.context.lineTo(point.x, point.y);
      this.context.stroke();
      this.lastPoint = point;
    },
    onPointerUp(event) {
      if (!this.isDrawing || event.pointerId !== this.activePointerId) return;

      if (this.canvas.hasPointerCapture && this.canvas.hasPointerCapture(event.pointerId)) {
        this.canvas.releasePointerCapture(event.pointerId);
      }
      this.isDrawing = false;
      this.activePointerId = null;
      this.lastPoint = null;
      const value = this.emitChange();
      this.$emit("end", value);
    },
    emitChange() {
      const value = this.submit();
      this.$emit("change", value);
      this.$emit("update:modelValue", value);
      return value;
    },
    getStar(text = "", text1 = "", text2 = "") {
      if (this.disabled || this.readonly || !this.context) return;

      this.clearCanvas();
      const width = this.canvas.width;
      const height = this.canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(28, Math.min(width, height) / 2 - 22);
      const color = "#dc2626";

      this.context.save();
      this.context.strokeStyle = color;
      this.context.fillStyle = color;
      this.context.lineWidth = Math.max(2, radius / 28);
      this.context.beginPath();
      this.context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.context.stroke();

      create5star(this.context, centerX, centerY - radius * 0.1, radius * 0.19, color);
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.font = `${Math.max(12, radius * 0.17)}px SimHei, sans-serif`;
      drawArcText(this.context, text1, centerX, centerY, radius * 0.72);
      this.context.font = `${Math.max(11, radius * 0.15)}px SimHei, sans-serif`;
      this.context.fillText(String(text || ""), centerX, centerY + radius * 0.35);
      this.context.font = `${Math.max(10, radius * 0.11)}px SimHei, sans-serif`;
      this.context.fillText(String(text2 || ""), centerX, centerY + radius * 0.58);
      this.context.restore();

      this.hasDrawn = true;
      this.sealed = true;
      const value = this.emitChange();
      this.$emit("seal", value);
      return value;
    },
    submit(width, height, type = "image/png", quality) {
      if (!this.canvas) return "";
      const targetWidth = this.getCanvasSize(width, this.canvas.width);
      const targetHeight = this.getCanvasSize(height, this.canvas.height);
      let exportCanvas = this.canvas;

      if (targetWidth !== this.canvas.width || targetHeight !== this.canvas.height) {
        exportCanvas = document.createElement("canvas");
        exportCanvas.width = targetWidth;
        exportCanvas.height = targetHeight;
        const exportContext = exportCanvas.getContext("2d");
        exportContext.drawImage(this.canvas, 0, 0, targetWidth, targetHeight);
      }

      return exportCanvas.toDataURL(type || "image/png", quality);
    },
    clear() {
      if (this.disabled || this.readonly) return;
      this.isDrawing = false;
      this.activePointerId = null;
      this.lastPoint = null;
      this.hasDrawn = false;
      this.sealed = false;
      this.clearCanvas();
      this.$emit("clear");
      this.emitChange();
    },
    isEmptySignature() {
      return !this.hasDrawn;
    },
  },
});

exports.default = script;
