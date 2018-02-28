<template>
  <el-breadcrumb separator="/" class="tags-breadcrumb-list" >
        <el-breadcrumb-item  :to="{ path: tag.value }">{{tag.label}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["tag"])
  },
  methods: {}
};
</script>
<style lang="scss" scoped>

</style>


