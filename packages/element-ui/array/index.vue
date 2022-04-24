<template>
  <div :class="b()">
    <el-button type="primary"
               icon="el-icon-plus"
               circle
               :size="size"
               v-if="validatenull(text)"
               :disabled="disabled"
               @click="add()"></el-button>
    <div :class="b('item')"
         v-for="(item,index) in text"
         :key="index">
      <div :class="b('input')">
        <el-tooltip placement="bottom"
                    :disabled="(!isImg && !isUrl) || validatenull(item)">
          <div slot="content">
            <el-image style="width: 150px"
                      :src="item"
                      @click="openImg(index)"
                      fit="cover"
                      v-if="isImg"></el-image>
            <el-link type="primary"
                     :href="item"
                     v-else-if="isUrl"
                     :target="target">{{item}}</el-link>
          </div>
          <el-input v-model="text[index]"
                    :size="size"
                    :placeholder="placeholder"
                    :disabled="disabled"></el-input>
        </el-tooltip>
        <template v-if="!(disabled ||readonly || alone)">
          <el-button type="primary"
                     icon="el-icon-plus"
                     circle
                     :size="size"
                     :disabled="disabled"
                     v-if="!isLimit"
                     @click="add(index)"></el-button>
          <el-button type="danger"
                     icon="el-icon-minus"
                     circle
                     :size="size"
                     :disabled="disabled"
                     @click="remove(index)"></el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: 'array',
  mixins: [props(), event()],
  data () {
    return {
      text: []
    }
  },
  computed: {
    isLimit () {
      if (this.validatenull(this.limit)) return false
      else if (this.textLen >= this.limit) return true
      return false
    },
    textLen () {
      return (this.text || []).length
    },
    isImg () {
      return this.type === 'img'
    },
    isUrl () {
      return this.type === 'url'
    },
  },
  props: {
    alone: Boolean,
    type: String,
    size: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    value: [Array, String],
    limit: Number
  },
  methods: {
    add (index) {
      this.text.splice(index + 1, 0, '');
    },
    remove (index) {
      this.text.splice(index, 1)
    },
    openImg (index) {
      const list = this.text.map(ele => {
        return { thumbUrl: ele, url: ele }
      })
      this.$ImagePreview(list, index);
    },
  }
})
</script>
