<template>
  <div style="background-color: #f7f8fa;"
       :class="b('mobile')">
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
                  :is-link="vaildData(citem.isLink,isLink)"
                  :center="vaildData(citem.center, center)"
                  :arrow-direction="citem.arrowDirection || arrowDirection"
                  :title="citem.title"
                  :label="citem.label"
                  :value="citem.value"
                  @click="handleClick(citem)">
          <template slot-scope="{}">
            <slot :name="citem.prop+'Value'"
                  :item="citem"
                  v-if="$scopedSlots[citem.prop+'Value']"></slot>
            <span v-else-if="citem.value"> {{citem.value}}</span>
          </template>
          <template slot="title"
                    slot-scope="{}">
            <slot :name="citem.prop+'Title'"
                  :item="citem"
                  v-if="$scopedSlots[citem.prop+'Title']"></slot>
            <span v-else-if="citem.title"> {{citem.title}}</span>
          </template>
          <template slot="label"
                    slot-scope="{}">
            <slot :name="citem.prop+'Label'"
                  :item="citem"
                  v-if="$scopedSlots[citem.prop+'Label']"></slot>
            <span v-else-if="citem.label"> {{citem.label}}</span>
          </template>
          <template slot="icon"
                    slot-scope="{}">
            <slot :name="citem.prop+'Icon'"
                  :item="citem"
                  v-if="$scopedSlots[citem.prop+'Icon']"></slot>
            <van-icon :name="citem.icon"
                      :class="b('icon',{'color':citem.color})"
                      :style="{background:citem.color,color:color}"
                      v-else></van-icon>
          </template>
        </van-cell>
        <slot :name="citem.prop"
              :item="citem"
              v-if="$scopedSlots[citem.prop]"></slot>
        <van-row v-else-if="!validatenull((citem.children || {}).column)"
                 style="padding:0 5px;">
          <van-col :span="column.span || (citem.children || {}).span || 12"
                   v-for="(column,nindex) in (citem.children || {}).column"
                   :key="nindex">
            <div class="van-cell"
                 v-if="column.slot">
              <slot :name="column.prop"
                    :index="index"
                    :item="column"></slot>
            </div>
            <van-cell v-else
                      :title="column.title"
                      :label="column.labelDisplay?'':column.label"
                      :value="column.value">
            </van-cell>
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
    color () {
      return this.option.color
    },
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
      let list = this.option.data
      return list
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('click', item)
    }
  }
});
</script>

