/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');
var dayjs_min = require('../../../_virtual/dayjs.min.js');

const allowedTags = new Set([
  'A', 'AUDIO', 'B', 'BR', 'CODE', 'EM', 'FILE', 'I', 'IMG', 'LI', 'MAP',
  'OL', 'P', 'PRE', 'STRONG', 'UL', 'VIDEO'
]);

var script = src_core_create.default({
  name: "chat",
  mixins: [src_core_locale.default],
  emits: [
    'update:modelValue', 'change', 'submit', 'keyadd', 'keysend', 'message-add',
    'upload', 'preview', 'notification-error'
  ],
  data () {
    return {
      upload: {
        box: false,
        src: '',
        name: '',
        type: '',
        title: ''
      },
      visible: false,
      imgSrc: '',
      videoSrc: '',
      audioSrc: '',
      keys: '',
      show: false,
      localMessageId: 0,
      messageKeyMap: new WeakMap()
    }
  },
  props: {
    size: String,
    beforeOpen: Function,
    tools: {
      type: Object,
      default: () => ({ img: true, video: true, file: true })
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
      type: String,
      default: ''
    },
    notice: {
      type: Boolean,
      default: true
    },
    audio: {
      type: Array,
      default: () => [
        'https://www.helloweba.net/demo/notifysound/notify.ogg',
        'https://www.helloweba.net/demo/notifysound/notify.mp3',
        'https://www.helloweba.net/demo/notifysound/notify.wav'
      ]
    },
    config: {
      type: Object,
      default: () => ({})
    },
    keylist: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    clearOnSend: Boolean,
    disabled: Boolean,
    loading: Boolean,
    sanitize: Function
  },
  computed: {
    msg: {
      get () {
        return this.modelValue || ''
      },
      set (val) {
        this.$emit('update:modelValue', val);
        this.$emit('change', val);
      }
    },
    heightStyleName () {
      return { height: this.setPx(this.height) }
    },
    widthStyleName () {
      return { width: this.setPx(this.width) }
    },
    msgActive () {
      return !this.validatenull(this.msg.replace(/[\r\n]/g, '').trim())
    },
    messagePlaceholder () {
      return this.placeholder || this.t('chat.inputPlaceholder')
    },
    headerInitial () {
      return this.getInitial(this.config.name || '客服')
    }
  },
  watch: {
    list: {
      handler () {
        if (this.autoScroll) this.setScroll();
      },
      deep: true
    }
  },
  mounted () {
    if (this.autoScroll) this.setScroll();
  },
  methods: {
    uploadSubmit () {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return;
        const detail = this.getDetail(this.upload);
        this.upload.box = false;
        this.$emit('upload', { ...this.upload, detail });
        this.$emit('submit', detail);
      });
    },
    handleUpload (type) {
      this.upload.type = type;
      this.upload.src = '';
      this.upload.name = '';
      const titles = {
        img: this.t('chat.uploadImageTitle'),
        video: this.t('chat.uploadVideoTitle'),
        file: this.t('chat.uploadFileTitle')
      };
      this.upload.title = titles[type] || '';
      this.upload.box = true;
    },
    addKey () {
      const key = this.keys.trim();
      if (key) this.$emit('keyadd', key);
      this.keys = '';
      this.visible = false;
    },
    sendKey (key) {
      this.$emit('keysend', key);
    },
    getAudio () {
      const audio = this.$refs.chatAudio;
      if (!audio) return;
      const result = audio.play();
      if (result && typeof result.catch === 'function') result.catch(() => undefined);
    },
    getNotification (text) {
      const NotificationInstance = typeof window !== 'undefined' ? window.Notification : undefined;
      if (!NotificationInstance) return;
      const showNotification = () => {
        const notification = new NotificationInstance(this.config.name || '新消息', {
          body: typeof text === 'string' ? text : (text && text.text) || '',
          icon: this.config.img
        });
        notification.onshow = () => {
          this.getAudio();
          setTimeout(() => notification.close(), 2500);
        };
        notification.onclick = () => notification.close();
      };
      if (NotificationInstance.permission === 'granted') {
        showNotification();
      } else if (NotificationInstance.permission === 'default') {
        NotificationInstance.requestPermission()
          .then((permission) => permission === 'granted' && showNotification())
          .catch((error) => this.$emit('notification-error', error));
      }
    },
    pushMsg (params = {}) {
      const mine = params.mine === true;
      const content = params.text || {};
      const message = {
        id: params.id || `chat-${Date.now()}-${this.localMessageId++}`,
        date: params.date || dayjs_min.default().format('YYYY-MM-DD HH:mm:ss'),
        text: typeof content === 'object' ? content : { text: content },
        mine,
        img: params.img || (mine ? this.config.myImg : this.config.img),
        name: params.name || (mine ? this.config.myName : this.config.name)
      };
      this.list.push(message);
      this.$emit('message-add', message);
      if (this.autoScroll) this.setScroll();
      return message;
    },
    setScroll (top) {
      this.$nextTick(() => {
        const main = this.$refs.main;
        if (main) main.scrollTop = top === undefined ? main.scrollHeight : top;
      });
    },
    handleSend () {
      if (!this.msgActive || this.disabled || this.loading) return;
      const message = this.msg;
      this.$emit('submit', message);
      if (this.clearOnSend) this.msg = '';
    },
    handleItemMsg (item) {
      this.$emit('submit', item.ask || item.text || '');
    },
    getMessageText (item) {
      return item && item.text ? item.text.text || '' : '';
    },
    getMessageKey (item) {
      if (item.id || item.key) return item.id || item.key;
      if (item && typeof item === 'object') {
        if (!this.messageKeyMap.has(item)) {
          this.messageKeyMap.set(item, `chat-message-${this.localMessageId++}`);
        }
        return this.messageKeyMap.get(item);
      }
      return `chat-message-${String(item)}`;
    },
    getInitial (value) {
      return String(value || '?').trim().slice(0, 1).toUpperCase();
    },
    truncateKey (value) {
      const text = String(value || '');
      return text.length > 24 ? `${text.slice(0, 24)}…` : text;
    },
    formatContent (content = '') {
      const html = typeof this.sanitize === 'function'
        ? this.sanitize(String(content))
        : String(content);
      if (typeof document === 'undefined') return this.escapeHtml(html);

      const container = document.createElement('div');
      container.innerHTML = html;
      Array.from(container.querySelectorAll('*')).forEach((node) => {
        const tag = node.tagName;
        if (!allowedTags.has(tag)) {
          node.replaceWith(document.createTextNode(node.textContent || ''));
          return;
        }
        Array.from(node.attributes).forEach((attribute) => {
          const allowed = attribute.name.startsWith('data-') ||
            (tag === 'A' && ['href', 'target', 'rel'].includes(attribute.name));
          if (!allowed) node.removeAttribute(attribute.name);
        });
        this.decorateContentNode(node, tag);
      });
      return container.innerHTML;
    },
    decorateContentNode (node, tag) {
      const source = this.safeUrl(node.getAttribute('data-src'));
      if (tag === 'IMG') {
        node.className = 'web__msg--img';
        if (source) node.setAttribute('src', source);
        node.setAttribute('loading', 'lazy');
      } else if (tag === 'VIDEO') {
        node.className = 'web__msg--video';
        if (source) node.setAttribute('src', source);
        node.setAttribute('preload', 'metadata');
      } else if (tag === 'AUDIO') {
        node.className = 'web__msg--audio';
        if (source) node.setAttribute('src', source);
        node.setAttribute('controls', 'controls');
      } else if (tag === 'FILE' || tag === 'MAP') {
        node.className = `web__msg--file${tag === 'MAP' ? ' web__msg--map' : ''}`;
        node.textContent = '';
        const title = document.createElement('h2');
        title.textContent = tag === 'MAP' ? this.t('chat.mapLabel') : this.t('chat.fileLabel');
        const detail = document.createElement('span');
        detail.textContent = tag === 'MAP'
          ? `${node.getAttribute('data-longitude') || ''}, ${node.getAttribute('data-latitude') || ''} ${node.getAttribute('data-address') || ''}`
          : node.getAttribute('data-name') || '';
        node.append(title, detail);
      } else if (tag === 'A') {
        const href = this.safeUrl(node.getAttribute('href'));
        if (href) {
          node.setAttribute('href', href);
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', 'noopener noreferrer');
        } else {
          node.removeAttribute('href');
        }
      }
    },
    handleContentClick (event) {
      const target = event.target.closest && event.target.closest('[data-type]');
      if (!target || !this.$refs.main.contains(target)) return;
      this.handleEvent(target.dataset);
    },
    getDetail (params = {}) {
      const type = String(params.type || '').toUpperCase();
      const src = this.escapeAttribute(params.src || '');
      if (type === 'IMG') return `<img data-type="IMG" data-src="${src}">`;
      if (type === 'VIDEO') return `<video data-type="VIDEO" data-src="${src}"></video>`;
      if (type === 'AUDIO') return `<audio data-type="AUDIO" data-src="${src}"></audio>`;
      if (type === 'FILE') return `<file data-type="FILE" data-name="${this.escapeAttribute(params.name || '')}" data-src="${src}"></file>`;
      if (type === 'MAP') {
        return `<map data-type="MAP" data-src="${src}" data-address="${this.escapeAttribute(params.address || '')}" data-latitude="${this.escapeAttribute(params.latitude || '')}" data-longitude="${this.escapeAttribute(params.longitude || '')}"></map>`;
      }
      return '';
    },
    handleEvent (params) {
      const open = () => {
        const type = String(params.type || '').toUpperCase();
        const source = this.safeUrl(params.src);
        if (type === 'IMG') this.imgSrc = source;
        else if (type === 'VIDEO') this.videoSrc = source;
        else if (type === 'AUDIO') this.audioSrc = source;
        else if (type === 'FILE' && source && typeof window !== 'undefined') {
          const opened = window.open(source, '_blank', 'noopener');
          if (opened) opened.opener = null;
          return;
        }
        if (this.imgSrc || this.videoSrc || this.audioSrc) this.show = true;
        this.$emit('preview', params);
      };
      if (typeof this.beforeOpen === 'function') this.beforeOpen(params, open);
      else open();
    },
    resetPreview () {
      this.imgSrc = '';
      this.videoSrc = '';
      this.audioSrc = '';
    },
    rootSendMsg (message) {
      const result = this.pushMsg({ text: message });
      if (this.notice) this.getNotification(message);
      return result;
    },
    safeUrl (value) {
      if (!value || typeof window === 'undefined') return '';
      try {
        const url = new URL(value, window.location.origin);
        return ['http:', 'https:', 'blob:'].includes(url.protocol) ||
          (url.protocol === 'data:' && /^data:(image|audio|video)\//.test(value))
          ? url.href
          : '';
      } catch (error) {
        return '';
      }
    },
    escapeHtml (value) {
      return String(value).replace(/[&<>'"]/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
      }[char]));
    },
    escapeAttribute (value) {
      return this.escapeHtml(value);
    }
  }
});

exports.default = script;
