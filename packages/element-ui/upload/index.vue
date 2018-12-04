<template>
  <div :class="b()">
    <el-upload
      :class="b({'list':listType=='picture-img'})"
      @click.native="handleClick"
      :action="action"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :multiple="multiple"
      :on-preview="handlePictureCardPreview"
      :limit="status?99:limit"
      :http-request="httpRequest"
      :drag="drag"
      :readonly="readonly"
      :show-file-list="showFileList"
      :list-type="listType"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :disabled="disabled"
      :file-list="fileList"
    >
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <img v-if="imageUrl" :src="imageUrl" :class="b('avatar')">
        <i v-else class="el-icon-plus" :class="b('icon')"></i>
      </template>
      <template v-else-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <div class="avue-dialog">
        <img width="100%" :src="dialogImageUrl" alt>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
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
      text: this.status ? "" : [],
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
    status() {
      return this.listType === "picture-img";
    },
    imageUrl() {
      return this.status ? this.text : "";
    },
    fileList() {
      let list = [];
      if (!this.status) {
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
      }
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
    handleChange(file, fileList) {
      fileList.splice(fileList.length - 1, 1);
      if (typeof this.change === "function")
        this.change({ value: this.text, column: this.column });
    },
    handleSuccess(file) {
      if (!this.status) {
        if (this.isArray) {
          this.text.push(file[this.nameKey]);
        } else {
          let obj = {};
          obj[this.labelKey] = file[this.nameKey];
          obj[this.valueKey] = file[this.urlKey];
          this.text.push(obj);
        }
      } else {
        this.text = file[this.urlKey];
      }
      this.$message.success("上传成功");
      this.setVal();
    },
    handleRemove(file, fileList) {
      this.delete(file);
      this.$message.success("删除成功");
      this.setVal();
    },
    handleError() {
      this.$message.error("上传失败");
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
      this.loading = this.$loading({
        lock: true,
        text: this.loadText,
        spinner: "el-icon-loading"
      });
      const file = config.file;
      this.file = config.file;
      const headers = { "Content-Type": "multipart/form-data" };
      let param = new FormData();
      param.append("file", file, file.name);

      const callack = () => {
        this.$http
          .post(this.action, param, { headers })
          .then(res => {
            if (typeof this.uploadAfter === "function")
              this.uploadAfter(
                res,
                () => {
                  this.show(res);
                },
                () => {
                  this.loading.close();
                }
              );
            else this.show(res);
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
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共上传了 ${files.length + fileList.length} 个文件`
      );
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