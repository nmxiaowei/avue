<template>
  <div class="pull-chheight">
    <Crud :tableOption="tableOption" :tableData="tableData">
      <template slot-scope="scope" slot="git">
        <a :href="scope.row.git" target="_blank">{{scope.row.git}}</a>
      </template>
      <template slot-scope="scope" slot="menu">
        <router-link :to="{path:`/advanced-router/mutative-detail/${scope.row.id}`,query:{name:`${scope.row.name}动态路由详情`}}">
          <el-button icon="el-icon-check" size="small">
            详情
          </el-button>
        </router-link>
      </template>
    </Crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Crud from "@/components/crud/";
import tableOption from "@/const/routerOption";
import tableData from "@/const/routerData";
export default {
  name: "mutative-router",
  components: {
    Crud
  },
  data() {
    return {
      tableData: tableData,
      tableOption: tableOption
    };
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">

</style>