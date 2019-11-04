<template>
  <div :class="[b(),className]">
    <input type="text"
           hidden
           id="text">
    <div id="main"></div>
  </div>
</template>

<script>
import Keyboard from 'plugin/keyboard/index'
import numberKeyboard from 'plugin/keyboard/number'
import create from "core/create";
export default create({
  name: 'keyboard',
  props: {
    theme: {
      type: String,
      default: "default"
    },
    type: {
      type: String,
      default: 'default',
    }
  },
  watch: {

  },
  data () {
    return {

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
      let keyboard;
      const config = {
        el: '#main',
        style: {},
        fixedBottomCenter: true
      };
      if (this.type == 'default') {
        keyboard = new Keyboard(config)
      } else if (this.type == 'number') {
        keyboard = new numberKeyboard(config)
      }
      keyboard.inputOn('#text', 'value', (e) => {
        this.$emit('click', e)
      })
    }
  }
})
</script>
