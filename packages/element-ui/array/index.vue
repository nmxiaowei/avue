<template>
  <div :class="b()">
    <div :class="b('item')"
         v-for="(item,index) in text"
         :key="index">
      <div :class="b('input')">
        <el-tooltip placement="bottom"
                    :disabled="!isImg || validatenull(item.url)">
          <div slot="content">
            <el-image style="width: 150px"
                      :src="item.url"
                      @click="openImg(index)"
                      fit="cover"
                      v-if="isImg"></el-image>
          </div>
          <el-input v-model="item.url"
                    @change="onChange"
                    :placeholder="placeholder"
                    :disabled="disabled" />
        </el-tooltip>
        <template v-if="!(disabled ||readonly)">
          <el-button type="primary"
                     icon="el-icon-plus"
                     circle
                     :size="size"
                     v-if="index===0"
                     @click="add()"></el-button>
          <el-button type="danger"
                     v-else
                     icon="el-icon-minus"
                     circle
                     :size="size"
                     @click="remove(index)"></el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: 'array',
  mixins: [props(), event()],
  data () {
    return {
      text: []
    }
  },
  props: {
    type: String,
    size: String,
    isImg: {
      type: Boolean,
      default: function () {
        return this.type === 'img'
      }
    },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    value: [Array, String],
  },
  watch: {
    value: {
      handler (val) {
        if (this.validatenull(val)) {
          val = [''];
        }
        if ((this.isNumber || this.isString) && !Array.isArray(val)) {
          val = val.split(',')
        }
        this.text = val.map(ele => {
          return { url: ele }
        });
      },
      immediate: true
    }
  },
  methods: {
    onChange () {
      let list = this.text.map(ele => {
        if (this.validatenull(ele.url)) return ele.url;
        return this.isNumber ? Number(ele.url) : ele.url
      })
      if ((this.isNumber || this.isString)) {
        list = list.join(',')
      }
      this.$emit('input', list)
    },
    add () {
      this.text.push({
        url: ""
      })
      this.onChange();
    },
    remove (index) {
      this.text.splice(index, 1)
      this.onChange();
    },
    openImg (index) {
      const list = this.text.map(ele => {
        return { thumbUrl: ele.url, url: ele.url }
      })
      this.$ImagePreview(list, index);
    },
  }
})
</script>
