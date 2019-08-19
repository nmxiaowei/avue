<template>
  <div :class="b()">
    <a-tree-select v-if="type==='tree'"
                   :treeData="dic"
                   v-model="text"
                   @click.native="handleClick"
                   @change="handleChange"
                   :readonly="readonly"
                   :disabled="disabled"
                   :treeCheckable="multiple"
                   :showCheckedStrategy="SHOW_PARENT"
                   :searchPlaceholder='placeholder'>
    </a-tree-select>
    <a-input v-else
             :placeholder="placeholder"
             :readonly="readonly"
             :disabled="disabled"
             @click.native="handleClick"
             @change="handleChange"
             v-model="text" />
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input",
  mixins: [props(), event()],

  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

