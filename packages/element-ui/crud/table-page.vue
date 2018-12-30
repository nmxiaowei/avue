<template>
  <div :class="b('pagination')"
       v-if="pageFlag">
    <el-pagination :current-page.sync="defaultPage.currentPage"
                   :background="vaildData(defaultPage.pageBackground,config.pageBackground)"
                   :page-size="defaultPage.pageSize"
                   :page-sizes="defaultPage.pageSizes"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="defaultPage.total"></el-pagination>
  </div>
</template>

<script>
import config from "./config";
import create from "core/create";
import { vaildData } from "utils/util";
export default create({
  name: "crud",
  data() {
    return {
      config: config,
      defaultPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        background: true // 背景颜色
      }
    };
  },
  created() {
    this.vaildData = vaildData;
    //初始化分页
    this.$parent.$emit("on-load", this.defaultPage);
    this.pageInit();
  },
  computed: {
    pageFlag() {
      return !this.validatenull(this.$parent.page.total);
    }
  },
  methods: {
    pageInit() {
      this.defaultPage.total = this.$parent.page.total || 0;
      this.defaultPage.currentPage = this.$parent.page.currentPage || 1;
      this.defaultPage.pageSize = this.$parent.page.pageSize || 10;
      this.defaultPage.pageSizes = this.$parent.page.pageSizes || [
        10,
        20,
        30,
        40,
        50,
        100
      ];
      this.defaultPage.background = this.$parent.page.background || true;
    },
    // 页大小回调
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$parent.$emit("on-load", this.defaultPage);
      this.$parent.$emit("size-change", val);
    },
    // 页码回调
    currentChange(val) {
      this.$parent.$emit("on-load", this.defaultPage);
      this.$parent.$emit("current-change", val);
    }
  }
});
</script>