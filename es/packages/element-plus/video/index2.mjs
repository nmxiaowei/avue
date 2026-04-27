/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import RecordVideo from '../../../src/plugin/video/index.mjs';

var script = create({
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

export { script as default };
