<template>
  <div>
    <basic-container>
      <avue-crud :option="tableOption"
                 :data="tableData">
        <template slot-scope="scope"
                  slot="git">
          <a :href="scope.row.git"
             target="_blank">{{scope.row.git}}</a>
        </template>
        <template slot-scope="scope"
                  slot="menu">
          <router-link :to="{path:'/advanced-router/argument-detail',query:{id:scope.row.id,name:`${scope.row.name}的参数路由详情`}}">
            <el-button icon="el-icon-check"
                       size="small">
              详情
            </el-button>
          </router-link>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tableOption from "@/const/router/routerOption";
import tableData from "@/const/router/routerData";
export default {
  name: "argument-page",
  components: {},
  data () {
    return {
      tableData: tableData,
      tableOption: tableOption
    };
  },
  created () { },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
</style>