<template>
  <div :class="[b(),className]">
    <div id="keyboard"></div>
  </div>
</template>

<script>
import Keyboard from 'plugin/keyboard/index'
import NumberKeyboard from 'plugin/keyboard/number'
import MobileKeyboard from 'plugin/keyboard/mobile'
import create from "core/create";
export default create({
  name: 'keyboard',
  props: {
    ele: {
      type: String,
      required: true
    },
    keys: Array,
    theme: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'dark', 'green', 'classic'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'number', 'mobile'].includes(value)
      }
    },
    fixedBottomCenter: {
      type: Boolean,
      default: false
    },
    rebind: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    ele () {
      this.init()
    }
  },
  data () {
    return {
      customClick: {}
    }
  },
  computed: {
    className () {
      return `avue-keyboard--${this.theme}`
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      if (!this.ele) return
      let keyboard
      const config = {
        el: '#keyboard',
        style: {},
        keys: this.keys,
        fixedBottomCenter: this.fixedBottomCenter
      }
      if (this.type == 'default') keyboard = new Keyboard(config)
      else if (this.type == 'number') keyboard = new NumberKeyboard(config)
      else if (this.type == 'mobile') keyboard = new MobileKeyBoard(config)

      const ele = this.ele.indexOf("#") == 0 ? this.ele.substring(1) : this.ele
      keyboard.inputOn(`#${ele}`, 'value', (e, val) => {
        this.$emit('click', e, val)
      }, this.rebind ? this.customClick : null)

      this.keyboard = keyboard
    },
    bindClick (btn, fn) {
      this.keyboard.onclick(btn, fn)
      this.customClick[btn] = fn
    }
  }
})
</script>
