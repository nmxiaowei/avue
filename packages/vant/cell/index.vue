<template>
  <div style="background-color: #f7f8fa;">
    <van-empty v-if="validatenull(list)"
               style="padding:50px 0;"
               image="search"
               :description="emptyText" />
    <van-cell-group v-else
                    v-for="(item,index) in list"
                    :key="index"
                    :title="item.label">
      <slot :name="prop"
            :item="item"></slot>
      <div v-for="(citem,cindex) in item.column"
           :key="cindex">
        <van-cell :icon="citem.icon"
                  :url="citem.url"
                  :size="item.size || size"
                  :is-link="citem.isLink || isLink"
                  :center="citem.center || center"
                  :arrow-direction="citem.arrowDirection || arrowDirection"
                  :title="citem.title"
                  :label="citem.label"
                  :value="citem.value"
                  @click="handelClick(citem)">
          <slot :name="citem.prop+'Value'"
                :item="citem"
                v-if="$scopedSlots[citem.prop+'Value']">
          </slot>
          <slot :name="citem.prop+'Title'"
                slot="title"
                :item="citem"
                v-if="$scopedSlots[citem.prop+'Title']"></slot>
          <slot :name="citem.prop+'Label'"
                slot="label"
                :item="citem"
                v-if="$scopedSlots[citem.prop+'Label']"></slot>
          <slot :name="citem.prop+'Icon'"
                slot="icon"
                :item="citem"
                v-if="$scopedSlots[citem.prop+'Icon']"></slot>
          <slot :name="citem.prop+'rightIcon'"
                slot="right-icon"
                :item="citem"
                v-if="$scopedSlots[citem.prop+'rightIcon']"></slot>
        </van-cell>
        <slot :name="item.prop"
              v-if="$scopedSlots[citem.prop]"></slot>
        <van-row v-else-if="!validatenull((citem.children || {}).column)"
                 style="padding:0 5px;">
          <van-col :span="(citem.children || {}).span || 12"
                   v-for="(column,nindex) in (citem.children || {}).column"
                   :key="nindex">
            <van-cell :title="column.title"
                      :label="column.label"
                      :value="column.value"></van-cell>
          </van-col>
        </van-row>

      </div>

    </van-cell-group>

  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "cell",
  props: {
    emptyText: {
      type: String,
      default: '没有发现相关数据'
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    size () {
      return this.option.size
    },
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
      if (!(list[0] || {}).label) {
        if (!this.validatenull(list)) {
          return [{
            column: list
          }]
        } else {
          return []
        }
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

