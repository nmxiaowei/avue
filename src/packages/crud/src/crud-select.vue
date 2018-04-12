<template>
  <el-select v-model="text" :placeholder="'请选择'+placeholder" @change="handleChange" :disabled="disabled">
    <el-option v-for="(item,index) in dic" :key="index" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "AvueCrudSelect",
  data() {
    return {
      text: ""
    };
  },
  props: {
    value: {
      default: ""
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
