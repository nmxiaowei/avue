<template>
  <el-collapse-transition>
    <div :class="b()"
         v-show="searchShow && searchFlag">
      <avue-form :option="option"
                 ref="form"
                 v-if="flag"
                 @submit="searchChange"
                 @reset-change="resetChange"
                 v-model="searchForm">
        <template slot="menuForm"
                  slot-scope="{size}">
          <slot name="searchMenu"
                :row="searchForm"
                :size="size"></slot>
          <template v-if="isSearchIcon">
            <el-button type="text"
                       v-if="show===false"
                       @click="show=true"
                       icon="el-icon-arrow-down">展 开</el-button>
            <el-button type="text"
                       v-if="show===true"
                       @click="show=false"
                       icon="el-icon-arrow-up">收 缩</el-button>
          </template>

        </template>
        <template :slot="item.prop"
                  slot-scope="scope"
                  v-for="item in columnOption">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :size="scope.size"
                :label="scope.label"
                :disabled="scope.disabled"
                :row="searchForm"
                :name="item.prop"
                v-if="item.searchslot"></slot>
        </template>
        <template slot="search"
                  slot-scope="{}">
          <slot name="search"
                :row="searchForm"
                :size="crud.controlSize"></slot>
        </template>
      </avue-form>
    </div>
  </el-collapse-transition>
</template>

<script>
import cteate from "core/create";
import { vaildData } from "utils/util";
import { validatenull } from "utils/validate";
import locale from "../../core/common/locale";
import {
  formInitVal,
  getSearchType,
  getType,
  getPlaceholder
} from "core/dataformat";
import config from "./config";
export default cteate({
  name: "crud__search",
  inject: ["crud"],
  mixins: [locale],
  data () {
    return {
      flag: false,
      show: false,
      config: config,
      defaultForm: {
        searchForm: {}
      },
      searchShow: true,
      searchForm: {}
    };
  },
  props: {
    search: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    'crud.propOption': {
      handler () {
        this.dataformat();
      },
      immediate: true
    },
    search: {
      handler () {
        this.searchInit();
      },
      deep: true,
    },
    searchForm: {
      handler () {
        this.$emit("input", this.searchForm);
        this.updateValue();
      },
      deep: true
    }
  },
  created () {
    this.init();
    this.searchInit();
  },
  computed: {
    isSearchIcon () {
      return this.crud.option.searchIcon === true && this.columnLen > this.searchIndex
    },
    searchIndex () {
      return this.crud.option.searchIndex || 2
    },
    columnLen () {
      let count = 0;
      this.crud.option.column.forEach(ele => {
        if (ele.search) count++
      })
      return count
    },
    columnOption () {
      return this.option.column || []
    },
    option () {
      const option = this.crud.option;
      const detailColumn = (list = []) => {
        let column = [];
        let count = 0;
        list.forEach(ele => {
          if (ele.search) {
            let isCount = count < this.searchIndex
            ele = Object.assign(ele, {
              type: getSearchType(ele),
              multiple: ele.searchMultiple,
              order: ele.searchOrder,
              detail: false,
              dicFlag: false,
              span: ele.searchSpan || option.searchSpan || this.config.searchSpan,
              gutter: ele.searchGutter || option.searchGutter || this.config.searchGutter,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || this.config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              tip: ele.searchTip,
              placeholder: getPlaceholder(ele, 'search'),
              filterable: ele.searchFilterable,
              tipPlacement: ele.searchTipPlacement,
              filterMethod: ele.searchFilterMethod,
              checkStrictly: ele.searchCheckStrictly || option.searchCheckStrictly,
              tags: ele.searchTags,
              row: ele.searchRow,
              size: ele.searchSize,
              formslot: ele.searchslot,
              clearable: ele.searchClearable,
              rules: ele.searchRules,
              disabled: ele.searchDisabled,
              readonly: ele.searchReadonly,
              value: ele.searchValue,
              display: this.isSearchIcon ? (this.show ? true : isCount) : true,
            })
            let whiteList = ['disabled', 'readonly']
            whiteList.forEach(key => {
              delete ele[key]
            })
            column.push(ele);
            count = count + 1;
          }
        })
        return column;
      }
      const dataDetail = (list) => {
        let result = this.deepClone(list);
        result.translate = false;
        if (result.group) {
          delete result.group;
        }
        result.column = detailColumn(this.deepClone(this.crud.columnFormOption))
        result = Object.assign(result, {
          tabs: false,
          enter: this.vaildData(option.searchEnter, true),
          printBtn: false,
          mockBtn: false,
          submitText: this.vaildData(option.searchBtnText, this.t('crud.searchBtn')),
          submitBtn: this.vaildData(option.searchBtn, this.config.searchSubBtn),
          submitIcon: option.searchBtnIcon || this.config.searchBtnIcon,
          emptyText: this.vaildData(option.emptyBtnText, this.t('crud.emptyBtn')),
          emptyBtn: this.vaildData(option.emptyBtn, this.config.emptyBtn),
          emptyIcon: option.emptyBtnIcon || this.config.emptyBtnIcon,
          menuSpan: (() => {
            if (this.show || !this.isSearchIcon) {
              return option.searchMenuSpan
            } else {
              return 6
            }
          })(),
          dicFlag: false,
          dicData: this.crud.DIC
        })
        return result;
      }
      let result = dataDetail(option)
      this.flag = !this.validatenull(result.column);
      return result;
    },
    searchFlag () {
      return !validatenull(this.searchForm);
    }
  },
  methods: {
    searchInit () {
      this.searchForm = Object.assign(this.searchForm, this.search);
    },
    updateValue () {
      this.crud.$emit('update:search', this.searchForm)
    },
    //初始化
    init () {
      //扩展搜索的相关api
      this.crud.searchChange = this.searchChange;
      this.crud.searchReset = this.searchReset;
    },
    // 搜索回调
    searchChange (form, done) {
      this.crud.$emit("search-change", form, done);
    },
    // 搜索清空
    resetChange () {
      this.crud.$emit("search-reset", this.defaultForm.tableForm);
    },
    // 搜索清空
    searchReset () {
      this.$refs.form.resetForm();
    },
    handleSearchShow () {
      this.searchShow = !this.searchShow;
    },
    dataformat () {
      this.defaultForm = formInitVal(this.option.column);
      this.searchForm = this.deepClone(this.defaultForm.tableForm);
      this.searchShow = vaildData(
        this.crud.tableOption.searchShow,
        this.crud.config.searchShow
      );
    }
  }
});
</script>
