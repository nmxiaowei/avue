/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_plugin_video_index = require('../../../src/plugin/video/index.js');

var script = src_core_create.default({
  name: 'video',
  emits: ['data-change', 'video-error'],
  props: {
    background: {
      type: String
    },
    width: {
      type: [String, Number],
      default: 500
    }
  },
  computed: {
    styleName () {
      return {
        width: this.setPx(this.width)
      }
    },
    imgStyleName () {
      return {
        width: this.setPx(this.width / 2)
      }
    },
    borderStyleName () {
      return {
        width: this.setPx(this.width / 15),
        height: this.setPx(this.width / 15),
        borderWidth: this.setPx(5)
      }
    },
  },
  data () {
    return {
      videoObj: null,
      reader: null,
      videoUnmounted: false
    }
  },
  mounted () {
    this.videoUnmounted = false;
    this.init();
  },
  beforeUnmount () {
    this.videoUnmounted = true;
    if (this.reader) {
      this.reader.onloadend = null;
      if (this.reader.readyState === FileReader.LOADING) {
        this.reader.abort();
      }
      this.reader = null;
    }
    if (this.videoObj) {
      if (this.videoObj.mediaRecorder) {
        this.videoObj.mediaRecorder.removeEventListener('stop', this.getData, false);
      }
      this.videoObj.destroy();
      this.videoObj = null;
    }
  },
  methods: {
    init () {
      const videoObj = new src_plugin_video_index.default(this.$refs.main);
      this.videoObj = videoObj;
      const videoPromise = videoObj.init();
      videoPromise
        .then(() => {
          if (
            this.videoUnmounted ||
            this.videoObj !== videoObj ||
            !videoObj.mediaRecorder
          ) {
            return;
          }
          videoObj.mediaRecorder.addEventListener('stop', this.getData, false);
        })
        .catch((error) => {
          if (!this.videoUnmounted && this.videoObj === videoObj) {
            this.$emit('video-error', error);
          }
        });
    },
    startRecord () {
      if (this.videoObj) this.videoObj.startRecord();
    },
    stopRecord () {
      if (this.videoObj) this.videoObj.stopRecord();
    },
    getData () {
      if (this.videoUnmounted || !this.videoObj) return;
      const blob = new Blob(this.videoObj.chunks, {
        type: 'video/mp4'
      });
      const reader = new FileReader();
      this.reader = reader;
      reader.onloadend = () => {
        if (this.videoUnmounted || this.reader !== reader) return;
        this.$emit('data-change', reader.result);
        this.reader = null;
      };
      reader.readAsDataURL(blob);
    }
  }
});

exports.default = script;
