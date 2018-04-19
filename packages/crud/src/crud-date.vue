<template>
  <el-date-picker v-model="text" type="date" :placeholder="'请输入'+placeholder" @change="handleChange" :disabled="disabled"> </el-date-picker>
</template>

<script>
export default {
  name: "AvueCrudDate",
  data() {
    return {
      text: ""
    };
  },
  props: {
    value: {
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
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
