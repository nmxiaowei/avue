<template>
  <div class="avue-cell">
    <van-cell :title="label"
              :class="{'van-cell--required':required}">
      <van-switch v-model="textLabel"
                  size="20px"
                  :disabled="disabled"
                  @change="handleSwitchChange" />
    </van-cell>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {},
  data() {
    return {
      textLabel: false,
      textIndex: 0
    };
  },
  watch: {
    dic() {
      this.init();
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.validatenull(this.text)) {
        this.textIndex = this.dic.findIndex(ele => ele.text === this.textLabel);
        this.textLabel = this.textIndex === 0 ? false : true;
      }
    },
    handleSwitchChange(value) {
      this.textIndex = this.textLabel ? 1 : 0;
      this.text = this.dic[this.textIndex][this.valueKey];
      this.handleChange(this.text);
    }
  }
});
</script>


