<template>
  <div class="tags-container">
        <el-tag  @contextmenu.prevent.native="openMenu(item,$event)" :type="nowTagValue==item.value?'success':'info'" v-for="(item,index) in tagList" :key="index" @click.native="openUrl(item.value,item.label,item.num)">
            {{item.label}}
            <i class="el-icon-close" @click.stop="closeTag(item)"  v-if="item.close"></i>
        </el-tag>
        <h3 class="title pull-right">{{tag.label}}</h3>
         <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
          <li @click="closeTag(selectedTag)">关闭</li>
          <li @click="closeOthersTags">关闭其他</li>
          <li @click="closeAllTags">关闭全部</li>
        </ul>
    </div>
</template>
<script>
import { resolveUrlPath } from "@/util/util";
import { mapState, mapGetters } from "vuex";
export default {
  name: "tags",
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  created() {},
  mounted() {},
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  computed: {
    ...mapGetters(["tagWel", "tag", "tagList"]),
    nowTagValue: function() {
      return this.$route.query.src ? this.$route.query.src : this.$route.path;
    },
    tagListNum: function() {
      return this.tagList.length != 0;
    }
  },
  methods: {
    openMenu(tag, e) {
      if (this.tagList.length == 1) {
        return;
      }
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.value);
      this.$store.commit("DEL_TAG_OTHER", this.selectedTag);
    },
    closeMenu() {
      this.visible = false;
    },
    closeAllTags() {
      this.$store.commit("DEL_ALL_TAG");
      this.$store.commit("ADD_TAG", this.tagWel);
      this.$router.push({ path: this.tagWel.value });
    },
    openUrl(url, name, num) {
      this.$router.push({ path: resolveUrlPath(url) });
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
      if (item.value == this.tag.value) {
        tag = this.tagList[key == 0 ? key : key - 1];
        this.openUrl(tag.value, tag.label, tag.num);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tags-container {
  position: relative;
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
    color: #666;
    letter-spacing: 1px;
    font-size: 16px;
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 2;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>


