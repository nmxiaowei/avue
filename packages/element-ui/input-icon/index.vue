<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              :model-value="text"
              :popper-class="popperClass"
              :size="size"
              ref="main"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @change="handleChange"
              @click="handleClick"
              @focus="handleShow">
      <template #append>
        <el-icon @click="handleShow"
                 size="20">
          <component :is="text" />
        </el-icon>
      </template>
    </el-input>
    <el-dialog custom-class="avue-dialog avue-dialog--none"
               :title="placeholder"
               append-to-body
               v-model="box"
               :width="dialogWidth">
      <avue-tabs :option="option"
                 @change="handleTabs"></avue-tabs>
      <div :class="b('list')">
        <div :class="b('item')"
             v-for="(item,index) in list"
             @click="handleSubmit(item.value)"
             :key="index">
          <el-icon :size="getActive(item,'size')"
                   :color="getActive(item,'color')">
            <component :is="item.value" />
          </el-icon>
          <p>{{item.label || item.value}}</p>
        </div>　
      </div>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
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
    getActive (item, type) {
      let flag = item.value == this.text;
      if (type == 'size') {
        return flag ? 32 : 26
      } else if (type == 'color') {
        return flag ? '#409EFF' : '#333'
      }
    },
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


