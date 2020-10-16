<template>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(item,index) in list"
                     :key="index"
                     @click="handleClick"
                     :dot="item.dot"
                     :url="item.url"
                     :icon="item.icon"
                     :badge="item.badge">
      {{item.title}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import create from "core/create";
export default create({
  name: "tabbar",
  data () {
    return {
      active: 0
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    round () {
      return this.option.round || 100
    },
    size () {
      return this.option.size
    },
    span () {
      return this.option.span || 6;
    },
    list () {
      return this.option.list || []
    },
  },
  methods: {
    handleClick (item) {
      this.$emit('click', item)
    }
  }
});
</script>

