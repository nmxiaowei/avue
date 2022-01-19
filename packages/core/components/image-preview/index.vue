<template>
  <div :class="b()"
       :id="id">
    <div :class="b('mask')"
         v-if="ops.modal"
         @click="close"></div>
    <span class="el-image-viewer__btn el-image-viewer__close"
          @click="close">
      <el-icon>
        <close />
      </el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__prev"
          @click="handlePrev()"
          v-if="isRrrow">
      <el-icon>
        <arrowLeft />
      </el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__next"
          @click="handleNext()"
          v-if="isRrrow">
      <el-icon>
        <arrowRight />
      </el-icon>
    </span>
    <div :class="b('box')"
         ref="box">
      <el-carousel ref="carousel"
                   :show-indicators="false"
                   :initial-index="index"
                   :initial-swipe="index"
                   :interval="0"
                   arrow="never"
                   @change="handleChange"
                   indicator-position="none">
        <el-carousel-item @click.native.self="ops.closeOnClickModal?close():''"
                          v-for="(item,indexs) in datas"
                          :key="indexs">
          <component :id="'avue-image-preview__'+indexs"
                     v-if="isMedia(item)"
                     :src="item.url"
                     :style="[styleName,styleBoxName]"
                     ref="item"
                     @mousedown="move"
                     controls="controls"
                     :is="getIsVideo(item)"
                     ondragstart="return false" />
          <div :id="'avue-image-preview__'+indexs"
               v-else
               :class="b('file')">
            <a :href="item.url"
               target="_blank">
              <el-icon>
                <Document />
              </el-icon>
              <p>{{item.name}}</p>
            </a>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="el-image-viewer__btn el-image-viewer__actions">
      <div class="el-image-viewer__actions__inner">
        <el-icon @click="subScale">
          <zoomOut />
        </el-icon>
        <el-icon @click="addScale">
          <zoomIn />
        </el-icon>
        <i class="el-image-viewer__actions__divider"></i>
        <el-icon @click="handlePrint">
          <printer />
        </el-icon>
        <i class="el-image-viewer__actions__divider"></i>
        <el-icon @click="rotate=rotate-90">
          <refreshLeft />
        </el-icon>
        <el-icon @click="rotate=rotate+90">
          <refreshRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { setPx } from 'utils/util';
import { typeList } from 'global/variable'
import create from "core/create";
import { defineAsyncComponent } from 'vue'
import { Document, ArrowRight, ArrowLeft, Close, ZoomOut, ZoomIn, RefreshLeft, RefreshRight, Printer } from '@element-plus/icons'
import { ElIcon, ElCarousel, ElCarouselItem } from 'element-plus'
export default create({
  name: "image-preview",
  components: {
    ElIcon,
    ElCarousel,
    ElCarouselItem,
    Document,
    ArrowRight,
    ArrowLeft,
    Close,
    ZoomOut,
    ZoomIn,
    RefreshLeft,
    RefreshRight,
    Printer
  },
  props: {
    id: String,
    datas: Array,
    index: [Number, String],
    ops: Object,
    onClose: Function
  },
  data () {
    return {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0
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
      return this.imgLen != 1
    },
    imgLen () {
      return this.imgList.length
    },
    imgList () {
      return this.datas.map(ele => ele.url)
    }
  },
  methods: {
    handlePrint () {
      this.$Print(`#avue-image-preview__${this.index}`)
    },
    handlePrev () {
      this.stopItem()
      this.$refs.carousel.prev()
      this.index = this.$refs.carousel.activeIndex

    },
    handleNext () {
      this.stopItem()
      this.$refs.carousel.next()
      this.index = this.$refs.carousel.activeIndex

    },
    stopItem () {
      this.left = 0;
      this.top = 0;
    },
    isMedia (item) {
      return typeList.img.test(item.url) || typeList.video.test(item.url)
    },
    getIsVideo (item) {
      if (typeList.video.test(item.url)) {
        return 'video'
      } else if (typeList.img.test(item.url)) {
        return 'img'
      }
    },
    subScale () {
      if (this.scale != 0.2) {
        this.scale = parseFloat((this.scale - 0.2).toFixed(2))
      }
    },
    addScale () {
      this.scale = parseFloat((this.scale + 0.2).toFixed(2))
    },
    handleChange () {
      this.scale = 1;
      this.rotate = 0;
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
        this.left = this.left + (left * scale)
        this.top = this.top + (top * scale)

      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    close () {
      if (typeof this.ops.beforeClose == "function") {
        this.ops.beforeClose(this.datas, this.index);
      }
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    }
  }
});
</script>