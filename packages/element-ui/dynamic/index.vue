<template>
  <div :class="b()">
    <div v-for="(item,index) in text"
         :key="index"
         :class="b('item')">
      <avue-input :class="b('input')"
                  v-model="text[index]"
                  :disabled="disabled"
                  :size="size"></avue-input>
      <div :class="b('menu')">
        <el-button type="primary"
                   size="small"
                   :class="b('button')"
                   @click="addRow"
                   :disabled="disabled"
                   v-if="index===0"
                   icon="el-icon-plus"
                   circle></el-button>
        <el-button type="danger"
                   size="small"
                   v-if="index!==0"
                   :class="b('button')"
                   @click="delRow(index)"
                   :disabled="disabled"
                   icon="el-icon-minus"
                   circle></el-button>

      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "dynamic",
  mixins: [props(), event()],
  methods: {
    addRow() {
      this.text.push("");
    },
    delRow(index) {
      this.text.splice(index, 1);
    }
  }
});
</script>
