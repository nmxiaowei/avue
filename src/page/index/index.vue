<template>
	<div class="pull-height">
    <Top></Top>
		<div class="index">
      <Sidebar class="left pull-height"></Sidebar>
			<div class="right">
          <Tags ref="nav" class="nav"></Tags>
          <router-view class="main"></router-view>  
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
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {},
  components: {
    Top,
    Tags,
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  height: calc(100% - 60px);
  padding: 0 0 20px 0;
  position: relative;
  min-height: 100%;
  background: #fff;
  overflow: hidden;
  .left:not(.el-menu--collapse) {
    width: 200px;
  }
  .right {
    padding-top: 45px;
    position: relative;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  }
  .main {
    overflow-y: scroll;
  }
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>