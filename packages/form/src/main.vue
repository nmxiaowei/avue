<template>
  <div class="from-container pull-auto">
    <el-form ref="form" :model="form" :label-width="setPx(option.labelWidth,80)" :rules="formRules">
      <el-row :gutter="20" :span="24">
        <template v-for="(column,index) in option.column">
          <el-col :span="column.span||12">
            <el-form-item :label="column.label" :prop="column.prop" :label-width="setPx(column.labelWidth,option.labelWidth || 80)">
              <slot :value="form[column.prop]" :column="column" :dic="setDic(column.dicData,DIC[column.dicData])" :name="column.prop" v-if="column.formsolt"></slot>
              <component :is="getComponent(column.type)" v-else v-model="form[column.prop]" :placeholder="column.label" :clearable="column.clearable" :type="column.type" :minRows="column.minRows" :maxRows="column.maxRows" :dic="setDic(column.dicData,DIC[column.dicData])" :disabled="column.disabled" :format="column.format" :value-format="column.valueFormat"></component>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24" v-if="option.submitBtn!=undefined?option.submitBtn:true">
          <el-form-item label-width="0">
            <div class="form-menu" :class="menuPostion">
              <el-button type="primary" @click="submit">{{option.submitText?option.submitText:'提交'}}</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import crud from '../../mixins/crud'
import { validatenull } from '../../utils/validate.js'
export default {
  name: 'AvueForm',
  mixins: [crud()],
  components: {},
  data() {
    return {
      form: {},
      formRules: {},
      DIC: {}
    }
  },
  created() {
    //规则初始化
    this.rulesInit()
    //初始化dic字典
    this.dicInit()
    //初始化form表单
    this.formInit()
    //初始化值
    this.formVal()
  },
  watch: {
    option: {
      handler(n, o) {
        this.rulesInit()
      },
      deep: true
    },
    value: {
      handler(n, o) {
        this.formVal()
      },
      deep: true
    }
  },
  mounted() {},
  computed: {
    menuPostion: function() {
      if (this.option.submitPostion) {
        return 'is-' + this.option.submitPostion
      } else {
        return 'is-center'
      }
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: {}
    }
  },
  methods: {
    rulesInit() {
      this.formRules = {}
      this.option.column.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules
      })
    },
    dicInit() {
      this.GetDic(this.option.dic).then(data => {
        this.DIC = data
      })
    },
    formInit() {
      const list = this.option.column
      let form = {}
      list.forEach(ele => {
        if (
          ele.type == 'checkbox' ||
          ele.type == 'radio' ||
          ele.type == 'cascader'
        ) {
          form[ele.prop] = []
        } else {
          form[ele.prop] = ''
        }
        if (!validatenull(ele.valueDefault)) from[ele.prop] = ele.valueDefault
      })
      this.form = Object.assign({}, form)
    },
    formVal() {
      this.form = this.value
      this.$emit('input', this.form)
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$emit('submit')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.from-container {
  padding: 8px 10px;
}
.form-menu {
  width: 100%;
  &.is-center {
    text-align: center;
  }
  &.is-left {
    text-align: left;
  }
  &.is-right {
    text-align: right;
  }
}
</style>
