<template>
  <div class="avue-echart avue-echart-imgborder"
       :style="styleSizeName">
    <div :style="styleImgName"></div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "imgborder",
  computed: {
<<<<<<< HEAD
    styleImgName() {
      return Object.assign({
        width: "100%",
        height: "100%",
        borderImageSource: "url(" + this.dataChart + ")",
        borderImageSlice: "10 16 15 10 fill",
        borderWidth: "10px 16px 15px 10px",
        borderStyle: "solid",
        boxSizing: "border-box",
=======
    styleImgName () {
      return Object.assign({
        width: "100%",
        height: "100%",
>>>>>>> 167b3a089d3abf456d1bcc896b9a63217a9e7220
        backgroundColor:
          this.option.backgroundColor || "rgba(180, 181, 198, 0.1)",
        backgroundClip: "padding-box",
        filter: "blur(0px)"
<<<<<<< HEAD
      });
=======
      }, (() => {
        if (!this.validatenull(this.dataChart)) {
          return {
            borderImageSource: "url(" + this.dataChart + ")",
            borderImageSlice: "10 16 15 10 fill",
            borderWidth: "10px 16px 15px 10px",
            borderStyle: "solid",
            boxSizing: "border-box",
          }
        }
        return {}
      })())
>>>>>>> 167b3a089d3abf456d1bcc896b9a63217a9e7220
    }
  },
  methods: {}
});
</script>

