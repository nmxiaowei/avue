<template>
  <el-dialog
    lock-scroll
    :modal-append-to-body="false"
    append-to-body
    :title="config.columnBtnTitle"
    :visible.sync="columnBox"
  >
    <avue-checkbox v-model="columnIndex" :dic="columnList" :props="defaultProps"></avue-checkbox>
  </el-dialog>
</template>
<script>
import config from "./config";
import { validatenull } from "utils/validate";
export default {
  data() {
    return {
      config: config,
      columnBox: false,
      defaultProps: {
        value: "prop"
      },
      columnList: [],
      columnIndex: []
    };
  },
  created() {},
  methods: {
    columnInit: function() {
      const safe = this;
      this.columnIndex = [];
      this.columnList = [];
      function addChild(list) {
        list.forEach((ele, index) => {
          const children = ele.children;
          if (!validatenull(children)) {
            safe.tableOption.columnBtn = false;
            addChild(children);
          }
          if (validatenull(ele.hide)) safe.columnIndex.push(ele.prop);
          if (ele.showClomnu !== false) {
            let obj = {
              label: ele.label,
              prop: ele.prop,
              index: index
            };
            safe.columnList.push(safe.deepClone(obj));
          }
        });
      }
      addChild(this.$parent.columnOption);
    }
  }
};
</script>

