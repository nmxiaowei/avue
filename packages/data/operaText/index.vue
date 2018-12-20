<template>
  <div class="avue-data-operatext">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="24"
              :sm="12">
          <div class="item"
              :style="{color:color}">
            <!-- <a :href="item.href?item.href:'javascript:void(0);'"
              :target="item.target"> -->
              <div class="item-header">
                <div>
                  <div class="img">
                    <img :src="item.imgsrc" alt="">
                  </div>
                  <div class="content">
                    <h4>{{item.title}}</h4>
                    <p>{{item.content}}</p>
                  </div>
                </div>
              </div>
              <div class="item-content">
              </div>
              <div class="item-footer">
                <span>
                  <a :href="item.href1?item.href1:'javascript:void(0);'"
              :target="item.target">
                    连接1
                  </a>
                </span>
                <span>
                  <a :href="item.href2?item.href2:'javascript:void(0);'"
              :target="item.target">
                    连接2
                  </a>
                </span>
              </div>
            <!-- </a> -->
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: 'data-operatext',
  data () {
    return {

    };
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    },
    color () {
      return this.option.color || 'rgb(63, 161, 255)';
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  created () { },
  methods: {}
});
</script>