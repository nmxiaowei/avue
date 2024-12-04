<template>
  <el-mention v-model="text"
              :class="b()"
              @click="handleClick"
              @focus="handleFocus"
              @blur="handleBlur"
              :placeholder="placeholder"
              :size="size"
              :prefix="prefix"
              :options="netDic"
              :loading="loading"
              :whole="whole"
              :check-is-whole="checkIsWhole"
              @search="remote?handleRemoteMethod:undefined"
              :clearable="clearableVal"
              :readonly="readonly"
              :disabled="disabled">
    <template #prepend
              v-if="prepend"><span @click="prependClick(text)">{{prepend}}</span>
    </template>
    <template #append
              v-if="append">
      <span @click="appendClick(text)">{{append}}</span>
    </template>
    <template #label="{ item }">
      <slot :item="item"
            v-if="$slots.default">
      </slot>
      <span v-else>{{ item.value }}</span>
    </template>
  </el-mention>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "mention",
  mixins: [props(), event()],
  data () {
    return {
      created: false,
      loading: false,
      netDic: [],
    };
  },
  props: {
    remote: Boolean,
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
    prefix: String,
    whole: Boolean,
    checkIsWhole: Function
  },
  created () { },
  mounted () { },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    }
  },
  methods: {
    handleModelValue (val) {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true
          this.handleRemoteMethod(this.text)
        }
      }
    },
    handleRemoteMethod (query) {
      this.loading = true
      sendDic({
        column: this.column,
        value: query,
      }, this).then(res => {
        this.loading = false;
        this.netDic = res;
      });
    }
  }
});
</script>