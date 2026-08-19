/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: "data-notice",
  mixins: [locale],
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.option.title;
    },
    showMore() {
      return this.option.showMore !== false;
    },
    moreText() {
      return this.option.moreText || this.t('common.more');
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item);
      item.click && item.click(item);
    },
    handleMore() {
      this.$emit('more');
    }
  }
});

export { script as default };
