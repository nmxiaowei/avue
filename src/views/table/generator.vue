<template>
  <div class="generator-container  pull-chheight">
    <Forms :formOption="formOption" :formData="form" @handleSubmit="handleSubmit">
      <template slot-scope="scope" slot="dic">
        <crud-input @click.native="dicData.box=true" v-model=" scope.value "></crud-input>
      </template>
    </Forms>
    <el-button type="primary " @click="handleAddColumn " size="small ">新增</el-button>
    <Crud ref="crud " :tableOption="tableOption " :tableData="form.column " @handleUpdate="handleUpdate " @handleDel="handleDel " @handleSave="handleSave "></Crud>
    <el-input type="textarea " v-model="result " :autosize="{ minRows: 10} "></el-input>
    <el-dialog title="字典选择 " :visible.sync="dicData.box ">
      <crud-checkbox v-model="dicData.check " :dic="DIC.DATALIST "></crud-checkbox>
      <span slot="footer " class="dialog-footer ">
        <el-button type="primary " @click="handleDicSbumit ">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { DIC } from "@/const/dic";
import tableOption from "@/const/table/tableGenerator";
import formOption from "@/const/table/formGenerator";
import crudSelect from "@/components/crud/crud-select";
import crudInput from "@/components/crud/crud-input";
import crudRadio from "@/components/crud/crud-radio";
import crudCheckbox from "@/components/crud/crud-checkbox";
import crudDate from "@/components/crud/crud-date";
import Crud from "@/components/crud/";
import Forms from "@/components/crud/forms";
export default {
  name: "table-generator",
  components: {
    crudSelect,
    crudInput,
    crudRadio,
    crudCheckbox,
    crudDate,
    Crud,
    Forms
  },
  data() {
    return {
      tableOption: tableOption,
      formOption: formOption,
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
        this.handleResult();
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
    handleSubmit(form) {
      if (form) {
        for (let o in form) {
          this.form[o] = form[o];
        }
        this.handleResult();
      }
    },
    handleResult() {
      let form = this.form;
      const result = JSON.stringify(form, null, 2);
      this.result = result;
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

