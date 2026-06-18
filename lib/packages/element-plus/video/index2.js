/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_plugin_video_index = require('../../../src/plugin/video/index.js');

var script = src_core_create.default({
  name: 'video',
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
      videoObj: null
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.videoObj = new src_plugin_video_index.default(this.$refs.main);
      const videoPromise = this.videoObj.init();
      videoPromise
        .then(() => {
          this.videoObj.mediaRecorder.addEventListener('stop', this.getData, false);
        });
    },
    startRecord () {
      this.videoObj.startRecord();
    },
    stopRecord () {
      this.videoObj.stopRecord();
    },
    getData () {
      const blob = new Blob(this.videoObj.chunks, {
        type: 'video/mp4'
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener('loadend', () => {
        var video_base64 = reader.result;
        this.$emit('data-change', video_base64);
      });
    }
  }
});

exports.default = script;
