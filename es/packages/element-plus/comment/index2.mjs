/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

const propsDefault = {
  avatar: "avatar",
  author: "author",
  body: "body"
};
var script = create({
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

export { script as default };
