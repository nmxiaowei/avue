<template>
  <div :class="b('mobile')">
    <van-card v-for="(item,index) in data"
              :key="index"
              :num="item.num"
              :price="item.price"
              @click="handleClick(item)"
              @click-thumb="handleClickThumb(item)"
              :desc="item.desc"
              :title="item.title"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
      <template slot="tags">
        <slot name="tags"
              :row="item"></slot>
      </template>
      <template slot="footer">
        <slot name="footer"
              :row="item"></slot>
      </template>
    </van-card>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "card",
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

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
    handleClickThumb (item) {
      this.$emit('clickThumb', item)
    },
    handleClick (item) {
      this.$emit('click', item)
    }
  }
});
</script>

