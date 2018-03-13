<template>
  <div class="pull-height">
    <el-row :span="24">
      <template v-for="item in dataOption">
        <el-col :span="6">
          <Datashow :data="item"></Datashow>
        </el-col>
      </template>
    </el-row>

  </div>
</template>

<script>
import Datashow from "@/components/datashow/";
export default {
  name: "exhibition",
  components: {
    Datashow
  },
  data() {
    return {
      dataOption: [
        {
          title: "分类统计",
          subtitle: "实时",
          count: 7993,
          allcount: 10222,
          text: "当前分类总记录数",
          color: "rgb(49, 180, 141)",
          key: "类"
        },
        {
          title: "附件统计",
          subtitle: "实时",
          count: 3112,
          allcount: 10222,
          text: "当前上传的附件数",
          color: "rgb(56, 161, 242)",
          key: "附"
        },
        {
          title: "文章统计",
          subtitle: "实时",
          count: 908,
          allcount: 10222,
          text: "评论次数",
          color: "rgb(117, 56, 199)",
          key: "评"
        },
        {
          title: "新闻统计",
          subtitle: "实时",
          count: 908,
          allcount: 10222,
          text: "评论次数",
          color: "rgb(59, 103, 164)",
          key: "新"
        }
      ]
    };
  },
  created() {},
  watch: {},
  mounted() {},
  computed: {}
};
</script>

<style scoped>

</style>
