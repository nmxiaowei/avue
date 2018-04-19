<template>
  <el-input-number v-model="text" @change="handleChange" :min="minRows" :max="maxRows" :label="'请输入'+placeholder" :disabled="disabled"></el-input-number>
</template>

<script>
export default {
  name: "AvueCrudInputNumber",
  data() {
    return {
      text: ""
    };
  },
  props: {
    value: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    minRows: {
      type: Number,
      default: -Infinity
    },
    maxRows: {
      type: Number,
      default: Infinity
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
