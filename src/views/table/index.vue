<template>
  <div class="table-container pull-chheight">
    <div class="table-header">
      <el-button type="primary" @click="handleAdd" size="small" v-if="permission.sys_crud_btn_add">新 增</el-button>
      <el-button type="primary" @click="handleRowEdit" size="small">编 辑</el-button>
      <el-button type="primary" @click="handleRowDel" size="small">删 除</el-button>
      <el-button type="info" @click="handleExport" size="small" v-if="permission.sys_crud_btn_export">导出excel</el-button>
      <el-button type="warning" @click="handleJpeg" size="small">导出图片</el-button>
      <el-button type="danger" @click="toggleSelection([tableData[1]])" size="small">切换第二选中状态</el-button>
      <el-button @click="toggleSelection()" size="small">取消选择</el-button>
      <el-button type="success" size="small" v-if="permission.sys_crud_btn_add">
        <router-link :to="{path:'/forms/index'}">
          表单CRUD
        </router-link>
      </el-button>
    </div>
    <avue-crud :table-option="tableOption" v-model="user" :table-data="tableData" :table-loading="tableLoading" :before-open="boxhandleOpen" :before-close="boxhandleClose" @row-dblClick="handleRowDBLClick" @row-click="handleRowClick" :page="page" ref="crud" @row-save="handleSave" @row-update="handleUpdate" @row-del="handleDel" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
      <template slot-scope="props" slot="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="数字">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="类型">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="权限">
            <span>{{ props.row.grade }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="scope" slot="username">
        <el-tag>{{scope.row.username}}</el-tag>
      </template>
      <template slot-scope="scope" slot="nameForm">
        <avue-crud-input @click.native="tip" v-model="user.name">
        </avue-crud-input>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="primary" icon="el-icon-check" size="small" plain @click="handleEdit(scope.row,scope.index)">编辑</el-button>
        <el-button icon="el-icon-check" size="small" @click="handleGrade(scope.row,scope.index)">权限</el-button>
      </template>
    </avue-crud>
    <el-button @click.native="formate" style="margin: 8px 0">格式化</el-button>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 15}" placeholder="请输入内容" v-model="formJson">
    </el-input>
    <el-dialog title="菜单" :visible.sync="grade.box" width="40%">
      <el-tree :data="menuAll" :default-checked-keys="grade.check" :default-expanded-keys="grade.check" show-checkbox node-key="id">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleGradeUpdate">更新</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
import tableOption from "@/const/table/tableOption";
export default {
  name: "table",
  data() {
    return {
      tableOption: tableOption, //表格设置属性
      tableData: [], //表格的数据
      tableRow: {},
      tablePage: 1,
      tableLoading: false,
      tabelObj: {},
      formJson: "",
      user: {},
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
  created() {
    this.formJson = JSON.stringify(tableOption, null, 2);
    this.handleList();
  },
  watch: {},
  mounted() {},
  computed: {
    ...mapGetters(["permission", "menuAll"])
  },
  props: [],
  methods: {
    tip() {
      this.$message({
        message: "点击事件"
      });
    },
    formate() {
      let p = new Promise((resolve, reject) => {
        resolve(JSON.parse(this.formJson));
      });
      p
        .then(data => {
          this.tableOption = data;
          this.formJson = JSON.stringify(data, null, 2);
          this.$message({
            message: "数据加载成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            center: true,
            dangerouslyUseHTMLString: true,
            message: `JSON格式错误<br \>\n${err}`,
            type: "error"
          });
        });
    },
    /**
     * @title 权限更新
     *
     **/
    handleGradeUpdate() {
      this.tabelObj.check = [].concat(this.grade.check);
      this.tabelObj = {};
      this.grade.check = [];
      this.grade.box = false;
    },
    /**
     * @title 权限选择
     *
     **/
    handleGradeCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.grade.check.push(data.id);
      } else {
        this.grade.check.splice(this.grade.check.indexOf(data.id), 1);
      }
    },
    handleRowEdit() {
      this.$refs.crud.rowEdit(this.tableRow, -1);
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    /**
     * @title 打开权限
     */
    handleGrade(row, index) {
      this.$store.dispatch("GetMenuAll").then(data => {
        this.grade.box = true;
        this.tabelObj = row;
        this.grade.check = this.tabelObj.check;
      });
    },
    /**
     * @title 导出excel
     *
     **/
    handleExport() {
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["username", "name"];
        const filterVal = ["username", "name"];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, this.filename);
      });
    },
    /**
     * @title 导出图片
     *
     **/
    handleJpeg() {
      let vm = this;
      let table = this.$refs.crud.$el;
      html2canvas(table).then(canvas => {
        var url = canvas.toDataURL();
        let a = document.createElement("a");
        a.href = url;
        a.download = "未命名";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
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
      this.$refs.crud.rowAdd();
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
              currentPage: this.tablePage,
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
      this.tableRow = val[0];
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
     * @title 行双击
     * @param row 为当前的数据
     * @param event 事件
     *
     **/
    handleRowDBLClick(row, event) {
      this.$message({
        showClose: true,
        message: "双击",
        type: "success"
      });
    },

    /**
     * @title 行单机
     * @param row 为当前的数据
     * @param event 事件
     * @param column 列
     *
     **/
    handleRowClick(row, event, column) {
      this.$message({
        showClose: true,
        message: "单机",
        type: "success"
      });
    },
    handleRowDel() {
      this.$message({
        showClose: true,
        message: this.tableRow,
        type: "success"
      });
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
