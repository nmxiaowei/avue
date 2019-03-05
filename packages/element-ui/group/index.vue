<template>
  <div :class="[b(),{'avue-group--card':card}]"
       v-if="display">
    <el-row span="24"
            :class="b('item')">
      <div :class="b('header')">
        <slot name="header"
              v-if="$slots.header"></slot>
        <template v-else>
          <i :class="[icon,b('icon')]"
             v-if="icon"></i>
          <h1 :class="b('title')"
              v-if="label">{{label}}</h1>
        </template>
      </div>

      <slot></slot>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "group",
  props: {
    icon: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  }
});
</script>

