<template>
  <div class="pull-height animated" :class="{'zoomOutUp': isLock}">
    <div class="index">
      <sidebar class="left"></sidebar>
      <div class="right">
        <div class="nav">
          <top class="top"></top>
          <tags></tags>
        </div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="main"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import top from "./top/";
import sidebar from "./sidebar/";
export default {
  components: {
    top,
    tags,
    sidebar
  },
  name: "index",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: mapGetters(["isLock"]),
  props: [],
  methods: {}
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  padding: 0 0 20px 0;
  position: relative;
  min-height: 100%;
  background: #fff;
  overflow: hidden;
  .left {
    width: 230px;
    overflow-y: auto;
  }
  .right {
    padding-top: 109px;
    position: relative;
    flex: 1;
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
  .top {
    margin-bottom: 2px;
  }
}
</style>