<template>
  <div :class="[b({'card':card,'header':!isHeader,'arrow':!arrow})]"
       v-if="display">
    <slot name="tabs"></slot>
    <component :is="collapseName"
               :value="text"
               v-model="activeName">
      <component :is="collapseItemName"
                 :name="1"
                 :disabled="!arrow">
        <div :class="[b('header'),b({'none':$isVan})]"
             slot="title"
             v-if="$slots.header&&header">
          <slot name="header"></slot>
        </div>
        <div :class="[b('header'),b({'none':$isVan})]"
             slot="title"
             v-else-if="(label || icon)&&header">
          <i :class="[$isVan?'van-icon':'',icon,b('icon')]"
             v-if="icon"></i>
          <h1 :class="b('title')"
              v-if="label">{{label}}</h1>
        </div>
        <slot></slot>
      </component>
    </component>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "group",
  data () {
    return {
      activeName: '',
    }
  },
  props: {
    arrow: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  watch: {
    text (val) {
      this.activeName = [val]
    },
  },
  computed: {
    collapseName () {
      return `${this.$AVUE.ui.type}Collapse`
    },
    collapseItemName () {
      return `${this.$AVUE.ui.type}CollapseItem`
    },
    text () {
      return this.collapse ? 1 : 0
    },
    isHeader () {
      return this.$slots.header && this.header || ((this.label || this.icon) && this.header)
    }
  },
  created () {
    this.activeName = [this.text]
  }
});
</script>

