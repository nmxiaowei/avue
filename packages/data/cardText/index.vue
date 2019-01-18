<template>
  <div class="avue-data-cardText">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href || 'javascript:void(0);'"
             @click="item.click?item.click(item):''"
             :target="item.target">
            <div class="item-header">
              <i :class="item.icon || 'el-icon-bell'"
                 :style="{color:item.color || 'red'}"></i>
              <a class="">{{item.title}}</a>
            </div>
            <div class="item-content">{{item.content}}</div>
            <div class="item-footer">
              <span>{{item.name}}</span>
              <span>{{item.date}}</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-cardtext",
  data() {
    return {};
  },
  computed: {
    icon() {
      return this.option.icon;
    },
    color() {
      return this.option.color || "#333";
    },
    span() {
      return this.option.span || 8;
    },
    data() {
      return this.option.data || [];
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  }
});
</script>