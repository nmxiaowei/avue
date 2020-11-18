<template>
  <van-pull-refresh v-model="isLoading"
                    :success-text="successText"
                    @refresh="onRefresh">
    <van-list v-model="loading"
              :finished="isFinished"
              :finished-text="finishedText"
              @load="onLoad">
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import create from "core/create";
export default create({
  name: "refresh",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    successText: String,
    finishedText: String,
  },
  data () {
    return {
      loading: false,
      isFinished: false,
      count: 0,
      isLoading: false
    };
  },
  watch: {

  },
  computed: {

  },
  created () { },
  mounted () {

  },
  methods: {
    onLoad () {
      const loading = () => {
        this.loading = false;
        this.isLoading = false;
        this.setPage(this.page + 1);
      }
      const done = () => {
        this.isFinished = true;
      }
      this.$emit('on-load', loading, done)
    },
    setPage (page) {
      this.$emit('update:page', page)
    },
    onRefresh () {
      this.setPage(1);
      this.isFinished = false;
      this.onLoad()
    }
  }
});
</script>

