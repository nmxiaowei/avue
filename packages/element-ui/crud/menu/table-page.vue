<template>
  <el-card :shadow="crud.isCard"
           :class="b('pagination')"
           v-if="pageFlag && validData(crud.tableOption.page,true)">
    <slot name="page"></slot>
    <el-pagination :small="crud.isMobile"
                   :disabled="defaultPage.disabled"
                   :hide-on-single-page="validData(crud.tableOption.simplePage,config.simplePage)"
                   :pager-count="defaultPage.pagerCount"
                   :background="validData(defaultPage.background,config.pageBackground)"
                   v-model:page-size="defaultPage.pageSize"
                   v-model:current-page="defaultPage.currentPage"
                   :layout="defaultPage.layout"
                   :page-count="defaultPage.total"
                   :total="defaultPage.total"></el-pagination>
  </el-card>
</template>

<script>
import config from "../config";
import create from "core/create";
export default create({
  name: "crud",
  inject: ["crud"],
  data () {
    return {
      config: config
    };
  },
  created () {
    this.pageInit();
  },
  watch: {
    pageFlag () {
      this.crud.getTableHeight();
    },
    'defaultPage.pageSize' (val) {
      this.sizeChange(val)
    },
    'defaultPage.currentPage' (val) {
      this.currentChange(val)
    },
    'defaultPage.total' (val) {
      if (this.defaultPage.total === (this.defaultPage.currentPage - 1) * this.defaultPage.pageSize && this.defaultPage.total != 0) {
        this.currentChange(this.defaultPage.currentPage - 1)
      }
    }
  },
  computed: {
    defaultPage: {
      get () {
        return this.crud.page
      },
      set (val) {
        this.crud.$emit('update:page', val)
      }
    },
    pageFlag () {
      return this.defaultPage.total != 0
    }
  },
  methods: {
    pageInit () {
      const defaultPage = {
        total: 0, // 总页数
        pagerCount: 7,//超过多少条隐藏
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true // 背景颜色
      }
      this.defaultPage = Object.assign(defaultPage, this.defaultPage)
      this.crud.$emit("on-load", this.defaultPage);
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
      this.defaultPage.currentPage = val;
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("current-change", val);
    }
  }
});
</script>
