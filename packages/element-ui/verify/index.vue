<template>
  <div :class="b()">
    <span :class="b('item')"
          :style="styleName"
          v-for="(item,index) in list"
          :key="index">
      {{item}}
    </span>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: 'verify',
  props: {
    size: {
      type: [Number, String],
      default: 50,
    },
    value: [Number, String],
    len: {
      type: [Number, String],
      default: 6,
    }
  },
  computed: {
    data: {
      get () {
        return this.value || ''
      },
      set (val) {
        let value = val + ''
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
    styleName () {
      return {
        padding: `${this.setPx(this.size / 7)} ${this.setPx(this.size / 4)}`,
        fontSize: this.setPx(this.size)
      }
    },
    list () {
      return this.data.split('');
    }
  },
  created () {
    this.randomn();
  },
  methods: {
    randomn () {
      var n = this.len;
      if (n > 21) return null
      var re = new RegExp("(\\d{" + n + "})(\\.|$)")
      var num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(re)[1]
      this.data = num;
    }
  }
})
</script>

