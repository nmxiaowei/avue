<template>
  <div
    :class="[b(), b(`is-${captchaType}`), { [b('success')]: verified, [b('error')]: status === 'error', [b('disabled')]: disabled }]"
    :style="rootStyle"
  >
    <template v-if="captchaType === 'slider'">
      <div ref="scene" :class="b('scene')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <svg
          v-for="target in sliderTargets"
          :key="target.id"
          :class="[b('slider-target'), b(`slider-target-${target.shape}`), { [b('slider-target-decoy')]: !target.correct }]"
          :style="getSliderTargetStyle(target)"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path :class="b('slider-target-path')" :d="getPuzzlePath(target.shape)"></path>
        </svg>
        <svg
          :class="b('slider-piece')"
          :style="pieceStyle"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath :id="pieceClipId">
              <path :d="piecePath"></path>
            </clipPath>
            <linearGradient :id="pieceGradientId" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#c9e7ff"></stop>
              <stop offset="1" stop-color="#72adf2"></stop>
            </linearGradient>
          </defs>
          <image
            v-if="backgroundSource"
            :href="backgroundSource"
            x="0"
            y="0"
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${pieceClipId})`"
          ></image>
          <path
            v-else
            :d="piecePath"
            :fill="`url(#${pieceGradientId})`"
          ></path>
          <path :class="b('slider-piece-outline')" :d="piecePath"></path>
        </svg>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div ref="slider" :class="b('slider')">
        <div :class="b('slider-progress')" :style="progressStyle"></div>
        <span :class="b('slider-text')">{{ sliderTip }}</span>
        <button
          type="button"
          :class="b('slider-button')"
          :style="sliderButtonStyle"
          :disabled="disabled || verified"
          aria-label="拖动滑块完成验证"
          @pointerdown.prevent="startSlide"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </template>

    <template v-else-if="captchaType === 'text'">
      <div ref="scene" :class="b('scene', 'text')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <div :class="b('text-options')" role="group" aria-label="文字验证码选项">
          <button
            v-for="item in textOptions"
            :key="item.id"
            type="button"
            :class="[b('text-option'), { [b('text-option-selected')]: selectedTextIds.includes(item.id) }]"
            :style="getChoiceOptionStyle(item)"
            :disabled="disabled || verified || selectedTextIds.includes(item.id)"
            :aria-label="`点击文字 ${item.value}`"
            @click="selectText(item)"
          >
            {{ item.value }}
          </button>
        </div>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">
        请依次点击 <strong>【{{ targetTextLabel }}】</strong>
      </div>
    </template>

    <template v-else-if="captchaType === 'math'">
      <div ref="scene" :class="b('scene', 'math')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <div :class="b('math-options')" role="group" aria-label="算术验证码选项">
          <button
            v-for="item in mathResultOptions"
            :key="item.id"
            type="button"
            :class="b('math-option')"
            :style="getChoiceOptionStyle(item)"
            :disabled="disabled || verified"
            :aria-label="`选择结果 ${item.value}`"
            @click="selectMath(item)"
          >
            {{ item.value }}
          </button>
        </div>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">
        请选择正确的计算结果：<strong>{{ mathExpression }}</strong>
      </div>
    </template>

    <template v-else-if="captchaType === 'rotate'">
      <div ref="scene" :class="b('scene', 'rotate')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <div :class="b('rotate-dial')" :style="rotateDialStyle" aria-hidden="true">
          <span :class="b('rotate-arrow')">↑</span>
          <span :class="b('rotate-mark')">AVUE</span>
        </div>
        <div :class="b('rotate-controls')">
          <button type="button" :disabled="disabled || verified" aria-label="逆时针旋转" @click="rotateCaptcha(-1)">↺</button>
          <button type="button" :disabled="disabled || verified" aria-label="顺时针旋转" @click="rotateCaptcha(1)">↻</button>
        </div>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">将图案旋转至正向</div>
    </template>

    <template v-else-if="captchaType === 'icon'">
      <div ref="scene" :class="b('scene', 'icon')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <div :class="b('icon-options')" role="group" aria-label="图标验证码选项">
          <button
            v-for="item in iconOptions"
            :key="item.id"
            type="button"
            :class="b('icon-option')"
            :style="getIconOptionStyle(item)"
            :disabled="disabled || verified"
            :aria-label="`点击${item.label}`"
            @click="selectIcon(item)"
          >
            {{ item.value }}
          </button>
        </div>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">请点击 <strong>{{ iconTarget.label }}</strong></div>
    </template>

    <template v-else-if="captchaType === 'sequence'">
      <div ref="scene" :class="b('scene', 'sequence')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <div :class="b('sequence-options')" role="group" aria-label="顺序验证码选项">
          <button
            v-for="item in sequenceOptions"
            :key="item.id"
            type="button"
            :class="[b('sequence-option'), b(`sequence-option-${item.shape}`), { [b('sequence-option-selected')]: selectedSequenceIds.includes(item.id) }]"
            :style="getSequenceOptionStyle(item)"
            :disabled="disabled || verified || selectedSequenceIds.includes(item.id)"
            :aria-label="`点击${item.label}`"
            @click="selectSequence(item)"
          ></button>
        </div>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">请依次点击 <strong>{{ sequenceTargetLabel }}</strong></div>
    </template>

    <template v-else-if="captchaType === 'drag'">
      <div ref="scene" :class="b('scene', 'drag')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <span :class="[b('drag-target'), b(`drag-shape-${dragShape}`)]" :style="dragTargetStyle" aria-hidden="true"></span>
        <button
          type="button"
          :class="[b('drag-piece'), b(`drag-shape-${dragShape}`)]"
          :style="dragPieceStyle"
          :disabled="disabled || verified"
          aria-label="拖动图形到匹配轮廓"
          @pointerdown.prevent="startDrag"
        ></button>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">将图形拖到相同轮廓中</div>
    </template>

    <template v-else>
      <div ref="scene" :class="b('scene', 'path')" :style="sceneStyle">
        <span :class="b('scene-decoration', 'one')"></span>
        <span :class="b('scene-decoration', 'two')"></span>
        <svg :class="b('path-track')" :viewBox="`0 0 ${getSceneWidth()} ${safeHeight}`" aria-hidden="true">
          <path :d="pathLine" :class="b('path-line')"></path>
          <circle :cx="pathEndPoint.x" :cy="pathEndPoint.y" r="8" :class="b('path-end')"></circle>
        </svg>
        <button
          type="button"
          :class="b('path-marker')"
          :style="pathMarkerStyle"
          :disabled="disabled || verified"
          aria-label="沿轨迹滑动到终点"
          @pointerdown.prevent="startPath"
        ></button>
        <div v-if="verified" :class="b('mask')">验证通过</div>
      </div>
      <div :class="b('canvas-prompt')">沿轨迹将圆点滑动到终点</div>
    </template>

    <div :class="b('footer')">
      <span :class="b('message')" role="status">{{ message }}</span>
      <button
        type="button"
        :class="b('refresh')"
        :disabled="disabled"
        aria-label="刷新验证码"
        @click="refresh"
      >
        ↻ 换一组
      </button>
    </div>
  </div>
</template>

<script>
import create from 'core/create';

const CAPTCHA_TYPES = ['slider', 'text', 'math', 'rotate', 'icon', 'sequence', 'drag', 'path'];
const DEFAULT_TEXT_POOL = '春夏秋冬诚信安全智慧服务登录验证用户数据网络星辰山河风云花鸟';
const CHOICE_COLORS = ['#f72585', '#4361ee', '#4cc9f0', '#38b000', '#f77f00', '#8338ec'];
const PUZZLE_SHAPES = ['a', 'b'];
const DEFAULT_ICON_POOL = [
  { value: '★', label: '星星' },
  { value: '♥', label: '爱心' },
  { value: '☀', label: '太阳' },
  { value: '☁', label: '云朵' },
  { value: '✦', label: '闪光' },
  { value: '✿', label: '花朵' },
  { value: '◆', label: '菱形' },
  { value: '♣', label: '梅花' },
];
const SEQUENCE_COLORS = [
  { value: '#ef476f', label: '红色' },
  { value: '#4361ee', label: '蓝色' },
  { value: '#06b6a4', label: '绿色' },
  { value: '#f59e0b', label: '橙色' },
];
const SEQUENCE_SHAPES = [
  { value: 'circle', label: '圆形' },
  { value: 'square', label: '方形' },
  { value: 'triangle', label: '三角形' },
  { value: 'diamond', label: '菱形' },
];
const DRAG_SHAPES = ['circle', 'square', 'triangle', 'diamond'];
const PUZZLE_PATHS = {
  a: 'M10,10H38C38,-2,62,-2,62,10H90V38C102,38,102,62,90,62V90H62C62,78,38,78,38,90H10V62C-2,62,-2,38,10,38Z',
  b: 'M10,10H38C38,22,62,22,62,10H90V38C78,38,78,62,90,62V90H62C62,102,38,102,38,90H10V62C22,62,22,38,10,38Z',
};

const randomInt = (min, max) => {
  const start = Math.ceil(min);
  const end = Math.floor(max);
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const shuffle = (list) => {
  const result = [...list];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(0, index);
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
};

const toCssUrl = (value) => `url(${JSON.stringify(String(value))})`;

export default create({
  name: 'captcha',
  emits: ['update:modelValue', 'change', 'success', 'fail', 'refresh'],
  expose: ['refresh', 'reset', 'verify'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'slider',
      validator: (value) => CAPTCHA_TYPES.includes(value),
    },
    width: {
      type: [Number, String],
      default: 320,
    },
    height: {
      type: Number,
      default: 160,
    },
    pieceSize: {
      type: Number,
      default: 42,
    },
    tolerance: {
      type: Number,
      default: 6,
    },
    sliderTargetCount: {
      type: Number,
      default: 2,
    },
    rotateStep: {
      type: Number,
      default: 30,
    },
    image: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      default: '',
    },
    backgroundSize: {
      type: String,
      default: 'cover',
    },
    backgroundPosition: {
      type: String,
      default: 'center',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoRefresh: {
      type: Boolean,
      default: true,
    },
    refreshDelay: {
      type: Number,
      default: 900,
    },
    targetText: {
      type: [String, Array],
      default: '',
    },
    textPool: {
      type: [String, Array],
      default: DEFAULT_TEXT_POOL,
    },
    textOptionCount: {
      type: Number,
      default: 8,
    },
    targetIcon: {
      type: String,
      default: '',
    },
    iconPool: {
      type: Array,
      default: () => DEFAULT_ICON_POOL,
    },
    iconOptionCount: {
      type: Number,
      default: 6,
    },
    sequenceLength: {
      type: Number,
      default: 3,
    },
    dragTolerance: {
      type: Number,
      default: 16,
    },
    mathQuestion: {
      type: String,
      default: '',
    },
    mathAnswer: {
      type: [Number, String],
      default: undefined,
    },
    mathOptions: {
      type: Array,
      default: () => [],
    },
    mathOptionCount: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      verified: false,
      status: 'ready',
      message: '',
      sliderOffset: 0,
      sliderTarget: 0,
      sliderTargets: [],
      pieceTop: 24,
      pieceShape: 'a',
      puzzleId: `captcha-puzzle-${Math.random().toString(36).slice(2, 10)}`,
      dragStartX: 0,
      dragStartOffset: 0,
      dragging: false,
      selectedTextIds: [],
      textOptions: [],
      textTargets: [],
      mathExpression: '',
      expectedMathAnswer: '',
      mathResultOptions: [],
      rotation: 0,
      iconOptions: [],
      iconTarget: {},
      sequenceOptions: [],
      sequenceTargets: [],
      selectedSequenceIds: [],
      dragShape: 'circle',
      dragColor: '#4361ee',
      dragSource: { x: 20, y: 20 },
      dragTarget: { x: 180, y: 80 },
      dragOffset: { x: 0, y: 0 },
      dragStartX: 0,
      dragStartY: 0,
      dragStartOffset: { x: 0, y: 0 },
      dragActive: false,
      pathProgress: 0,
      pathDragStartX: 0,
      pathDragStartProgress: 0,
      pathActive: false,
      refreshTimer: null,
    };
  },
  computed: {
    captchaType() {
      return CAPTCHA_TYPES.includes(this.type) ? this.type : 'slider';
    },
    rootStyle() {
      return { width: this.setPx(this.width) };
    },
    safeHeight() {
      return Math.max(96, Number(this.height) || 160);
    },
    safePieceSize() {
      return Math.min(Math.max(30, Number(this.pieceSize) || 42), this.safeHeight - 20);
    },
    sliderMax() {
      return Math.max(1, this.getSceneWidth() - this.safePieceSize - 8);
    },
    sceneStyle() {
      const style = { height: `${this.safeHeight}px` };
      if (this.backgroundSource) {
        style.backgroundImage = toCssUrl(this.backgroundSource);
        style.backgroundSize = this.backgroundSize;
        style.backgroundPosition = this.backgroundPosition;
      }
      return style;
    },
    backgroundSource() {
      return this.backgroundImage || this.image;
    },
    pieceStyle() {
      return {
        width: `${this.safePieceSize}px`,
        height: `${this.safePieceSize}px`,
        top: `${this.pieceTop}px`,
        transform: `translateX(${this.sliderOffset}px)`,
      };
    },
    piecePath() {
      return this.getPuzzlePath(this.pieceShape);
    },
    pieceClipId() {
      return `${this.puzzleId}-clip`;
    },
    pieceGradientId() {
      return `${this.puzzleId}-gradient`;
    },
    progressStyle() {
      return { width: `${Math.min(100, ((this.sliderOffset + 20) / this.sliderMax) * 100)}%` };
    },
    sliderButtonStyle() {
      return { transform: `translateX(${this.sliderOffset}px)` };
    },
    sliderTip() {
      if (this.verified) return '验证通过';
      if (this.dragging) return '松开以完成验证';
      return '拖动滑块匹配正确缺口';
    },
    targetTextLabel() {
      return this.textTargets.join(' ');
    },
    sequenceTargetLabel() {
      return this.sequenceTargets.map((item) => item.label).join(' → ');
    },
    choiceFontSize() {
      const width = this.getSceneWidth();
      return Math.max(16, Math.min(22, Math.floor(Math.min(width / 14, this.safeHeight / 6.5))));
    },
    mathChoiceFontSize() {
      const width = this.getSceneWidth();
      return Math.max(14, Math.min(18, Math.floor(Math.min(width / 16, this.safeHeight / 8))));
    },
    rotateDialStyle() {
      return { transform: `rotate(${this.rotation}deg)` };
    },
    dragSize() {
      return 42;
    },
    dragCurrentPosition() {
      return {
        x: this.dragSource.x + this.dragOffset.x,
        y: this.dragSource.y + this.dragOffset.y,
      };
    },
    dragPieceStyle() {
      return {
        width: `${this.dragSize}px`,
        height: `${this.dragSize}px`,
        left: `${this.dragCurrentPosition.x}px`,
        top: `${this.dragCurrentPosition.y}px`,
        backgroundColor: this.dragColor,
      };
    },
    dragTargetStyle() {
      return {
        width: `${this.dragSize}px`,
        height: `${this.dragSize}px`,
        left: `${this.dragTarget.x}px`,
        top: `${this.dragTarget.y}px`,
        borderColor: this.dragColor,
      };
    },
    pathStartPoint() {
      return this.getPathPoint(0);
    },
    pathEndPoint() {
      return this.getPathPoint(1);
    },
    pathMarkerStyle() {
      const point = this.getPathPoint(this.pathProgress);
      return {
        left: `${point.x - 15}px`,
        top: `${point.y - 15}px`,
      };
    },
    pathLine() {
      const start = this.pathStartPoint;
      const end = this.pathEndPoint;
      const controlY = Math.max(16, this.safeHeight * 0.14);
      return `M ${start.x} ${start.y} Q ${this.getSceneWidth() / 2} ${controlY} ${end.x} ${end.y}`;
    },
  },
  watch: {
    modelValue(value) {
      if (value === false && this.verified) this.refresh();
    },
    type() {
      this.refresh();
    },
    targetText: {
      handler() {
        if (this.captchaType === 'text') this.refresh();
      },
      deep: true,
    },
    mathQuestion() {
      if (this.captchaType === 'math') this.refresh();
    },
    mathAnswer() {
      if (this.captchaType === 'math') this.refresh();
    },
    mathOptions: {
      handler() {
        if (this.captchaType === 'math') this.refresh();
      },
      deep: true,
    },
    sliderTargetCount() {
      if (this.captchaType === 'slider') this.refresh();
    },
    targetIcon() {
      if (this.captchaType === 'icon') this.refresh();
    },
    iconPool: {
      handler() {
        if (this.captchaType === 'icon') this.refresh();
      },
      deep: true,
    },
    sequenceLength() {
      if (this.captchaType === 'sequence') this.refresh();
    },
  },
  mounted() {
    this.$nextTick(() => this.refresh());
  },
  beforeUnmount() {
    this.clearRefreshTimer();
    this.stopSlide();
    this.stopDrag();
    this.stopPath();
  },
  methods: {
    getSceneWidth() {
      const width = this.$refs.scene?.clientWidth;
      if (width) return width;
      const propWidth = Number(this.width);
      return Number.isFinite(propWidth) && propWidth > 0 ? propWidth : 320;
    },
    refresh() {
      this.clearRefreshTimer();
      this.stopSlide();
      this.stopDrag();
      this.stopPath();
      this.verified = false;
      this.status = 'ready';
      this.message = '';
      this.sliderOffset = 0;
      this.selectedTextIds = [];
      this.selectedSequenceIds = [];
      this.dragOffset = { x: 0, y: 0 };
      this.pathProgress = 0;
      if (this.captchaType === 'slider') this.createSliderChallenge();
      if (this.captchaType === 'text') this.createTextChallenge();
      if (this.captchaType === 'math') this.createMathChallenge();
      if (this.captchaType === 'rotate') this.createRotateChallenge();
      if (this.captchaType === 'icon') this.createIconChallenge();
      if (this.captchaType === 'sequence') this.createSequenceChallenge();
      if (this.captchaType === 'drag') this.createDragChallenge();
      this.updateValue(false);
      this.$emit('refresh', { type: this.captchaType });
    },
    reset() {
      this.refresh();
    },
    createSliderChallenge() {
      const targetCount = Math.min(4, Math.max(1, Number(this.sliderTargetCount) || 2));
      const correctShapeIndex = randomInt(0, PUZZLE_SHAPES.length - 1);
      const targets = [];
      for (let index = 0; index < targetCount; index += 1) {
        let shapeIndex = correctShapeIndex;
        if (index > 0) {
          const shapeCandidates = PUZZLE_SHAPES.map((_, shapeIndex) => shapeIndex)
            .filter((shapeIndex) => shapeIndex !== correctShapeIndex);
          shapeIndex = shapeCandidates[randomInt(0, shapeCandidates.length - 1)];
        }
        const position = this.createSliderTargetPosition(targets);
        targets.push({
          id: `target-${index}`,
          correct: index === 0,
          shape: PUZZLE_SHAPES[shapeIndex],
          ...position,
        });
      }
      const correctTarget = targets[0];
      this.sliderTargets = shuffle(targets);
      this.sliderTarget = correctTarget.x;
      this.pieceTop = correctTarget.y;
      this.pieceShape = correctTarget.shape;
    },
    createSliderTargetPosition(targets) {
      const maxX = this.sliderMax;
      const minTarget = Math.min(Math.max(20, Math.round(maxX * 0.28)), maxX);
      const minY = 10;
      const maxY = Math.max(minY, this.safeHeight - this.safePieceSize - 10);
      const minDistance = this.safePieceSize * 1.55;
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const position = {
          x: randomInt(minTarget, maxX),
          y: randomInt(minY, maxY),
        };
        const available = targets.every((target) => {
          const xDistance = target.x - position.x;
          const yDistance = target.y - position.y;
          return xDistance * xDistance + yDistance * yDistance >= minDistance * minDistance;
        });
        if (available) return position;
      }
      const index = targets.length;
      return {
        x: Math.max(minTarget, maxX - index * (this.safePieceSize + 8)),
        y: minY + ((maxY - minY) * (index % 2)),
      };
    },
    getSliderTargetStyle(target) {
      return {
        width: `${this.safePieceSize}px`,
        height: `${this.safePieceSize}px`,
        left: `${target.x}px`,
        top: `${target.y}px`,
      };
    },
    getPuzzlePath(shape) {
      return PUZZLE_PATHS[shape] || PUZZLE_PATHS.a;
    },
    createTextChallenge() {
      const pool = Array.isArray(this.textPool) ? this.textPool : String(this.textPool).split('');
      const uniquePool = [...new Set(pool.filter(Boolean))];
      const providedTargets = Array.isArray(this.targetText)
        ? this.targetText
        : String(this.targetText || '').split('').filter(Boolean);
      const targetCount = Math.min(3, Math.max(1, providedTargets.length || 2));
      this.textTargets = providedTargets.length
        ? providedTargets.slice(0, targetCount)
        : shuffle(uniquePool).slice(0, targetCount);
      const optionCount = Math.max(this.textTargets.length, Number(this.textOptionCount) || 8);
      const options = [...this.textTargets];
      shuffle(uniquePool).forEach((item) => {
        if (options.length < optionCount && !options.includes(item)) options.push(item);
      });
      this.textOptions = this.createChoiceOptions(shuffle(options), 16);
    },
    createMathChallenge() {
      if (this.mathQuestion && this.mathAnswer !== undefined) {
        this.mathExpression = this.mathQuestion;
        this.expectedMathAnswer = String(this.mathAnswer).trim();
        this.createMathOptions();
        return;
      }
      const first = randomInt(5, 20);
      const second = randomInt(1, 9);
      const isSubtraction = Math.random() > 0.5;
      this.mathExpression = isSubtraction ? `${first} − ${second} = ?` : `${first} + ${second} = ?`;
      this.expectedMathAnswer = String(isSubtraction ? first - second : first + second);
      this.createMathOptions();
    },
    createMathOptions() {
      const answer = this.expectedMathAnswer;
      const providedOptions = this.mathOptions.map((item) => String(item).trim()).filter(Boolean);
      const optionCount = Math.max(2, Number(this.mathOptionCount) || 4);
      const options = [...new Set(providedOptions)];
      if (!options.includes(answer)) options.push(answer);
      const answerNumber = Number(answer);
      let attempts = 0;
      while (options.length < optionCount && Number.isFinite(answerNumber) && attempts < 100) {
        attempts += 1;
        const offset = randomInt(-8, 8) || 1;
        const result = String(Math.max(0, answerNumber + offset));
        if (!options.includes(result)) options.push(result);
      }
      this.mathResultOptions = this.createChoiceOptions(shuffle(options), 20);
    },
    createRotateChallenge() {
      const step = Math.max(1, Number(this.rotateStep) || 30);
      this.rotation = randomInt(1, Math.max(1, Math.floor(360 / step) - 1)) * step;
    },
    createIconChallenge() {
      const pool = this.iconPool
        .map((item) => (typeof item === 'string' ? { value: item, label: item } : item))
        .filter((item) => item && item.value && item.label);
      const options = shuffle(pool).slice(0, Math.max(2, Number(this.iconOptionCount) || 6));
      const target = pool.find((item) => item.value === this.targetIcon || item.label === this.targetIcon)
        || options[0]
        || DEFAULT_ICON_POOL[0];
      if (!options.some((item) => item.value === target.value)) options[0] = target;
      const positions = [];
      this.iconTarget = target;
      this.iconOptions = shuffle(options).map((item, index) => {
        const position = this.createChoicePosition(positions, 16, options.length, index, 46);
        positions.push(position);
        return {
          id: `icon-${item.value}-${index}`,
          ...item,
          ...position,
          color: CHOICE_COLORS[randomInt(0, CHOICE_COLORS.length - 1)],
          rotate: randomInt(-15, 15),
        };
      });
    },
    createSequenceChallenge() {
      const options = [];
      while (options.length < 6) {
        const color = SEQUENCE_COLORS[randomInt(0, SEQUENCE_COLORS.length - 1)];
        const shape = SEQUENCE_SHAPES[randomInt(0, SEQUENCE_SHAPES.length - 1)];
        const id = `${color.value}-${shape.value}`;
        if (!options.some((item) => item.id === id)) {
          options.push({ id, color: color.value, shape: shape.value, label: `${color.label}${shape.label}` });
        }
      }
      const targetLength = Math.min(options.length, Math.max(2, Number(this.sequenceLength) || 3));
      this.sequenceTargets = shuffle(options).slice(0, targetLength);
      const positions = [];
      this.sequenceOptions = shuffle(options).map((item, index) => {
        const position = this.createChoicePosition(positions, 16, options.length, index, 48);
        positions.push(position);
        return { ...item, ...position };
      });
    },
    createDragChallenge() {
      const size = this.dragSize;
      const sceneWidth = this.getSceneWidth();
      const maxX = Math.max(16, sceneWidth - size - 16);
      const maxY = Math.max(16, this.safeHeight - size - 16);
      this.dragShape = DRAG_SHAPES[randomInt(0, DRAG_SHAPES.length - 1)];
      this.dragColor = CHOICE_COLORS[randomInt(0, CHOICE_COLORS.length - 1)];
      this.dragSource = { x: randomInt(16, Math.max(16, Math.round(maxX * 0.35))), y: randomInt(16, maxY) };
      let target = { x: maxX, y: maxY };
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const candidate = { x: randomInt(16, maxX), y: randomInt(16, maxY) };
        const xDistance = candidate.x - this.dragSource.x;
        const yDistance = candidate.y - this.dragSource.y;
        if (xDistance * xDistance + yDistance * yDistance >= (size * 1.7) ** 2) {
          target = candidate;
          break;
        }
      }
      this.dragTarget = target;
    },
    createChoiceOptions(values, top, optionSize) {
      const positions = [];
      return values.map((value, index) => {
        const position = this.createChoicePosition(positions, top, values.length, index, optionSize);
        positions.push(position);
        return {
          id: `${value}-${index}`,
          value,
          ...position,
          color: CHOICE_COLORS[randomInt(0, CHOICE_COLORS.length - 1)],
          rotate: randomInt(-18, 18),
        };
      });
    },
    createChoicePosition(positions, top, count, index, optionSize) {
      const fontSize = optionSize || (this.captchaType === 'math' ? this.mathChoiceFontSize : this.choiceFontSize);
      const hitAreaSize = Math.max(fontSize, 42);
      const sceneWidth = this.getSceneWidth();
      const sidePadding = 18;
      const minX = sidePadding;
      const maxX = Math.max(minX, sceneWidth - hitAreaSize - sidePadding);
      const minY = Math.min(top, this.safeHeight - hitAreaSize - 8);
      const maxY = Math.max(minY, this.safeHeight - hitAreaSize - 10);
      const minDistance = Math.max(hitAreaSize, 34);

      for (let attempt = 0; attempt < 100; attempt += 1) {
        const position = {
          x: randomInt(minX, maxX),
          y: randomInt(minY, maxY),
        };
        const available = positions.every((item) => {
          const xDistance = item.x - position.x;
          const yDistance = item.y - position.y;
          return xDistance * xDistance + yDistance * yDistance >= minDistance * minDistance;
        });
        if (available) return position;
      }

      const columns = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(count * 1.5))));
      const rows = Math.ceil(count / columns);
      const column = index % columns;
      const row = Math.floor(index / columns);
      return {
        x: Math.round(minX + ((maxX - minX) * (column + 0.5)) / columns),
        y: Math.round(minY + ((maxY - minY) * (row + 0.5)) / Math.max(1, rows)),
      };
    },
    getChoiceOptionStyle(item) {
      const isMath = this.captchaType === 'math';
      return {
        left: `${item.x}px`,
        top: `${item.y}px`,
        color: item.color,
        fontSize: `${isMath ? this.mathChoiceFontSize : this.choiceFontSize}px`,
        transform: `rotate(${item.rotate}deg)`,
      };
    },
    getIconOptionStyle(item) {
      return {
        left: `${item.x}px`,
        top: `${item.y}px`,
        color: item.color,
        transform: `rotate(${item.rotate}deg)`,
      };
    },
    getSequenceOptionStyle(item) {
      return {
        left: `${item.x}px`,
        top: `${item.y}px`,
        backgroundColor: item.color,
      };
    },
    getPathPoint(progress) {
      const width = this.getSceneWidth();
      const startX = 30;
      const endX = Math.max(startX, width - 30);
      const t = Math.min(1, Math.max(0, progress));
      return {
        x: startX + (endX - startX) * t,
        y: this.safeHeight - 28 - Math.sin(Math.PI * t) * this.safeHeight * 0.42,
      };
    },
    rotateCaptcha(direction) {
      if (this.disabled || this.verified) return;
      const step = Math.max(1, Number(this.rotateStep) || 30);
      this.rotation = ((this.rotation + direction * step) % 360 + 360) % 360;
      this.status = 'ready';
      this.message = '';
      if (this.rotation === 0) this.succeed();
    },
    selectIcon(item) {
      if (this.disabled || this.verified) return;
      if (item.value === this.iconTarget.value) {
        this.succeed();
      } else {
        this.fail('图标不正确，请重试');
      }
    },
    selectSequence(item) {
      if (this.disabled || this.verified || this.selectedSequenceIds.includes(item.id)) return;
      const selectedIndex = this.selectedSequenceIds.length;
      if (item.id !== this.sequenceTargets[selectedIndex]?.id) {
        this.fail('点击顺序不正确，请重试');
        return;
      }
      this.selectedSequenceIds.push(item.id);
      if (this.selectedSequenceIds.length === this.sequenceTargets.length) this.succeed();
    },
    startDrag(event) {
      if (this.disabled || this.verified) return;
      this.dragActive = true;
      this.status = 'ready';
      this.message = '';
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.dragStartOffset = { ...this.dragOffset };
      window.addEventListener('pointermove', this.moveDrag);
      window.addEventListener('pointerup', this.finishDrag);
      window.addEventListener('pointercancel', this.finishDrag);
    },
    moveDrag(event) {
      if (!this.dragActive) return;
      const sceneWidth = this.getSceneWidth();
      const maxX = Math.max(0, sceneWidth - this.dragSize - this.dragSource.x);
      const maxY = Math.max(0, this.safeHeight - this.dragSize - this.dragSource.y);
      const minX = -this.dragSource.x;
      const minY = -this.dragSource.y;
      this.dragOffset = {
        x: Math.min(maxX, Math.max(minX, this.dragStartOffset.x + event.clientX - this.dragStartX)),
        y: Math.min(maxY, Math.max(minY, this.dragStartOffset.y + event.clientY - this.dragStartY)),
      };
    },
    finishDrag() {
      if (!this.dragActive) return;
      const position = this.dragCurrentPosition;
      const xDistance = position.x - this.dragTarget.x;
      const yDistance = position.y - this.dragTarget.y;
      const tolerance = Math.max(4, Number(this.dragTolerance) || 16);
      this.stopDrag();
      if (xDistance * xDistance + yDistance * yDistance <= tolerance * tolerance) {
        this.succeed();
      } else {
        this.fail('位置不正确，请重试');
      }
    },
    stopDrag() {
      this.dragActive = false;
      if (typeof window === 'undefined') return;
      window.removeEventListener('pointermove', this.moveDrag);
      window.removeEventListener('pointerup', this.finishDrag);
      window.removeEventListener('pointercancel', this.finishDrag);
    },
    startPath(event) {
      if (this.disabled || this.verified) return;
      this.pathActive = true;
      this.status = 'ready';
      this.message = '';
      this.pathDragStartX = event.clientX;
      this.pathDragStartProgress = this.pathProgress;
      window.addEventListener('pointermove', this.movePath);
      window.addEventListener('pointerup', this.finishPath);
      window.addEventListener('pointercancel', this.finishPath);
    },
    movePath(event) {
      if (!this.pathActive) return;
      const usableWidth = Math.max(1, this.getSceneWidth() - 60);
      this.pathProgress = Math.min(1, Math.max(0, this.pathDragStartProgress + (event.clientX - this.pathDragStartX) / usableWidth));
    },
    finishPath() {
      if (!this.pathActive) return;
      const passed = this.pathProgress >= 0.95;
      this.stopPath();
      if (passed) {
        this.pathProgress = 1;
        this.succeed();
      } else {
        this.fail('请沿轨迹滑动到终点');
      }
    },
    stopPath() {
      this.pathActive = false;
      if (typeof window === 'undefined') return;
      window.removeEventListener('pointermove', this.movePath);
      window.removeEventListener('pointerup', this.finishPath);
      window.removeEventListener('pointercancel', this.finishPath);
    },
    startSlide(event) {
      if (this.disabled || this.verified) return;
      this.dragging = true;
      this.status = 'ready';
      this.message = '';
      this.dragStartX = event.clientX;
      this.dragStartOffset = this.sliderOffset;
      window.addEventListener('pointermove', this.moveSlide);
      window.addEventListener('pointerup', this.finishSlide);
      window.addEventListener('pointercancel', this.finishSlide);
    },
    moveSlide(event) {
      if (!this.dragging) return;
      const offset = this.dragStartOffset + event.clientX - this.dragStartX;
      this.sliderOffset = Math.min(this.sliderMax, Math.max(0, offset));
    },
    finishSlide() {
      if (!this.dragging) return;
      const passed = Math.abs(this.sliderOffset - this.sliderTarget) <= Math.max(1, Number(this.tolerance) || 6);
      this.stopSlide();
      if (passed) {
        this.succeed();
      } else {
        this.fail('位置不正确，请重试');
      }
    },
    stopSlide() {
      this.dragging = false;
      if (typeof window === 'undefined') return;
      window.removeEventListener('pointermove', this.moveSlide);
      window.removeEventListener('pointerup', this.finishSlide);
      window.removeEventListener('pointercancel', this.finishSlide);
    },
    selectText(item) {
      if (this.disabled || this.verified || this.selectedTextIds.includes(item.id)) return;
      const selectedIndex = this.selectedTextIds.length;
      if (item.value !== this.textTargets[selectedIndex]) {
        this.fail('点击顺序不正确，请重试');
        return;
      }
      this.selectedTextIds.push(item.id);
      if (this.selectedTextIds.length === this.textTargets.length) this.succeed();
    },
    selectMath(item) {
      if (this.disabled || this.verified) return;
      if (item.value === this.expectedMathAnswer) {
        this.succeed();
      } else {
        this.fail('结果不正确，请重试');
      }
    },
    verify(value) {
      if (this.captchaType !== 'math' || value === undefined) return;
      this.selectMath({ value: String(value).trim() });
    },
    succeed() {
      this.clearRefreshTimer();
      this.verified = true;
      this.status = 'success';
      this.message = '验证通过';
      this.updateValue(true);
      this.$emit('success', { type: this.captchaType });
    },
    fail(message) {
      this.status = 'error';
      this.message = message;
      this.$emit('fail', { type: this.captchaType, message });
      if (!this.autoRefresh) return;
      this.clearRefreshTimer();
      this.refreshTimer = window.setTimeout(() => this.refresh(), Math.max(0, Number(this.refreshDelay) || 0));
    },
    clearRefreshTimer() {
      if (this.refreshTimer === null) return;
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    },
    updateValue(value) {
      if (this.modelValue === value) return;
      this.$emit('update:modelValue', value);
      this.$emit('change', { value, type: this.captchaType });
    },
  },
});
</script>
