<template>
  <div class="avue-cell"
       :class="b('mobile')">
    <p :class="['avue-cell__title',{'avue-cell__title--required':required}]">
      {{label}}
      <small class="avue-cell__tip"
             v-if="tip">{{tip}}</small>
    </p>
    <div :class="b('mobile-list')">
      <div :class="b('mobile-item')"
           v-for="(item,index) in fileList"
           :key="index">
        <img :src="item.url"
             alt="">
        <div :class="b('mobile-menu')">
          <van-icon name="search" />
          <van-icon name="delete"
                    @click="handleRemove(item)" />
        </div>
      </div>
      <van-uploader :before-read="handleChange"
                    :disabled="disabled">
        <div :class="b('mobile-upload')">
          <van-icon name="plus" />
        </div>
      </van-uploader>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import { findByValue } from "utils/util";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "upload",
  mixins: [props(), event()],
  data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      text: [],
      file: {}
    };
  },
  props: {
    value: {},
    showFileList: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 3
    },
    listType: {
      type: String
    },
    drag: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loadText: {
      type: String,
      default: "文件上传中,请稍等"
    },
    action: {
      type: String,
      default: ""
    },
    uploadBefore: Function,
    uploadAfter: Function
  },
  computed: {
    fileList() {
      let list = [];
      this.text.forEach((ele, index) => {
        let obj;
        if (this.isArray || this.isString) {
          obj = {
            name: index,
            url: ele
          };
        } else {
          obj = {
            name: ele[this.labelKey],
            url: ele[this.valueKey]
          };
        }
        list.push(obj);
      });
      return list;
    }
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    handleClick() {
      if (typeof this.click === "function")
        this.click({ value: this.text, column: this.column });
    },
    handleChange(file) {
      if (this.fileList.length >= this.limit) {
        this.handleExceed();
        return;
      }
      this.httpRequest({
        file: file
      });
      if (typeof this.change === "function")
        this.change({ value: this.text, column: this.column });
    },
    handleSuccess(file) {
      if (this.isArray) {
        this.text.push(file[this.nameKey]);
      } else {
        let obj = {};
        obj[this.labelKey] = file[this.nameKey];
        obj[this.valueKey] = file[this.urlKey];
        this.text.push(obj);
      }

      this.$toast.success("上传成功");
      this.setVal();
    },
    handleRemove(file) {
      this.delete(file);
      this.$toast.success("删除成功");
      this.setVal();
    },
    handleError() {
      this.$toast.fail("上传失败");
    },
    delete(file) {
      if (this.isArray) {
        this.text.forEach((ele, index) => {
          if (ele === file.url) this.text.splice(index, 1);
        });
      } else {
        this.text.forEach((ele, index) => {
          if (ele[this.valueKey] === file.url) this.text.splice(index, 1);
        });
      }
    },
    show(res) {
      this.loading.close();
      this.handleSuccess(res.data);
    },
    hide() {
      this.loading.close();
      this.handleError();
    },
    httpRequest(config) {
      this.loading = this.$toast.loading({
        mask: true,
        message: this.loadText
      });
      const file = config.file;
      this.file = config.file;
      const headers = { "Content-Type": "multipart/form-data" };
      let param = new FormData();
      param.append("file", file, file.name);

      const callack = () => {
        this.$httpajax
          .post(this.action, param, { headers })
          .then(res => {
            const list = res.data.data ? res.data.data : res.data;
            if (typeof this.uploadAfter === "function")
              this.uploadAfter(
                list,
                () => {
                  this.show(list);
                },
                () => {
                  this.loading.close();
                }
              );
            else this.show(list);
          })
          .catch(error => {
            if (typeof this.uploadAfter === "function")
              this.uploadAfter(error, this.hide, () => {
                this.loading.close();
              });
            else this.hide(error);
          });
      };
      if (typeof this.uploadBefore === "function")
        this.uploadBefore(this.file, callack, () => {
          this.loading.close();
        });
      else callack();
    },
    setVal() {
      const result = this.isString ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    },
    handleExceed() {
      this.$toast.fail(`当前只允许上传${this.limit}文件数量`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
});
</script>

