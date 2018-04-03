<template>
  <el-radio-group v-model="text" @change="handleChange">
    <el-radio v-for="(item,index) in dic" :label="item.value" :key="index">{{item.label}}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "crud-radio",
  data() {
    return {
      text: ""
    };
  },
  props: {
    value: {
      default: ""
    },
    dic: {
      type: Array,
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
