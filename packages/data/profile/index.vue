<template>
  <div class="data-profile">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-profile__item"
             :style="getItemStyle(item)"
             @click="item.click && item.click(item)">
          <div class="data-profile__cover" v-if="item.cover" :style="{backgroundImage: 'url(' + item.cover + ')'}"></div>
          <div class="data-profile__avatar">
            <img :src="item.avatar" :alt="item.name" v-if="item.avatar" />
            <span v-else class="data-profile__avatar-text">{{ getAvatarText(item.name) }}</span>
          </div>
          <div class="data-profile__name">{{ item.name }}</div>
          <div class="data-profile__title" v-if="item.title">{{ item.title }}</div>
          <div class="data-profile__desc" v-if="item.desc">{{ item.desc }}</div>
          <div class="data-profile__tags" v-if="item.tags && item.tags.length">
            <el-tag v-for="(tag, idx) in item.tags" :key="idx" size="small" :type="tag.type || ''">
              {{ tag.text || tag }}
            </el-tag>
          </div>
          <div class="data-profile__contact" v-if="item.phone || item.email">
            <div class="data-profile__contact-item" v-if="item.phone">
              <span class="data-profile__contact-icon">📱</span>
              <span>{{ item.phone }}</span>
            </div>
            <div class="data-profile__contact-item" v-if="item.email">
              <span class="data-profile__contact-icon">📧</span>
              <span>{{ item.email }}</span>
            </div>
          </div>
          <div class="data-profile__stats" v-if="item.stats && item.stats.length">
            <div class="data-profile__stat" v-for="(stat, idx) in item.stats" :key="idx">
              <div class="data-profile__stat-value">{{ stat.value }}</div>
              <div class="data-profile__stat-label">{{ stat.label }}</div>
            </div>
          </div>
          <div class="data-profile__actions" v-if="item.actions && item.actions.length">
            <el-button v-for="(action, idx) in item.actions"
                       :key="idx"
                       :type="action.type || 'primary'"
                       size="small"
                       @click.stop="action.click && action.click(item)">
              {{ action.text }}
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-profile",
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
    span() {
      return this.option.span || 6;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff'
      };
    },
    getAvatarText(name) {
      return name ? name.charAt(0).toUpperCase() : '?';
    }
  }
});
</script>
