<template>
  <div :class="b({'reverse':reverse})">
    <img :src="avatar"
         alt=""
         :class="b('avatar')">
    <div :class="b('main')">
      <div :class="b('header')">
        <div :class="b('author')"
             v-if="author"
             v-text="author"></div>
        <slot></slot>
      </div>
      <div :class="b('body')"
           v-if="body"
           v-html="body"></div>
    </div>
  </div>

</template>

<script>
import create from "core/create";
const propsDefault = {
  avatar: "avatar",
  author: "author",
  body: "body"
};
export default create({
  name: "comment",
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
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
    avatarKey() {
      return this.props.avatar || propsDefault.avatar;
    },
    authorKey() {
      return this.props.author || propsDefault.author;
    },
    bodyKey() {
      return this.props.body || propsDefault.body;
    },
    avatar() {
      return this.data[this.avatarKey];
    },
    author() {
      return this.data[this.authorKey];
    },
    body() {
      return this.data[this.bodyKey];
    }
  },
  mounted() {}
});
</script>
