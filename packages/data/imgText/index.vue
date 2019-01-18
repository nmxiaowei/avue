<template>
  <div class="avue-data-imgtext">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="24"
              :sm="12">
        <div class="item"
             :style="{color:color}">
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''"
             :target="item.target">
            <div class="item-header">
              <img :src="item.imgsrc"
                   alt="">
            </div>
            <div class="item-content">
              <span>{{item.title}}</span>
              <p>{{item.content}}</p>
            </div>
            <div class="item-footer">
              <div class="time"><span>{{item.time}}</span></div>
              <div class="imgs">
                <ul>
                  <li v-for="(imgs,index) in item.headimg"
                      :key="index">
                    <el-tooltip effect="dark"
                                :content="imgs.name"
                                placement="top-start">
                      <img :src='imgs.src'
                           alt="">
                    </el-tooltip>
                  </li>
                </ul>
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
  name: "data-imgtext",
  data() {
    return {};
  },
  computed: {
    span() {
      return this.option.span || 6;
    },
    data() {
      return this.option.data || [];
    },
    color() {
      return this.option.color || "rgb(63, 161, 255)";
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