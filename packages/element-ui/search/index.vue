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
              v-if="column.slot"></slot>
        <span v-else
              :class="[b('tags'),{'avue-search__tags--active':getActive(item,column)}]"
              @click="handleClick(column,item)"
              v-for="item in DIC[column.prop]"
              :key="getKey(item,column.props,'value')">{{getKey(item,column.props,'label')}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import create from "core/create";
import init from "../../core/crud/init.js";
export default create({
  name: "search",
  mixins: [init()],
  props: {
    value: {}
  },
  computed: {
    isCard() {
      return this.parentOption.card;
    },
    parentOption() {
      let option = this.deepClone(this.tableOption);
      return option;
    },
    columnOption() {
      let list = [...this.parentOption.column] || [];
      return list;
    }
  },
  data() {
    return {
      form: {}
    };
  },
  watch: {
    value: {
      handler() {
        this.setVal();
        this.dataformat();
      }
    }
  },
  created() {
    this.handleLoadDic();
    this.form = this.value;
    this.dataformat();
  },
  methods: {
    setVal() {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
    },
    dataformat() {
      this.columnOption.forEach(ele => {
        const prop = ele.prop;
        if (this.validatenull(this.form[prop])) {
          if (ele.multiple === false) {
            this.$set(this.form, prop, "");
          } else {
            this.$set(this.form, prop, []);
          }
        }
      });
    },
    getActive(item, column) {
      const value = this.getKey(item, column.props, "value");
      if (column.multiple === false) {
        return this.form[column.prop] === value;
      } else {
        return this.form[column.prop].includes(value);
      }
    },
    handleClick(column, item) {
      const value = this.getKey(item, column.props, "value");
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
      this.$emit("change", this.form);
      this.$emit("input", this.form);
    }
  }
});
</script>

