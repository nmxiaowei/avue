<template>
  <div>
    <el-dialog title="选择"
               :visible.sync="box"
               width="50%">
      <el-radio-group v-model="text">
        <el-radio v-for="(item,index) in list"
                  :key="index"
                  :label="item.value">{{item.name}}</el-radio>
      </el-radio-group>
    </el-dialog>
    <span>
      <i class="el-icon-menu"
         @click="open"></i>
    </span>
  </div>
</template>

<script>
import { setTheme } from '@/util/util'
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      box: false,
      text: '',
      list: [
        {
          name: '默认主题',
          value: '',
        }, {
          name: '炫彩主题',
          value: 'theme-star'
        }
      ]
    }
  },
  watch: {
    text: function (val) {
      this.$store.commit('SET_THEME_NAME', val);
      setTheme(val);
    }
  },
  computed: {
    ...mapGetters(["themeName"])
  },
  mounted () {
    this.text = this.themeName;
    if (!this.text) {
      this.text = '';
    }
  },
  methods: {
    open () {
      this.box = true;
    }
  }
}
</script>

<style>
</style>
