<template>
  <div class="avue-echart avue-echart-img"
       :style="styleSizeName"
       @click="handleClick">
    <img :style="[styleImgName,styleSizeName]"
         :src="src"
         :class="b({'rotate': rotate})"
         draggable="false" />
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "img",
  computed: {
    src () {
      return this.validatenull(this.dataChart) ? "" : this.dataChart;
    },
    styleImgName () {
      return Object.assign(
        (() => {
          if (this.rotate) {
            return {
              animationDuration: this.duration / 1000 + "s"
            };
          }
          return {};
        })(),
        {
          opacity: this.option.opacity || 1
        }
      );
    },
    duration () {
      return this.option.duration || 3000;
    },
    rotate () {
      return this.option.rotate;
    }
  },
  methods: {
    handleClick () {
      this.clickFormatter({
        data: this.dataChart
      });
    }
  }
});
</script>

