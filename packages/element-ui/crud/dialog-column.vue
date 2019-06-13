<template>
  <el-dialog :class="b('dialog')"
             lock-scroll
             :modal-append-to-body="false"
             append-to-body
             :fullscreen="crud.isMobile"
             :title="t('crud.columnBtn')"
             :width="crud.isMobile?'100%':'600px'"
             :visible.sync="columnBox">
    <el-transfer v-model="columnIndex"
                 :data="columnList"
                 :titles="[t('common.hide'), t('common.display')]"
                 :props="defaultProps"></el-transfer>

  </el-dialog>
</template>
<script>
import config from "./config";
import create from "core/create";
import locale from "../../core/common/locale";
import { validatenull } from "utils/validate";
export default create({
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      config: config,
      columnBox: false,
      defaultProps: {
        key: "prop"
      },
      columnList: [],
      columnIndex: []
    };
  },
  created () { },
  methods: {
    handleChange () {
      this.crud.doLayout = false;
      this.$nextTick(() => {
        this.crud.doLayout = true;
        this.$nextTick(() => {
          this.crud.$refs.table.doLayout();
        });
      });
    },
    columnInit () {
      this.columnIndex = [];
      this.columnList = [];
      this.crud.propOption.forEach((ele, index) => {
        if (!this.vaildData(ele.hide, false)) this.columnIndex.push(ele.prop);
        if (this.vaildData(ele.showColumn, true)) {
          let obj = {
            label: ele.label,
            prop: ele.prop,
            index: index
          };
          this.columnList.push(this.deepClone(obj));
        }
      });
    }
  }
});
</script>

