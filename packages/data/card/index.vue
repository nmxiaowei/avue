<template>
  <div class="data-card">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''"
             :target="item.target">
            <img :src="item.src"
                 class="item-img" />
            <div class="item-text"
                 :style="{backgroundColor:bgText}">
              <h3 :style="{color:colorText}">{{item.name}}</h3>
              <p :style="{color:colorText}">{{item.text}}</p>
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
  name: "data-card",
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    span() {
      return this.option.span || 6;
    },
    data() {
      return this.option.data || [];
    },
    colorText() {
      return this.option.colorText || "#fff";
    },
    bgText() {
      return this.option.bgText || "#2e323f";
    },
    borderColor() {
      return this.option.borderColor || "#2e323f";
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
});
</script>