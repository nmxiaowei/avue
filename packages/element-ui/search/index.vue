<template>
  <el-row :class="[b(),{'avue--card':isCard}]"
          :span="24">
    <el-col :span="column.span || 24"
            v-for="(column,index) in columnOption"
            :key="column.prop"
            :class="b('item')">
      <p :class="b('title')">{{column.label}}:</p>
      <div :class="b('content')">
        <slot :name="column.prop"
              :dic="DIC[column.prop]"
              v-if="mainSlot.includes(column.prop)"></slot>
        <span v-else
              :class="[b('tags'),{'avue-search__tags--active':getActive(item,column)}]"
              @click="handleClick(column,item)"
              v-for="item in DIC[column.prop]"
              :key="getKey(item,column.props,valueKey)">{{getKey(item,column.props,labelKey)}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import create from "core/create";
import { DIC_PROPS } from 'global/variable'
import init from "common/common/init.js";
export default create({
  name: "search",
  mixins: [init()],
  props: {
    value: {}
  },
  computed: {
    form: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        this.$emit("change", val);

      }
    },
    props () {
      return this.parentOption.props || {}
    },
    labelKey () {
      return DIC_PROPS.label
    },
    valueKey () {
      return DIC_PROPS.value
    },
    mainSlot () {
      let result = [];
      this.propOption.forEach(item => {
        if (this.$scopedSlots[item.prop]) result.push(item.prop)
      })
      return result
    },
    isCard () {
      return this.parentOption.card;
    },
    parentOption () {
      return this.tableOption;
    },
    propOption () {
      return this.columnOption;
    },
    columnOption () {
      return this.parentOption.column;
    }
  },
  created () {
    this.dataFormat();
  },
  methods: {
    getKey (item = {}, props = {}, key) {
      return item[props[key] || this.props[key] || key];
    },
    dataFormat () {
      this.propOption.forEach(ele => {
        const prop = ele.prop;
        if (this.validatenull(this.form[prop])) {
          this.$set(this.form, prop, ele.multiple === false ? "" : []);
        }
      });
    },
    getActive (item, column) {
      const value = this.getKey(item, column.props, this.valueKey);
      if (column.multiple === false) {
        return this.form[column.prop] === value;
      } else {
        return this.form[column.prop].includes(value);
      }
    },
    handleClick (column, item) {
      const value = this.getKey(item, column.props, this.valueKey);
      //单选
      if (column.multiple === false) {
        this.form[column.prop] = value;
      } else {
        // 多选
        const index = this.form[column.prop].indexOf(value);
        if (index === -1) {
          this.form[column.prop].push(value);
        } else {
          this.form[column.prop].splice(index, 1);
        }
      }
    }
  }
});
</script>

