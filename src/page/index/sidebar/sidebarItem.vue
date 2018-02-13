<template>
  <div class="menu-wrapper">
    <template  v-for="(item,index) in menu">
        <el-menu-item v-if="item.children.length===0 " :index="item.href" @click="open(item)" :key="item.title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
      <el-submenu v-else :index="item.title" :key="item.name">
          <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
          </template>
          <template v-for="child in item.children">
              <el-menu-item :index="child.href" @click="open(child)" v-if="child.children.length==0">
                  <i :class="child.icon"></i>
                  <span slot="title">{{child.title}}</span>
              </el-menu-item>
            <sidebarItem  v-else  :menu="[child]"></sidebarItem>
         </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from "@/util/util";
export default {
  name: "sidebarItem",
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array
    }
  },
  created() {},
  mounted() {},
  methods: {
    open(item) {
      this.$router.push({ path: resolveUrlPath(item.href) });
      this.$store.commit("ADD_TAG", {
        label: item.title,
        value: item.href
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

