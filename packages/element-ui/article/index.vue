<template>
  <div :class="b()">
    <div :class="b('header')">
      <p :class="b('title')"
         v-if="title"
         v-text="title"></p>
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
      return this.option[this.titleKey];
    },
    meta() {
      return this.option[this.metaKey];
    },
    lead() {
      return this.option[this.leadKey];
    },
    body() {
      return this.option[this.bodyKey];
    }
  },
  mounted() {}
});
</script>
