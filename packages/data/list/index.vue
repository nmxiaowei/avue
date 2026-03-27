<template>
  <div class="data-list">
    <div class="data-list__header" v-if="title">
      <span class="data-list__title">{{ title }}</span>
      <span class="data-list__extra" v-if="$slots.extra"><slot name="extra"></slot></span>
    </div>
    <div class="data-list__content">
      <div class="data-list__item"
           v-for="(item, index) in data"
           :key="index"
           @click="handleClick(item)">
        <div class="data-list__avatar" v-if="item.avatar || item.icon">
          <img v-if="item.avatar" :src="item.avatar" :alt="item.title" />
          <i v-else-if="item.icon" :class="item.icon" :style="{color: item.iconColor}"></i>
        </div>
        <div class="data-list__body">
          <div class="data-list__title-row">
            <span class="data-list__name">{{ item.title }}</span>
            <el-tag v-if="item.tag" size="small" :type="item.tagType || ''">{{ item.tag }}</el-tag>
          </div>
          <div class="data-list__desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
        <div class="data-list__extra" v-if="item.extra">
          <span class="data-list__value" :style="{color: item.valueColor}">{{ item.extra }}</span>
          <span class="data-list__label" v-if="item.label">{{ item.label }}</span>
        </div>
        <div class="data-list__action" v-if="item.actions && item.actions.length">
          <el-button v-for="(action, idx) in item.actions"
                     :key="idx"
                     :type="action.type || 'text'"
                     size="small"
                     @click.stop="action.click && action.click(item)">
            {{ action.text }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-list",
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.option.title;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item);
      item.click && item.click(item);
    }
  }
});
</script>
