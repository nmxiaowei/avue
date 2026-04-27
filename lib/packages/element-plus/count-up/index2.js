/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CountUp = require('countup.js');
var src_core_create = require('../../../src/core/create.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var CountUp__default = /*#__PURE__*/_interopDefault(CountUp);

var script = src_core_create.default({
  name: "count-up",
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      required: true
    },
    decimals: {
      type: Number,
      required: false,
      default: 0
    },
    duration: {
      type: Number,
      required: false,
      default: 2
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {};
      }
    },
    callback: {
      type: Function,
      required: false,
      default: () => { }
    }
  },
  data () {
    return {
      c: null
    };
  },
  watch: {
    decimals () {
      if (this.c && this.c.update) {
        this.c.update(this.end);
      }
    },
    end (value) {
      if (this.c && this.c.update) {
        this.c.update(value);
      }
    }
  },
  mounted () {
    if (this.animation) {
      this.init();
    }

  },
  methods: {
    init () {
      if (!this.c) {
        this.c = new CountUp__default.default(
          this.$el,
          this.start,
          this.end,
          this.decimals,
          this.duration,
          this.options
        );
        this.c.start();
      }
    },
    pauseResume () {
      if (this.c && this.c.pauseResume) {
        this.c.pauseResume();
      }
    },
    reset () {
      if (this.c && this.c.reset) {
        this.c.reset();
      }
    },
    update (newEndVal) {
      if (this.c && this.c.update) {
        this.c.update(newEndVal);
      }
    },
    destroy () {
      this.c = null;
    }
  },
  beforeUnmount () {
    this.destroy();
  },

});

exports.default = script;
