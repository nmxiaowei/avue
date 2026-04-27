/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import locale from '../../../src/core/locale.mjs';
import create from '../../../src/core/create.mjs';

var script = create({
  name: 'form',
  inject: ["formSafe"],
  mixins: [locale],
  computed: {
    menuXsSpan () {
      return this.formSafe.tableOption.menuXsSpan || this.formSafe.config.xsSpan;
    },
    menuSpan () {
      return this.formSafe.tableOption.menuSpan || this.formSafe.config.xsSpan;
    },
    styleName () {
      if (this.menuSpan !== 24) {
        return {
          padding: 0
        }
      }
      return {}
    }
  }
});

export { script as default };
