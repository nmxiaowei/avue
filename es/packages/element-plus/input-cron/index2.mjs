/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import locale from '../../../src/core/locale.mjs';

// Cron Tab 子组件
const CronTab = {
  name: 'CronTab',
  mixins: [locale],
  props: {
    modelValue: Object,
    type: String,
    max: Number,
    min: { type: Number, default: 0 },
    showNotSpecify: Boolean,
    isWeek: Boolean
  },
  emits: ['update:modelValue'],
  computed: {
    data: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); }
    },
    weekLabels() {
      const labels = this.t('cron.weekLabels');
      return Array.isArray(labels) ? labels : [];
    },
    typeLabel() {
      return this.t(`cron.units.${this.type}`);
    },
    options() {
      const list = [];
      for (let i = this.min; i <= this.max; i++) {
        list.push({
          value: i,
          label: this.isWeek ? this.weekLabels[i - 1] : String(i)
        });
      }
      return list;
    }
  },
  methods: {
    updateData(key, value) {
      this.$emit('update:modelValue', { ...this.data, [key]: value });
    }
  },
  template: `
    <div class="avue-input-cron__tab">
      <el-radio-group :model-value="data.type" @update:model-value="val => updateData('type', val)">
        <div class="avue-input-cron__option">
          <el-radio label="every">{{ t('cron.every', { label: typeLabel }) }}</el-radio>
        </div>
        <div class="avue-input-cron__option" v-if="showNotSpecify">
          <el-radio label="notSpecify">{{ t('cron.notSpecify') }}</el-radio>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="range">{{ t('cron.range') }}</el-radio>
          <span v-if="data.type === 'range'" class="avue-input-cron__inline">
            {{ t('cron.from') }}
            <el-input-number v-model="data.rangeStart" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('rangeStart', val)" />
            {{ t('cron.to') }}
            <el-input-number v-model="data.rangeEnd" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('rangeEnd', val)" />
            {{ typeLabel }}
          </span>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="step">{{ t('cron.step') }}</el-radio>
          <span v-if="data.type === 'step'" class="avue-input-cron__inline">
            {{ t('cron.startingFrom') }}
            <el-input-number v-model="data.stepStart" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('stepStart', val)" />
            {{ typeLabel }}
            {{ t('cron.everyInterval') }}
            <el-input-number v-model="data.stepValue" :min="1" :max="max" size="small" style="width:80px" @change="val => updateData('stepValue', val)" />
            {{ typeLabel }}
          </span>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="specify">{{ t('cron.specify') }}</el-radio>
        </div>
      </el-radio-group>
      <div v-if="data.type === 'specify'" class="avue-input-cron__specify">
        <el-checkbox-group :model-value="data.values" @update:model-value="val => updateData('values', val)">
          <el-checkbox v-for="opt in options" :key="opt.value" :label="opt.value">{{ opt.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  `
};

var script = create({
  name: "input-cron",
  components: { CronTab },
  mixins: [props(), event(), locale],
  props: {
    prefixIcon: String,
    suffixIcon: String,
    dialogWidth: { type: String, default: '700px' }
  },
  data() {
    return {
      box: false,
      activeTab: 'second',
      cronData: {
        second: { type: 'every', rangeStart: 0, rangeEnd: 59, stepStart: 0, stepValue: 1, values: [] },
        minute: { type: 'every', rangeStart: 0, rangeEnd: 59, stepStart: 0, stepValue: 1, values: [] },
        hour: { type: 'every', rangeStart: 0, rangeEnd: 23, stepStart: 0, stepValue: 1, values: [] },
        day: { type: 'every', rangeStart: 1, rangeEnd: 31, stepStart: 1, stepValue: 1, values: [] },
        month: { type: 'every', rangeStart: 1, rangeEnd: 12, stepStart: 1, stepValue: 1, values: [] },
        week: { type: 'notSpecify', rangeStart: 1, rangeEnd: 7, stepStart: 1, stepValue: 1, values: [] }
      }
    };
  },
  computed: {
    cronExpression: {
      get() {
        return this.generateCron();
      },
      set(val) {
        // 手动输入时解析
      }
    },
    nextTimes() {
      return this.calculateNextTimes(this.cronExpression, 5);
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        if (val) {
          this.parseCronExpression(val);
        }
      }
    }
  },
  methods: {
    handleClear() {
      this.box = false;
    },
    handleShow() {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.box = true;
    },
    handleConfirm() {
      this.text = this.cronExpression;
      this.box = false;
    },
    generateCron() {
      const parts = ['second', 'minute', 'hour', 'day', 'month', 'week'].map(key => {
        return this.generatePart(this.cronData[key], key);
      });
      return parts.join(' ');
    },
    generatePart(data, type) {
      switch (data.type) {
        case 'every':
          return '*';
        case 'notSpecify':
          return '?';
        case 'range':
          return `${data.rangeStart}-${data.rangeEnd}`;
        case 'step':
          return `${data.stepStart}/${data.stepValue}`;
        case 'specify':
          return data.values.length > 0 ? data.values.sort((a, b) => a - b).join(',') : '*';
        default:
          return '*';
      }
    },
    parseCronExpression(expression) {
      if (!expression) return;
      const parts = expression.trim().split(/\s+/);
      if (parts.length < 6) return;
      
      const keys = ['second', 'minute', 'hour', 'day', 'month', 'week'];
      keys.forEach((key, index) => {
        this.cronData[key] = this.parsePart(parts[index], key);
      });
    },
    parsePart(part, type) {
      const defaults = {
        second: { rangeStart: 0, rangeEnd: 59, stepStart: 0, stepValue: 1 },
        minute: { rangeStart: 0, rangeEnd: 59, stepStart: 0, stepValue: 1 },
        hour: { rangeStart: 0, rangeEnd: 23, stepStart: 0, stepValue: 1 },
        day: { rangeStart: 1, rangeEnd: 31, stepStart: 1, stepValue: 1 },
        month: { rangeStart: 1, rangeEnd: 12, stepStart: 1, stepValue: 1 },
        week: { rangeStart: 1, rangeEnd: 7, stepStart: 1, stepValue: 1 }
      };
      
      const base = { ...defaults[type], values: [] };
      
      if (part === '*') {
        return { ...base, type: 'every' };
      }
      if (part === '?') {
        return { ...base, type: 'notSpecify' };
      }
      if (part.includes('/')) {
        const [start, step] = part.split('/');
        return { ...base, type: 'step', stepStart: parseInt(start) || 0, stepValue: parseInt(step) || 1 };
      }
      if (part.includes('-')) {
        const [start, end] = part.split('-');
        return { ...base, type: 'range', rangeStart: parseInt(start), rangeEnd: parseInt(end) };
      }
      if (part.includes(',')) {
        const values = part.split(',').map(v => parseInt(v));
        return { ...base, type: 'specify', values };
      }
      // 单个数字
      const num = parseInt(part);
      if (!isNaN(num)) {
        return { ...base, type: 'specify', values: [num] };
      }
      
      return { ...base, type: 'every' };
    },
    calculateNextTimes(cron, count) {
      if (!cron) return [];
      try {
        const times = [];
        const parts = cron.split(/\s+/);
        if (parts.length < 6) return [this.t('cron.invalidFormat')];
        
        let current = new Date();
        for (let i = 0; i < count && times.length < count; i++) {
          current = this.getNextTime(current, parts);
          if (current) {
            times.push(this.formatDate(current));
            current = new Date(current.getTime() + 1000);
          } else {
            break;
          }
        }
        return times.length > 0 ? times : [this.t('cron.noNextTimes')];
      } catch (e) {
        return [this.t('cron.parseError')];
      }
    },
    getNextTime(date, parts) {
      // 简化的下次执行时间计算
      const [second, minute, hour, day, month, week] = parts;
      let next = new Date(date);
      
      // 最多尝试365天
      for (let i = 0; i < 365 * 24 * 60; i++) {
        next.setSeconds(next.getSeconds() + 1);
        if (this.matchCron(next, parts)) {
          return next;
        }
        // 跳过不匹配的分钟
        if (!this.matchPart(next.getMinutes(), minute)) {
          next.setSeconds(0);
          continue;
        }
      }
      return null;
    },
    matchCron(date, parts) {
      const [second, minute, hour, day, month, week] = parts;
      return this.matchPart(date.getSeconds(), second) &&
             this.matchPart(date.getMinutes(), minute) &&
             this.matchPart(date.getHours(), hour) &&
             this.matchPart(date.getDate(), day) &&
             this.matchPart(date.getMonth() + 1, month) &&
             this.matchPart(date.getDay() || 7, week);
    },
    matchPart(value, pattern) {
      if (pattern === '*' || pattern === '?') return true;
      if (pattern.includes('/')) {
        const [start, step] = pattern.split('/').map(v => parseInt(v) || 0);
        return (value - start) % step === 0 && value >= start;
      }
      if (pattern.includes('-')) {
        const [min, max] = pattern.split('-').map(v => parseInt(v));
        return value >= min && value <= max;
      }
      if (pattern.includes(',')) {
        return pattern.split(',').map(v => parseInt(v)).includes(value);
      }
      return parseInt(pattern) === value;
    },
    formatDate(date) {
      const pad = n => String(n).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }
  }
});

export { script as default };
