/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

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

var script = src_core_create.default({
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

exports.default = script;
