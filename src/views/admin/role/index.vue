<template>
  <div>
    <basic-container>
      <avue-crud :option="tableOption"
                 :data="tableData"
                 :table-loading="tableLoading"
                 :page="page"
                 ref="crud"
                 width="290"
                 @row-save="handleSave"
                 @row-update="handleUpdate"
                 @row-del="handleDel">
        <template slot-scope="scope"
                  slot="menu">
          <el-button icon="el-icon-check"
                     size="small"
                     @click="handleGrade(scope.row,scope.$index)">权限</el-button>
        </template>
      </avue-crud>
      <el-dialog title="菜单"
                 :visible.sync="grade.box"
                 width="40%">
        <el-tree :data="menuAll"
                 :default-checked-keys="grade.check"
                 :default-expanded-keys="grade.check"
                 show-checkbox
                 node-key="id"
                 @check-change="handleGradeCheckChange">
        </el-tree>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="handleGradeUpdate">更新</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { roleOption } from "@/const/admin/adminTabelOption.js";
export default {
  name: "role",
  components: {},
  data () {
    return {
      tableOption: {}, //表格设置属性
      tableData: [], //表格的数据
      tablePage: 1,
      tableLoading: false,
      tabelObj: {},
      page: {
        total: 0, //总页数
        currentPage: 1, //当前页数
        pageSize: 10 //每页显示多少条
      },
      grade: {
        box: false,
        check: []
      }
    };
  },
  created () {
    //初始化数据格式
    this.tableOption = roleOption;
    this.handleList();
  },
  watch: {},
  mounted () { },
  computed: {
    ...mapGetters(["permission", "menuAll"])
  },
  props: [],
  methods: {
    /**
     * @title 权限更新
     *
     **/
    handleGradeUpdate () {
      this.tabelObj.check = [].concat(this.grade.check);
      this.tabelObj = {};
      this.grade.check = [];
      this.grade.box = false;
    },
    /**
     * @title 权限选择
     *
     **/
    handleGradeCheckChange (data, checked, indeterminate) {
      if (checked) {
        this.grade.check.push(data.id);
      } else {
        this.grade.check.splice(this.grade.check.indexOf(data.id), 1);
      }
    },
    /**
     * @title 打开权限
     */
    handleGrade (row, index) {
      this.$store.dispatch("GetMenuAll").then(data => {
        this.grade.box = true;
        this.tabelObj = row;
        this.grade.check = this.tabelObj.check;
      });
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd () {
      this.$refs.crud.rowAdd();
    },
    /**
     * @title 获取数据
     * @detail 赋值为tableData表格即可
     *
     **/
    handleList () {
      this.tableLoading = true;
      this.$store
        .dispatch("GetRoleData", { page: `${this.tablePage}` })
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
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave (row, done) {
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
    handleDel (row, index) {
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
        .catch(err => { });
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate (row, index, done) {
      this.tableData.splice(index, 1, row);
      this.$message({
        showClose: true,
        message: "修改成功",
        type: "success"
      });
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: 8px 10px;
}
</style>
