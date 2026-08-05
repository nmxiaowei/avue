/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';
import permission from '../../../core/directive/permission.mjs';
import config from '../config.mjs';
import '../grid/item.mjs';
import script$1 from '../grid/item2.mjs';

var script = create({
  name: "crud",
  data() {
    return {
      config: config,
    };
  },
  components: {
    tableItemCard: script$1,
  },
  mixins: [locale],
  inject: ["crud"],
  directives: {
    permission,
  },
  computed: {
    menuType() {
      return this.crud.tableOption.menuType || this.$AVUE.menuType;
    },
    isIconMenu() {
      return this.menuType === "icon";
    },
    isTextMenu() {
      return this.menuType === "text";
    },
    isMenu() {
      return this.menuType === "menu";
    },
  },
  methods: {
    menuText(value) {
      return value;
    },
    menuParams({ row, column, $index }) {
      let parent = this.crud;
      return {
        row,
        column,
        type: this.menuText("primary"),
        disabled: parent.btnDisabled,
        size: parent.size,
        index: $index,
      };
    },
  },
});

export { script as default };
