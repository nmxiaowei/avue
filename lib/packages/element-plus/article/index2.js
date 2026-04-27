/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

const propsDefault = {
  title: "title",
  meta: "meta",
  lead: "lead",
  body: "body"
};
var script = src_core_create.default({
  name: "article",
  props: {
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
    }
  },
  computed: {
    titleKey () {
      return this.props.title || propsDefault.title;
    },
    metaKey () {
      return this.props.meta || propsDefault.meta;
    },
    leadKey () {
      return this.props.lead || propsDefault.lead;
    },
    bodyKey () {
      return this.props.body || propsDefault.body;
    },
    title () {
      return this.data[this.titleKey];
    },
    meta () {
      return this.data[this.metaKey];
    },
    lead () {
      return this.data[this.leadKey];
    },
    body () {
      return this.data[this.bodyKey];
    }
  },
  mounted () { }
});

exports.default = script;
