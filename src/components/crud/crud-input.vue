<template>
  <el-input v-model="text" :placeholder="'请输入'+placeholder" @change="handleChange"></el-input>
</template>

<script>
export default {
  name: "crud-input",
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
    placeholder: {
      type: String,
      default: ""
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
