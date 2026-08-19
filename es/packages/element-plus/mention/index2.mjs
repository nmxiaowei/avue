/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import { sendDic } from '../../../src/core/dic.mjs';

var script = create({
  name: "mention",
  mixins: [props(), event()],
  emits: ["dic-error"],
  data () {
    return {
      created: false,
      loading: false,
      netDic: [],
      remoteRequestId: 0,
      remoteUnmounted: false,
    };
  },
  props: {
    split: {
      type: String,
      default: ','
    },
    remote: Boolean,
    prependClick: {
      type: Function,
      default: () => { }
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function,
      default: () => { }
    },
    append: {
      type: String
    },
    prefix: String,
    whole: Boolean,
    checkIsWhole: Function
  },
  created () { },
  mounted () { },
  beforeUnmount () {
    this.remoteUnmounted = true;
    this.remoteRequestId++;
  },
  computed: {
    options () {
      return this.netDic.map(ele => {
        return {
          label: ele[this.labelKey],
          value: ele[this.valueKey],
        }
      })
    }
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    }
  },
  methods: {
    handleModelValue (val) {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true;
          this.handleRemoteMethod(this.text);
        }
      }
    },
    handleRemoteMethod (query) {
      const requestId = ++this.remoteRequestId;
      this.loading = true;
      sendDic(
        {
          column: this.column,
          value: query,
        },
        this
      )
        .then(res => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.netDic = res;
        })
        .catch(error => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.$emit("dic-error", {
            type: "mention-remote",
            error,
          });
        })
        .finally(() => {
          if (!this.remoteUnmounted && requestId === this.remoteRequestId) {
            this.loading = false;
          }
        });
    }
  }
});

export { script as default };
