<template>
	<div class="pull-height">
    <Top></Top>
		<div class="index">
			<div class="left pull-height">
          <Sidebar :isCollapse="isCollapse"></Sidebar>
			</div>
			<div class="right">
        <div class="nav">
            <i class="icon-daohanglanmoshi02 collapse" :class="[{ collapse_right: isCollapse }]" @click="showCollapse"></i>
            <Tags ref="nav"></Tags>
        </div>
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
  color: #333;
  transition: all 0.5s;
}
.collapse.collapse_right {
  transform: rotate(90deg);
}
.index {
  display: flex;
  height: calc(100% - 60px);
  padding: 0 0 20px 0;
  position: relative;
  min-height: 100%;
  background: #fff;
  overflow: hidden;
  .left {
    position: relative;
  }
  .right {
    padding-top: 50px;
    position: relative;
    flex: 1;
  }
  .main {
    overflow-y: scroll;
  }
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #f0f0f0;
    z-index: 999;
  }
}
</style>