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
                 @reset-change="resetChange"
                 v-model="searchForm">
        <template #menu-form="scope">
          <slot name="search-menu"
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
        <template v-for="item in crud.searchSlot"
                  #[getSlotName(item)]="scope">
          <slot v-bind="scope"
                :name="item"></slot>
        </template>
      </avue-form>
    </el-card>
  </el-collapse-transition>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import { validData } from "utils/util";
import { validatenull } from "utils/validate";
import slot from 'core/slot'
import { getSearchType, getType } from "core/dataformat";
import config from "../config";
export default create({
  name: "crud__search",
  inject: ["crud"],
  mixins: [locale, slot],
  data () {
    return {
      show: false,
      flag: false,
      reload: false,
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
    propOption: {
      handler () {
        this.searchShow = validData(this.crud.tableOption.searchShow, config.searchShow);
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
    searchForm: {
      handler () {
        this.crud.$emit('update:search', this.searchForm)
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
    isSearchIcon () {
      return this.validData(this.crud.option.searchIcon, this.$AVUE.searchIcon) === true && this.columnLen > this.searchIndex
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
              dicFlag: ele.cascaderItem ? true : this.validData(ele.dicFlag, false),
              span: ele.searchSpan || option.searchSpan || config.searchSpan,
              gutter: ele.searchGutter || option.searchGutter || config.searchGutter,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              size: ele.searchSize || option.searchSize,
              value: ele.searchValue || this.searchForm[ele.prop],
              rules: ele.searchRules,
              row: ele.searchRow,
              display: this.isSearchIcon ? (this.show ? true : isCount) : true,
            })
            let whiteList = ['bind', 'disabled', 'readonly']
            whiteList.forEach(key => delete ele[key])
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
        result.column = detailColumn(this.deepClone(this.crud.propOption))
        result = Object.assign(result, {
          rowKey: option.searchRowKey || 'null',
          tabs: false,
          enter: this.validData(option.searchEnter, true),
          printBtn: false,
          mockBtn: false,
          size: option.searchSize,
          submitText: option.searchBtnText || this.t('crud.searchBtn'),
          submitBtn: this.validData(option.searchBtn, config.searchSubBtn),
          submitIcon: this.crud.getBtnIcon('searchBtn'),
          emptyText: option.emptyBtnText || this.t('crud.emptyBtn'),
          emptyBtn: this.validData(option.emptyBtn, config.emptyBtn),
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
    handleSearchShow () {
      this.searchShow = !this.searchShow;
    }
  }
});
</script>
