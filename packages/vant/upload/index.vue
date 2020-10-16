<template>
  <van-field :placeholder="placeholder"
             :rules="rules"
             :clearable="clearable"
             :disabled="disabled"
             :input-align="inputAlign"
             :required="required"
             @click.native="handleClick"
             readonly
             :label="label">
    <van-uploader slot="input"
                  ref="upload"
                  v-model="fileList"
                  :max-count="limit"
                  :max-size="fileSize"
                  :multiple="multiple"
                  :accept="acceptList"
                  :before-delete="handleRemove"
                  :before-read="beforeRead"
                  @oversize="handleExceed"
                  @click-preview="handlePreview"
                  :disabled="disabled">
    </van-uploader>
  </van-field>

</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import upload from "../../core/common/upload.js";
export default create({
  name: "upload",
  mixins: [props(), event(), upload()],
  data () {
    return {
      load: false,
    }
  },
  watch: {
    loading (val) {
      if (val) {
        this.load = this.$toast.loading({
          mask: true,
          message: this.loadText
        });
      } else {
        this.load.close()
      }
    }
  },
  methods: {
    beforeRead (file) {
      this.httpRequest({ file })
    }
  }
});
</script>

