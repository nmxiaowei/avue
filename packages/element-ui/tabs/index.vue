<template>
  <div :class="b()">
    <el-tabs v-model="active"
             :tab-position="parentOption.position"
             :type="parentOption.type">
      <el-tab-pane :name="index+''"
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
                   v-model="form"
                   :key="tabsObj.prop">
          <template slot-scope="scope"
                    v-for="item in tabsObjOption">
            <template v-for="column in item.column"
                      :slot="column.prop">
              <slot :value="scope.value"
                    :column="scope.column"
                    :dic="scope.dic"
                    :size="scope.size"
                    :type="scope.type"
                    :name="column.prop"
                    v-if="column.formsolt"></slot>
            </template>

          </template>
          <template slot="menuForm"
                    slot-scope="{size}">
            <el-button type="primary"
                       @click="handleSubmit"
                       :size="size"
                       icon="el-icon-check">提 交</el-button>
            <el-button icon="el-icon-delete"
                       :size="size"
                       @click="handleResetForm">清 空</el-button>
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
    form() {
      this.$emit("input", this.form);
    },
    active() {
      this.$emit("change", this.tabsObj);
    }
  },
  computed: {
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
    handleResetForm() {
      this.formRef.resetForm({
        part: true
      });
      this.$emit("reset-change");
    },
    handleSubmit() {
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


