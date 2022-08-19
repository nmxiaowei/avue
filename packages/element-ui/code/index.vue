<template>
  <div :class="b()">
    <el-scrollbar :style="styleName">
      <pre>
        <code :class="syntax" ref="container">
          <slot></slot>
        </code>
      </pre>
    </el-scrollbar>
  </div>

</template>

<script>
import create from "core/create";
import packages from "core/packages";
export default create({
  name: "code",
  props: {
    height: {
      type: Number,
      default: 200
    },
    syntax: {
      type: String,
      default: "javascript"
    }
  },
  computed: {
    styleName () {
      return {
        height: this.setPx(this.height)
      };
    }
  },
  mounted () {
    if (!window.hljs) {
      packages.logs("hljs");
      return;
    }
    if (window.hljs && typeof window.hljs.highlightBlock === "function") {
      window.hljs.highlightBlock(this.$refs["container"]);
    }
  }
});
</script>