<template>
  <div :class="b()"
       style="position:relative">
    <canvas :id="'canvas'+id"
            ref="canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import create from "core/create";
import { downFile } from 'utils/util';
export default create({
  name: 'license',
  props: {
    id: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    option: {
      handler () {
        this.init();
      },
      deep: true
    }
  },
  data () {
    return {
      base64: '',
      draw: false,
      canvas: '',
      context: '',
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
    this.canvas = document.getElementById("canvas" + this.id);
    this.context = this.canvas.getContext("2d");
    this.init();
  },
  methods: {
    init () {
      this.draw = false;
      const beauty = new Image();
      beauty.src = this.img;
      beauty.onload = () => {
        const width = this.option.width || beauty.width;;
        const height = this.option.width ? ((beauty.height / beauty.width) * this.option.width) : beauty.height;
        this.$refs.canvas.width = width;
        this.$refs.canvas.height = height
        this.context.clearRect(0, 0, width, height);
        this.context.drawImage(beauty, 0, 0, width, height);
        this.list.forEach((ele, index) => {
          const callback = () => {
            if (index == this.list.length - 1) {
              setTimeout(() => {
                this.draw = true;
              }, 0)
            }
          }
          if (ele.img) {
            const img = new Image();
            img.src = ele.img
            img.onload = () => {
              const widths = ele.width || img.width;;
              const heights = ele.width ? ((img.height / img.width) * ele.width) : img.height;
              this.context.drawImage(img, ele.left, ele.top, widths, heights);
              callback();
            }
          } else {
            if (ele.bold) {
              this.context.font = `bold ${ele.size}px ${ele.style}`
            } else {
              this.context.font = `${ele.size}px ${ele.style}`
            }
            this.context.fillStyle = ele.color;

            this.context.fillText(ele.text, ele.left, ele.top);
            this.context.stroke();
            callback();
          }
        })

      };
    },
    getFile (name = new Date().getTime()) {
      return new Promise((resolve) => {
        const time = setInterval(() => {
          if (this.draw) {
            const data = this.canvas.toDataURL('image/jpeg', 1.0);
            const file = this.dataURLtoFile(data, name)
            clearInterval(time)
            resolve(file)
          }
        }, 1000)
      })
      return file;
    },
    downFile (filename = new Date().getTime()) {
      downFile(this.base64, filename)
    },
    getBase64 () {
      return new Promise((resolve) => {
        const time = setInterval(() => {
          if (this.draw) {
            const data = this.canvas.toDataURL('image/jpeg', 1.0);
            this.base64 = data;
            clearInterval(time)
            resolve(data)
          }
        }, 100)
      })
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
