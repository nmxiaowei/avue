<template>
    <el-menu  unique-opened :default-active="activeName==''||activeName==undefined?'0':activeName.index+''" class="el-menu-vertical-demo"  background-color="#545c64"
text-color="#fff" active-text-color="#ffd04b">
        <template  v-for="(item,parIndex) in list">
            <el-menu-item :index="parIndex+''" @click="openUrl(`${item.href}`,`${item.title}`)"  :key="parIndex" v-if="item.children.length==0">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu :index="parIndex+''" v-else>
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item :index="`${parIndex}-${chdIndex}`" v-for="(item,chdIndex) in item.children" @click="openUrl(`${item.href}`,`${item.title}`)" :key="chdIndex">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>
<script>
import MENU from "@/const/menu";
export default {
  name: "nav",
  data() {
    return {
      list: [],
      parentId: 0
    };
  },
  created() {
    this.menuGet();
  },
  mounted() {},
  methods: {
    openUrl(url, name) {
      this.$emit("openUrl", url, name);
    },
    menuGet() {
      this.list = MENU;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
//菜单选择小标题字体颜色
.el-submenu__title {
  span,
  i {
    color: rgba(255, 255, 255, 0.7);
  }
}
//菜单的大标题色
.el-submenu.is-active {
  .el-submenu__title {
    span,
    i {
      color: #fff;
    }
  }
}
//菜单选择小标题字体颜色
.el-menu-item.is-active {
  span,
  i {
    color: #fff;
  }
}

//菜单小标题字体颜色
.el-menu-item {
  span,
  i {
    color: rgba(255, 255, 255, 0.7);
  }
}
//子菜单的背景色
.el-submenu .el-menu > li {
  background-color: #393d49 !important;
}
</style>

