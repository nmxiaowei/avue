<template>
  <div class="data-price">
    <el-row :span="24">
      <template v-for="(item,index) in data">
        <el-col :xs="12"
                :sm="6"
                :md="span"
                :key="index">
          <div class="item item--active">
            <a :href="item.href?item.href:'javascript:void(0);'"
               @click="item.click?item.click(item):''"
               :target="item.target">
              <div class="title">
                {{item.title}}
              </div>
              <div class="body">
                <span class="price">{{item.price}}</span>
                <span class="append">{{item.append}}</span>
              </div>
              <div class="list">
                <p v-for="(citem,cindex) in item.list"
                   :key="cindex">
                  {{citem}}
                </p>
              </div>
            </a>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-price",
  data () {
    return {};
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data;
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  }
});
</script>