<template>
  <div class="avue-echart avue-echart-img"
       :style="styleSizeName">
    <img :style="[styleImgName,styleSizeName]"
         :src="dataChart"
         :class="b({'rotate': rotate})"
         draggable="false" />
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "img",
  computed: {
    styleImgName() {
      if (this.rotate) {
        return {
          animationDuration: this.duration / 1000 + "s"
        };
      }
    },
    duration() {
      return this.option.duration || 3000;
    },
    rotate() {
      return this.option.rotate;
    }
  },
  methods: {}
});
</script>

