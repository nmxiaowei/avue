<template>
  <div :class="b()">
    <el-input :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :placeholder="placeholder || '点击配置Cron表达式'"
              v-model="text"
              :size="size"
              ref="main"
              @clear="handleClear"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @click="handleShow"
              @focus="handleShow">
      <template #append>
        <el-button @click="handleShow" :disabled="disabled">
          <i class="el-icon-setting"></i>
        </el-button>
      </template>
    </el-input>
    
    <el-dialog class="avue-dialog"
               title="Cron表达式配置"
               :append-to-body="$AVUE.appendToBody"
               lock-scroll
               v-model="box"
               width="700px">
      <div :class="b('container')">
        <!-- Tabs 切换不同时间单位 -->
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="秒" name="second">
            <cron-tab v-model="cronData.second" :type="'second'" :max="59" />
          </el-tab-pane>
          <el-tab-pane label="分" name="minute">
            <cron-tab v-model="cronData.minute" :type="'minute'" :max="59" />
          </el-tab-pane>
          <el-tab-pane label="时" name="hour">
            <cron-tab v-model="cronData.hour" :type="'hour'" :max="23" />
          </el-tab-pane>
          <el-tab-pane label="日" name="day">
            <cron-tab v-model="cronData.day" :type="'day'" :max="31" :min="1" :show-not-specify="true" />
          </el-tab-pane>
          <el-tab-pane label="月" name="month">
            <cron-tab v-model="cronData.month" :type="'month'" :max="12" :min="1" />
          </el-tab-pane>
          <el-tab-pane label="周" name="week">
            <cron-tab v-model="cronData.week" :type="'week'" :max="7" :min="1" :show-not-specify="true" :is-week="true" />
          </el-tab-pane>
        </el-tabs>
        
        <!-- Cron 表达式预览 -->
        <div :class="b('result')">
          <div :class="b('expression')">
            <span :class="b('label')">Cron表达式：</span>
            <el-input v-model="cronExpression" size="small" style="width: 300px" @input="parseCronExpression" />
          </div>
          <div :class="b('preview')">
            <span :class="b('label')">最近执行时间：</span>
            <ul :class="b('times')">
              <li v-for="(time, index) in nextTimes" :key="index">{{ time }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="box = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

// Cron Tab 子组件
const CronTab = {
  name: 'CronTab',
  props: {
    modelValue: Object,
    type: String,
    max: Number,
    min: { type: Number, default: 0 },
    showNotSpecify: Boolean,
    isWeek: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    };
  },
  computed: {
    data: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); }
    },
    typeLabel() {
      const labels = { second: '秒', minute: '分', hour: '时', day: '日', month: '月', week: '周' };
      return labels[this.type] || '';
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
          <el-radio label="every">每{{ typeLabel }}执行</el-radio>
        </div>
        <div class="avue-input-cron__option" v-if="showNotSpecify">
          <el-radio label="notSpecify">不指定</el-radio>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="range">周期</el-radio>
          <span v-if="data.type === 'range'" class="avue-input-cron__inline">
            从
            <el-input-number v-model="data.rangeStart" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('rangeStart', val)" />
            到
            <el-input-number v-model="data.rangeEnd" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('rangeEnd', val)" />
            {{ typeLabel }}
          </span>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="step">从</el-radio>
          <span v-if="data.type === 'step'" class="avue-input-cron__inline">
            <el-input-number v-model="data.stepStart" :min="min" :max="max" size="small" style="width:80px" @change="val => updateData('stepStart', val)" />
            {{ typeLabel }}开始，每
            <el-input-number v-model="data.stepValue" :min="1" :max="max" size="small" style="width:80px" @change="val => updateData('stepValue', val)" />
            {{ typeLabel }}执行一次
          </span>
        </div>
        <div class="avue-input-cron__option">
          <el-radio label="specify">指定</el-radio>
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

export default create({
  name: "input-cron",
  components: { CronTab },
  mixins: [props(), event()],
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
        if (parts.length < 6) return ['表达式格式错误'];
        
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
        return times.length > 0 ? times : ['无法计算执行时间'];
      } catch (e) {
        return ['表达式解析错误'];
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
</script>
