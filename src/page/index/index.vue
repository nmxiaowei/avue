<template>
  <el-container class="avue-contail">
    <el-aside :style="{width: isCollapse ? asideWidthCollapse : asideWidth}">
      <!-- 左侧导航栏 -->
      <sidebar class="avue-sidebar"></sidebar>
    </el-aside>
    <el-container>
      <el-header height="auto"
                 class="avue-tabs">
        <!-- 顶部导航栏 -->
        <top />
        <!-- 顶部标签卡 -->
        <tags />
      </el-header>
      <el-main class="avue-main">
        <!-- 主体视图层 -->
        <keep-alive>
          <transition name="fade-transverse">
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive" />
          </transition>
        </keep-alive>
        <transition name="fade-transverse">
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import tags from './tags'
import top from './top/'
import sidebar from './sidebar/'
import { validatenull } from '@/util/validate';
import { calcDate } from '@/util/date.js';
import { setStore, getStore } from '@/util/store.js';
export default {
  components: {
    top,
    tags,
    sidebar
  },
  name: 'index',
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '230px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
    }
  },
  created () {
    //实时检测刷新token
    this.refreshToken();
  },
  mounted () { },
  computed: mapGetters(['isLock', 'isCollapse', 'website']),
  props: [],
  methods: {
    // 实时检测刷新token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'token',
          debug: true,
        });
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch('RefeshToken')
            .then((res) => {
              clearInterval(this.refreshTime);
            })
            .catch((err) => {
              this.refreshLock = false;
            });
        }
      }, 3000);
    },
  }
}
</script>

<style lang="scss" scoped>
.avue-contail {
  height: 100%;
}
.avue-sidebar {
  height: 100%;
}
.avue-tabs {
  padding: 0;
}
.avue-main {
  position: relative;
  padding: 0;
}
.avue-view {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>