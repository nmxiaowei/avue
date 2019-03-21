<template>
  <el-dialog :class="b('dialog')"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             :fullscreen="$parent.isMobile"
             :title="t('crud.columnBtn')"
             :width="$parent.isMobile?'100%':config.dialogWidth"
             :visible.sync="columnBox">
    <avue-checkbox v-model="columnIndex"
                   @change="handleChange"
                   :dic="columnList"
                   :props="defaultProps"></avue-checkbox>
  </el-dialog>
</template>
<script>
import config from "./config";
import create from "core/create";
import locale from "../../core/common/locale";
import { validatenull } from "utils/validate";
export default create({
  mixins: [locale],
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
    handleChange() {
      this.$parent.doLayout = false;
      this.$nextTick(() => {
        this.$parent.doLayout = true;
        this.$parent.$refs.table.doLayout();
      });
    },
    columnInit() {
      this.columnIndex = [];
      this.columnList = [];
      if (this.$parent.isChild) {
        this.$parent.tableOption.columnBtn = false;
      }
      this.$parent.propOption.forEach((ele, index) => {
        if (!this.vaildData(ele.hide, false)) {
          this.columnIndex.push(ele.prop);
          if (this.vaildData(ele.showColumn, true)) {
            let obj = {
              label: ele.label,
              prop: ele.prop,
              index: index
            };
            this.columnList.push(this.deepClone(obj));
          }
        }
      });
    }
  }
});
</script>

