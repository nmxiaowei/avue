<template>
  <div :class="b()">
    <div :class="b('header')">
      <div :class="b('title')"
           v-if="title"
           v-text="title"></div>
      <small :class="b('meta')"
             v-if="meta"
             v-text="meta"></small>
    </div>
    <div :class="b('lead')"
         v-text="lead"
         v-if="lead"></div>
    <div :class="b('body')"
         v-if="body"
         v-html="body"></div>
  </div>

</template>

<script>
import create from "core/create";
const propsDefault = {
  title: "title",
  meta: "meta",
  lead: "lead",
  body: "body"
};
export default create({
  name: "article",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    props: {
      type: Object,
      default: () => {
        return propsDefault;
      }
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    titleKey() {
      return this.props.title || propsDefault.title;
    },
    metaKey() {
      return this.props.meta || propsDefault.meta;
    },
    leadKey() {
      return this.props.lead || propsDefault.lead;
    },
    bodyKey() {
      return this.props.body || propsDefault.body;
    },
    title() {
      return this.data[this.titleKey];
    },
    meta() {
      return this.data[this.metaKey];
    },
    lead() {
      return this.data[this.leadKey];
    },
    body() {
      return this.data[this.bodyKey];
    }
  },
  mounted() {}
});
</script>
