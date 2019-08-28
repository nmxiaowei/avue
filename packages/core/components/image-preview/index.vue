<template>
  <div :class="b()"
       v-show="isShow"
       @click="isShow=false">
    <div :class="b('mask')"></div>
    <div :class="b('box')"
         :style="previewStyle"
         v-loading="changeing">
      <img ref="img"
           hidden
           :src="datas[index].url" />
      <el-image :src="datas[index].url"
                v-show="!changeing"
                @load="initStyle"></el-image>
    </div>
  </div>

</template>
<script>
import create from "core/create";
export default create({
  name: "image-preview",
  data() {
    return {
      isShow: false,
      datas: [],
      index: 0,
      onClose: null,
      changeing: false,
      width: 200,
      height: 200
    };
  },
  watch: {
    isShow() {
      if (!this.isShow) {
        this.close();
        this.width = 200;
        this.height = 200;
      }
    }
  },
  mounted() {},
  computed: {
    previewStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  methods: {
    initStyle(e) {
      this.changeing = true;
      let width = this.$refs.img.width;
      let height = this.$refs.img.height;
      if (width > 800 || height > 800) {
        let percent = Math.max(width, height) / 800;
        width = width / percent;
        height = height / percent;
      }
      this.width = width;
      this.height = height;
      setTimeout(() => {
        this.$refs.img.style.width = "100%";
        this.changeing = false;
      }, 300);
    },
    close() {
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    }
  }
});
</script>