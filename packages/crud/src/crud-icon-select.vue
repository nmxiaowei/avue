<template>
  <div :class="b()">
    <el-input placeholder="请选择图标"
              v-model="text"
              :size="size"
              @click.native="handleShow"
              readonly>
      <template slot="prepend"><i :class="text"></i></template>
    </el-input>
    <el-dialog title="请选择图标"
               :visible.sync="box"
               width="40%">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane v-for="(citem,cindex) in iconList"
                     :key="cindex"
                     :label="citem.label"
                     :name="cindex+''"></el-tab-pane>
      </el-tabs>
      <div :class="
                     b('list')">
        <div :class="b('item')"
             v-for="(item,index) in list"
             :key="index">
          <i :class="[b('icon'),item]"
             @click="handleSubmit(item)"></i>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import create from "../../utils/create";
import crudCompoents from "../../mixins/crud-compoents.js";
import crudFun from "../../mixins/crud-fun.js";
export default create({
  name: "crud-icon-select",
  mixins: [crudCompoents(), crudFun()],
  props: {
    value: {},
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      box: false,
      tabs: {}
    };
  },
  computed: {
    list() {
      return this.tabs.list || [];
    }
  },
  created() {
    this.tabs = this.iconList[0] || {};
  },
  methods: {
    handleClick(tabs, event) {
      const index = tabs.index;
      this.handleTabs(this.iconList[index]);
    },
    handleTabs(tabs) {
      this.tabs = tabs;
    },
    handleSubmit(item) {
      this.box = false;
      this.text = item;
      this.$emit("input", item);
      this.$emit("change", item);
    },
    handleShow() {
      this.box = true;
    }
  }
});
</script>
