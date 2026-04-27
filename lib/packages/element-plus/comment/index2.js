/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

const propsDefault = {
  avatar: "avatar",
  author: "author",
  body: "body"
};
var script = src_core_create.default({
  name: "comment",
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    props: {
      type: Object,
      default: () => {
        return propsDefault;
      }
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    avatarKey() {
      return this.props.avatar || propsDefault.avatar;
    },
    authorKey() {
      return this.props.author || propsDefault.author;
    },
    bodyKey() {
      return this.props.body || propsDefault.body;
    },
    avatar() {
      return this.data[this.avatarKey];
    },
    author() {
      return this.data[this.authorKey];
    },
    body() {
      return this.data[this.bodyKey];
    }
  },
  mounted() {}
});

exports.default = script;
