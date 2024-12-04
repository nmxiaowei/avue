<template>
  <div :class="[b({'header':!isHeader,'arrow':!arrow})]"
       v-if="display">
    <slot name="tabs"></slot>
    <el-collapse @change="handleChange"
                 v-model="activeName">
      <el-collapse-item :name="1"
                        :disabled="!arrow">
        <template #title
                  v-if="$slots.header&&header">
          <div :class="b('header')">
            <slot name="header"></slot>
          </div>
        </template>
        <template #title
                  v-else-if="(label || icon)&&header">
          <div :class="b('header')">
            <i :class="[icon,b('icon')]"
               v-if="icon"></i>
            <h1 :class="b('title')"
                v-if="label">{{label}}</h1>
          </div>
        </template>
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "group",
  empit: ['change'],
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
    text () {
      return this.collapse ? 1 : 0
    },
    isHeader () {
      return this.$slots.header && this.header || ((this.label || this.icon) && this.header)
    }
  },
  created () {
    this.activeName = [this.text]
  },
  methods: {
    handleChange (activeNames) {
      this.$emit('change', activeNames)
    },
  }
});
</script>
