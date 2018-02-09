<template>
 <div class="table-container pull-height">
    <div class="table-header">
      <el-button type="primary" @click="handleAdd" size="small">新 增</el-button>
      <el-button @click="toggleSelection([tableData[1]])" size="small">切换第二选中状态</el-button>
      <el-button @click="toggleSelection()" size="small">取消选择</el-button>
    </div>
  <Crud 
  :tableOption="tableOption"
  :tableData="tableData"
  :tableLoading="tableLoading"
  @handleSave="handleSave"
  @handleUpdate="handleUpdate"
  @handleDel="handleDel"
  @handleCurrentChange="handleCurrentChange"
  @handleSelectionChange="handleSelectionChange"
  :before-open="boxhandleOpen"
  :before-close="boxhandleClose" 
  :page="page"
  ref="crud">
  </Crud>
 </div>
</template>

<script>
import Crud from "@/components/crud/";
import tableOption from "@/const/tableOption";
export default {
  name: "table",
  data() {
    return {
      tableOption: {}, //表格设置属性
      tableData: [], //表格的数据
      tablePage: 1,
      tableLoading: false,
      page: {
        total: 0, //总页数
        currentPage: 1, //当前页数
        pageSize: 10 //每页显示多少条
      }
    };
  },
  created() {
    //初始化数据格式
    this.tableOption = tableOption;
    this.handleList();
  },
  watch: {},
  mounted() {},
  props: [],
  methods: {
    /**
     * @title 页面改变值
     *
     **/
    handleCurrentChange(val) {
      this.tablePage = val;
      this.handleList();
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd() {
      this.$refs.crud.handleAdd();
    },
    /**
     * @title 选中第几行
     * @param row 选中那几行数据
     * @detail 调用crud的toggleSelection方法即可
     *
     **/
    toggleSelection(row) {
      this.$refs.crud.toggleSelection(row);
    },
    /**
     * @title 获取数据
     * @detail 赋值为tableData表格即可
     *
     **/
    handleList() {
      this.tableLoading = true;
      this.$store
        .dispatch("GetTableData", { page: `${this.tablePage}` })
        .then(data => {
          setTimeout(() => {
            this.tableData = data.tableData;
            this.page = {
              total: data.total,
              pageSize: data.pageSize
            };
            this.tableLoading = false;
          }, 1000);
        });
    },
    /**
     * @title 当前选中的数据
     * @param val 选中的值
     *
     **/
    handleSelectionChange(val) {
      this.$message({
        showClose: true,
        message: JSON.stringify(val),
        type: "success"
      });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave(row, done) {
      this.tableData.push(row);
      this.$message({
        showClose: true,
        message: "添加成功",
        type: "success"
      });
      done();
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     *
     **/
    handleDel(row, index) {
      this.$confirm(`是否确认删除序号为${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        })
        .catch(err => {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate(row, index, done) {
      this.tableData.splice(index, 1, row);
      this.$message({
        showClose: true,
        message: "修改成功",
        type: "success"
      });
      done();
    },
    /**
     * @title 表单关闭前处理
     * @param done
     *
     **/
    boxhandleClose(done) {
      this.$message({
        showClose: true,
        message: "表单关闭前处理事件",
        type: "success"
      });
      done();
    },
    boxhandleOpen(show) {
      this.$message({
        showClose: true,
        message: "表单打开前处理事件",
        type: "success"
      });
      show();
    }
  },
  components: {
    Crud
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: 8px 10px;
}
.table-header {
  margin-bottom: 10px;
  & > .el-button {
    padding: 12px 25px;
  }
}
</style>
