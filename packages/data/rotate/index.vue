<template>
  <div class="avue-data-rotate">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="re-item">
            <div class="re-item-back">
                <div><img :src="item.backsrc" :alt="item.backalt"></div>
                <div class="re-item-backdes">
                    <h4>{{item.backname}}</h4>
                    <p>{{item.backtitle}}</p>
                </div>
            </div>
            <div class="re-item-front">
                <img :src="item.frontsrc" :alt="item.frontalt" />
                <div class="re-item-frontdes">
                    <h4>{{item.frontname}}</h4>
                    <p>{{item.fronttitle}}</p>
                </div>
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import create from "core/create";
export default create({
  name: 'data-rotate',
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