<template>
  <div>
    <avue-crud
      ref="crud"
      :option="option"
      v-model="model"
      :data="data"
      @row-save="rowSave"
    ></avue-crud>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      model: {},
      data: [],
      option: {
        column: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "年龄",
            prop: "sex",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    rowSave(row, done, loading) {
      done();
    },
  },
};
</script>

<style lang="less" scoped></style>
