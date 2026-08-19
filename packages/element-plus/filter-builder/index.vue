<template>
  <section :class="b()">
    <header :class="b('header')">
      <div :class="b('logic')">
        <span :class="b('logic-label')">满足以下</span>
        <el-radio-group
          v-model="filter.logic"
          :disabled="disabled"
          size="small"
          @change="emitChange"
        >
          <el-radio-button label="and">所有条件</el-radio-button>
          <el-radio-button label="or">任一条件</el-radio-button>
        </el-radio-group>
      </div>
      <div :class="b('actions')">
        <el-button
          v-if="filter.rules.length"
          text
          :disabled="disabled"
          @click="clearRules"
        >
          清空
        </el-button>
        <el-button type="primary" :disabled="disabled || !fields.length" @click="addRule">
          <el-icon><el-icon-plus /></el-icon>
          添加条件
        </el-button>
      </div>
    </header>

    <div v-if="filter.rules.length" :class="b('rules')">
      <div v-for="rule in filter.rules" :key="rule.id" :class="b('rule')">
        <el-select
          v-model="rule.field"
          :disabled="disabled"
          filterable
          placeholder="选择字段"
          @change="handleFieldChange(rule)"
        >
          <el-option
            v-for="field in fields"
            :key="field.value"
            :label="field.label"
            :value="field.value"
          />
        </el-select>

        <el-select
          v-model="rule.operator"
          :disabled="disabled || !rule.field"
          placeholder="选择条件"
          @change="emitChange"
        >
          <el-option
            v-for="operator in getOperators(rule)"
            :key="operator.value"
            :label="operator.label"
            :value="operator.value"
          />
        </el-select>

        <template v-if="needsValue(rule)">
          <el-select
            v-if="getFieldType(rule) === 'select'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            :multiple="isMultipleValue(rule)"
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
            placeholder="选择值"
            @change="emitChange"
          >
            <el-option
              v-for="option in getFieldOptions(rule)"
              :key="getOptionValue(option)"
              :label="getOptionLabel(option)"
              :value="getOptionValue(option)"
            />
          </el-select>

          <el-select
            v-else-if="getFieldType(rule) === 'boolean'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            clearable
            placeholder="选择值"
            @change="emitChange"
          >
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>

          <el-date-picker
            v-else-if="getFieldType(rule) === 'date'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            clearable
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
            @change="emitChange"
          />

          <el-date-picker
            v-else-if="getFieldType(rule) === 'datetime'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            clearable
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
            @change="emitChange"
          />

          <el-date-picker
            v-else-if="getFieldType(rule) === 'daterange'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            clearable
            type="daterange"
            value-format="YYYY-MM-DD"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="emitChange"
          />

          <el-input-number
            v-else-if="getFieldType(rule) === 'number'"
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            controls-position="right"
            :precision="getField(rule).precision"
            :step="getField(rule).step || 1"
            @change="emitChange"
          />

          <el-input
            v-else
            v-model="rule.value"
            :disabled="disabled || !rule.field"
            clearable
            :placeholder="getField(rule).placeholder || '输入值'"
            @change="emitChange"
          />
        </template>

        <div v-else :class="b('empty-value')">无需填写值</div>

        <el-button
          :class="b('remove')"
          :disabled="disabled"
          text
          type="danger"
          :aria-label="`删除${getField(rule).label || '条件'}`"
          @click="removeRule(rule.id)"
        >
          <el-icon><el-icon-delete /></el-icon>
        </el-button>
      </div>
    </div>

    <el-empty v-else :image-size="72" :description="emptyText">
      <el-button type="primary" :disabled="disabled || !fields.length" @click="addRule">
        添加第一个条件
      </el-button>
    </el-empty>
  </section>
</template>

<script>
import create from "core/create";

const OPERATOR_MAP = {
  text: [
    { label: "等于", value: "eq" },
    { label: "不等于", value: "ne" },
    { label: "包含", value: "contains" },
    { label: "不包含", value: "notContains" },
    { label: "为空", value: "isEmpty" },
    { label: "不为空", value: "isNotEmpty" },
  ],
  number: [
    { label: "等于", value: "eq" },
    { label: "不等于", value: "ne" },
    { label: "大于", value: "gt" },
    { label: "大于等于", value: "gte" },
    { label: "小于", value: "lt" },
    { label: "小于等于", value: "lte" },
    { label: "为空", value: "isEmpty" },
    { label: "不为空", value: "isNotEmpty" },
  ],
  select: [
    { label: "等于", value: "eq" },
    { label: "不等于", value: "ne" },
    { label: "属于", value: "in" },
    { label: "不属于", value: "notIn" },
    { label: "为空", value: "isEmpty" },
    { label: "不为空", value: "isNotEmpty" },
  ],
  boolean: [
    { label: "等于", value: "eq" },
    { label: "不等于", value: "ne" },
  ],
  date: [
    { label: "等于", value: "eq" },
    { label: "早于", value: "lt" },
    { label: "晚于", value: "gt" },
    { label: "为空", value: "isEmpty" },
    { label: "不为空", value: "isNotEmpty" },
  ],
  datetime: [
    { label: "等于", value: "eq" },
    { label: "早于", value: "lt" },
    { label: "晚于", value: "gt" },
    { label: "为空", value: "isEmpty" },
    { label: "不为空", value: "isNotEmpty" },
  ],
  daterange: [
    { label: "介于", value: "between" },
    { label: "不介于", value: "notBetween" },
  ],
};

const EMPTY_VALUE_OPERATORS = ["isEmpty", "isNotEmpty"];

export default create({
  name: "filter-builder",
  props: {
    modelValue: {
      type: Object,
      default: () => ({ logic: "and", rules: [] }),
    },
    fields: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: "暂未添加筛选条件",
    },
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      filter: this.normalizeFilter(this.modelValue),
      ruleSeed: 0,
    };
  },
  computed: {
    fieldMap() {
      return this.fields.reduce((result, field) => {
        result[field.value] = field;
        return result;
      }, {});
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(value) {
        this.filter = this.normalizeFilter(value);
      },
    },
  },
  methods: {
    normalizeFilter(value) {
      const rules = Array.isArray(value && value.rules) ? value.rules : [];
      return {
        logic: value && value.logic === "or" ? "or" : "and",
        rules: rules.map((rule) => ({
          id: rule.id || this.createRuleId(),
          field: rule.field || "",
          operator: rule.operator || "",
          value: rule.value === undefined ? "" : rule.value,
        })),
      };
    },
    createRuleId() {
      this.ruleSeed = (Number(this.ruleSeed) || 0) + 1;
      return `filter_rule_${Date.now()}_${this.ruleSeed}`;
    },
    createRule() {
      const field = this.fields[0] || {};
      const operators = this.getOperators({ field: field.value });
      return {
        id: this.createRuleId(),
        field: field.value || "",
        operator: operators[0] ? operators[0].value : "",
        value: this.getDefaultValue(field, operators[0] && operators[0].value),
      };
    },
    getDefaultValue(field, operator) {
      if (EMPTY_VALUE_OPERATORS.includes(operator)) return "";
      if (field && field.type === "daterange") return [];
      if (field && field.multiple) return [];
      return "";
    },
    getField(rule) {
      return this.fieldMap[rule.field] || {};
    },
    getFieldType(rule) {
      return this.getField(rule).type || "text";
    },
    getOperators(rule) {
      const field = this.getField(rule);
      const operators = field.operators || OPERATOR_MAP[field.type || "text"] || OPERATOR_MAP.text;
      return operators.map((operator) =>
        typeof operator === "string"
          ? (OPERATOR_MAP.text.find((item) => item.value === operator) || { label: operator, value: operator })
          : operator
      );
    },
    getFieldOptions(rule) {
      const field = this.getField(rule);
      return field.options || field.dicData || [];
    },
    getOptionValue(option) {
      return typeof option === "object" ? option.value : option;
    },
    getOptionLabel(option) {
      return typeof option === "object" ? (option.label === undefined ? option.value : option.label) : option;
    },
    isMultipleValue(rule) {
      return this.getField(rule).multiple || ["in", "notIn"].includes(rule.operator);
    },
    needsValue(rule) {
      return !EMPTY_VALUE_OPERATORS.includes(rule.operator);
    },
    addRule() {
      this.filter.rules.push(this.createRule());
      this.emitChange();
    },
    removeRule(id) {
      this.filter.rules = this.filter.rules.filter((rule) => rule.id !== id);
      this.emitChange();
    },
    clearRules() {
      this.filter.rules = [];
      this.emitChange();
    },
    handleFieldChange(rule) {
      const operators = this.getOperators(rule);
      rule.operator = operators[0] ? operators[0].value : "";
      rule.value = this.getDefaultValue(this.getField(rule), rule.operator);
      this.emitChange();
    },
    getValue() {
      return this.copyFilter();
    },
    setValue(value) {
      this.filter = this.normalizeFilter(value);
      this.emitChange();
    },
    copyFilter() {
      return {
        logic: this.filter.logic,
        rules: this.filter.rules.map((rule) => ({
          id: rule.id,
          field: rule.field,
          operator: rule.operator,
          value: Array.isArray(rule.value) ? [...rule.value] : rule.value,
        })),
      };
    },
    emitChange() {
      const value = this.copyFilter();
      this.$emit("update:modelValue", value);
      this.$emit("change", value);
    },
  },
});
</script>
