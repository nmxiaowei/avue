<template>
  <el-dialog class="avue-dialog avue-cropper"
             :visible.sync="visible"
             :before-close="cancel"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :modal-append-to-body="$AVUE.modalAppendToBody"
             :append-to-body="$AVUE.appendToBody"
             width="1000px">
    <div class="cropper-content">
      <div class="cropper-box">
        <div class="cropper">
          <vue-cropper ref="cropper"
                       :img="option.img"
                       :outputSize="option.outputSize"
                       :outputType="option.outputType"
                       :info="option.info"
                       :canScale="option.canScale"
                       :autoCrop="option.autoCrop"
                       :autoCropWidth="option.autoCropWidth"
                       :autoCropHeight="option.autoCropHeight"
                       :fixed="option.fixed"
                       :fixedNumber="option.fixedNumber"
                       :full="option.full"
                       :fixedBox="option.fixedBox"
                       :canMove="option.canMove"
                       :canMoveBox="option.canMoveBox"
                       :original="option.original"
                       :centerBox="option.centerBox"
                       :height="option.height"
                       :infoTrue="option.infoTrue"
                       :maxImgSize="option.maxImgSize"
                       :enlarge="option.enlarge"
                       :mode="option.mode"
                       @realTime="realTime">
          </vue-cropper>
        </div>
        <!--底部操作工具按钮-->
        <div class="footer-btn">
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-zoom-in"
                     @click="changeScale(1)"></el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-zoom-out"
                     @click="changeScale(-1)"></el-button>
          <el-button size="mini"
                     icon="el-icon-back"
                     type="danger"
                     @click="rotateLeft"></el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-right"
                     @click="rotateRight"></el-button>
        </div>
      </div>
      <!--预览效果图-->
      <div class="show-preview">
        <div :style="previews.div"
             class="preview">
          <img :src="previews.url"
               :style="previews.img">
        </div>
      </div>
    </div>
    <span class="avue-dialog__footer">
      <el-button size="small"
                 type="primary"
                 @click="submit">确 定</el-button>
      <el-button size="small"
                 @click="cancel()">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { dataURLtoFile } from 'utils/util';
import { VueCropper } from 'vue-cropper'
export default {
  name: "CropperImage",
  components: {
    VueCropper
  },
  data () {
    return {
      visible: false,
      previews: {},
      option: {}
    };
  },
  methods: {
    show () {
      this.visible = true
    },
    //图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    //向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    //实时预览函数
    realTime (data) {
      this.previews = data
    },
    submit () {
      this.visible = false
      this.$refs.cropper.getCropData(data => {
        let result = data
        if (this.option.type === 'file') {
          result = dataURLtoFile(data, `${new Date().getTime()}.${this.option.outputType}`)
        }
        this.option.callback && this.option.callback(result)
      })
    },
    cancel (done) {
      done && done()
      this.visible = false
      this.option.cancel && this.option.cancel()
      if (typeof this.option.beforeClose == "function") {
        this.option.beforeClose();
      }
      this.$destroy();
      this.$el.remove();
    }
  }
}
</script>
