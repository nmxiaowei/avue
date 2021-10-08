<template>
  <el-collapse-transition>
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
                 v-if="searchFlag"
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
  getType
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
    isGroup () {
      return !this.validatenull(this.crud.tableOption.group);
    },
    propOption () {
      let list = [];
      let groupList = this.crud.tableOption.group;
      if (groupList) {
        groupList.forEach(ele => {
          (ele.column || []).forEach(column => {
            list.push(column);
          });
        });
      }
      return [...list, ...this.crud.columnOption]
    },
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
              dicFlag: ele.cascaderItem ? true : this.vaildData(ele.dicFlag, false),
              span: ele.searchSpan || option.searchSpan || config.searchSpan,
              gutter: ele.searchGutter || option.searchGutter || config.searchGutter,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              size: ele.searchSize || option.searchSize,
              value: ele.searchValue,
              rules: ele.searchRules,
              row: ele.searchRow,
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
        result.column = detailColumn(this.deepClone(this.propOption))
        result = Object.assign(result, {
          rowKey: option.searchRowKey || 'null',
          tabs: false,
          enter: this.vaildData(option.searchEnter, true),
          printBtn: false,
          mockBtn: false,
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
      return !!this.crud.$scopedSlots.search || !validatenull(this.searchForm);
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
      this.searchShow = vaildData(this.crud.tableOption.searchShow, config.searchShow);
    }
  }
});
</script>
