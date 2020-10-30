<template>
  <div :class="b()">
    <el-tabs v-model="active"
             :tab-position="parentOption.position"
             :type="parentOption.type">
      <el-tab-pane :name="index+''"
                   :disabled="column.disabled"
                   v-for="(column,index) in columnOption"
                   :key="index">
        <span slot="label">
          <i :class="column.icon"></i>&nbsp;
          {{column.label}}
        </span>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "tabs",
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      active: "0",
    };
  },
  watch: {
    active () {
      this.$emit("change", this.tabsObj);
    }
  },
  computed: {
    tabsObj () {
      return this.columnOption[this.active];
    },
    parentOption () {
      return this.option;;
    },
    columnOption () {
      return this.parentOption.column || [];
    }
  },
  methods: {
    changeTabs (active) {
      this.active = active + "";
    }
  }
});
</script>


