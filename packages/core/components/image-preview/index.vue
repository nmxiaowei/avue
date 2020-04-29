<template>
  <div :class="b()"
       v-if="isShow"
       @click="isShow=false">
    <div :class="b('mask')"></div>
    <div :class="b('box')">
      <el-carousel :initial-index="index"
                   type="card">
        <el-carousel-item v-for="(item,index) in datas"
                          :key="index">
          <el-image :src="item.url"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import create from "core/create";
export default create({
  name: "image-preview",
  data () {
    return {
      isShow: false,
      datas: [],
      index: 0,
      onClose: null,
      width: 200,
      height: 200
    };
  },
  watch: {
    isShow () {
      if (!this.isShow) {
        this.close();
        this.width = 200;
        this.height = 200;
      }
    }
  },
  mounted () { },
  methods: {
    close () {
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    }
  }
});
</script>