/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');
require('../../core/components/icon/index.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');
var index_vue_vue_type_script_lang = require('../../core/components/icon/index2.js');

var script = src_core_create.default({
  name: "input-icon",
  components: {
    iconTemp: index_vue_vue_type_script_lang.default
  },
  mixins: [packages_core_common_props.default(), packages_core_common_event.default(), src_core_locale.default],
  props: {
    beforeClose: Function,
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    dialogWidth: {
      type: String,
      default: '80%'
    },
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      filterText: '',
      box: false,
      tabs: {}
    };
  },
  computed: {
    list () {
      let list = this.tabs.list.map(ele => {
        if (!ele.value && !ele.label) {
          return {
            label: ele,
            value: ele
          }
        }
        return ele
      });
      if (this.filterText) {
        list = list.filter(ele => ele.label.indexOf(this.filterText) !== -1);
      }
      return list
    },
    option () {
      return {
        column: this.iconList
      };
    }
  },
  created () {
    this.tabs = this.iconList[0];
  },
  methods: {
    handleClear () {
      setTimeout(() => {
        this.box = false;
      }, 0);
    },
    handleTabs (tabs) {
      this.tabs = tabs;
    },
    handleSubmit (item) {
      this.box = false;
      this.text = item;
      this.handleChange(item);
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.tabs = this.iconList[0];
      this.box = true;
    }
  }
});

exports.default = script;
