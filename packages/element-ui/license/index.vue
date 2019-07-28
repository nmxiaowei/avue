<template>
  <div :class="b()">
    <canvas id="canvas"
            ref="canvas"></canvas>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: 'license',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    data: {
      handler (value) {
        this.$emit("input", value);
      },
      immediate: true,
      deep: true
    },
    value: {
      handler (value) {
        this.data = value;
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      data: {},
      canvas: '',
    }
  },
  computed: {
    img () {
      return this.data.img
    },
    list () {
      return this.data.list || []
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.canvas = document.getElementById("canvas");
      const canvas = this.canvas;
      const context = canvas.getContext("2d");
      const beauty = new Image();
      beauty.src = this.img;
      beauty.onload = () => {
        this.$refs.canvas.width = beauty.width;
        this.$refs.canvas.height = beauty.height;
        context.drawImage(beauty, 0, 0);
        this.list.forEach(ele => {
          if (ele.bold) {
            context.font = `bold ${ele.size}px ${ele.style}`
          } else {
            context.font = `${ele.size}px ${ele.style}`
          }
          context.fillStyle = ele.color;

          context.fillText(ele.text, ele.left, ele.top);
          context.stroke();
        })
      };
    },
    getFile (name = new Date().getTime()) {
      const data = this.canvas.toDataURL('image/jpeg', 1.0);
      const file = this.dataURLtoFile(data, name)
      return file;
    },
    getPdf (name = new Date().getTime()) {
      const contentWidth = this.canvas.width;
      const contentHeight = this.canvas.height;
      const pageHeight = (contentWidth / 592.28) * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      const imgWidth = 595.28;
      const imgHeight = (592.28 / contentWidth) * contentHeight;
      const pageData = this.canvas.toDataURL('image/jpeg', 1.0);
      const PDF = new window.jsPDF('', 'pt', 'a4');
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            PDF.addPage();
          }
        }
      }
      PDF.save(`${name}.pdf`);
    }
  }
})
</script>
