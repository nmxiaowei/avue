<template>
  <van-row :class="b('mobile')">
    <van-col :span="span"
             @click="handleClick(item)"
             v-for="(item,index) in list"
             :key="index">
      <div :class="b('item')">
        <div v-if="item.icon"
             :style="{background:item.color,borderRadius:round+'%'}"
             :class="b('icon')">
          <van-icon :name="item.icon"
                    :badge="item.badge"
                    :dot="item.dot"></van-icon>
        </div>
        <span :class="b('title')">{{item.title}}</span>
      </div>
    </van-col>
  </van-row>
</template>

<script>
import create from "core/create";
export default create({
  name: "grid",
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
      if (item.click) {
        item.click(item)
      } else {
        window.location.href = item.url
      }
    }
  }
});
</script>

