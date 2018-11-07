<template>
  <div class="carousel">
    <el-carousel :type="option.type"
                 :height="option.height+'px'"
                 :autoplay="option.autoplay"
                 :interval="option.interval"
                 indicator-position="outside">
      <el-carousel-item v-for="(item,index) in data"
                        :key="index">
        <div class="item">
          <a :href="item.href?item.href:''"
             target="_blank">
            <div class="item-img"
                 :style="{backgroundImage:'url('+item.src+')'}"></div>
            <p class="item-title"
               v-if="item.title">{{ item.title }}</p>
          </a>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import create from '../../utils/create';
export default create({
  name: 'carousel',
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
    data () {
      return this.option.data || [];
    },
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});
</script>