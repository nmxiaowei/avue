<template>
  <div :class="b('mobile')"
       :style="{width:setPx(tableOption.formWidth,'100%')}">
    <van-form @submit="handleSubmit"
              ref="form">
      <avue-group v-for="(item,index) in columnOption"
                  :key="item.prop"
                  :tabs="isTabs"
                  :arrow="item.arrow"
                  :collapse="item.collapse"
                  :display="item.display"
                  :icon="item.icon"
                  :index="index"
                  :header="!isTabs"
                  :active="activeName"
                  :card="parentOption.card"
                  :label="item.label">
        <van-tabs slot="tabs"
                  v-model="activeName"
                  v-if="isTabs&&index == 1"
                  color="#1989fa">
          <van-tab v-for="(item,index) in columnOption"
                   v-if="!item.display && index!=0"
                   :key="index"
                   :name="index+''">
            <span slot="title">
              <slot :name="item.prop+'Header'"
                    v-if="$slots[item.prop+'Header']"></slot>
              <template v-else>
                <i :class="'van-icon' +item.icon">&nbsp;</i>
                {{item.label}}
              </template>
            </span>
          </van-tab>
        </van-tabs>
        <template slot="header"
                  v-if="$slots[item.prop+'Header']">
          <slot :name="item.prop+'Header'"></slot>
        </template>
        <div v-for="(column,cindex) in item.column"
             :key="cindex"
             v-show="isGroupShow(item,index)">
          <slot :value="form[column.prop]"
                :column="column"
                :label="form['$'+column.prop]"
                :size="column.size || controlSize"
                :readonly="readonly || column.readonly"
                :disabled="column.disabled || item.disabled"
                :dic="DIC[column.prop]"
                :name="column.prop"
                v-if="column.formslot"></slot>
          <form-temp v-else
                     :column="column"
                     :class="column.className"
                     :ref="column.prop"
                     :dic="DIC[column.prop]"
                     :t="t"
                     :props="parentOption.props"
                     :propsHttp="parentOption.propsHttp"
                     :disabled="column.disabled || item.disabled"
                     :readonly="readonly"
                     :enter="parentOption.enter"
                     :size="parentOption.size"
                     v-model="form[column.prop]"
                     @enter="submit"
                     @change="propChange(item.column,column)">
          </form-temp>
        </div>
      </avue-group>
      <div style="margin:16px 0 30px 0;padding:0 10px">
        <van-button block
                    native-type="submit"
                    type="info"
                    v-if="vaildData(parentOption.submitBtn,true)">{{vaildData(parentOption.submitText,t("form.submit"))}}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import locale from "../../core/common/locale";
import create from "core/create";
import init from "../../core/common/init";
import { detail } from "core/detail";
import formTemp from '../../core/components/form/index'
import { getComponent, getPlaceholder, formInitVal, calcCascader } from "core/dataformat";
import { sendDic } from "core/dic";
export default create({
  name: "form",
  mixins: [init(), locale],
  data () {
    return {
      activeName: '',
      tableOption: {},
      form: {},
      formList: [],
      formCreate: false,
      formDefault: {},
      formVal: {}
    };
  },
  components: {
    formTemp
  },
  watch: {
    tabsActive: {
      handler (val) {
        this.activeName = this.tabsActive
      },
      immediate: true
    },
    formRules: {
      handler () {
        this.clearValidate();
      },
      deep: true
    },
    form: {
      handler (val) {
        if (this.formCreate) this.setVal();
      },
      deep: true
    },
    value: {
      handler (val) {
        if (this.formCreate) {
          this.setForm(val);
        } else {
          this.formVal = Object.assign(this.formVal, val || {});
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    propOption () {
      let list = [];
      this.columnOption.forEach(option => {
        option.column.forEach(column => list.push(column));
      });
      return list;
    },
    parentOption () {
      let option = this.deepClone(this.tableOption);
      let group = option.group;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      if (group) {
        //处理分组以外的部分
        group.unshift({
          arrow: false,
          column: option.column
        })
      }
      return option;
    },
    columnOption () {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        ele.column = ele.column || [];
        //处理级联属性
        ele.column = calcCascader(ele.column);
      });;
      return list;
    },
    disabled () {
      return this.parentOption.disabled
    },
    readonly () {
      return this.parentOption.readonly
    },
    isTabs () {
      return this.parentOption.tabs;
    },
    tabsActive () {
      return this.vaildData(this.tableOption.tabsActive + '', '1')
    },
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
  created () {
    this.$nextTick(() => {
      this.dataFormat();
      this.setVal();
      this.clearValidate();
      this.formCreate = true;
    })
  },
  methods: {
    getComponent,
    getPlaceholder,
    setVal () {
      this.$emit("input", this.form);
      this.$emit("change", this.form);
    },
    //初始化表单
    dataFormat () {
      this.formDefault = formInitVal(this.propOption);
      let value = this.deepClone(this.formDefault.tableForm);
      this.setForm(this.deepClone(Object.assign(value, this.formVal)))
    },
    isGroupShow (item, index) {
      if (this.isTabs) {
        return index == this.activeName || index == 0
      } else {
        return true;
      }
    },
    //表单赋值
    setForm (value) {
      Object.keys(value).forEach(ele => {
        this.$set(this.form, ele, value[ele]);
      });
      this.forEachLabel();
    },
    clearValidate () {

    },
    propChange (option, column) {
      if (column.cascader) this.handleChange(option, column)
    },
    handleChange (list, column) {
      this.$nextTick(() => {
        const cascader = column.cascader;
        const str = cascader.join(",");
        const columnNextProp = cascader[0];
        const value = this.form[column.prop];
        // 下一个节点
        const columnNext = this.findObject(list, columnNextProp)
        /**
         * 1.判断当前节点是否有下级节点
         * 2.判断当前节点是否有值
         */
        if (
          this.validatenull(cascader) ||
          this.validatenull(value) ||
          this.validatenull(columnNext)
        ) {
          return;
        }

        // 如果不是首次加载则清空全部关联节点的属性值和字典值
        if (this.formList.includes(str)) {
          //清空子类字典列表和值
          cascader.forEach(ele => {
            this.form[ele] = "";
            this.$set(this.DIC, ele, []);
          });
        }
        // 根据当前节点值获取下一个节点的字典
        sendDic({
          column: columnNext,
          value: value,
        }).then(res => {
          //首次加载的放入队列记录
          if (!this.formList.includes(str)) this.formList.push(str);
          // 修改字典
          const dic = Array.isArray(res) ? res : [];
          this.$set(this.DIC, columnNextProp, dic);
          if (!this.validatenull(dic) && !this.validatenull(columnNext.cascaderIndex) && this.validatenull(this.form[columnNextProp])) {
            this.form[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
          }
        });
      })
    },
    forEachLabel () {
      this.propOption.forEach(column => {
        this.handleShowLabel(column, this.DIC[column.prop]);
      });
    },

    //获取全部字段字典的label
    handleShowLabel (column, DIC) {
      let result;
      if (!this.validatenull(DIC)) {
        result = detail(this.form, column, this.tableOption, DIC);
        this.$set(this.form, ["$" + column.prop], result);
      }
      return result;
    },
    resetForm () {
      this.clearValidate();
      if (this.reset) {
        this.resetFields();
        this.clearVal();
      }
      this.$emit("input", this.form);
      this.$emit("reset-change");
    },
    submit () {
      this.$refs.form.submit()
    },
    handleSubmit () {
      this.$emit("submit", this.form);
    }
  }
});
</script>

