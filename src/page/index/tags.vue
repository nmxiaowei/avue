<template>
  <div class="tags">
        <el-tag  :type="nowTagValue==item.value?'success':'info'" v-for="(item,index) in tagList" :key="index" @click.native="openUrl(item.value,item.label,item.num)">
            {{item.label}}
            <i class="el-icon-close" @click.stop="closeTag(item)"  v-if="item.close"></i>
        </el-tag>
        <h3 class="title pull-right">{{tag.label}}</h3>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "tags",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["tag", "tagList"]),
    nowTagValue: function() {
      return this.$route.query.src ? this.$route.query.src : this.$route.path;
    },
    tagListNum: function() {
      return this.tagList.length != 0;
    }
  },
  methods: {
    openUrl(url, name, num) {
      if (this.tagList.length >= 8) {
        this.$message({
          message: "选项卡数量不能超过8个，请关闭一些后再试",
          type: "warning"
        });
        return;
      }
      let reqUrl = url;
      if (url.indexOf("http") != -1) {
        this.$router.push({ path: `/myiframe/urlPath?src=${reqUrl}` });
      } else {
        this.$router.push({ path: `${reqUrl}` });
      }
      this.$store.commit("ADD_TAG", {
        label: name,
        value: url,
        num: num
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
        this.openUrl(tag.value, tag.label, tag.num);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tags {
  margin-left: 40px;
  padding: 0 12px;
  height: 50px;
  line-height: 50px;
  border-style: solid;
  border-width: 0;
  border-style: #6f7071;
  .el-tag {
    margin-right: 8px;
    border-radius: 2px;
    min-width: 90px;
    text-align: center;
    cursor: pointer;
  }
  .el-tag--success {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .el-tag--info {
    color: #eee;
    background-color: #d3d4d6;
    border-color: #d3d4d6;
  }
  .el-tag--success .el-tag__close,
  .el-tag--success .el-icon-close {
    color: #fff;
  }
  .el-tag--info .el-tag__close,
  .el-tag--info .el-icon-close {
    color: #eee;
  }

  .title {
    color: #333;
  }
}
</style>


