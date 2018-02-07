<template>
  <div class="crud-container pull-height">
      <div class="crud-header">
        <el-button type="primary" @click="handleAdd" size="small">新 增</el-button>
        <el-button type="info" @click="handleRefresh" size="small">刷 新</el-button>
        <el-button @click="toggleSelection([tableData[1]])" size="small">切换第二选中状态</el-button>
        <el-button @click="toggleSelection()" size="small">取消选择</el-button>
      </div>
      <el-table 
      :data="tableData"  
      ref="table" 
      style="width:100%"  
      height="100%" 
      :border="table.border" 
      v-loading="table.loading"
      @selection-change="handleSelectionChange" >
      <!-- 选择框 -->
      <template v-if="table.selection">
            <el-table-column
            type="selection"
            width="55">
          </el-table-column>
      </template>
      <!-- 序号 -->
      <template v-if="table.index">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
      </template>
      <!-- 循环列 -->
      <template v-for="(column,index) in table.column">
            <el-table-column 
            :width="column.width" 
            :label="column.label" 
            :fixed="column.fixed" 
            :sortable="column.sortable">
              <template  slot-scope="scope">
                 <template v-if="column.type">
                    {{findByvalue(column.dicData,scope.row[column.prop])}}
                 </template>
                <template v-else>
                    {{column.dataDetai?column.dataDetail(scope.row):scope.row[column.prop]}}
                 </template>
              </template>
            </el-table-column>
      </template>
      <el-table-column label="操作" width="220">
        <template  slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small"  @click="handleEdit(scope.row,scope.$index)">编 辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.row,scope.$index)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="boxType==0?'新增':'编辑'"
      :visible.sync="boxVisible"
      width="50%" :before-close="boxhandleClose">
      <el-form ref="tableForm" :model="tableForm" label-width="80px" :rules="tableFormRules">
         <template v-for="(column,index) in table.column">
          <el-form-item :label="column.label" :prop="column.prop">
            <template v-if="column.type == 'select'">
                <el-select v-model="tableForm[column.prop]" :placeholder="'请选择'+column.label">
                <el-option
                  v-for="(item,index) in column.dicData"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-if="column.type == 'radio'">
                  <el-radio  v-for="(item,index) in column.dicData" v-model="tableForm[column.prop]" :label="item.value" :key="index">{{item.label}}</el-radio>
            </template>
            <template v-if="column.type == 'checkbox'">
               <el-checkbox-group  v-model="tableForm[column.prop]">
                  <el-checkbox  v-for="(item,index) in column.dicData" :label="item.value" :key="index">{{item.label}}</el-checkbox>
               </el-checkbox-group>
            </template>
             <template v-if="!column.type">
                <el-input v-model="tableForm[column.prop]" :placeholder="'请输入'+column.label"></el-input>  
            </template>

          </el-form-item>
         </template>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleUpdate" v-if="boxType==1">修 改</el-button>
      <el-button type="primary" @click="handleSave" v-else>新 增</el-button>
      <el-button @click="boxVisible = false">取 消</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: "crud",
  data() {
    return {
      boxVisible: false,
      boxType: 0,
      tableForm: {},
      tableFormRules: {},
      tableIndex: -1,
      tableSelect: [],
      table: [],
      tableData: []
    };
  },
  created() {
    //初始化数据格式
    this.table = {
      border: true,
      index: true,
      selection: true,
      column: [
        {
          label: "用户名",
          prop: "username",
          width: "150",
          dataDetail: row => {
            return row.username;
          },
          rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "类型",
          prop: "type",
          type: "select",
          dicData: [
            {
              label: "一级",
              value: 0
            },
            {
              label: "二级",
              value: 1
            }
          ]
        },
        {
          label: "性别",
          prop: "sex",
          type: "radio",
          dicData: [
            {
              label: "男",
              value: 0
            },
            {
              label: "女",
              value: 1
            }
          ]
        },
        {
          label: "权限",
          prop: "grade",
          type: "checkbox",
          dicData: [
            {
              label: "管理员",
              value: 0
            },
            {
              label: "二级管理员",
              value: 1
            }
          ]
        },
        {
          label: "地址",
          prop: "address",
          width: "200"
        }
      ]
    };
    //规则初始化
    this.rulesInit();
    // 初始化数据
    this.handleList();
  },
  mounted() {},
  props: [],
  methods: {
    rulesInit() {
      this.table.column.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
      });
    },
    // 选中实例
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    //获取数据
    handleList() {
      this.table.loading = true;
      this.$store.dispatch("GetTableData").then(data => {
        setTimeout(() => {
          this.table.loading = false;
          this.tableData = data;
        }, 1000);
      });
    },
    //选择回调
    handleSelectionChange(val) {
      this.tableSelect = val;
    },
    //刷新
    handleRefresh() {
      this.tableData = [];
      this.$message({
        showClose: true,
        message: "刷新成功",
        type: "success"
      });
      this.handleList();
    },
    // 新增
    handleAdd() {
      const list = this.table.column;
      let from = {};
      list.forEach(ele => {
        if (ele.type == "checkbox") {
          from[ele.prop] = [];
        } else {
          from[ele.prop] = "";
        }
      });
      this.tableForm = Object.assign({}, from);
      this.boxType = 0;
      this.boxVisible = true;
    },
    // 编辑
    handleEdit(row, index) {
      this.tableForm = Object.assign({}, row);
      this.tableIndex = index;
      this.boxType = 1;
      this.boxVisible = true;
    },
    // 删除
    handleDel(row, index) {
      this.$confirm(`是否确认删除序号为${index + 1}行的数据`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success"
        });
      });
    },
    //保存
    handleSave() {
      this.$refs["tableForm"].validate(valid => {
        if (valid) {
          this.tableData.push(this.tableForm);
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.boxVisible = false;
        }
      });
    },
    //更新
    handleUpdate() {
      this.$refs["tableForm"].validate(valid => {
        if (valid) {
          const index = this.tableIndex;
          this.tableData.splice(index, 1, this.tableForm);
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.boxVisible = false;
        }
      });
    },
    //窗口关闭处理事件
    boxhandleClose() {
      //释放form表单
      this.tableForm = {};
      this.boxVisible = false;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.crud-container {
  padding: 8px 10px;
}
.crud-header {
  margin-bottom: 10px;
  & > .el-button {
    padding: 12px 25px;
  }
}
</style>
