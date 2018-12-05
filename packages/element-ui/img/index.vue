<template>
  <div :class="[b(),'avue-img--'+align]">
    <img v-if="status" :src="text" :width="setPx(imgWidth,'100%')" :height="setPx(imgHeight)" alt>
    <el-button v-else :size="size" :type="type" @click="handleViews">查 看</el-button>
    <el-dialog
      :visible.sync="box"
      width="60%"
      :class="{'avue-img--fullscreen':fullscreen}"
      :fullscreen="fullscreen"
      modal-append-to-body
      append-to-body
    >
      <avue-carousel :option="option"></avue-carousel>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { setPx } from "utils/util";
export default create({
  name: "img",
  mixins: [props(), event()],
  data() {
    return {
      box: false
    };
  },
  props: {
    align: {
      type: String,
      default: ""
    },
    imgType: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    dataType: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "small"
    },
    listType: {
      type: String,
      default: ""
    },
    value: {},
    imgWidth: {},
    imgHeight: {}
  },
  computed: {
    option() {
      if (this.status || !this.text) return {};
      let list = [];
      this.text.forEach(ele => {
        if (this.isArray) {
          list.push({
            src: ele
          });
        } else {
          list.push({
            title: ele[this.labelKey],
            src: ele[this.valueKey]
          });
        }
      });
      return {
        autoplay: true,
        type: this.imgType,
        fullscreen: this.fullscreen,
        interval: 3000,
        data: list
      };
    },
    isArray() {
      return this.dataType === "array";
    },
    status() {
      return this.listType === "picture-img";
    }
  },
  watch: {},
  created() {
    this.setPx = setPx;
  },
  mounted() {},
  methods: {
    handleViews() {
      this.box = true;
    }
  }
});
</script>

