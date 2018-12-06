<template>
  <el-collapse-transition>
    <el-form
      :class="b('search')"
      :model="searchForm"
      :inline="true"
      ref="searchForm"
      v-if="searchShow && searchFlag"
    >
      <!-- 循环列搜索框 -->
      <el-form-item
        :prop="column.prop"
        :label="column.label"
        v-for="(column,index) in $parent.columnOption"
        :key="index"
        v-if="column.search"
      >
        <component
          :is="getSearchType(column.type)"
          :size="$parent.isMediumSize"
          v-model="searchForm[column.prop]"
          :type="getType(column)"
          :props="column.props || $parent.tableOption.props"
          :format="column.format"
          :parent="column.parent"
          :defaultExpandAll="column.defaultExpandAll"
          :filterable="column.searchFilterable"
          :filter-method="column.searchFilterMethod"
          :value-format="column.valueFormat"
          :multiple="config.searchMultiple.includes(column.type) && vaildData(column.searchMmultiple,false)"
          :clearable="column.searchClearable"
          :placeholder="column.searchPlaceholder || column.label"
          :dic="$parent.DIC[column.prop]"
        ></component>
      </el-form-item>
      <slot name="search"></slot>
      <el-form-item>
        <el-button
          type="primary"
          @click="searchChange"
          :icon="config.searchBtnIcon"
          :size="$parent.isMediumSize"
        >{{config.searchBtnTitle}}</el-button>
        <el-button
          @click="searchReset"
          :icon="config.emptyBtnIcon"
          :size="$parent.isMediumSize"
        >{{config.emptyBtnTitle}}</el-button>
        <slot name="searchMenu"></slot>
      </el-form-item>
    </el-form>
  </el-collapse-transition>
</template>

<script>
import cteate from "core/create";
import { vaildData } from "utils/util";
import { validatenull } from "utils/validate";
import { formInitVal, getSearchType, getType } from "core/dataformat";
import config from "./config";
export default cteate({
  name: "crud",
  data() {
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
    searchForm: {
      handler() {
        this.$emit("input", this.searchForm);
      },
      deep: true
    }
  },
  created() {
    this.$parent = this.$parent.$parent;
    this.getSearchType = getSearchType;
    this.getType = getType;
    this.vaildData = vaildData;
    this.dataformat();
  },
  computed: {
    searchSolt() {
      return !validatenull(this.$slots.search);
    },
    searchFlag() {
      if (this.searchSolt) return true;
      else return !validatenull(this.searchForm);
    }
  },
  methods: {
    // 搜索回调
    searchChange() {
      this.$parent.$emit("search-change", this.searchForm);
    },
    // 搜索清空
    searchReset() {
      this.$refs["searchForm"].resetFields();
      this.$parent.$emit("search-reset");
    },
    handleSearchShow() {
      this.searchShow = !this.searchShow;
    },
    dataformat() {
      this.defaultForm = formInitVal(this.$parent.columnOption);
      this.searchForm = this.deepClone(this.defaultForm.searchForm);
      this.searchShow = vaildData(
        this.$parent.tableOption.searchShow,
        this.$parent.config.searchShow
      );
    }
  }
});
</script>

