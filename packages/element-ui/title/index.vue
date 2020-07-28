<template>
  <div :class="b()">
    <p :style="styles">{{text}}</p>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: 'title',
  mixins: [props(), event()],
  props: {
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {

  },
  methods: {

  }
})
</script>

