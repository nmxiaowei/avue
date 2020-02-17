<template>
  <div :class="b('pagination')"
       v-if="pageFlag">
    <el-pagination :small="crud.isMobile"
                   hide-on-single-page
                   :pager-count="defaultPage.pagerCount"
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
export default create({
  name: "crud",
  inject: ["crud"],
  props: {
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      config: config,
      defaultPage: {
        total: 0, // 总页数
        pagerCount: 7,//超过多少条隐藏
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        background: true // 背景颜色
      }
    };
  },
  created () {
    this.pageInit();
    this.crud.$emit("on-load", this.defaultPage);
  },
  watch: {
    page: {
      handler () {
        this.pageInit();
      },
      deep: true,
    },
  },
  computed: {
    pageFlag () {
      return this.defaultPage.total != 0
    }
  },
  methods: {
    pageInit () {
      this.defaultPage = Object.assign(this.defaultPage, this.page)
      this.updateValue();
    },
    updateValue () {
      this.crud.$emit('update:page', this.defaultPage)
    },
    // 页大小回调
    sizeChange (val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("size-change", val);
    },
    // 页码回调
    currentChange (val) {
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("current-change", val);
    }
  }
});
</script>