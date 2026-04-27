/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-rank",
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.option.title;
    },
    animation() {
      return this.option.animation !== false;
    },
    unit() {
      return this.option.unit || '';
    },
    showBar() {
      return this.option.showBar !== false;
    },
    barColor() {
      return this.option.barColor || '#409eff';
    },
    data() {
      return this.option.data || [];
    },
    maxValue() {
      if (this.data.length === 0) return 100;
      return Math.max(...this.data.map(item => item.value || 0));
    }
  },
  methods: {
    getRankClass(index) {
      if (index === 0) return 'is-first';
      if (index === 1) return 'is-second';
      if (index === 2) return 'is-third';
      return '';
    },
    getMedal(index) {
      const medals = ['🥇', '🥈', '🥉'];
      return medals[index] || '';
    },
    getPercentage(value) {
      return Math.round((value / this.maxValue) * 100);
    }
  }
});

exports.default = script;
