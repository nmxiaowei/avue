/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

const defaultProps = {
  avatar: 'avatar',
  author: 'author',
  body: 'body',
  time: 'time'
};
const allowedTags = new Set([
  'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'EM', 'I', 'IMG', 'LI', 'OL', 'P', 'PRE', 'STRONG', 'UL'
]);

var script = src_core_create.default({
  name: 'comment',
  emits: ['avatar-click'],
  props: {
    reverse: Boolean,
    data: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    },
    option: {
      type: Object,
      default: () => ({})
    },
    showAvatar: {
      type: Boolean,
      default: true
    },
    avatarAlt: {
      type: String,
      default: ''
    },
    sanitize: {
      type: [Boolean, Function],
      default: true
    }
  },
  computed: {
    fieldProps () {
      return {
        ...defaultProps,
        ...((this.option && this.option.props) || {}),
        ...(this.props || {})
      }
    },
    avatar () {
      return this.data[this.fieldProps.avatar]
    },
    author () {
      return this.data[this.fieldProps.author]
    },
    body () {
      return this.data[this.fieldProps.body]
    },
    time () {
      return this.data[this.fieldProps.time]
    },
    authorInitial () {
      return String(this.author || '?').trim().slice(0, 1).toUpperCase()
    },
    formattedBody () {
      const content = String(this.body || '');
      if (typeof this.sanitize === 'function') return this.sanitize(content);
      return this.sanitize ? this.sanitizeHtml(content) : content;
    }
  },
  methods: {
    sanitizeHtml (content) {
      if (typeof document === 'undefined') return this.escapeHtml(content);
      const container = document.createElement('div');
      container.innerHTML = content;
      Array.from(container.querySelectorAll('*')).forEach((node) => {
        const tag = node.tagName;
        if (!allowedTags.has(tag)) {
          node.replaceWith(document.createTextNode(node.textContent || ''));
          return;
        }
        Array.from(node.attributes).forEach((attribute) => {
          const isLink = tag === 'A' && ['href', 'target', 'rel'].includes(attribute.name);
          const isImage = tag === 'IMG' && attribute.name === 'src';
          if (!isLink && !isImage) node.removeAttribute(attribute.name);
        });
        if (tag === 'A') {
          const href = this.safeUrl(node.getAttribute('href'));
          if (href) {
            node.setAttribute('href', href);
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
          } else {
            node.removeAttribute('href');
          }
        }
        if (tag === 'IMG') {
          const src = this.safeUrl(node.getAttribute('src'));
          if (src) {
            node.setAttribute('src', src);
            node.setAttribute('loading', 'lazy');
          } else {
            node.remove();
          }
        }
      });
      return container.innerHTML;
    },
    safeUrl (value) {
      if (!value || typeof window === 'undefined') return '';
      try {
        const url = new URL(value, window.location.origin);
        return ['http:', 'https:'].includes(url.protocol) ||
          (url.protocol === 'data:' && /^data:image\//.test(value))
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
    }
  }
});

exports.default = script;
