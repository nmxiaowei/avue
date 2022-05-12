<template>
  <el-card :shadow="crud.isCard"
           :class="b()"
           v-show="searchShow && searchFlag">
    <slot name="search"
          :row="searchForm"
          :search="searchForm"
          :size="crud.controlSize"></slot>
    <avue-form :option="option"
               ref="form"
               @submit="searchChange"
               @change="handleChange"
               @reset-change="resetChange"
               v-if="searchShow"
               v-model="searchForm">
      <template slot="menuForm"
                slot-scope="scope">
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
                :slot="getSlotName(item)">
        <slot :name="item"
              v-bind="Object.assign(scope,{
                  search:searchForm,
                  row:searchForm
                })"></slot>
      </template>
    </avue-form>
  </el-card>
</template>

<script>
import create from "core/create";
import slot from 'core/slot'
import config from "./config";
import locale from "core/locale";
import { getSearchType } from "core/dataformat";
import { filterParams } from 'utils/util'
export default create({
  name: "crud__search",
  inject: ["crud"],
  mixins: [locale, slot],
  data () {
    return {
      show: false,
      searchIndex: 2,
      searchShow: true,
      searchForm: {}
    };
  },
  props: {
    search: Object
  },
  watch: {
    'crud.propOption': {
      handler () {
        this.dataFormat()
      },
      deep: true
    },
    show () {
      this.crud.getTableHeight()
    },
    searchShow () {
      this.crud.getTableHeight()
    },
    search: {
      handler () {
        this.searchForm = Object.assign(this.searchForm, this.search);
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.initFun();
    this.dataFormat()
  },
  computed: {
    option () {
      const option = this.crud.option;
      this.searchIndex = option.searchIndex || 2
      const detailColumn = (list = []) => {
        let column = [];
        let count = 0;
        list = list.sort((a, b) => (b.searchOrder || 0) - (a.searchOrder || 0))
        list.forEach(ele => {
          if (ele.search) {
            let isCount = count < this.searchIndex
            let obj = {}
            Object.keys(ele).forEach(item => {
              let key = 'search'
              if (item.includes(key)) {
                let result = item.replace(key, '')
                if (result.length == 0) return
                result = result.replace(result[0], result[0].toLowerCase())
                obj[result] = ele[item];
              }
            })
            ele = Object.assign(ele, obj, {
              type: getSearchType(ele),
              detail: false,
              dicFlag: ele.cascader ? true : this.vaildData(ele.dicFlag, false),
              span: ele.searchSpan || option.searchSpan || config.searchSpan,
              control: ele.searchControl,
              gutter: ele.searchGutter || option.searchGutter || config.searchGutter,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              size: ele.searchSize || option.searchSize,
              value: ele.searchValue,
              rules: ele.searchRules,
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
      const dataDetail = (list) => {
        let result = this.deepClone(list);
        result.column = detailColumn(this.deepClone(this.crud.propOption))
        result = Object.assign(result, {
          rowKey: option.searchRowKey || 'null',
          tabs: false,
          group: false,
          printBtn: false,
          mockBtn: false,
          filterDic: option.searchFilterDic,
          filterNull: option.searchFilterNull,
          filterParam: option.searchFilterParam,
          enter: option.searchEnter,
          size: option.searchSize,
          submitText: option.searchBtnText || this.t('crud.searchBtn'),
          submitBtn: this.vaildData(option.searchBtn, config.searchSubBtn),
          submitIcon: this.crud.getBtnIcon('searchBtn'),
          emptyText: option.emptyBtnText || this.t('crud.emptyBtn'),
          emptyBtn: this.vaildData(option.emptyBtn, config.emptyBtn),
          emptyIcon: this.crud.getBtnIcon('emptyBtn'),
          menuSpan: (() => {
            if (this.show || !this.isSearchIcon) {
              return option.searchMenuSpan
            } else {
              return option.searchMenuSpan < 6 ? option.searchMenuSpan : 6
            }
          })(),
          menuPosition: option.searchMenuPosition || 'center',
          dicFlag: false,
          dicData: this.crud.DIC
        })
        return result;
      }
      return dataDetail(option)
    },
    isSearchIcon () {
      return this.vaildData(this.crud.option.searchIcon, this.$AVUE.searchIcon) && this.searchLen > this.searchIndex
    },
    searchLen () {
      let count = 0;
      this.crud.propOption.forEach(ele => {
        if (ele.search) count++
      })
      return count
    },
    searchFlag () {
      return !!this.crud.$scopedSlots.search || this.searchLen !== 0
    }
  },
  methods: {
    initFun () {
      ['searchReset', 'searchChange'].forEach(ele => this.crud[ele] = this[ele])
    },
    getSlotName (item) {
      return item.replace('Search', '')
    },
    handleChange () {
      this.crud.$emit('update:search', this.searchForm)
    },
    // 搜索回调
    searchChange (form, done) {
      this.crud.$emit("search-change", filterParams(form), done);
    },
    // 搜索清空
    resetChange () {
      this.crud.$emit("search-reset", this.searchForm);
    },
    // 搜索清空
    searchReset () {
      this.$refs.form.resetForm();
    },
    handleSearchShow () {
      this.searchShow = !this.searchShow;
    },
    dataFormat () {
      const option = this.crud.option;
      this.searchShow = this.vaildData(option.searchShow, config.searchShow);
    }
  }
});
</script>
