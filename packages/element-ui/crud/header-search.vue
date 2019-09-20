<template>
  <el-collapse-transition>
    <div v-show="searchShow && searchFlag"
         style="margin-bottom:10px;">
      <el-form :class="b()"
               :model="searchForm"
               label-suffix=":"
               :label-width="setPx(crud.tableOption.searchLabelWidth || config.searchLabelWidth)"
               label-position="right"
               ref="searchForm">
        <!-- 循环列搜索框 -->
        <el-row :gutter="crud.tableOption.searchGutter || config.searchGutter">
          <el-col :md="column.searchSpan || 6"
                  :xs="24"
                  v-for="(column,index) in crud.propOption"
                  :key="index"
                  v-if="column.search">
            <el-form-item :prop="column.prop"
                          :label-width="setPx(column.searchLabelWidth || config.searchLabelWidth)"
                          :label="column.label">
              <el-tooltip :disabled="!column.searchTip"
                          :content="vaildData(column.searchTip,getPlaceholder(column,'search'))"
                          :placement="column.searchTipPlacement">
                <component v-model="searchForm[column.prop]"
                           :is="getSearchType(column.type)"
                           :clearable="column.searchClearable"
                           :defaultExpandAll="column.defaultExpandAll"
                           :dic="crud.DIC[column.prop]"
                           :filterable="column.searchFilterable"
                           :filter-method="column.searchFilterMethod"
                           :format="column.format"
                           :checkStrictly="column.searchCheckStrictly || column.checkStrictly"
                           :changeoOnSelect="column.changeoOnSelect"
                           :separator="column.separator"
                           :showAllLevels="column.showAllLevels"
                           :multiple="column.multiple"
                           :parent="column.parent"
                           :placeholder="getPlaceholder(column,'search')"
                           :props="column.props || crud.tableOption.props"
                           :size="crud.isMediumSize"
                           :type="getType(column)"
                           :tags="column.searchTags"
                           :value-format="column.valueFormat"
                           @keyup.enter.native="searchChange"></component>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <slot name="search"></slot>
          <el-col :md="6"
                  :xs="24">
            <el-form-item label-width="0"
                          label="">
              <div :class="b('menu')">

                <el-button type="primary"
                           @click="searchChange"
                           :icon="config.searchBtnIcon"
                           v-if="vaildData(crud.tableOption.searchSubBtn,config.searchSubBtn)"
                           :size="crud.isMediumSize">{{t('crud.searchBtn')}}
                </el-button>
                <el-button @click="searchReset"
                           :icon="config.emptyBtnIcon"
                           v-if="vaildData(crud.tableOption.searchResetBtn,config.searchResetBtn)"
                           :size="crud.isMediumSize">{{t('crud.emptyBtn')}}
                </el-button>
                <slot name="searchMenu"></slot>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

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
      this.getSearchType = getSearchType;
      this.getPlaceholder = getPlaceholder;
      this.getType = getType;
      this.vaildData = vaildData;
      //扩展搜索的相关api
      this.crud.searchChange = this.searchChange;
      this.crud.searchReset = this.searchReset;
    },
    // 搜索回调
    searchChange () {
      this.crud.$emit("search-change", filterForm(this.searchForm));
    },
    // 搜索清空
    searchReset () {
      this.$refs["searchForm"].resetFields();
      this.crud.$emit("search-reset");
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
