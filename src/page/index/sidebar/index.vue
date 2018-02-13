<template>
     <div class="menu pull-height">
        <el-menu  
        unique-opened  
        :default-active="$route.query.src ? $route.query.src : $route.path" 
        class="el-menu-vertical-demo"  
        background-color="#304156" 
        text-color="#bfcbd9" 
        active-text-color="#409EFF"
        :collapse="isCollapse">
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

</style>

