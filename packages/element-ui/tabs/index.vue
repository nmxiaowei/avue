<template>
  <div :class="b()">
    <el-tabs v-model="active"
             :tab-position="parentOption.position"
             :type="parentOption.type">
      <el-tab-pane :name="index+''"
                   :disabled="column.disabled"
                   v-for="(column,index) in columnOption"
                   :key="index">
        <span slot="label">
          <i :class="column.icon"></i>&nbsp;
          {{column.label}}
        </span>
        <avue-form ref="form"
                   :upload-before="uploadBefore"
                   :upload-after="uploadAfter"
                   v-if="tabsObjOption"
                   :option="tabsObjOption"
                   v-model="form">
          <template v-for="column in tabsPropOptiom"
                    slot-scope="scope"
                    :slot="column.prop">
            <slot :value="scope.value"
                  :column="scope.column"
                  :dic="scope.dic"
                  :size="scope.size"
                  :type="scope.type"
                  :name="column.prop"
                  v-if="column.formslot"></slot>
          </template>
          <template slot="menuForm"
                    slot-scope="{size}">
            <el-button type="primary"
                       @click="submit"
                       :size="size"
                       v-if="vaildData(parentOption.submitBtn,true)"
                       icon="el-icon-check">{{vaildData(parentOption.submitText,'提 交')}}</el-button>
            <el-button icon="el-icon-delete"
                       :size="size"
                       v-if="vaildData(parentOption.emptyBtn,true)"
                       @click="resetForm">{{vaildData(parentOption.emptyText,'清 空')}}</el-button>
            <slot name="menuForm"></slot>
          </template>
        </avue-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "tabs",
  props: {
    value: {},
    uploadBefore: Function,
    uploadAfter: Function,
    option: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      form: {},
      tabsForm: {},
      active: "0",
      tableOption: {}
    };
  },
  watch: {
    value: {
      handler() {
        this.form = this.value;
      },
      immediate: true
    },
    form: {
      handler() {
        this.$emit("input", this.form);
      },
      deep: true
    },
    active() {
      this.$emit("change", this.tabsObj);
    }
  },
  computed: {
    tabsPropOptiom() {
      let list = [];
      this.tabsObjOption.group.forEach(ele => {
        ele.column.forEach(column => {
          list.push(column);
        });
      });
      return list;
    },
    tabsObjOption() {
      if (this.tabsObj.option) {
        let option = this.deepClone(this.tabsObj.option);
        let group = option.group;
        if (!group) {
          option = Object.assign(option, {
            group: [this.deepClone(option)]
          });
        }
        delete option.column;
        return Object.assign(option, {
          submitBtn: false,
          emptyBtn: false
        });
      }
    },
    tabsObj() {
      return this.columnOption[this.active];
    },
    parentOption() {
      return this.tableOption;
    },
    columnOption() {
      return this.parentOption.column || [];
    },
    formRef() {
      return this.$refs.form[this.active];
    }
  },
  created() {
    this.tableOption = this.option;
  },
  methods: {
    changeTabs(active) {
      this.active = active + "";
    },
    setVal(list) {
      list.forEach(column => {
        const prop = column.prop;
        this.$set(
          this.tabsForm,
          prop,
          this.validatenull(this.form[prop])
            ? this.formRef.formDefault.tableForm[prop]
            : this.form[prop]
        );
      });
    },
    clearValidate() {
      this.formRef.clearValidate();
    },
    resetForm() {
      this.formRef.resetForm({
        part: true
      });
      this.$emit("reset-change");
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.formRef.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    submit() {
      this.$emit("input", this.form);
      //返回当先选项卡的字段
      this.formRef.validate(vaild => {
        if (vaild) {
          this.tabsForm = {};
          this.tabsObjOption.group.forEach(ele => {
            this.setVal(ele.column);
          });
          this.$emit("submit", this.tabsForm);
        }
      });
    }
  }
});
</script>


