<template>
	<div class="app-main" style="min-height: 100%">
    <Top></Top>
		<div class="yun-content index" style="min-height: auto;">
			<div class="left">
          <Sidebar :isCollapse="isCollapse"></Sidebar>
			</div>
			<div class="right">
        <div class="nav">
            <i class="collapse el-icon-menu" @click="showCollapse"></i>
            <Tags ref="nav"></Tags>
        </div>
         
          <router-view></router-view>  
			</div>
		</div>
	</div>
</template>

<script>
import Tags from "./tags";
import Top from "./top";
import Sidebar from "./sidebar/";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false
    };
  },
  created() {},
  mounted() {},
  props: [],
  methods: {
    showCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  components: {
    Top,
    Tags,
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.collapse {
  position: absolute;
  left: 10px;
  line-height: 52px;
  font-size: 20px;
  color: #999;
}
.index {
  display: flex;
  height: calc(100% - 60px);
  overflow: hidden;
  .left {
    position: relative;
  }
  .right {
    position: relative;
    flex: 1;
    overflow-y: scroll;
  }
  .nav {
    background: #f0f0f0;
  }
}
</style>