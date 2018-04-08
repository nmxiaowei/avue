<template>
  <div class="crud-container pull-auto">
    <!-- <div class="crud-header">
        <el-button type="primary" @click="handleAdd" size="small">新 增</el-button>
        <el-button @click="toggleSelection([tableData[1]])" size="small">切换第二选中状态</el-button>
        <el-button @click="toggleSelection()" size="small">取消选择</el-button>
      </div> -->
    <el-table :data="tableData" :height="tableOption.height" ref="table" :style="{width:tableOption.width?tableOption.width+'px':'99.5%'}" style="margin:0 auto;box-sizing:border-box;" :border="tableOption.border" v-loading="tableLoading" @selection-change="handleSelectionChange">
      <!-- 选择框 -->
      <template v-if="tableOption.selection">
        <el-table-column type="selection" width="55">
        </el-table-column>
      </template>
      <!-- 序号 -->
      <template v-if="tableOption.index">
        <el-table-column type="index" width="50">
        </el-table-column>
      </template>
      <!-- 循环列 -->
      <template v-for="(column,index) in tableOption.column">
        <el-table-column :width="column.width" :label="column.label" :fixed="column.fixed" :sortable="column.sortable" v-if="!column.hide">
          <template slot-scope="scope">
            <slot :row="scope.row" :dic="setDic(column.dicData,DIC[column.dicData])" :name="column.prop" v-if="column.solt"></slot>
            <span v-else-if="!column.overHidden" v-html="handleDetail(scope.row,column)"></span>
            <el-popover v-else trigger="hover" placement="top">
              <p>{{column.label}}: {{ scope.row[column.prop]}}</p>
              <div slot="reference" class="name-wrapper">
                <span v-html="handleDetail(scope.row,column)" class="crud--overflow"></span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" :width="tableOption.menuWidth?tableOption.menuWidth:240" v-if="tableOption.menu==undefined?true:tableOption.menu">
        <template slot-scope="scope">
          <template v-if="tableOption.menu!=undefined?tableOption.menu:true">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit(scope.row,scope.$index)" v-if="tableOption.editBtn==undefined?true:tableOption.meeditBtnnu">编 辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.row,scope.$index)" v-if="tableOption.delBtn==undefined?true:tableOption.delBtn">删 除</el-button>
          </template>
          <slot :row="scope.row" name="menu"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="tableOption.page!=undefined?tableOption.page:true" class="crud-pagination pull-right" :current-page.sync="page.currentPage" :background="page.background?page.background:true" :page-size="page.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
    <el-dialog :title="boxType==0?'新增':'编辑'" :visible.sync="boxVisible" width="50%" :before-close="boxhandleClose">
      <el-form ref="tableForm" :model="tableForm" label-width="80px" :rules="tableFormRules">
        <el-row :gutter="20" :span="24">
          <template v-for="(column,index) in tableOption.column">
            <el-col :span="column.span||12">
              <el-form-item :label="column.label" :prop="column.prop" v-if="!column.visdiplay">
                <slot :value="tableForm[column.prop]" :column="column" :dic="setDic(column.dicData,DIC[column.dicData])" :name="column.prop+'Form'" v-if="column.formsolt"></slot>
                <component :is="getComponent(column.type)" v-else v-model="tableForm[column.prop]" :placeholder="column.label" :dic="setDic(column.dicData,DIC[column.dicData])" :disabled="boxType==0?(column.addDisabled!=undefined?column.addDisabled:column.disabled):column.disabled"></component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
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
import { findByvalue, getComponent, setDic } from "@/util/util";
import { mapActions } from "vuex";
import crudInput from "./crud-input";
import crudSelect from "./crud-select";
import crudRadio from "./crud-radio";
import crudCheckbox from "./crud-checkbox";
import crudDate from "./crud-date";
import Forms from "./forms";
export default {
  name: "crud",
  components: {
    crudInput,
    crudSelect,
    crudRadio,
    crudCheckbox,
    crudDate,
    Forms
  },
  data() {
    return {
      boxVisible: false,
      boxType: 0,
      DIC: {},
      tableForm: {},
      tableFormRules: {},
      tableIndex: -1,
      tableSelect: []
    };
  },
  created() {
    //规则初始化
    this.rulesInit();
    //初始化字典
    this.dicInit();
  },
  wathch: {
    tableOption: {
      handler(n, o) {
        this.rulesInit();
      },
      deep: true
    }
  },
  mounted() {},
  props: {
    beforeClose: Function,
    beforeOpen: Function,
    page: {
      type: Object,
      default() {
        return {
          total: 0, //总页数
          currentPage: 0, //当前页数
          pageSize: 10, //每页显示多少条
          background: true //背景颜色
        };
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    tableOption: {
      type: Object,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    ...mapActions(["GetDic"]),
    rulesInit() {
      this.tableFormRules = {};
      this.tableOption.column.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
      });
    },
    dicInit() {
      this.GetDic(this.tableOption.dic).then(data => {
        this.DIC = data;
      });
    },
    formInit() {
      const list = this.tableOption.column;
      let from = {};
      list.forEach(ele => {
        if (ele.type == "checkbox" || ele.type == "radio") {
          from[ele.prop] = [];
        } else {
          from[ele.prop] = "";
        }
      });
      this.tableForm = Object.assign({}, from);
    },
    //页码回掉
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    findByvalue(dic, val) {
      return findByvalue(dic, val);
    },
    setDic(dicData, DIC) {
      return setDic(dicData, DIC);
    },
    getComponent(type) {
      return getComponent(type);
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
    //选择回调
    handleSelectionChange(val) {
      this.tableSelect = val;
      this.$emit("handleSelectionChange", val);
    },
    //处理数据
    handleDetail(row, column) {
      let result = "";
      if (column.dataDetail) {
        if (column.type) {
          result = findByvalue(this.DIC[column.dicData], row[column.prop]);
        } else {
          result = row[column.prop];
        }
        result = column.dataDetail(row);
      } else {
        if (column.type) {
          result = findByvalue(this.DIC[column.dicData], row[column.prop]);
        } else {
          result = row[column.prop];
        }
      }
      return result;
    },
    // 新增
    handleAdd() {
      //form表单初始化
      this.formInit();
      this.boxType = 0;
      if (typeof this.beforeClose === "function") this.beforeOpen(this.show);
      else this.show();
    },
    // 编辑
    handleEdit(row, index) {
      this.tableForm = Object.assign({}, row);
      this.tableIndex = index;
      this.boxType = 1;
      if (typeof this.beforeClose === "function") this.beforeOpen(this.show);
      else this.show();
    },
    // 删除
    handleDel(row, index) {
      this.$emit("handleDel", row, index);
    },
    //保存
    handleSave() {
      this.$refs["tableForm"].validate(valid => {
        if (valid) {
          this.$emit("handleSave", this.tableForm, this.hide);
        }
      });
    },
    //更新
    handleUpdate() {
      this.$refs["tableForm"].validate(valid => {
        if (valid) {
          const index = this.tableIndex;
          this.$emit("handleUpdate", this.tableForm, index, this.hide);
        }
      });
    },
    //显示表单
    show(cancel) {
      if (cancel !== true) {
        this.boxVisible = true;
      }
    },
    //隐藏表单
    hide(cancel) {
      if (cancel !== false) {
        this.boxVisible = false;
      }
    },
    //窗口关闭处理事件
    boxhandleClose() {
      //释放form表单
      this.tableForm = {};
      if (typeof this.beforeClose === "function") this.beforeClose(this.hide);
      else this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.crud-container {
  // padding: 8px 10px;
}
.crud-pagination {
  margin-top: 15px;
  padding: 10px 20px;
}
.crud-header {
  margin-bottom: 10px;
  & > .el-button {
    padding: 12px 25px;
  }
}
.crud--overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
</style>
