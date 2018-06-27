<template>
  <div class="avue-select"
       @click.stop="toggleMenu">
    <div class="avue-select__input">
      <input class="avue-input__inner"
             :class="{ 'is-focus': visible }"
             :placeholder="currentPlaceholder"
             :disabled="selectDisabled"
             :value="selectedLabel"
             :readonly="true"
             ref="input" />
    </div>
    <ul class="avue-select-menu"
        v-show="visible">
      <avue-option label="测试"
                   value="0"></avue-option>
      <avue-option label="测试1"
                   value="1"></avue-option>
    </ul>
  </div>
</template>

<script>
import AvueOption from "./option";
export default {
  name: "AvueSelect",
  componentName: "AvueSelect",
  components: {
    AvueOption
  },
  provide() {
    return {
      select: this
    };
  },
  props: {
    value: {
      required: true
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    selectDisabled() {
      return this.disabled;
    },
    currentPlaceholder() {
      return this.placeholder || "请选择";
    }
  },
  data() {
    return {
      options: [],
      hoverOption: -1,
      cachedOptions: [],
      visible: false,
      menuVisibleOnFocus: false,
      selectedLabel: "",
      hoverIndex: -1
    };
  },
  watch: {
    hoverIndex(val) {
      if (typeof val === "number" && val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach(option => {
        option.hover = this.hoverOption === option;
      });
    }
  },
  created() {
    this.$on("handleOptionClick", this.handleOptionSelect);
  },
  methods: {
    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          this.$refs.input.focus();
        }
      }
    },
    getOption(value) {
      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        if (cachedOption.value == value) {
          return cachedOption.label;
          break;
        }
      }
    },
    handleOptionSelect(option, byClick) {
      const value = option.value;
      this.selectedLabel = this.getOption(value);
      this.$emit("input", value);
      this.visible = false;
    }
  }
};
</script>

<style>
.avue-select__input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.avue-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.avue-select .avue-select__input {
  display: block;
}
.avue-input__inner.is-focus {
  border-color: #409eff;
}
.avue-select-menu {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
