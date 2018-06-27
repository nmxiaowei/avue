<template>
  <li class="avue-select-menu__item"
      @mouseenter="hoverItem"
      @click.stop="selectOptionClick"
      :class="{
      'selected': itemSelected,
      'hover': hover
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script>
import Emitter from "element-ui/src/mixins/emitter";
export default {
  mixins: [Emitter],
  name: "AvueOption",
  componentName: "AvueOption",
  inject: ["select"],
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentLabel() {
      return this.label;
    },
    itemSelected() {
      return this.select.value.indexOf(this.value) > -1;
    }
  },
  data() {
    return {
      hover: false
    };
  },
  created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
  },
  methods: {
    hoverItem() {
      if (!this.disabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick() {
      if (this.disabled !== true) {
        this.dispatch("AvueSelect", "handleOptionClick", [this, true]);
      }
    }
  }
};
</script>

<style>
.avue-select-menu__item {
  height: 40px;
  line-height: 40px;
}
.avue-select-menu__item.selected {
  color: #409eff;
}
.avue-select-menu__item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.avue-select-menu__item.hover,
.el-select-dropdown__item:hover {
  background-color: #f5f7fa;
}
</style>
