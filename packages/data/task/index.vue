<template>
  <div class="data-task">
    <div class="data-task__header" v-if="title">
      <span class="data-task__title">{{ title }}</span>
      <span class="data-task__count">{{ completedCount }}/{{ data.length }}</span>
    </div>
    <div class="data-task__progress">
      <el-progress :percentage="progressPercent" :stroke-width="8" :show-text="false"></el-progress>
    </div>
    <div class="data-task__list">
      <div class="data-task__item"
           v-for="(item, index) in data"
           :key="index"
           :class="{'is-completed': item.completed}">
        <el-checkbox v-model="item.completed" @change="handleChange(item, index)"></el-checkbox>
        <div class="data-task__content">
          <div class="data-task__text">{{ item.title }}</div>
          <div class="data-task__meta" v-if="item.deadline || item.priority">
            <span class="data-task__deadline" v-if="item.deadline">{{ item.deadline }}</span>
            <el-tag v-if="item.priority" size="small" :type="getPriorityType(item.priority)">
              {{ item.priority }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";

const PRIORITY_TYPES = {
  high: 'danger',
  medium: 'warning',
  low: 'info'
};

export default create({
  name: "data-task",
  mixins: [locale],
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
    },
    completedCount() {
      return this.data.filter(item => item.completed).length;
    },
    progressPercent() {
      if (this.data.length === 0) return 0;
      return Math.round((this.completedCount / this.data.length) * 100);
    }
  },
  methods: {
    handleChange(item, index) {
      this.$emit('change', { item, index, completed: item.completed });
    },
    getPriorityType(priority) {
      const normalized = String(priority || '').trim().toLowerCase();
      const aliases = this.t('task.priorityAliases') || {};
      const matchedKey = Object.keys(PRIORITY_TYPES).find((key) => {
        const values = Array.isArray(aliases[key]) ? aliases[key] : [];
        return values.some((value) => String(value).trim().toLowerCase() === normalized);
      });
      return PRIORITY_TYPES[matchedKey || normalized] || '';
    }
  }
});
</script>
