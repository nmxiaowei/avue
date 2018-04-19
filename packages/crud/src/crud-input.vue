<template>
  <el-input :size="size" :clearable="clearable" v-model="text" :type="type=='textarea'?'textarea':'text'" :autosize="{ minRows: minRows, maxRows: maxRows}" :placeholder="'请输入'+placeholder" @change="handleChange" :disabled="disabled"></el-input>
</template>

<script>
export default {
  name: "AvueCrudInput",
  data() {
    return {
      text: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    minRows: {
      type: String,
      default: "3"
    },
    maxRows: {
      type: String,
      default: "4"
    }
  },
  watch: {
    value: function(n, o) {
      this.text = this.value;
    }
  },
  created() {
    this.text = this.value;
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>

</style>
