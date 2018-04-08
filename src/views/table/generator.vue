<template>
    <div class="generator-container  pull-chheight">
        <el-form ref="form" :model="form" label-width="90px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="表格宽度">
                        <crud-input v-model="form.width"></crud-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格高度">
                        <crud-input v-model.number="form.height"></crud-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="表格字典">
                        <crud-input v-model="form.dic" @click.native="dicData.box=true"></crud-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="操作栏宽度">
                        <crud-input v-model.number="form.menuWidth"></crud-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格边框">
                        <crud-radio v-model="form.border" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格序号">
                        <crud-radio v-model="form.index" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格勾选框">
                        <crud-radio v-model="form.selection" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格操作栏">
                        <crud-radio v-model="form.menu" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="行删除按钮">
                        <crud-radio v-model="form.editBtn" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="行编辑按钮">
                        <crud-radio v-model="form.delBtn" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="表格分页">
                        <crud-radio v-model="form.page" :dic="DIC.VAILDATA"></crud-radio>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button type="primary" @click="handleAddColumn">新增</el-button>
        <Crud ref="crud" :tableOption="tableOption" :tableData="form.column" @handleUpdate="handleUpdate" @handleDel="handleDel" @handleSave="handleSave"></Crud>
        <el-input type="textarea" v-model="result" :autosize="{ minRows: 10}"></el-input>
        <el-dialog title="字典选择" :visible.sync="dicData.box">
            <crud-checkbox v-model="dicData.check" :dic="DIC.DATALIST"></crud-checkbox>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleDicSbumit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { DIC } from "@/const/dic";
import tableOption from "@/const/generator";
import crudSelect from "@/components/crud/crud-select";
import crudInput from "@/components/crud/crud-input";
import crudRadio from "@/components/crud/crud-radio";
import crudCheckbox from "@/components/crud/crud-checkbox";
import crudDate from "@/components/crud/crud-date";
import Crud from "@/components/crud/";
export default {
  name: "table-generator",
  components: {
    crudSelect,
    crudInput,
    crudRadio,
    crudCheckbox,
    crudDate,
    Crud
  },
  data() {
    return {
      tableOption: tableOption,
      DIC: DIC,
      form: {
        column: []
      },
      result: "",
      dicData: {
        box: false,
        check: [],
        list: []
      }
    };
  },
  created() {
    this.init();
  },
  watch: {
    form: {
      handler(n, o) {
        let form = this.form;
        const result = JSON.stringify(form, null, 2);
        this.result = result;
      },
      deep: true
    }
  },
  mounted() {},
  computed: {},
  props: [],
  methods: {
    init() {
      this.tableOption.dic = ["CRUDTYPE", "VAILDATA"];
    },
    handleDicSbumit() {
      this.form.dic = ["CRUDTYPE", "VAILDATA"].concat(this.dicData.check);
      this.tableOption.dic = this.form.dic;
      this.dicData.list = [];
      this.tableOption.dic.forEach(ele => {
        this.dicData.list.push({
          label: ele,
          value: ele
        });
      });
      this.tableOption.column[
        this.tableOption.column.length - 1
      ].dicData = this.dicData.list;
      this.dicData.box = false;
    },
    handleAddColumn() {
      this.$refs.crud.handleAdd();
    },
    handleSave(row, done) {
      this.form.column.push(row);
      this.$message({
        showClose: true,
        message: "添加成功",
        type: "success"
      });
      done();
    },
    handleUpdate(row, index, done) {
      this.form.column.splice(index, 1, row);
      this.$message({
        showClose: true,
        message: "修改成功",
        type: "success"
      });
      done();
    },
    handleDel(row, index) {
      this.$confirm(`是否确认删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.column.splice(index, 1);
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.generator-container {
  padding: 20px 10px;
  box-sizing: border-box;
}
</style>

