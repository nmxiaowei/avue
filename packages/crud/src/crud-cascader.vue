<template>
  <el-cascader :options="dic" v-model="text" :placeholder="'请选择'+placeholder" :disabled="disabled" @change="handleChange">
  </el-cascader>
</template>

<script>
export default {
  name: "AvueCrudCascader",
  data() {
    return {
      text: []
    };
  },
  props: {
    value: {
      default: () => {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dic: {
      default: () => {
        return [];
      }
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
