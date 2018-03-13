<template>
  <div class="exhibition-contailer  pull-chheight">
    <h4>选项卡展示</h4>
    <el-row :span="24">
      <template v-for="item in dataOption">
        <el-col :span="6">
          <Datashow :data="item"></Datashow>
        </el-col>
      </template>
    </el-row>
    <div class="pull-auto" style="margin-top:20px;">
      <h4>带数字的展示</h4>
      <easyData :option="easyDataOption1"></easyData>
    </div>
    <div class="pull-auto" style="margin-top:20px;">
      <h4>简易展示</h4>
      <easyData :option="easyDataOption2"></easyData>
    </div>
  </div>
</template>

<script>
import Datashow from "@/components/datashow/";
import easyData from "@/components/datashow/easyData";
export default {
  name: "exhibition",
  components: {
    Datashow,
    easyData
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
      ],
      easyDataOption1: {
        color: "rgb(63, 161, 255)",
        span: 4,
        data: [
          {
            title: "今日注册",
            count: 12678,
            icon: "icon-cuowu"
          },
          {
            title: "今日登录",
            count: 22139,
            icon: "icon-shujuzhanshi2"
          },
          {
            title: "今日订阅",
            count: 35623,
            icon: "icon-jiaoseguanli"
          },
          {
            title: "今日评论",
            count: 16826,
            icon: "icon-caidanguanli"
          },
          {
            title: "今日评论",
            count: 16826,
            icon: "icon-caidanguanli"
          },
          {
            title: "今日评论",
            count: 16826,
            icon: "icon-caidanguanli"
          }
        ]
      },
      easyDataOption2: {
        color: "rgb(63, 161, 255)",
        span: 4,
        discount: true,
        data: [
          {
            title: "错误日志",
            icon: "icon-cuowu"
          },
          {
            title: "数据展示",
            icon: "icon-shujuzhanshi2"
          },
          {
            title: "权限管理",
            icon: "icon-jiaoseguanli"
          },
          {
            title: "菜单管理",
            icon: "icon-caidanguanli"
          },
          {
            title: "权限测试",
            icon: "icon-caidanguanli"
          },
          {
            title: "错误页面",
            icon: "icon-caidanguanli"
          }
        ]
      }
    };
  },
  created() {},
  watch: {},
  mounted() {},
  computed: {}
};
</script>

<style scoped>
.exhibition-contailer {
  padding: 0 20px;
}
</style>
