<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              v-model="text"
              :size="size"
              ref="main"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @change="handleChange"
              @click.native="handleClick"
              @focus="handleShow">
      <span slot="append"
            @click="handleShow">
        <i class="avue-crud__icon--small"
           :class="text"></i>
      </span>

    </el-input>
    <el-dialog class="avue-dialog"
               :title="placeholder"
               append-to-body
               :visible.sync="box"
               width="80%">
      <el-scrollbar style="height:400px;overflow-x:hidden">
        <avue-tabs :option="option"
                   @change="handleTabs"></avue-tabs>
        <div :class="b('list')">
          <div :class="b('item',{'active':text===item})"
               v-for="(item,index) in list"
               :key="index">
            <i :class="[b('icon'),item.value]"
               @click="handleSubmit(item.value)"></i>
            <p v-if="item.label">{{item.label}}</p>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-icon",
  mixins: [props(), event()],
  props: {
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      box: false,
      tabs: {}
    };
  },
  computed: {
    list () {
      let list = (this.tabs.list || []).map(ele => {
        if (!ele.value) {
          return {
            value: ele
          }
        }
        return ele
      });
      return list
    },
    option () {
      return {
        column: this.iconList
      };
    }
  },
  created () {
    this.tabs = this.iconList[0] || {};
  },
  methods: {
    handleTabs (tabs) {
      this.tabs = tabs;
    },
    handleSubmit (item) {
      this.box = false;
      this.text = item;
      this.handleChange(item);
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.box = true;
    }
  }
});
</script>


