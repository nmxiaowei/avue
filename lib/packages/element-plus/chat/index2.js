/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');
var dayjs_min = require('../../../_virtual/dayjs.min.js');

var script = src_core_create.default({
  name: "chat",
  mixins: [src_core_locale.default],
  data () {
    return {
      upload: {
        box: false,
        src: "",
        type: '',
        title: '',
      },
      visible: false,
      imgSrc: '',
      videoSrc: '',
      audioSrc: '',
      keys: "",
      show: false
    }
  },
  props: {
    size: String,
    beforeOpen: Function,
    tools: {
      type: Object,
      default: () => {
        return {
          img: true,
          video: true,
          file: true
        }
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 320
    },
    height: {
      type: [String, Number],
      default: 520
    },
    modelValue: {
      type: String
    },
    notice: {
      type: Boolean,
      default: true
    },
    audio: {
      type: Array,
      default: () => {
        return [
          'https://www.helloweba.net/demo/notifysound/notify.ogg',
          'https://www.helloweba.net/demo/notifysound/notify.mp3',
          'https://www.helloweba.net/demo/notifysound/notify.wav'
        ]
      }
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    keylist: {
      type: Array,
      default: () => {
        return []
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    msg: {
      get () {
        return this.modelValue
      },
      set (val) {
        this.$emit('update:modelValue', val);
        this.$emit('change', val);
      }
    },
    heightStyleName () {
      return {
        height: this.setPx(this.height)
      }
    },
    widthStyleName () {
      return {
        width: this.setPx(this.width),
      }
    },
    msgActive () {
      return !this.validatenull(this.msg.replace(/[\r\n]/g, ""))
    },
    messagePlaceholder () {
      return this.placeholder || this.t('chat.inputPlaceholder');
    }
  },
  methods: {
    uploadSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.upload.box = false;
          this.$emit('submit', this.getDetail(this.upload));
        }
      });
    },
    handleUpload (type) {
      this.upload.type = type;
      this.upload.src = '';
      if (type === 'img') {
        this.upload.title = this.t('chat.uploadImageTitle');
      } else if (type === 'video') {
        this.upload.title = this.t('chat.uploadVideoTitle');
      } else if (type === 'file') {
        this.upload.title = this.t('chat.uploadFileTitle');
      }
      this.upload.box = true;
    },
    handleClose (done) {
      this.imgSrc = undefined;
      this.videoSrc = undefined;
      this.audioSrc = undefined;
      done();
    },
    addKey () {
      if (this.keys !== '') {
        this.$emit('keyadd', this.keys);
        this.keys = '';
      }
      this.visible = false;

    },
    sendKey (key) {
      this.$emit('keysend', key);
    },
    getAudio () {
      this.$refs.chatAudio.play();
    },
    getNotification (text) {
      const safe = this;
      const NotificationInstance = Notification || window.Notification;
      if (!!NotificationInstance) {
        const permissionNow = NotificationInstance.permission;
        if (permissionNow === 'granted') {//允许通知
          CreatNotification();
        } else if (permissionNow === 'denied') {
          console.log(this.t('chat.notificationDenied'));
        } else {
          setPermission();
        }
        function setPermission () {
          //请求获取通知权限
          NotificationInstance.requestPermission(function (PERMISSION) {
            if (PERMISSION === 'granted') {
              CreatNotification();
            } else {
              console.log(safe.t('chat.notificationRejected'));
            }
          });
        }
        function CreatNotification () {
          const n = new Notification(safe.config.name, {
            body: text,
            icon: safe.config.img
          });
          n.onshow = function () {
            safe.getAudio();
            setTimeout(() => {
              n.close();
            }, 2500);
          };
          n.onclick = function (e) {
            n.close();
          };
        }
      }
    },
    //mine为'我'的对话
    //text为内容
    pushMsg (params = {}) {
      const mine = params.mine === true ? true : false;
      const text = params.text || {};
      const date = params.date;
      const textObj = {
        date: date || dayjs_min.default().format('YYYY-MM-DD HH:mm:ss'),
        text: (() => {
          if (typeof (text) != 'object') {
            return {
              text: text
            }
          }
          return text
        })(),
        mine: mine,
        img: mine ? this.config.myImg : this.config.img,
        name: mine ? this.config.myName : this.config.name,
      };
      this.list.push(textObj);
      setTimeout(() => {
        this.setScroll();
      }, 50);

    },
    setScroll (count) {
      //滚动条一直处于下方
      this.$nextTick(() => {
        this.$refs.main.scrollTop = count || this.$refs.main.scrollHeight;
      });
    },
    //用户主动发送
    handleSend () {
      if (this.msgActive) {
        this.$emit('submit');
      }
    },
    //选择列表
    handleItemMsg (item) {
      this.$emit('submit', item.ask);
    },
    //处理排版
    handleDetail (html = '') {
      let result = html;
      setTimeout(() => {
        const list = this.$refs.content || [];
        list.forEach(ele => {
          for (let i = 0; i < ele.children.length; i++) {
            const child = ele.children[i];
            if (child.getAttribute('data-flag') != 0) {
              child.setAttribute('data-flag', 0);
              child.onclick = () => {
                this.handleEvent(child.dataset);
              };
              if (child.tagName === 'IMG') {
                child.className = 'web__msg--img';
                child.src = child.getAttribute('data-src');
              } else if (child.tagName === 'VIDEO') {
                child.className = 'web__msg--video';
                child.src = child.getAttribute('data-src');
              } else if (child.tagName === 'AUDIO') {
                child.className = 'web__msg--audio';
                child.controls = 'controls';
                child.src = child.getAttribute('data-src');
              } else if (child.tagName === 'FILE') {
                child.className = 'web__msg--file';
                child.innerHTML = `<h2>${this.t('chat.fileLabel')}</h2><span>${child.getAttribute('data-name')}</span>`;
              } else if (child.tagName === 'MAP') {
                child.className = 'web__msg--file web__msg--map';
                child.innerHTML = `<h2>${this.t('chat.mapLabel')}</h2><span>${child.getAttribute('data-longitude')} , ${child.getAttribute('data-latitude')}<br />${child.getAttribute('data-address')}</span>`;
              }
              this.setScroll();
            }
          }
        });
      }, 0);
      return result;
    },
    getDetail (params = {}) {
      const { type, src, name, longitude, latitude, address } = params;
      if (type === 'img') {
        return `<img data-type="IMG" data-src="${src}"  />`
      } else if (type === 'video') {
        return `<video data-type="VIDEO"  data-src="${src}"></video>`
      } else if (type === 'audio') {
        return `<audio data-type="AUDIO"  data-src="${src}"></audio>`
      } else if (type === 'file') {
        return `<file data-type="FILE" data-name="${name}" data-src="${src}"></file>`
      } else if (type === 'map') {
        return `<map data-type="MAP" data-src="${src}" data-address="${address} "data-latitude="${latitude}" data-longitude="${longitude}"></map>`
      }
    },
    //处理事件
    handleEvent (params) {
      const callback = () => {
        if (params.type === 'IMG') {
          this.imgSrc = params.src;
          this.show = true;
        } else if (params.type === 'VIDEO') {
          this.videoSrc = params.src;
          this.show = true;
        } else if (params.type === 'AUDIO') {
          this.audioSrc = params.src;
          this.show = true;
        } else if (params.type === 'FILE') {
          window.open(params.src);
        }
      };
      if (typeof this.beforeOpen === 'function') {
        this.beforeOpen(params, callback);
      } else {
        callback();
      }

    },
    rootSendMsg (msg) {
      this.pushMsg({
        text: msg
      });
      if (this.notice) {
        this.getNotification(msg.text || msg);
      }
    }
  }
});

exports.default = script;
