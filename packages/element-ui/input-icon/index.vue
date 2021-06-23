<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              :model-value="text"
              :size="size"
              ref="main"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @change="handleChange"
              @click="handleClick"
              @focus="handleShow">
      <template #append>
        <span @click="handleShow">
          <svg v-if="isSvg(text)"
               class="avue-crud__icon--small"
               aria-hidden="true">
            <use :xlink:href="text"></use>
          </svg>
          <i v-else
             class="avue-crud__icon--small"
             :class="text"></i>
        </span>
      </template>

    </el-input>
    <el-dialog custom-class="avue-dialog"
               :title="placeholder"
               append-to-body
               v-model="box"
               :width="dialogWidth">
      <avue-tabs :option="option"
                 @change="handleTabs"></avue-tabs>
      <div :class="b('list')">
        <div :class="b('item',{'active':text===item})"
             v-for="(item,index) in list"
             @click="handleSubmit(item.value)"
             :key="index">
          <svg v-if="isSvg(item.value)"
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
    isSvg (text = '') {
      return text.includes('#')
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


