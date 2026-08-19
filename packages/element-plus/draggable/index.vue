<template>
  <div ref="root"
       :class="b({
         active: (active || overActive || moveActive) && !readonly,
         move: moveActive,
         disabled
       })"
       :style="styleName"
       tabindex="0"
       role="group"
       :aria-label="`可拖拽元素 ${index || ''}`"
       @pointerdown.stop="handleMove"
       @mouseenter="handleOver"
       @mouseleave="handleOut"
       @keydown="handleKeydown">
    <div ref="wrapper"
         :class="b('wrapper')">
      <template v-if="(active || overActive || moveActive) && !readonly">
        <div :style="styleLineName"
             :class="b('line', ['left'])"></div>
        <div :style="styleLineName"
             :class="b('line', ['top'])"></div>
        <div :class="b('line', ['label'])"
             :style="styleLabelName">{{ baseLeft }}, {{ baseTop }} · {{ baseWidth }} × {{ baseHeight }}</div>
      </template>
      <template v-if="active && resize && !readonly && !disabled">
        <div v-for="item in rangeList"
             :key="item.classname"
             :class="b('range', [item.classname])"
             :style="[styleRangeName, getRangeStyle(item.classname)]"
             @pointerdown.stop.prevent="rangeMove($event, item.classname)"></div>
      </template>
      <div v-show="active || overActive"
           :class="b('menu')"
           :style="styleMenuName">
        <slot name="menu"
              :z-index="zIndex"
              :index="index"></slot>
      </div>
      <div ref="item"
           :class="b('item')">
        <slot></slot>
      </div>
      <div v-if="!disabled && mask"
           :class="b('mask')"></div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import { getFixed } from "utils/util";

export default create({
  name: 'draggable',
  emits: ['move', 'resize', 'change', 'focus', 'blur', 'over', 'out'],
  props: {
    index: [String, Number],
    mask: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    readonly: Boolean,
    resize: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    step: {
      type: Number,
      default: 1
    },
    grid: {
      type: Number,
      default: 0
    },
    lock: Boolean,
    zIndex: {
      type: [Number, String],
      default: 1
    },
    left: {
      type: [Number, String],
      default: 0
    },
    top: {
      type: [Number, String],
      default: 0
    },
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: Number,
      default: 20
    },
    minHeight: {
      type: Number,
      default: 20
    },
    maxWidth: Number,
    maxHeight: Number,
    bounds: Object,
    handle: String,
    ignore: {
      type: String,
      default: 'input, textarea, button, select, a, [data-avue-draggable-ignore]'
    }
  },
  data () {
    return {
      baseWidth: 0,
      baseHeight: 0,
      baseLeft: 0,
      baseTop: 0,
      children: null,
      moveActive: false,
      overActive: false,
      active: false,
      documentMoveHandler: null,
      documentUpHandler: null,
      rangeList: [
        { classname: 'left' },
        { classname: 'right' },
        { classname: 'top' },
        { classname: 'bottom' },
        { classname: 'top-left' },
        { classname: 'top-right' },
        { classname: 'bottom-left' },
        { classname: 'bottom-right' }
      ]
    };
  },
  computed: {
    scaleVal () {
      return Number(this.scale) > 0 ? Number(this.scale) : 1;
    },
    styleMenuName () {
      return {
        transformOrigin: '0 0',
        transform: `scale(${this.scaleVal})`
      };
    },
    styleLineName () {
      return { borderWidth: this.setPx(this.scaleVal) };
    },
    styleRangeName () {
      const size = 10 * this.scaleVal;
      return { width: this.setPx(size), height: this.setPx(size) };
    },
    styleLabelName () {
      return { fontSize: this.setPx(Math.max(11, 14 * this.scaleVal)) };
    },
    styleName () {
      return {
        zIndex: this.active ? 9999 : this.zIndex,
        top: this.setPx(this.baseTop),
        left: this.setPx(this.baseLeft),
        width: this.setPx(this.baseWidth),
        height: this.setPx(this.baseHeight)
      };
    }
  },
  watch: {
    width (value) {
      this.setSize(this.toNumber(value, this.baseWidth), this.baseHeight);
    },
    height (value) {
      this.setSize(this.baseWidth, this.toNumber(value, this.baseHeight));
    },
    left (value) {
      this.setLeft(value);
    },
    top (value) {
      this.setTop(value);
    },
    bounds: {
      deep: true,
      handler () {
        this.normalizeBox();
      }
    },
    baseWidth () {
      this.syncChildSize();
    },
    baseHeight () {
      this.syncChildSize();
    }
  },
  mounted () {
    this.init();
  },
  beforeUnmount () {
    this.removeDocumentDrag();
  },
  methods: {
    init () {
      this.children = this.$refs.item && this.$refs.item.firstElementChild;
      this.baseWidth = this.constrainSizeToBounds(
        this.clampSize(this.toNumber(this.width, this.children ? this.children.offsetWidth : 0), 'width'),
        'width'
      );
      this.baseHeight = this.constrainSizeToBounds(
        this.clampSize(this.toNumber(this.height, this.children ? this.children.offsetHeight : 0), 'height'),
        'height'
      );
      const position = this.constrainPosition(this.toNumber(this.left, 0), this.toNumber(this.top, 0));
      this.baseLeft = position.left;
      this.baseTop = position.top;
      this.syncChildSize();
    },
    toNumber (value, fallback = 0) {
      const number = Number(value);
      return Number.isFinite(number) ? getFixed(number) : fallback;
    },
    setSize (width, height) {
      this.baseWidth = this.constrainSizeToBounds(this.clampSize(width, 'width'), 'width');
      this.baseHeight = this.constrainSizeToBounds(this.clampSize(height, 'height'), 'height');
      const position = this.constrainPosition(this.baseLeft, this.baseTop);
      this.baseLeft = position.left;
      this.baseTop = position.top;
    },
    syncChildSize () {
      if (!this.resize || !this.children || !this.children.style) return;
      this.children.style.boxSizing = 'border-box';
      this.children.style.width = '100%';
      this.children.style.height = '100%';
    },
    getRangeStyle (position) {
      const offset = (10 * this.scaleVal) / 2;
      return position.split('-').reduce((style, side) => {
        style[side] = this.setPx(-offset);
        return style;
      }, {});
    },
    setLeft (left) {
      this.baseLeft = this.constrainPosition(this.toNumber(left), this.baseTop).left;
    },
    setTop (top) {
      this.baseTop = this.constrainPosition(this.baseLeft, this.toNumber(top)).top;
    },
    setOverActive (value) {
      this.overActive = !!value;
    },
    setActive (value) {
      this.active = !!value;
      if (this.active) this.focusRoot();
    },
    handleOver () {
      if (this.disabled) return;
      this.overActive = true;
      this.$emit('over', this.getState());
    },
    handleOut () {
      this.overActive = false;
      this.$emit('out', this.getState());
    },
    handleMove (event) {
      if (event.button !== 0 || this.disabled || this.lock || this.readonly) return;
      const target = event.target;
      if (this.handle && (!target.closest || !target.closest(this.handle))) return;
      if (!this.handle && this.ignore && target.closest && target.closest(this.ignore)) return;
      this.active = true;
      this.focusRoot();
      this.handleMouseDown('move');
      const start = this.getPointerState(event);
      this.bindDocumentDrag(
        (moveEvent) => this.applyMove(moveEvent, start),
        event.pointerId
      );
    },
    rangeMove (event, position) {
      if (event.button !== 0 || this.disabled || this.lock || this.readonly || !this.resize) return;
      this.active = true;
      this.focusRoot();
      this.handleMouseDown('resize');
      const start = { ...this.getPointerState(event), position };
      this.bindDocumentDrag(
        (moveEvent) => this.applyResize(moveEvent, start),
        event.pointerId
      );
    },
    getPointerState (event) {
      return {
        clientX: event.clientX,
        clientY: event.clientY,
        left: this.baseLeft,
        top: this.baseTop,
        width: this.baseWidth,
        height: this.baseHeight
      };
    },
    getDelta (event, start) {
      const multiplier = Number(this.step) || 1;
      return {
        x: (event.clientX - start.clientX) / this.scaleVal * multiplier,
        y: (event.clientY - start.clientY) / this.scaleVal * multiplier
      };
    },
    applyMove (event, start) {
      const delta = this.getDelta(event, start);
      const position = this.constrainPosition(
        this.snap(start.left + delta.x),
        this.snap(start.top + delta.y)
      );
      this.baseLeft = position.left;
      this.baseTop = position.top;
      this.emitMove(delta);
    },
    applyResize (event, start) {
      const delta = this.getDelta(event, start);
      const sides = start.position.split('-');
      let left = start.left;
      let top = start.top;
      let width = start.width;
      let height = start.height;
      if (sides.includes('left')) {
        left = this.snap(start.left + delta.x);
        width = start.width - delta.x;
      }
      if (sides.includes('right')) width = start.width + delta.x;
      if (sides.includes('top')) {
        top = this.snap(start.top + delta.y);
        height = start.height - delta.y;
      }
      if (sides.includes('bottom')) height = start.height + delta.y;

      const right = start.left + start.width;
      const bottom = start.top + start.height;
      width = this.clampSize(this.snap(width), 'width');
      height = this.clampSize(this.snap(height), 'height');
      if (sides.includes('left')) left = right - width;
      if (sides.includes('top')) top = bottom - height;
      const bounded = this.constrainResize(left, top, width, height, sides);
      this.baseLeft = bounded.left;
      this.baseTop = bounded.top;
      this.baseWidth = bounded.width;
      this.baseHeight = bounded.height;
      this.$emit('resize', this.getState({ deltaX: delta.x, deltaY: delta.y }));
      this.$emit('change', { type: 'resize', ...this.getState() });
    },
    snap (value) {
      const grid = Number(this.grid);
      return getFixed(grid > 0 ? Math.round(value / grid) * grid : value);
    },
    clampSize (value, dimension) {
      const min = dimension === 'width' ? Number(this.minWidth) || 0 : Number(this.minHeight) || 0;
      const maxValue = dimension === 'width' ? this.maxWidth : this.maxHeight;
      const max = Number(maxValue);
      return getFixed(Math.max(min, Number.isFinite(max) && max > 0 ? Math.min(value, max) : value));
    },
    constrainSizeToBounds (value, dimension) {
      const bounds = this.getBounds();
      if (!bounds) return getFixed(value);
      const limit = dimension === 'width'
        ? Math.max(0, bounds.right - bounds.left)
        : Math.max(0, bounds.bottom - bounds.top);
      return getFixed(Math.min(value, limit));
    },
    normalizeBox () {
      if (!this.bounds) return;
      this.baseWidth = this.constrainSizeToBounds(this.clampSize(this.baseWidth, 'width'), 'width');
      this.baseHeight = this.constrainSizeToBounds(this.clampSize(this.baseHeight, 'height'), 'height');
      const position = this.constrainPosition(this.baseLeft, this.baseTop);
      this.baseLeft = position.left;
      this.baseTop = position.top;
    },
    getBounds () {
      if (!this.bounds || typeof this.bounds !== 'object') return null;
      const left = this.toNumber(this.bounds.left, 0);
      const top = this.toNumber(this.bounds.top, 0);
      const right = Number.isFinite(Number(this.bounds.right))
        ? Number(this.bounds.right)
        : Number.isFinite(Number(this.bounds.width)) ? left + Number(this.bounds.width) : Infinity;
      const bottom = Number.isFinite(Number(this.bounds.bottom))
        ? Number(this.bounds.bottom)
        : Number.isFinite(Number(this.bounds.height)) ? top + Number(this.bounds.height) : Infinity;
      return { left, top, right, bottom };
    },
    constrainPosition (left, top) {
      const bounds = this.getBounds();
      if (!bounds) return { left: getFixed(left), top: getFixed(top) };
      return {
        left: getFixed(Math.min(Math.max(left, bounds.left), Math.max(bounds.left, bounds.right - this.baseWidth))),
        top: getFixed(Math.min(Math.max(top, bounds.top), Math.max(bounds.top, bounds.bottom - this.baseHeight)))
      };
    },
    constrainResize (left, top, width, height, sides) {
      const bounds = this.getBounds();
      if (!bounds) return { left, top, width, height };
      if (sides.includes('left') && left < bounds.left) {
        width -= bounds.left - left;
        left = bounds.left;
      }
      if (sides.includes('top') && top < bounds.top) {
        height -= bounds.top - top;
        top = bounds.top;
      }
      if (left + width > bounds.right) {
        if (sides.includes('left')) left = bounds.right - width;
        else width = bounds.right - left;
      }
      if (top + height > bounds.bottom) {
        if (sides.includes('top')) top = bounds.bottom - height;
        else height = bounds.bottom - top;
      }
      width = this.constrainSizeToBounds(this.clampSize(width, 'width'), 'width');
      height = this.constrainSizeToBounds(this.clampSize(height, 'height'), 'height');
      left = Math.min(Math.max(left, bounds.left), Math.max(bounds.left, bounds.right - width));
      top = Math.min(Math.max(top, bounds.top), Math.max(bounds.top, bounds.bottom - height));
      return {
        left: getFixed(left),
        top: getFixed(top),
        width,
        height
      };
    },
    emitMove (delta) {
      this.$emit('move', { index: this.index, left: getFixed(delta.x), top: getFixed(delta.y) });
      this.$emit('change', { type: 'move', ...this.getState() });
    },
    getState (extra = {}) {
      return {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop,
        ...extra
      };
    },
    bindDocumentDrag (moveHandler, pointerId) {
      this.removeDocumentDrag();
      this.documentMoveHandler = (event) => {
        if (pointerId !== undefined && event.pointerId !== pointerId) return;
        this.moveActive = true;
        moveHandler(event);
      };
      this.documentUpHandler = (event) => {
        if (pointerId !== undefined && event.pointerId !== pointerId) return;
        this.removeDocumentDrag();
        this.handleMouseUp();
      };
      document.addEventListener('pointermove', this.documentMoveHandler);
      document.addEventListener('pointerup', this.documentUpHandler);
      document.addEventListener('pointercancel', this.documentUpHandler);
    },
    removeDocumentDrag () {
      if (this.documentMoveHandler) {
        document.removeEventListener('pointermove', this.documentMoveHandler);
        this.documentMoveHandler = null;
      }
      if (this.documentUpHandler) {
        document.removeEventListener('pointerup', this.documentUpHandler);
        document.removeEventListener('pointercancel', this.documentUpHandler);
        this.documentUpHandler = null;
      }
    },
    focusRoot () {
      if (this.$refs.root && document.activeElement !== this.$refs.root) {
        this.$refs.root.focus({ preventScroll: true });
      }
    },
    handleKeydown (event) {
      if (!this.active || this.disabled || this.lock || this.readonly) return;
      if (event.key === 'Escape') {
        this.active = false;
        return;
      }
      const step = Number(event.shiftKey ? this.step * 10 : this.step) || 1;
      let left = this.baseLeft;
      let top = this.baseTop;
      if (event.key === 'ArrowUp') top -= step;
      else if (event.key === 'ArrowDown') top += step;
      else if (event.key === 'ArrowLeft') left -= step;
      else if (event.key === 'ArrowRight') left += step;
      else return;
      event.preventDefault();
      const previous = { left: this.baseLeft, top: this.baseTop };
      const position = this.constrainPosition(this.snap(left), this.snap(top));
      this.baseLeft = position.left;
      this.baseTop = position.top;
      this.emitMove({ x: this.baseLeft - previous.left, y: this.baseTop - previous.top });
    },
    handleMouseDown (type) {
      this.moveActive = true;
      this.$emit('focus', { type, ...this.getState() });
    },
    handleMouseUp () {
      this.moveActive = false;
      this.$emit('blur', this.getState());
    }
  }
});
</script>
