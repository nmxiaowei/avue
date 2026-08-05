/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "text-ellipsis",
  props: {
    text: String,
    height: Number,
    width: Number,
    isLimitHeight: {
      type: Boolean,
      default: true
    },
    useTooltip: {
      type: Boolean,
      default: false
    },
    placement: String
  },
  data () {
    return {
      keyIndex: 0,
      isHide: false
    };
  },
  watch: {
    isLimitHeight () {
      this.init();
    },
    text () {
      this.init();
    },
    height () {
      this.init();
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.keyIndex += 1;
      let more = this.$refs.more;
      more.style.display = "none";
      if (this.isLimitHeight) {
        this.limitShow();
      }
    },
    limitShow () {
      this.$nextTick(() => {
        let textDom = this.$refs.text;
        let title = this.$el;
        let more = this.$refs.more;
        let n = 1000;
        if (textDom) {
          if (title.offsetHeight > this.height) {
            more.style.display = "inline-block";
            let text = this.text;
            while (title.offsetHeight > this.height && n > 0) {
              if (title.offsetHeight > this.height * 3) {
                textDom.innerText = text = text.substring(
                  0,
                  Math.floor(text.length / 2)
                );
              } else {
                textDom.innerText = text = text.substring(0, text.length - 1);
              }
              n--;
            }
            this.$emit("hide");
            this.isHide = true;
          } else {
            this.$emit("show");
            this.isHide = false;
          }
        }
      });
    }
  }
});

exports.default = script;
