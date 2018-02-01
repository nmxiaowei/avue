<template>
	<div class="app-main" style="min-height: 100%">
    <Header></Header>
		<div class="yun-content index" style="min-height: auto;">
			<div class="left">
          <Sidebar v-on:openUrl="openUrl"></Sidebar>
			</div>
			<div class="right">
          <Nav ref="nav"></Nav>
          <router-view></router-view>  
			</div>
		</div>
	</div>
</template>

<script>
import Nav from "./nav";
import Header from "./Header";
import Sidebar from "./sidebar";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  props: [],
  methods: {
    openUrl(url, name) {
      this.$refs.nav.openUrl(url, name);
    }
  },
  components: {
    Header,
    Nav,
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  height: calc(100% - 60px);
  overflow: hidden;
  .left {
    position: relative;
    background: #545c64;
    overflow-y: scroll;
  }
  .right {
    position: relative;
    flex: 1;
    overflow-y: scroll;
  }
}
</style>