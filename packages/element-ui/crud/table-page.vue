<template>
  <div :class="b('pagination')"
       v-if="pageFlag">
    <el-pagination :small="crud.isMobile"
                   :pager-count="crud.isMobile?5:7"
                   :current-page.sync="defaultPage.currentPage"
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
  inject: ["crud"],
  data () {
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
  created () {
    this.vaildData = vaildData;
    //初始化分页
    this.pageInit();
    this.crud.$emit("on-load", this.defaultPage);
  },
  computed: {
    pageFlag () {
      return !this.validatenull(this.crud.page.total);
    }
  },
  methods: {
    pageInit () {
      this.defaultPage.total = this.crud.page.total || 0;
      this.defaultPage.currentPage = this.crud.page.currentPage || 1;
      this.defaultPage.pageSize = this.crud.page.pageSize || 10;
      this.defaultPage.pageSizes = this.crud.page.pageSizes || [
        10,
        20,
        30,
        40,
        50,
        100
      ];
      this.defaultPage.background = this.crud.page.background || true;
    },
    // 页大小回调
    sizeChange (val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("size-change", val);
    },
    // 页码回调
    currentChange (val) {
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("current-change", val);
    }
  }
});
</script>