<template>
  <div :class="b()">
    <transition name="fade">
      <div v-if="closed && modal"
           class="avue-mask"
           @click.self="handleClose('modal')"></div>
    </transition>
    <transition :name="isLeft?'drawer-fade-left':'drawer-fade'">
      <div v-if="closed"
           ref="drawer"
           :class="[b('wrapper',{'left':isLeft,'fullscreen':fullscreen}),customClass]"
           :style="{width:setPx(width)}">

        <div :class="b('content')">
          <div :class="b('header')">
            <slot name="title">
              <span :class="b('title')">{{title}}</span>
            </slot>
            <div :class="b('close')"
                 v-if="showClose"
                 @click="handleClose('close')">
              <i class="el-icon-close"></i>
            </div>
          </div>
          <div :class="b('body')">
            <slot></slot>
          </div>
          <div :class="b('footer')"
               v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "drawer",
  props: {
    beforeClose: Function,
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "right"
    },
    width: {
      type: [Number, String],
      default: 300
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    fullscreen: Boolean,
    customClass: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  computed: {
    isLeft () {
      return this.placement === "left";
    }
  },
  data () {
    return {
      closed: false
    };
  },
  watch: {
    value (val) {
      if (val) {
        this.open();
        this.$nextTick(() => {
          this.$refs.drawer.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        this.hide();
      }
    }
  },
  mounted () {
    if (this.value) {
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  methods: {
    handleClose (type) {
      if (!this.closeOnClickModal && type === "modal") return;
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    open () {
      this.closed = true;
    },
    hide () {
      this.$emit("input", false);
      this.closed = false;
      this.$emit('close');
    }
  },
  destroyed () {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
});
</script>
