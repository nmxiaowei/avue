/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

const propsDefault = {
  title: "title",
  meta: "meta",
  lead: "lead",
  body: "body"
};
var script = create({
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

export { script as default };
