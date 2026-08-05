/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import packages from '../../../src/core/packages.mjs';
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import locale from '../../../src/core/locale.mjs';
import { sendDic } from '../../../src/core/dic.mjs';
import { DIC_SPLIT } from '../../../src/global/variable.mjs';

var script = create({
  name: "select",
  mixins: [props(), event(), locale],
  emits: ["update:modelValue", "click", "focus", "blur", "change", "end-reached", "dic-error"],
  data() {
    return {
      checked: false,
      indeterminate: false,
      create: false,
      netDic: [],
      loading: false,
      sortable: null,
      remoteRequestId: 0,
      remoteUnmounted: false,
    };
  },
  props: {
    virtualize: Boolean,
    valueOnClear: {
      type: [String, Number, Boolean, Function],
      default: undefined,
    },
    loadingText: {
      type: String,
    },
    noMatchText: {
      type: String,
    },
    noDataText: {
      type: String,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    removeTag: Function,
    endReached: Function,
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    limit: {
      type: Number,
      default: 0,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    dic: {
      handler(val) {
        this.netDic = val;
      },
      immediate: true,
    },
  },
  computed: {
    classNameKey() {
      return this.props.className || "className";
    },
    componentName() {
      return "elSelect" + (this.virtualize ? "V2" : "");
    },
  },
  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  beforeUnmount() {
    this.remoteUnmounted = true;
    this.remoteRequestId++;
    if (this.sortable && typeof this.sortable.destroy === "function") {
      this.sortable.destroy();
    }
    this.sortable = null;
  },
  methods: {
    handleModelValue(val) {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true;
          this.handleRemoteMethod(
            this.multiple ? this.text.join(DIC_SPLIT) : this.text
          );
        }
      }
      if (this.multiple) {
        if (this.text.length == 0) {
          this.checked = false;
          this.indeterminate = false;
        } else if (this.text.length == this.netDic.length) {
          this.checked = true;
          this.indeterminate = false;
        } else {
          this.indeterminate = true;
        }
      }
    },
    setSort() {
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      const el = this.$refs.main.$el.querySelectorAll(
        ".el-select__selection"
      )[0];
      this.sortable = window.Sortable.create(el, {
        animation: 100,
        onEnd: (evt) => {
          const targetRow = this.modelValue.splice(evt.oldIndex, 1)[0];
          this.modelValue.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
    handleRemoteMethod(query) {
      const requestId = ++this.remoteRequestId;
      this.loading = true;
      sendDic(
        {
          column: this.column,
          value: query,
        },
        this
      )
        .then((res) => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.netDic = res;
        })
        .catch((error) => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.$emit("dic-error", {
            type: "select-remote",
            error,
          });
        })
        .finally(() => {
          if (!this.remoteUnmounted && requestId === this.remoteRequestId) {
            this.loading = false;
          }
        });
    },
    checkChange(val) {
      this.text = [];
      this.checked = val;
      this.indeterminate = false;
      if (val) {
        this.text = this.netDic
          .filter((ele) => !ele[this.disabledKey])
          .map((ele) => ele[this.valueKey]);
      }
    },
    handleremoveTag(tagValue) {
      if (this.removeTag && typeof this.removeTag === 'function') {
        this.removeTag(tagValue);
      }
    },
    handleEndReached(...args) {
      if (this.endReached && typeof this.endReached === "function") {
        this.endReached({
          value: this.modelValue,
          column: this.column,
          dic: this.dic,
        });
      }
      this.$emit("end-reached", ...args);
    },
  },
});

export { script as default };
