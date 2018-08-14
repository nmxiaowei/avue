<template>
  <div class="from">
    <el-form ref="form"
             :model="form"
             :label-position="option.labelPosition"
             :label-width="setPx(option.labelWidth,80)"
             :rules="formRules">
      <el-row :gutter="20"
              :span="24">
        <draggable :list="columnOption"
                   :options="dragOptions">
          <div class="row"
               :class="{'is-block':column.row,'is-cursor':draggableStart}"
               v-for="(column,index) in columnOption"
               v-if="vaildVisdiplay(column)"
               :key="index">
            <el-col :span="column.span||12"
                    @mouseover.native="draggableMenu?mouseover(index):''"
                    @mouseout.native="draggableMenu?mouseout(index):''">
              <div class="menu"
                   v-if="optionIndex[index]">
                <i class="el-icon-menu"
                   @click="optionMenu(column,index)"></i>
                <i class="el-icon-delete"
                   @click="optionDelete(column,index)"></i>
              </div>
              <el-form-item :label="column.label"
                            :prop="column.prop"
                            :label-width="setPx(column.labelWidth,option.labelWidth || 80)">
                <slot :value="form[column.prop]"
                      :column="column"
                      :dic="setDic(column.dicData,DIC[column.dicData])"
                      :name="column.prop"
                      v-if="column.formsolt"></slot>
                <component :is="getComponent(column.type)"
                           v-else
                           :props="column.props || option.props"
                           v-model="form[column.prop]"
                           :precision="column.precision"
                           :multiple="column.multiple"
                           :readonly="vaildData(draggableStart,column.readonly)"
                           :placeholder="column.placeholder"
                           :step="column.step"
                           :range="column.range"
                           :showStops="column.showStops"
                           :showInput="column.showInput"
                           :controls-position="column.controlsPosition"
                           :expand-trigger="column.expandTrigger"
                           :size="column.size"
                           :parentCheck="column.parentCheck"
                           :colors="column.colors"
                           :action="column.action"
                           :limit="column.limit"
                           :tip="column.tip"
                           :loadText="column.loadText"
                           :listType="column.listType"
                           :drag="column.drag"
                           :showFileList="column.showFileList"
                           :iconClasses="column.iconClasses"
                           :voidIconClass="column.voidIconClass"
                           :showText="column.showText"
                           :texts="column.texts"
                           :filterable="column.filterable"
                           :separator="column.separator"
                           :border="column.border"
                           :minlength="column.minlength"
                           :maxlength="column.maxlength"
                           :prefixIcon="column.prefixIcon"
                           :suffixIcon="column.suffixIcon"
                           :pickerOptions="column.pickerOptions"
                           :defaultTime="column.defaultTime"
                           :min="column.min"
                           :max="column.max"
                           :changeoOnSelect="column.changeoOnSelect"
                           :label="column.label"
                           :clearable="column.clearable"
                           :startPlaceholder="column.startPlaceholder"
                           :endPlaceholder="column.endPlaceholder"
                           :type="column.type"
                           :minRows="column.minRows"
                           :maxRows="column.maxRows"
                           :format="column.format"
                           :formatTooltip="column.formatTooltip"
                           :value-format="column.valueFormat"
                           :dic="setDic(column.dicData,DIC[column.dicData])"
                           :disabled="vaildDisabled(column)"
                           @change="column.cascader?change(index):''"></component>
                <!-- <p class="avue-tip">{{column.tip}}</p> -->
              </el-form-item>
            </el-col>
          </div>
        </draggable>
        <el-col :span="24"
                v-if="vaildData(option.menuBtn,true)">
          <el-form-item :label-width="menuWidth">
            <div class="form-menu"
                 :class="menuPostion">
              <el-button type="primary"
                         @click="submit"
                         v-if="vaildData(option.submitBtn,true)">{{vaildData(option.submitText,'提交')}}</el-button>
              <slot name="menuForm"></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import draggable from "vuedraggable";
import crud from '../../mixins/crud';
import { validatenull } from '../../utils/validate.js';
export default {
  name: 'AvueForm',
  mixins: [crud()],
  components: {
    draggable
  },
  data () {
    return {
      first: true,
      optionIndex: [],
      optionBox: false,
      form: {},
      formRules: {}
    };
  },
  created () {
  },
  mounted () { },
  computed: {
    draggable () {
      return this.option.draggable || {};
    },
    draggableMenu () {
      return this.draggable.menu || false;
    },
    draggableStart () {
      return this.draggable.start || false;
    },
    draggableFlag () {
      return this.vaildData(this.draggable.clone, true)
    },
    dragOptions () {
      if (!this.draggableStart) {
        return {
          disabled: true,
        }
      }
      let pull = (() => {
        if (this.draggableFlag) {
          return {
            pull: 'clone',
            revertClone: false
          }
        }
        return {

        }
      })();
      return {
        animation: 0,
        ghostClass: "avue-ghost",
        group: (function () {
          return Object.assign({ name: "avue" }, pull);
        })(),
        sort: this.vaildData(this.draggable.sort, false),
      };
    },
    columnOption () {
      return this.option.column || [];
    },
    menuWidth: function () {
      if (this.option.submitPostion === 'left') {
        return '';
      } else {
        return '0';
      }
    },
    menuPostion: function () {
      if (this.option.submitPostion) {
        return 'is-' + this.option.submitPostion;
      } else {
        return 'is-center';
      }
    },
    boxType: function () {
      return this.option.boxType;
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    optionDelete (column, index) {
      this.$emit('option-delete', { column, index })
    },
    optionMenu (column, index) {
      this.$emit('option-menu', { column, index })
    },
    mouseover (index) {
      this.optionIndex[index] = true;
      this.optionIndex.splice(0, 0);
    },
    mouseout (index) {
      this.optionIndex[index] = false;
      this.optionIndex.splice(0, 0);
    },
    // 验证表单是否禁止
    vaildDisabled (column) {
      if (!(this.boxType)) {
        return this.vaildData(column.disabled, false);
      } else if (this.boxType === 'add') {
        return this.vaildData(column.addDisabled, false);
      } else if (this.boxType === 'edit') {
        return this.vaildData(column.editDisabled, false);
      }
    },
    // 验证表单是否显隐
    vaildVisdiplay (column) {
      if (!(this.boxType)) {
        return this.vaildData(column.visdiplay, true);
      } else if (this.boxType === 'add') {
        return this.vaildData(column.addVisdiplay, true);
      } else if (this.boxType === 'edit') {
        return this.vaildData(column.editVisdiplay, true);
      }

    },
    rulesInit () {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    change (index) {
      const column = this.columnOption;
      const list = column[index].cascader;
      const prop = column[index].prop;
      const url = column[index + 1].dicUrl;
      const type = column[index + 1].dicData;
      if (!this.first) {
        list.forEach((ele) => {
          this.form[ele] = '';
          this.DIC[ele] = [];
        });
      }
      this.GetDicByType(url.replace('{{key}}', this.form[prop])).then(res => {
        let data = res;
        this.DIC[type] = data;
        this.DIC = Object.assign({}, this.DIC);
      });
    },
    formInit () {
      const column = this.columnOption;
      this.form = this.formInitVal(column).tableForm;
      this.formVal();
      for (let i = 0; i < this.columnOption.length; i++) {
        const ele = this.columnOption[i];
        if (ele.cascaderFirst) {
          const cascader = [].concat(ele.cascader);
          const cascaderLen = ele.cascader.length - 1;
          if (!validatenull(this.form[ele.prop])) this.change(i);
          for (let j = 0; j < cascaderLen; j++) {
            const cindex = i + (j + 1);
            const cele = this.columnOption[cindex];
            cele.cascader = cascader.slice(cindex);
            if (!validatenull(this.form[cele.prop])) this.change(cindex);
          }
        }
      }
      this.first = false;
    },
    formVal () {
      for (let o in this.value) {
        this.form[o] = this.value[o];
      }
      this.$emit('input', this.form);
    },
    clearValidate () {
      this.$refs['form'].clearValidate();
    },
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    resetForm () {
      this.$refs.form.resetFields();
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.form);
        }
      });
    }
  }
};
</script>

