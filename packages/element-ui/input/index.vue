<template>
  <el-tooltip placement="bottom"
              :disabled="tipStatus">
    <div slot="content">
      <el-link type="primary"
               :href="text"
               :target="target">{{text}}</el-link>
    </div>
    <el-input :class="b()"
              :size="size"
              :clearable="disabled?false:clearable"
              v-model="text"
              @keyup.enter="isSearch?appendClick():''"
              @click.native="handleClick"
              :type="typeParam"
              :maxlength="maxlength"
              :minlength="minlength"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :readonly="readonly"
              :placeholder="placeholder"
              :show-word-limit="showWordLimit"
              @change="handleChange"
              @focus="handleFocus"
              @blur="handleBlur"
              :disabled="disabled"
              :autocomplete="autocomplete">
      <template slot="prepend"
                v-if="prepend"><span @click="prependClick()">{{prepend}}</span>
      </template>
      <template slot="append"
                v-if="append"><span @click="appendClick()">{{append}}</span></template>
      <el-button slot="append"
                 v-else-if="isSearch"
                 icon="el-icon-search"
                 @click="appendClick()"></el-button>
    </el-input>
  </el-tooltip>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { validatenull } from "utils/validate";
export default create({
  name: "input",
  mixins: [props(), event()],
  data () {
    return {

    };
  },
  props: {
    value: {},
    maxlength: "",
    minlength: "",
    showWordLimit: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: ' _blank'
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    prependClick: {
      type: Function,
      default: () => { }
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function,
      default: () => { }
    },
    append: {
      type: String
    },
    minlength: {
      type: Number
    },
    maxlength: {
      type: Number
    },
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    },
    autocomplete: {
      type: String
    }
  },
  watch: {
    text: {
      handler (value) {
        this.handleChange(value);
      },
      immediate: true
    }
  },
  computed: {
    tipStatus () {
      if (this.isUrl) {
        return this.validatenull(this.text)
      }
      return true;
    },
    isSearch () {
      return this.type == 'search'
    },
    isUrl () {
      return this.type == 'url'
    },
    typeParam: function () {
      if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    }
  },
  methods: {
    handleClick () {
      const result = this.text;
      if (typeof this.click === "function") {
        this.click({ value: result, column: this.column });
      }
    },
    handleChange (value) {
      let text = this.text;
      const result = value;
      if (typeof this.change === "function") {
        this.change({ value: result, column: this.column });
      }
      this.$emit("input", result);
      this.$emit("change", result);
    }
  }
});
</script>
