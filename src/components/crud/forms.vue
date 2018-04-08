<template>
  <div class="from-container pull-auto">
    <el-form ref="form" :model="form" :label-width="formOption.labelWidth?formOption.labelWidth+'px' : '80px'" :rules="formRules">
      <el-row :gutter="20" :span="24">
        <template v-for="(column,index) in formOption.column">
          <el-col :span="column.span||12">
            <el-form-item :label="column.label" :prop="column.prop" :label-width="column.labelWidth?column.labelWidth+'px': formOption.labelWidth+'px'||'80px'">
              <slot :value="form[column.prop]" :column="column" :dic="setDic(column.dicData,DIC[column.dicData])" :name="column.prop" v-if="column.formsolt"></slot>
              <component :is="getComponent(column.type)" v-else v-model="form[column.prop]" :placeholder="column.label" :dic="setDic(column.dicData,DIC[column.dicData])" :disabled="column.disabled"></component>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24" v-if="formOption.submitBtn!=undefined?formOption.submitBtn:true">
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">{{formSubmitText}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getComponent, setDic } from "@/util/util";
import crudInput from "./crud-input";
import crudSelect from "./crud-select";
import crudRadio from "./crud-radio";
import crudCheckbox from "./crud-checkbox";
import crudDate from "./crud-date";
export default {
  name: "from",
  components: {
    crudInput,
    crudSelect,
    crudRadio,
    crudCheckbox,
    crudDate
  },
  data() {
    return {
      form: {},
      formRules: {},
      DIC: {}
    };
  },
  created() {
    //规则初始化
    this.rulesInit();
    //初始化dic字典
    this.dicInit();
    //初始化form表单
    this.formInit();
  },
  watch: {
    formOption: function(n, o) {
      this.rulesInit();
    },
    formData: function(n, o) {
      this.rulesInit();
    }
  },
  mounted() {},
  computed: {},
  props: {
    formOption: {
      type: Object,
      required: true,
      default: {}
    },
    formData: {
      type: Object,
      required: true,
      default: {}
    },
    formSubmitText: {
      type: String,
      default: "提交"
    }
  },
  methods: {
    ...mapActions(["GetDic"]),
    rulesInit() {
      this.formRules = {};
      this.formOption.column.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    dicInit() {
      this.GetDic(this.formOption.dic).then(data => {
        this.DIC = data;
      });
    },
    getComponent(type) {
      return getComponent(type);
    },
    setDic(dicData, DIC) {
      return setDic(dicData, DIC);
    },
    formInit() {
      const list = this.formOption.column;
      let form = {};
      list.forEach(ele => {
        if (ele.type == "checkbox" || ele.type == "radio") {
          form[ele.prop] = [];
        } else {
          form[ele.prop] = "";
        }
      });
      this.form = Object.assign({}, form);
      for (let o in this.formData) {
        this.form[o] = this.formData[o];
      }
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("handleSubmit", this.form);
        } else {
          this.$emit("handleSubmit");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.from-container {
  padding: 8px 10px;
}
</style>
