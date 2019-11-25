<template>
  <el-collapse-transition>
    <div v-show="searchShow && searchFlag"
         style="margin-bottom:10px;">
      <avue-form :option="option"
                 @submit="searchChange"
                 @reset-change="searchReset"
                 v-model="searchForm">
        <template slot="menuForm"
                  slot-scope="{size}">
          <slot name="searchMenu"
                :size="size"></slot>
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
      </avue-form>
    </div>
  </el-collapse-transition>
</template>

<script>
import cteate from "core/create";
import { vaildData, filterForm } from "utils/util";
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
  name: "crud-search",
  inject: ["crud"],
  mixins: [locale],
  data () {
    return {
      config: config,
      defaultForm: {
        searchForm: {}
      },
      searchShow: true,
      searchForm: {}
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
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
    searchForm: {
      handler () {
        this.$emit("input", this.searchForm);
      },
      deep: true
    }
  },
  created () {
    this.init();
  },
  computed: {
    columnOption () {
      return this.option.column || []
    },
    option () {
      const option = this.crud.option;
      const dataDetail = (list) => {
        let result = this.deepClone(list);
        let column = [];
        (result.column || []).forEach(ele => {
          if (ele.search) {
            delete ele.rules;
            ele = Object.assign(ele, {
              type: getSearchType(ele.type),
              span: ele.searchSpan || this.config.searchSpan,
              tip: ele.searchTip,
              placeholder: getPlaceholder(ele, 'search'),
              filterable: ele.searchFilterable,
              filterMethod: ele.searchFilterMethod,
              checkStrictly: ele.searchCheckStrictly,
              tags: ele.searchTags,
              formslot: ele.searchslot
            })
            column.push(ele);
          }
        })
        result = Object.assign(result, {
          column: column
        }, {
          size: this.crud.isMediumSize,
          gutter: option.searchGutter || this.config.searchGutter,
          labelWidth: option.searchLabelWidth || this.config.searchLabelWidth,
          submitText: '搜索',
          submitBtn: option.searchSubBtn || this.config.searchSubBtn,
          submitIcon: option.searchBtnIcon || this.config.searchBtnIcon,
          emptyText: '清空',
          emptyBtn: option.searchResetBtn || this.config.searchResetBtn,
          emptyIcon: option.emptyBtnIcon || this.config.emptyBtnIcon,
        })
        return result;
      }
      return dataDetail(option)
    },
    searchSlot () {
      return !validatenull(this.$slots.search);
    },
    searchFlag () {
      if (this.searchSlot) return true;
      else return !validatenull(this.searchForm);
    }
  },
  methods: {
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
    searchReset () {
      this.crud.$emit("search-reset", this.defaultForm.searchForm);
    },
    handleSearchShow () {
      this.searchShow = !this.searchShow;
    },
    dataformat () {
      this.defaultForm = formInitVal(this.crud.propOption);
      this.searchForm = this.deepClone(this.defaultForm.searchForm);
      this.searchShow = vaildData(
        this.crud.tableOption.searchShow,
        this.crud.config.searchShow
      );
    }
  }
});
</script>
