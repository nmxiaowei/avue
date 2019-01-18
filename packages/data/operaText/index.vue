<template>
  <div class="avue-data-operatext">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="24"
              :sm="12">
        <div class="item">
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''">
            <div class="item-header"
                 :style="{backgroundColor:item.color,backgroundImage:`url(${item.colorImg})`}">
              <span class="item-title">{{item.title}}</span>
              <span class="item-subtitle">{{item.subtitle}}</span>
            </div>
            <div class="item-content">
              <div class="item-img">
                <img :src="item.img"
                     alt="">
              </div>
              <div class="item-list">
                <div class="item-row"
                     v-for="(citem,cindex) in item.list"
                     :key="cindex">
                  <span class="item-label">{{citem.label}}</span>
                  <span class="item-value">{{citem.value}}</span>
                </div>
              </div>
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
  name: "data-operatext",
  data() {
    return {};
  },
  computed: {
    span() {
      return this.option.span || 6;
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
  },
  created() {},
  methods: {}
});
</script>