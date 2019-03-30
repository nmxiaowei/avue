<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <p :style="styleName">{{nowDate}}</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
import create from "core/echart/create";
export default create({
  name: "datetime",
  data() {
    return {
      date: new Date()
    };
  },
  computed: {
    nowDate() {
      const format = (this.option.format || "yyyy-MM-dd hh:mm:ss")
        .replace("dd", "DD")
        .replace("yyyy", "YYYY");
      return dayjs(this.date).format(format);
    },
    styleName() {
      return {
        width: "100%",
        height: "100%",
        textAlign: this.option.textAlign,
        backgroundColor: this.option.backgroundColor,
        fontWeight: this.option.fontWeight || "normal",
        fontSize: (this.option.fontSize || 30) + "px",
        color: this.option.color || "#333"
      };
    }
  },
  created() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


