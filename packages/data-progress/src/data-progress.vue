<template>
  <div class="data-progress">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href?item.href:'javascript:void(0);'"
             :target="item.target">
            <div class="item-header">
              <div class="item-count"
                   v-text="item.count+'%'"></div>
              <div class="item-title"
                   v-text="item.title"></div>
            </div>
            <el-progress :stroke-width="15"
                         :percentage="item.count"
                         :color="item.color"
                         :show-text="false"></el-progress>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from '../../utils/create';
export default create({
  name: 'data-progress',
  data () {
    return {

    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    span () { return this.option.span || 8; },
    data () { return this.option.data || []; }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});
</script>