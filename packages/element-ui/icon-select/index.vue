<template>
  <div :class="b()">
    <el-input placeholder="请选择图标"
              v-model="text"
              :size="size"
              :disabled="disabled"
              @click.native="handleShow"
              readonly>
      <template slot="append"><i :class="text"></i></template>
    </el-input>
    <el-dialog title="请选择图标"
               :modal-append-to-body="false"
               append-to-body
               :visible.sync="box"
               width="40%">
      <avue-tabs :option="option"
                 @change="handleTabs"></avue-tabs>
      <div :class="b('list')">
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
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "icon-select",
  mixins: [props(), event()],
  props: {
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
    },
    option() {
      return {
        column: this.iconList
      };
    }
  },
  created() {
    this.tabs = this.iconList[0] || {};
  },
  methods: {
    handleTabs(tabs) {
      this.tabs = tabs;
    },
    handleSubmit(item) {
      this.box = false;
      this.text = item;
      this.handleChange(item);
    },
    handleShow() {
      if (this.disabled || this.readonly) return;
      this.box = true;
    }
  }
});
</script>


