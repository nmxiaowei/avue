<template>
  <div class="data-tabs">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item"
             :style="{background:item.color}">
          <a :href="item.href?item.href:'javascript:void(0);'"
             :target="item.target">
            <div class="item-header">
              <p>{{item.title}}</p>
              <span>{{item.subtitle}}</span>
            </div>
            <div class="item-body">
              <h2>{{item.count}}</h2>
            </div>
            <div class="item-footer">
              <span>{{item.allcount}}</span>
              <p>{{item.text}}</p>
            </div>
            <p class="item-tip">{{item.key}}</p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from '../../utils/create';
export default create({
  name: 'data-tabs',
  data () {
    return {

    };
  },
  computed: {
    span () {
      return this.option.span || 8;
    },
    data () {
      return this.option.data || [];
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
