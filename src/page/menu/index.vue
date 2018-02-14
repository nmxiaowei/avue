<template>
<el-container class="menu-container pull-height">
  <el-header  class="menu-header">
        <el-button-group>
            <el-button type="primary"  icon="el-icon-plus" size="small" @click.native="handleAdd">新增</el-button>
            <el-button type="primary"  icon="el-icon-edit" size="small" @click.native="handleEdit">编辑</el-button>
            <el-button type="primary"  icon="el-icon-delete" size="small" @click.native="handleDel">删除</el-button>
        </el-button-group>
  </el-header>
 <el-container>
        <el-aside width="300px">
            <el-tree 
             :data="menuAll" 
             node-key="id"
             highlight-current
             default-expand-all 
             :expand-on-click-node="false"
             @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-main>
            <el-form ref="form" :model="form" label-width="80px">
                <template v-if="formAdd">
                     <el-form-item label="父节点ID">
                        <el-input  v-model="parentForm.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点">
                        <el-input  v-model="parentForm.label" :disabled="true"></el-input>
                    </el-form-item>
                </template>
                <el-form-item label="菜单名称">
                    <el-input v-model="form.label" :disabled="formEdit"></el-input>
                </el-form-item>
                 <el-form-item label="菜单图标">
                    <el-input v-model="form.icon" :disabled="formEdit"></el-input>
                </el-form-item>
                 <el-form-item label="菜单路径">
                    <el-input v-model="form.href" :disabled="formEdit"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit" :disabled="formEdit">{{formAdd?'新增':'修改'}}</el-button>
                </el-form-item>
            </el-form>
        </el-main>
  </el-container>
</el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
export default {
  name: "menu",
  data() {
    return {
      form: {},
      obj: {},
      parentForm: {},
      formAdd: false,
      formEdit: true
    };
  },
  created() {
    this.$store.dispatch("GetMenuAll").then(data => {});
  },
  mounted() {},
  computed: {
    ...mapGetters(["menuAll"])
  },
  props: [],
  methods: {
    handleNodeClick(data, checked, indeterminate) {
      this.formAdd = false;
      this.formEdit = true;
      this.form = data;
    },
    handleAdd() {
      this.formEdit = false;
      this.formAdd = true;
      this.parentForm = Object.assign({}, this.form);
      this.form = Object.assign({}, this.obj);
    },
    handleEdit() {
      if (validatenull(this.form)) {
        this.$message({
          showClose: true,
          message: "请选择菜单",
          type: "warning"
        });
        return false;
      }
      this.formEdit = false;
    },
    handleDel() {
      this.$confirm(`是否确认删除序号为${this.form.label}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        })
        .catch(err => {});
    },
    handleSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.menu-container {
  padding: 0 20px;
}
.menu-header {
  padding: 8px 0;
}
</style>
