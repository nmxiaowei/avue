<template>
  <el-card :shadow="crud.isCard"
           :class="b()"
           v-if="searchFlag"
           v-show="searchShow && searchFlag">
    <slot name="search"
          :row="searchForm"
          :search="searchForm"
          :size="crud.size"></slot>
    <avue-form :option="option"
               ref="form"
               @submit="searchChange"
               @reset-change="resetChange"
               v-model="searchForm">
      <template #menu-form="scope">
        <slot name="search-menu"
              v-bind="Object.assign(scope,{
                  search:searchForm,
                  row:searchForm
                })"></slot>
        <template v-if="isSearchIcon">
          <el-button text
                     v-if="show===false"
                     @click="handleSearchIconShow"
                     icon="el-icon-arrow-down">{{t('crud.open')}}</el-button>
          <el-button text
                     v-if="show===true"
                     @click="handleSearchIconShow"
                     icon="el-icon-arrow-up">{{t('crud.shrink')}}</el-button>
        </template>

      </template>
      <template v-for="item in crud.searchSlot"
                #[getSlotName(item)]="scope">
        <slot v-bind="scope"
              :name="item"></slot>
      </template>
    </avue-form>
  </el-card>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import { validData } from "utils/util";
import { validatenull } from "utils/validate";
import slot from 'core/slot'
import { getSearchType, getType } from "core/dataformat";
import { filterParams } from 'utils/util'
import config from "../config";
export default create({
  name: "crud__search",
  inject: ["crud"],
  mixins: [locale, slot],
  data () {
    return {
      show: false,
      searchShow: true
    };
  },
  watch: {
    "crud.propOption": {
      handler () {
        this.searchShow = validData(this.crud.tableOption.searchShow, config.searchShow);
      },
      immediate: true
    },
    show () {
      this.crud.getTableHeight()
    },
    searchShow () {
      this.crud.getTableHeight()
    }
  },
  created () {
    this.initFun();
  },
  computed: {
    searchForm: {
      get () {
        return this.crud.search
      },
      set (val) {
        this.crud.$emit('update:search', val)
      }
    },
    isGroup () {
      return !this.validatenull(this.crud.tableOption.group);
    },
    isSearchIcon () {
      return this.validData(this.crud.tableOption.searchIcon, this.$AVUE.searchIcon) === true && this.columnLen > this.searchIndex
    },
    searchIndex () {
      return this.crud.tableOption.searchIndex || 2
    },
    columnLen () {
      let count = 0;
      this.crud.propOption.forEach(ele => {
        if (ele.search) count++
      })
      return count
    },
    option () {
      const option = this.crud.tableOption;
      const detailColumn = (list = []) => {
        list = this.deepClone(list);
        let column = [];
        let count = 0;
        list = list.sort((a, b) => (b.searchOrder || 0) - (a.searchOrder || 0))
        list.forEach(ele => {
          if (ele.search) {
            let isCount = count < this.searchIndex
            let obj = {}
            Object.keys(ele).forEach(item => {
              let key = 'search'
              if (item == 'searchProp') return
              if (item.includes(key)) {
                let result = item.replace(key, '')
                if (result.length == 0) return
                result = result.replace(result, result.toLowerCase())
                obj[result] = ele[item];
              }
            })
            ele = Object.assign(ele, obj, {
              type: getSearchType(ele),
              detail: false,
              dicFlag: ele.cascader ? true : this.validData(ele.dicFlag, false),
              span: ele.searchSpan || option.searchSpan || config.searchSpan,
              control: ele.searchControl,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              size: ele.searchSize || option.searchSize,
              value: ele.searchValue,
              rules: ele.searchRules,
              render: ele.renderSearch,
              row: ele.searchRow,
              bind: ele.searchBin,
              disabled: ele.searchDisabled,
              readonly: ele.searchReadonly,
              display: this.isSearchIcon ? (this.show ? true : isCount) : true,
            })
            column.push(ele);
            count = count + 1;
          }
        })
        return column;
      }
      const detailOption = (list) => {
        let result = this.deepClone(list);
        let obj = {}
        Object.keys(result).forEach(item => {
          let key = 'search'
          if (item.includes(key)) {
            let str = item.replace(key, '')
            if (str.length == 0) return
            str = str.replace(str[0], str[0].toLowerCase())
            obj[str] = result[item];
          }
        })
        result.column = detailColumn(this.crud.propOption)
        result = Object.assign(result, obj, {
          rowKey: option.searchRowKey || 'null',
          tabs: false,
          group: false,
          printBtn: false,
          mockBtn: false,
          submitText: option.searchBtnText || this.t('crud.searchBtn'),
          submitBtn: this.validData(option.searchBtn, config.searchSubBtn),
          submitIcon: this.crud.getBtnIcon('searchBtn'),
          emptyText: option.emptyBtnText || this.t('crud.emptyBtn'),
          emptyBtn: this.validData(option.emptyBtn, config.emptyBtn),
          emptyIcon: this.crud.getBtnIcon('emptyBtn'),
          menuSpan: (() => {
            if (this.show || !this.isSearchIcon) {
              return option.searchMenuSpan || option.searchSpan
            } else {
              return option.searchMenuSpan || 6
            }
          })(),
          menuPosition: option.searchMenuPosition || 'center',
          dicFlag: false,
          dicData: this.crud.DIC
        })
        return result;
      }
      let result = detailOption(option)
      return result;
    },
    searchFlag () {
      return !!this.crud.$slots.search || this.columnLen !== 0
    }
  },
  methods: {
    initFun () {
      ['searchReset', 'searchChange'].forEach(ele => this.crud[ele] = this[ele])
    },
    getSlotName (item) {
      return item.replace('-search', '')
    },
    // 搜索回调
    searchChange (form, done) {
      form = filterParams(form);
      this.crud.propOption.forEach(ele => {
        if (ele.searchProp) {
          form[ele.searchProp] = form[ele.prop]
          delete form[ele.prop]
        }
      })
      this.crud.$emit("search-change", form, done);
    },
    // 搜索清空
    resetChange () {
      this.crud.$emit("search-reset", this.searchForm);
    },
    // 搜索清空
    searchReset () {
      this.$refs.form.resetForm();
    },
    handleSearchIconShow () {
      this.show = !this.show;
      this.crud.$emit('search-icon-change', this.show)
    },
    handleSearchShow () {
      this.searchShow = !this.searchShow;
    }
  }
});
</script>
