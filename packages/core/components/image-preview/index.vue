<template>
  <div :class="b()"
       v-if="isShow"
       @click="isShow=false">
    <div :class="b('mask')"></div>
    <div :class="b('box')">
      <el-carousel :height="height"
                   :initial-index="index"
                   type="card">
        <el-carousel-item v-for="(item,index) in datas"
                          :key="index">
          <el-image :src="item.url"
                    fit="contain"
                    :style="{height:height}"></el-image>
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
      datas: [],
      isShow: false,
      index: 0,
      onClose: null,
      height: '500px'
    };
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