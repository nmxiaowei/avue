<template>
  <div :class="b()">
    <p :style="styles">{{text}}</p>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
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

