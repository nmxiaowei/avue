<template>
  <div :class="b()"
       :style="heightStyleName">
    <audio ref="chatAudio"
           preload="none">
      <source :src="audio[0]"
              type="audio/ogg">
      <source :src="audio[1]"
              type="audio/mpeg">
      <source :src="audio[2]"
              type="audio/wav">
    </audio>
    <header class="web__logo">
      <img v-if="config.img"
           :src="config.img"
           class="web__logo-img"
           :alt="config.name || ''">
      <span v-else
            class="web__logo-avatar">{{ headerInitial }}</span>
      <div class="web__logo-info">
        <p class="web__logo-name">{{ config.name || '在线客服' }}</p>
        <p v-if="config.dept"
           class="web__logo-dept">{{ config.dept }}</p>
      </div>
      <slot name="header"></slot>
    </header>
    <div class="web__content">
      <section class="web__panel"
               :style="widthStyleName">
        <div ref="main"
             class="web__main"
             aria-live="polite"
             @click="handleContentClick">
          <div v-if="!list.length"
               class="web__empty">暂无消息，开始聊天吧</div>
          <div v-for="item in list"
               v-else
               :key="getMessageKey(item)"
               class="web__main-item"
               :class="{ 'web__main-item--mine': item.mine }">
            <div class="web__main-user">
              <img v-if="item.img"
                   :src="item.img"
                   :alt="item.name || ''">
              <span v-else
                    class="web__main-user-avatar">{{ getInitial(item.name) }}</span>
              <cite>
                {{ item.name || (item.mine ? config.myName : config.name) || '用户' }}
                <i v-if="item.date">{{ item.date }}</i>
              </cite>
            </div>
            <div class="web__main-text">
              <div class="web__main-arrow"></div>
              <span v-html="formatContent(getMessageText(item))"></span>
              <ul v-if="item.text && item.text.list && item.text.list.length"
                  class="web__main-list">
                <li v-for="option in item.text.list"
                    :key="option.id || option.ask || option.text"
                    @click="handleItemMsg(option)">{{ option.text }}</li>
              </ul>
            </div>
          </div>
        </div>
        <footer class="web__footer">
          <div class="web__tools">
            <el-button v-if="tools.img"
                       text
                       circle
                       title="添加图片"
                       :disabled="disabled || loading"
                       @click="handleUpload('img')">
              <el-icon><el-icon-picture /></el-icon>
            </el-button>
            <el-button v-if="tools.video"
                       text
                       circle
                       title="添加视频"
                       :disabled="disabled || loading"
                       @click="handleUpload('video')">
              <el-icon><el-icon-video-camera /></el-icon>
            </el-button>
            <el-button v-if="tools.file"
                       text
                       circle
                       title="添加文件"
                       :disabled="disabled || loading"
                       @click="handleUpload('file')">
              <el-icon><el-icon-folder-opened /></el-icon>
            </el-button>
            <slot name="menu"></slot>
          </div>
          <div class="web__msg">
            <textarea v-model="msg"
                      rows="2"
                      :placeholder="messagePlaceholder"
                      :disabled="disabled || loading"
                      class="web__msg-input"
                      @keydown.enter.exact.prevent="handleSend"></textarea>
            <div class="web__msg-menu">
              <el-dropdown split-button
                           class="web__msg-submit"
                           type="primary"
                           :size="size"
                           :disabled="disabled || loading || !msgActive"
                           @click="handleSend"
                           trigger="click">
                {{ t('chat.sendBtn') }}
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-popover v-model:visible="visible"
                                  placement="top"
                                  width="220">
                        <el-input v-model="keys"
                                  :size="size"
                                  :rows="3"
                                  show-word-limit
                                  :placeholder="t('chat.quickReplyPlaceholder')"
                                  type="textarea"></el-input>
                        <div class="web__quick-actions">
                          <el-button :size="size"
                                     text
                                     @click="visible = false">{{ t('common.cancelBtn') }}</el-button>
                          <el-button type="primary"
                                     :size="size"
                                     @click="addKey">{{ t('common.submitBtn') }}</el-button>
                        </div>
                        <template #reference>
                          <el-button text
                                     :size="size">
                            <el-icon><el-icon-plus /></el-icon>
                            添加快捷回复
                          </el-button>
                        </template>
                      </el-popover>
                    </el-dropdown-item>
                    <el-scrollbar v-if="keylist.length"
                                  max-height="160px">
                      <el-dropdown-item v-for="item in keylist"
                                        :key="item"
                                        @click="sendKey(item)">
                        <el-tooltip effect="dark"
                                    :content="item"
                                    placement="top">
                          <span>{{ truncateKey(item) }}</span>
                        </el-tooltip>
                      </el-dropdown-item>
                    </el-scrollbar>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </footer>
      </section>
      <slot></slot>
    </div>
    <el-dialog v-model="upload.box"
               :title="upload.title"
               destroy-on-close
               :append-to-body="$AVUE.appendToBody"
               width="min(460px, 90vw)">
      <el-form ref="uploadForm"
               :model="upload">
        <el-form-item prop="src"
                      :rules="[{ required: true, message: t('chat.addressRequired') }]">
          <el-input v-model="upload.src"
                    :size="size"
                    :rows="4"
                    show-word-limit
                    maxlength="500"
                    :placeholder="t('chat.addressPlaceholder')"
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item v-if="upload.type === 'file'"
                      label="文件名称"
                      prop="name"
                      :rules="[{ required: true, message: '请输入文件名称' }]">
          <el-input v-model="upload.name"
                    :size="size"
                    placeholder="例如：产品资料.pdf"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small"
                   @click="upload.box = false">{{ t('common.cancelBtn') }}</el-button>
        <el-button type="primary"
                   size="small"
                   @click="uploadSubmit">{{ t('common.submitBtn') }}</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="show"
               width="min(680px, 90vw)"
               destroy-on-close
               :append-to-body="$AVUE.appendToBody"
               class="web__dialog"
               @closed="resetPreview">
      <img v-if="imgSrc"
           :src="imgSrc"
           class="web__preview-image"
           alt="预览图片">
      <video v-if="videoSrc"
             :src="videoSrc"
             class="web__preview-media"
             controls></video>
      <audio v-if="audioSrc"
             :src="audioSrc"
             class="web__preview-media"
             controls></audio>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import dayjs from 'dayjs'

const allowedTags = new Set([
  'A', 'AUDIO', 'B', 'BR', 'CODE', 'EM', 'FILE', 'I', 'IMG', 'LI', 'MAP',
  'OL', 'P', 'PRE', 'STRONG', 'UL', 'VIDEO'
]);

export default create({
  name: "chat",
  mixins: [locale],
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
        date: params.date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
</script>
