<template>
     <div class="menu pull-height">
        <el-menu  unique-opened  :default-active="$route.query.src ? $route.query.src : $route.path" class="el-menu-vertical-demo"  background-color="#263238" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
            <SidebarItem :menu="menu"></SidebarItem>
        </el-menu>
     </div>
</template>

<script>
import MENU from "@/mock/menu";
import { mapGetters } from "vuex";
import SidebarItem from "./sidebarItem";

export default {
  data() {
    return {};
  },
  props: ["isCollapse"],
  created() {
    this.$store.dispatch("GetMenu").then(data => {});
  },
  computed: mapGetters(["menu"]),
  mounted() {},
  methods: {},
  components: { SidebarItem }
};
</script>
<style lang="scss" scoped>
.menu {
  background: #263238;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 220px;
  max-width: 300px;
}
</style>

