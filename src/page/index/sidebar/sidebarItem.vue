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
      const path =
        item.href.indexOf("http") != -1 || item.href.indexOf("https") != -1
          ? `/myiframe/urlPath?src=${item.href} `
          : item.href;
      this.$store.commit("ADD_TAG", {
        label: item.title,
        value: item.href
      });
      this.$router.push({ path: path });
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  a {
    width: 100%;
  }
}
//菜单选择小标题字体颜色
.el-submenu__title >  {
  span,
  i {
    color: rgba(163, 175, 183, 0.9);
  }
  i {
    font-size: 16px !important;
  }
}
//菜单的大标题色
.el-submenu.is-active >  {
  .el-submenu__title {
    span,
    i {
      color: #fff;
    }
  }
}
//菜单选择小标题字体颜色
.el-menu-item.is-active >  {
  span,
  i {
    color: #fff;
  }
}

//菜单小标题字体颜色
.el-menu-item >  {
  span,
  i {
    color: rgba(163, 175, 183, 0.9);
  }
  i {
    font-size: 16px !important;
  }
}
</style>

