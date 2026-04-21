/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import { sendDic } from '../../../src/core/dic.mjs';

var script = create({
  name: "mention",
  mixins: [props(), event()],
  data () {
    return {
      created: false,
      loading: false,
      netDic: [],
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
      this.loading = true;
      sendDic({
        column: this.column,
        value: query,
      }, this).then(res => {
        this.loading = false;
        this.netDic = res;
      });
    }
  }
});

export { script as default };
