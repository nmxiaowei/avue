/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    inlinePrompt: Boolean,
    inactiveActionIcon: String,
    activeActionIcon: String,
    inactiveIcon: String,
    activeIcon: String,
    len: Number,
    beforeChange: Function
  },
  data () {
    return {
      loading: false,
    };
  },
  watch: {},
  created () { },
  mounted () { },
  computed: {
    active () {
      return this.dic[1] || {};
    },
    inactive () {
      return this.dic[0] || {};
    }
  },
  methods: {
    handleBeforeChange () {
      return new Promise((resolve) => {
        this.loading = true;
        const callback = (result) => {
          this.loading = false;
          return resolve(result)
        };
        if (typeof this.beforeChange == 'function') {
          return this.beforeChange(callback)
        } else {
          return callback(true)
        }
      })

    }
  }
});

export { script as default };
