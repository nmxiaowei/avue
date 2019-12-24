<template>
  <div :class="b()"
       style="position:relative">
    <canvas id="canvas"
            ref="canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: 'license',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      canvas: '',
    }
  },
  computed: {
    img () {
      return this.option.img
    },
    list () {
      return this.option.list || []
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
        const width = this.option.width || beauty.width;;
        const height = this.option.width ? ((beauty.height / beauty.width) * this.option.width) : beauty.height;
        this.$refs.canvas.width = width;
        this.$refs.canvas.height = height
        context.drawImage(beauty, 0, 0, width, height);
        this.list.forEach(ele => {
          if (ele.img) {
            const img = new Image();
            img.src = ele.img
            img.onload = () => {
              const widths = ele.width || img.width;;
              const heights = ele.width ? ((img.height / img.width) * ele.width) : img.height;
              context.drawImage(img, ele.left, ele.top, widths, heights);
            }
          } else {
            if (ele.bold) {
              context.font = `bold ${ele.size}px ${ele.style}`
            } else {
              context.font = `${ele.size}px ${ele.style}`
            }
            context.fillStyle = ele.color;

            context.fillText(ele.text, ele.left, ele.top);
            context.stroke();
          }

        })
      };
    },
    getFile (name = new Date().getTime()) {
      const data = this.canvas.toDataURL('image/jpeg', 1.0);
      const file = this.optionURLtoFile(data, name)
      return file;
    },
    getBase64 () {
      const data = this.canvas.toDataURL('image/jpeg', 1.0);
      return data;
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
