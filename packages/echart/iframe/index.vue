<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <iframe :src="dataChart"
            draggable="false"></iframe>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "iframe",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


