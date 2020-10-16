<template>
  <van-row :class="b('mobile')"
           :style="styleName">
    <van-swipe :autoplay="autoplay"
               :vertical="vertical"
               :loop="loop">
      <van-swipe-item @click="handleClick(item)"
                      :class="b('item')"
                      v-for="(item,index) in list"
                      :key="index">
        <img :src="item.value"
             :class="b('img')"
             :style="styleName" />
        <span :class="b('title')">{{item.title}}</span>
      </van-swipe-item>
    </van-swipe>
  </van-row>
</template>

<script>
import create from "core/create";
export default create({
  name: "swipe",
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    styleName () {
      return {
        width: '100%',
        height: this.setPx(this.height)
      }
    },
    height () {
      return this.option.height || 200
    },
    list () {
      return this.option.list || []
    },
    autoplay () {
      return this.option.autoplay || 5000
    },
    loop () {
      return this.vaildData(this.option.loop, true)
    },
    vertical () {
      return this.option.vertical
    }
  },
  methods: {
    handleClick (item) {
      if (item.url) {
        window.location.href = item.url
      } else {
        this.$emit('click', item)
      }
    }
  }
});
</script>

