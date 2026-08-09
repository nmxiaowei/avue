<template>
  <div :class="b({ ready: isReady, recording: isRecording })"
       :style="styleName">
    <div v-if="showBorder"
         :class="b('border')"
         aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <video ref="main"
           :class="[b('main'), { [b('main--mirror')]: mirror }]"
           :autoplay="autoplay"
           :muted="muted"
           playsinline
           @error="handleVideoError"></video>
    <img v-if="background"
         :class="b('guide')"
         :src="background"
         alt=""
         aria-hidden="true">
    <div v-if="showStatus && !isReady"
         :class="b('status')"
         role="status">
      <span :class="b('status-dot')"></span>
      {{ statusText }}
      <el-button v-if="error"
                 text
                 type="primary"
                 size="small"
                 @click="retry">重试</el-button>
    </div>
    <slot name="overlay"
          :ready="isReady"
          :recording="isRecording"
          :error="error"></slot>
  </div>
</template>

<script>
import create from "core/create";
import RecordVideo from 'plugin/video/'

export default create({
  name: 'video',
  emits: [
    'data-change',
    'photo-change',
    'video-error',
    'ready',
    'record-start',
    'record-stop',
    'status-change'
  ],
  props: {
    background: String,
    width: {
      type: [String, Number],
      default: 500
    },
    height: {
      type: [String, Number],
      default: ''
    },
    aspectRatio: {
      type: [String, Number],
      default: '16 / 9'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    audio: {
      type: [Boolean, Object],
      default: false
    },
    video: {
      type: [Boolean, Object],
      default: true
    },
    mimeType: String,
    mirror: Boolean,
    showBorder: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    styleName () {
      const style = {
        width: this.setPx(this.width),
        '--avue-video-aspect-ratio': this.aspectRatio
      }
      if (this.height !== '') {
        style.height = this.setPx(this.height)
      }
      return style
    },
    constraints () {
      return {
        audio: this.audio,
        video: this.video
      }
    },
    statusText () {
      if (this.error) return this.error.message || '摄像头不可用'
      if (this.isLoading) return '正在连接摄像头…'
      return this.autoStart ? '等待摄像头就绪…' : '点击开始录制以启用摄像头'
    }
  },
  data () {
    return {
      videoObj: null,
      reader: null,
      videoUnmounted: false,
      isReady: false,
      isLoading: false,
      isRecording: false,
      error: null
    }
  },
  mounted () {
    this.videoUnmounted = false;
    if (this.autoStart) this.init();
  },
  beforeUnmount () {
    this.videoUnmounted = true;
    this.clearReader();
    this.destroyVideo();
  },
  methods: {
    init () {
      if (this.isLoading) return Promise.resolve(false);
      this.destroyVideo();
      this.error = null;
      this.isReady = false;
      this.isRecording = false;
      this.isLoading = true;
      this.$emit('status-change', 'loading');

      const videoObj = new RecordVideo(this.$refs.main, {
        constraints: this.constraints,
        mimeType: this.mimeType
      });
      this.videoObj = videoObj;
      return videoObj.init()
        .then((stream) => {
          if (this.videoUnmounted || this.videoObj !== videoObj) return false;
          videoObj.mediaRecorder.addEventListener('stop', this.handleRecordStop, false);
          this.isReady = true;
          this.$emit('ready', stream);
          this.$emit('status-change', 'ready');
          return true;
        })
        .catch((error) => {
          if (!this.videoUnmounted && this.videoObj === videoObj) {
            this.error = error;
            this.$emit('video-error', error);
            this.$emit('status-change', 'error');
          }
          return false;
        })
        .finally(() => {
          if (!this.videoUnmounted && this.videoObj === videoObj) {
            this.isLoading = false;
          }
        });
    },
    retry () {
      return this.init();
    },
    startRecord () {
      if (!this.isReady) {
        return this.init().then((ready) => ready && this.startRecord());
      }
      if (!this.videoObj || !this.videoObj.startRecord()) return false;
      this.isRecording = true;
      this.$emit('record-start');
      this.$emit('status-change', 'recording');
      return true;
    },
    stopRecord () {
      return !!(this.videoObj && this.videoObj.stopRecord());
    },
    handleRecordStop () {
      if (this.videoUnmounted) return;
      this.isRecording = false;
      this.$emit('record-stop');
      this.$emit('status-change', 'ready');
      this.getData();
    },
    getData () {
      if (this.videoUnmounted || !this.videoObj) return Promise.resolve(null);
      const blob = this.videoObj.getBlob();
      if (!blob || !blob.size) return Promise.resolve(null);

      this.clearReader();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        this.reader = reader;
        reader.onload = () => {
          if (this.videoUnmounted || this.reader !== reader) return;
          this.$emit('data-change', reader.result, blob);
          this.reader = null;
          resolve(reader.result);
        };
        reader.onerror = () => {
          if (this.reader === reader) this.reader = null;
          reject(reader.error);
        };
        reader.readAsDataURL(blob);
      });
    },
    takePhoto (type = 'image/png', quality) {
      if (!this.videoObj) return null;
      const data = this.videoObj.captureFrame(type, quality);
      if (data) this.$emit('photo-change', data);
      return data;
    },
    // 保留旧示例中的调用名称，返回当前画面截图。
    getRecord () {
      return this.takePhoto('image/png');
    },
    handleVideoError (event) {
      if (this.videoUnmounted || this.error) return;
      const error = new Error('视频流播放失败');
      error.event = event;
      this.error = error;
      this.$emit('video-error', error);
      this.$emit('status-change', 'error');
    },
    clearReader () {
      if (!this.reader) return;
      this.reader.onload = null;
      this.reader.onerror = null;
      if (this.reader.readyState === FileReader.LOADING) this.reader.abort();
      this.reader = null;
    },
    destroyVideo () {
      if (!this.videoObj) return;
      if (this.videoObj.mediaRecorder) {
        this.videoObj.mediaRecorder.removeEventListener('stop', this.handleRecordStop, false);
      }
      this.videoObj.destroy();
      this.videoObj = null;
    }
  }
})
</script>
