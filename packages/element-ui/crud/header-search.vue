<template>
  <el-collapse-transition>
    <el-card :shadow="crud.isCard"
             :class="b()"
             v-show="searchShow && searchFlag">
      <avue-form :option="option"
                 ref="form"
                 @submit="searchChange"
                 @change="handleChange"
                 @reset-change="resetChange"
                 v-model="searchForm">
        <template #menuForm="scope">
          <slot name="searchMenu"
                v-bind="Object.assign(scope,{
                  search:searchForm,
                  row:searchForm
                })"></slot>
          <template v-if="isSearchIcon">
            <el-button type="text"
                       v-if="show===false"
                       @click="show=true"
                       icon="el-icon-arrow-down">{{t('crud.open')}}</el-button>
            <el-button type="text"
                       v-if="show===true"
                       @click="show=false"
                       icon="el-icon-arrow-up">{{t('crud.shrink')}}</el-button>
          </template>

        </template>
        <template slot-scope="scope"
                  v-for="item in crud.searchSlot"
                  :slot="item.prop">
          <slot :name="item.prop"
                v-bind="Object.assign(scope,{
                  search:searchForm,
                  row:searchForm
                })"></slot>
        </template>
        <template #search="{}">
          <slot name="search"
                :row="searchForm"
                :search="searchForm"
                :size="crud.controlSize"></slot>
        </template>
      </avue-form>
    </el-card>
  </el-collapse-transition>
</template>

<script>
import cteate from "core/create";
import { vaildData } from "utils/util";
import { validatenull } from "utils/validate";
import locale from "../../core/common/locale";
import slot from 'core/slot'
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
  mixins: [locale, slot],
  data () {
    return {
      show: false,
      flag: false,
      reload: false,
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
        this.dataFormat();
      },
      immediate: true
    },
    search: {
      handler () {
        this.searchForm = Object.assign(this.searchForm, this.search);
      },
      immediate: true,
      deep: true
    },
    searchShow: {
      handler () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.crud.getTableHeight()
          }, 300)
        })
      }
    }
  },
  created () {
    this.initFun();
  },
  computed: {
    isSearchIcon () {
      return this.vaildData(this.crud.option.searchIcon, this.$AVUE.searchIcon) === true && this.columnLen > this.searchIndex
    },
    searchIndex () {
      return this.crud.option.searchIndex || 2
    },
    columnLen () {
      let count = 0;
      this.crud.propOption.forEach(ele => {
        if (ele.search) count++
      })
      return count
    },
    option () {
      const option = this.crud.option;
      const detailColumn = (list = []) => {
        let column = [];
        let count = 0;
        //根据order排序
        list.forEach(ele => {
          if (ele.search) {
            let isCount = count < this.searchIndex
            ele = Object.assign(ele, {
              type: getSearchType(ele),
              multiple: ele.searchMultiple,
              order: ele.searchOrder,
              detail: false,
              dicFlag: ele.cascaderItem ? true : this.vaildData(ele.dicFlag, false),
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
              size: ele.searchSize || option.searchSize || this.crud.controlSize,
              clearable: ele.searchClearable,
              rules: ele.searchRules,
              disabled: ele.searchDisabled,
              readonly: ele.searchReadonly,
              value: ele.searchValue,
              display: this.isSearchIcon ? (this.show ? true : isCount) : true,
            })
            delete ele.bind
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
          size: option.searchSize,
          submitText: option.searchBtnText || this.t('crud.searchBtn'),
          submitBtn: this.vaildData(option.searchBtn, this.config.searchSubBtn),
          submitIcon: option.searchBtnIcon || this.config.searchBtnIcon,
          emptyText: option.emptyBtnText || this.t('crud.emptyBtn'),
          emptyBtn: option.emptyBtn || this.config.emptyBtn,
          emptyIcon: option.emptyBtnIcon || this.config.emptyBtnIcon,
          menuSpan: (() => {
            if (this.show || !this.isSearchIcon) {
              return option.searchMenuSpan
            } else {
              return 6
            }
          })(),
          menuPosition: option.searchMenuPosition || 'center',
          dicFlag: false,
          dicData: this.crud.DIC
        })
        return result;
      }
      let result = dataDetail(option)
      return result;
    },
    searchFlag () {
      return !validatenull(this.searchForm);
    }
  },
  methods: {
    initFun () {
      ['searchReset', 'searchChange'].forEach(ele => this.crud[ele] = this[ele])
    },
    handleChange () {
      this.crud.$emit('update:search', this.searchForm)
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
    dataFormat () {
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
