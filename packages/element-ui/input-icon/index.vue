<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              v-model="text"
              :size="size"
              ref="main"
              :clearable="clearableVal"
              :disabled="disabled"
              @change="handleChange"
              @click.native="handleClick"
              @focus="handleShow">
      <span slot="append"
            @click="handleShow">
        <svg v-if="(text || '').indexOf('#')===0"
             class="avue-crud__icon--small"
             aria-hidden="true">
          <use :xlink:href="text"></use>
        </svg>
        <i v-else
           class="avue-crud__icon--small"
           :class="text"></i>
      </span>

    </el-input>
    <el-dialog class="avue-dialog"
               :title="placeholder"
               append-to-body
               :visible.sync="box"
               :width="dialogWidth">
      <avue-tabs :option="option"
                 @change="handleTabs"></avue-tabs>
      <div :class="b('list')">
        <div :class="b('item',{'active':text===item})"
             v-for="(item,index) in list"
             @click="handleSubmit(item.value)"
             :key="index">
          <svg v-if="item.value.indexOf('#')===0"
               :class="b('icon-symbol')"
               aria-hidden="true">
            <use :xlink:href="item.value"></use>
          </svg>
          <i v-else
             :class="[b('icon'),item.value]"></i>
          <p>{{item.label || item.value}}</p>
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
  name: "input-icon",
  mixins: [props(), event()],
  props: {
    dialogWidth: {
      type: String,
      default: '80%'
    },
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
