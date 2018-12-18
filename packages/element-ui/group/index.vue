<template>
  <div :class="[b(),{'avue-group--card':card}]">
    <el-row span="24"
            :class="b('item')">
      <div :class="b('header')"
           v-if="icon || title">
        <i :class="[icon,b('icon')]"
           v-if="icon"></i>
        <h1 :class="b('title')"
            v-if="label">{{label}}</h1>
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
    card: {
      type: false,
      default: true
    },
    label: {
      type: String
    }
  }
});
</script>

