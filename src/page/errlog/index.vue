<template>
    <div class="errlog-container pull-height">
        <!-- <errorA></errorA> -->
        <div v-for="(err,index) in errLog" :key="index" class="errlog-list">
            <p class="errlog-item"><el-tag type="info">地址</el-tag><span>{{err.url}}</span></p>
            <p  class="errlog-item"><el-tag type="danger">信息</el-tag><span>{{err.message}}</span></p>
            <div class="errlog-info">
                {{err.stack}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import errorA from "./errorTestA";
export default {
  name: "errlog",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["errLog"])
  },
  props: [],
  methods: {},
  components: { errorA }
};
</script>

<style lang="scss" scoped>
.errlog-container {
  padding: 15px;
}
.errlog-list {
  & > .errlog-item {
    height: 40px;
    line-height: 40px;
    & > span {
      font-size: 14px;
    }
    & > .el-tag {
      margin-right: 10px;
    }
  }
  & > .errlog-info {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 8px 10px;
    background-color: #fff;
    font-size: 12px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccc;
  }
}
</style>
