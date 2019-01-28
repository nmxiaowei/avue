<template>
  <div :class="b()"
       :style="{width:setPx(width,'100%')}">

    <slot name="before"
          :class="b('before')"></slot>
    <el-tooltip :content="text"
                :disabled="!(useTooltip&&isHide)"
                :placement="placement">
      <span>
        <span :class="b('text')"
              ref="text"
              :key="keyIndex">{{text}}</span>
      </span>
    </el-tooltip>
    <span :class="b('more')"
          ref="more">
      <slot name="more"
            v-show="oversize"></slot>
    </span>
    <slot name="after"
          :class="b('after')"></slot>

  </div>
</template>
<script>
import create from "core/create";
export default create({
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
  data() {
    return {
      keyIndex: 0,
      oversize: false,
      isHide: false
    };
  },
  watch: {
    isLimitHeight() {
      this.init();
    },
    text() {
      this.init();
    },
    height() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.oversize = false;
      this.keyIndex += 1;
      let more = this.$refs.more;
      more.style.display = "none";
      if (this.isLimitHeight) {
        this.limitShow();
      }
    },
    limitShow() {
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
</script>
