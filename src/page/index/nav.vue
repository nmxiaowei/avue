<template>
  <div class="yun-nav">
        <el-tag  :type="tag.value==item.value?'success':'info'" v-for="(item,index) in tagList" :key="index" @click.native="openUrl(item.value,item.label)">
            {{item.label}}
            <i class="el-icon-close" @click.stop="closeTag(item)"  v-if="item.close"></i>
        </el-tag>
        <span class="title pull-right">{{tag.label}}</span>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "nav",
  data() {
    return {};
  },
  created() {
    if (window.location.hash == "#/index" || window.location.hash == "#/") {
      this.openUrl(this.tagWel.value, this.tagWel.label);
    }
  },
  mounted() {},
  computed: mapGetters(["tag", "tagList", "tagWel"]),
  methods: {
    openUrl(url, name) {
      if (this.tagList.length >= 8) {
        this.$message({
          message: "选项卡数量不能超过8个，请关闭一些后再试",
          type: "warning"
        });
        return;
      }
      let reqUrl = url;
      if (
        (url.indexOf("/khgl") != -1 || url.indexOf("/dic") != -1) &&
        url.indexOf("#") == -1 &&
        url.indexOf("http") == -1
      )
        reqUrl = `#/${url}`;
      if (url.indexOf("http") != -1) {
        this.$router.push({ path: `/myiframe/urlPath?src=${reqUrl}` });
      } else if (url.indexOf("#") == -1 && url.indexOf("#") != 0) {
        this.$router.push({
          path: `/myiframe/urlPath?src=${this.baseUrl}${reqUrl}`
        });
      } else {
        reqUrl = url.replace("#/", "");
        this.$router.push({ path: `/myiframe/${reqUrl}` });
      }
      this.$store.commit("ADD_TAG", {
        label: name,
        value: url
      });
    },
    eachTag(tag) {
      for (var key in this.tagList) {
        if (this.tagList[key].value == tag.value) {
          return key;
        }
      }
      return -1;
    },
    closeTag(item) {
      const key = this.eachTag(item);
      let tag;
      this.$store.commit("DEL_TAG", item);
      if (this.tagList.length > 0 && item.value == this.tag.value) {
        tag = this.tagList[key == 0 ? key : key - 1];
        this.openUrl(tag.value, tag.label);
      }
    }
  }
};
</script>
<style>

</style>


