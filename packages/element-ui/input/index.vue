<template>
  <el-input :class="b()"
            :size="size"
            :clearable="clearableVal"
            v-model="text"
            @keyup.enter="isSearch?appendClick():''"
            @click.native="handleClick"
            :type="typeParam"
            :maxlength="maxlength"
            :minlength="minlength"
            :show-password="typeParam=='password'?showPassword:false"
            :autosize="{ minRows: minRows, maxRows: maxRows}"
            :prefix-icon="prefixIcon"
            :suffix-icon="suffixIcon"
            :readonly="readonly"
            :placeholder="placeholder"
            :show-word-limit="showWordLimit"
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
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { validatenull } from "utils/validate";
export default create({
  name: "input",
  mixins: [props(), event()],
  props: {
    maxlength: "",
    minlength: "",
    showPassword: {
      type: Boolean,
      default: true
    },
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
  computed: {
    isSearch () {
      return this.type == 'search'
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
  }
});
</script>
