/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { isMediaType, setPx } from '../../../../src/utils/util.mjs';
import create from '../../../../src/core/create.mjs';
import Print from '../../../../src/plugin/print/index.mjs';

var script = create({
  name: "image-preview",
  props: {
    datas: Array,
    index: [Number, String],
    ops: Object,
    onDestroy: Function
  },
  data () {
    return {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0,
      count: this.index
    };
  },
  computed: {
    styleBoxName () {
      return {
        marginLeft: setPx(this.left),
        marginTop: setPx(this.top)
      }
    },
    styleName () {
      return {
        transform: `scale(${this.scale}) rotate(${this.rotate}deg)`,
        maxWidth: '100%',
        maxHeight: '100%',
      }
    },
    isRrrow () {
      return this.datas.length > 1
    }
  },
  mounted () {
    this.$refs.item.forEach((ele, index) => {
      this.$refs.item[index].onwheel = (e) => {
        if (e.wheelDelta > 0) {
          this.addScale();
        } else {
          this.subScale();
        }
      };
    });
  },
  methods: {
    getName (url) {
      return url.substring(url.lastIndexOf('/') + 1)
    },
    handlePrint () {
      Print(`#avue-image-preview__${this.count}`);
    },
    handlePrev () {
      this.stopItem();
      this.$refs.carousel.prev();
    },
    handleNext () {
      this.stopItem();
      this.$refs.carousel.next();
    },
    handleReset() {
      this.scale = 1;
      this.rotate = 0;
      this.left = 0;
      this.top = 0;
    },
    handleDownload() {
      const currentItem = this.datas[this.count];
      if (!currentItem || !currentItem.url) return;
      
      const link = document.createElement('a');
      link.href = currentItem.url;
      link.download = currentItem.name || this.getName(currentItem.url);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    stopItem () {
      this.left = 0;
      this.top = 0;
    },
    isMediaType (item) {
      return isMediaType(item.url, item.type)
    },
    subScale () {
      if (this.scale != 0.2) {
        this.scale = parseFloat((this.scale - 0.2).toFixed(2));
      }
    },
    addScale () {
      this.scale = parseFloat((this.scale + 0.2).toFixed(2));
    },
    handleChange (n, o) {
      this.scale = 1;
      this.rotate = 0;
      this.count = n;

    },
    move (e) {       //获取目标元素s
      //算出鼠标相对元素的位置
      let disX = e.clientX;
      let disY = e.clientY;
      let scale = 2;
      document.onmousemove = (e) => {       //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        //移动当前元素
        this.left = this.left + (left * scale);
        this.top = this.top + (top * scale);

      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    handleClick (item, index, df = false) {
      if (typeof this.ops.click == "function") {
        this.ops.click(item, index);
      } else if (df) {
        window.open(item.url);
      }
    },
    close () {
      this.isShow = false;
      if (typeof this.ops.beforeClose == "function") {
        this.ops.beforeClose(this.datas, this.count);
      }
      this.onDestroy();
    }
  }
});

export { script as default };
