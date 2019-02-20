<template>
  <div :class="b()">
    <div :class="b('item')"
         v-if="loading"
         v-for="(citem,cindex) in number"
         :key="cindex">
      <div :class="b('header')">
        <span :class="[b('avatar'),className]"
              v-if="avatar"></span>
      </div>
      <div :class="b('content')">
        <h3 :class="[b('title'),className]"></h3>
        <div :class="b('list')">
          <li :class="[b('li'),className]"
              :style="styleName"
              v-for="(item,index) in rows"
              :key="index"></li>
        </div>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import create from "core/create";
const prefixCls = "avue-skeleton";
export default create({
  name: "skeleton",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    avatar: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    block: Boolean,
    number: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  computed: {
    styleName() {
      if (this.block) {
        return {
          width: "100%"
        };
      }
      return {};
    },
    className() {
      let { active } = this;
      return { [`${prefixCls}__loading`]: active };
    }
  }
});
</script>