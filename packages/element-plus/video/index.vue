<template>
  <div :class="b()"
       :style="styleName">
    <div :class="b('border')">
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
    </div>
    <img :style="imgStyleName"
         :class="b('img')"
         :src="background" />
    <video :class="b('main')"
           ref="main"
           autoplay
           muted></video>
  </div>
</template>

<script>
import create from "core/create";
import RecordVideo from 'plugin/video/'
export default create({
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
      this.videoObj = new RecordVideo(this.$refs.main);
      const videoPromise = this.videoObj.init();
      videoPromise
        .then(() => {
          this.videoObj.mediaRecorder.addEventListener('stop', this.getData, false);
        })
    },
    startRecord () {
      this.videoObj.startRecord()
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
        this.$emit('data-change', video_base64)
      });
    }
  }
})
</script>

