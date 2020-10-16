<template>
  <div>
    <van-cell-group v-for="(item,index) in list"
                    :key="index"
                    :title="item.label">
      <slot :name="prop"
            :item="item"></slot>
      <van-cell v-for="(citem,cindex) in item.column"
                :key="cindex"
                :icon="citem.icon"
                :url="citem.url"
                :is-link="citem.isLink || isLink"
                :center="citem.center || center"
                :arrow-direction="citem.arrowDirection || arrowDirection"
                :title="citem.title"
                :label="citem.label"
                :value="citem.value"
                @click="handelClick(citem)">
        <slot :name="citem.prop"
              :item="citem"></slot>
        <slot :name="citem.prop+'Title'"
              slot="title"
              :item="citem"></slot>
        <slot :name="citem.prop+'Label'"
              slot="label"
              :item="citem"></slot>
        <slot :name="citem.prop+'Icon'"
              slot="icon"
              :item="citem"></slot>
        <slot :name="citem.prop+'rightIcon'"
              slot="right-icon"
              :item="citem"></slot>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "cell",
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    arrowDirection () {
      return this.option.arrowDirection
    },
    isLink () {
      return this.option.isLink
    },
    center () {
      return this.option.center
    },
    list () {
      let list = this.option.list || [];
      if (!list[0].label) {
        return [{
          column: list
        }]
      }
      return list
    }
  },
  methods: {
    handelClick (item = {}) {
      if (item.click) {
        item.click(item)
      }
    }
  }
});
</script>

