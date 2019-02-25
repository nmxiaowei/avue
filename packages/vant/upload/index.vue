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
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { getObjValue } from "utils/util";
import { detailImg } from "plugin/canvas/";
import { getToken } from "plugin/qiniu/";
import { getClient } from "plugin/ali/";
import packages from "core/packages";
export default create({
  name: "upload",
  mixins: [props(), event()],
  data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogImgType: true,
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
    oss: {
      type: String
    },
    limit: {
      type: Number,
      default: 10
    },
    accept: {
      type: [String, Array],
      default: ""
    },
    listType: {
      type: String
    },
    canvasOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    filesize: {
      type: Number
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
    isAliOss() {
      return this.oss === "ali";
    },
    isQiniuOss() {
      return this.oss === "qiniu";
    },
    isPictureImg() {
      return this.listType === "picture-img";
    },
    //单个头像图片
    imgUrl() {
      if (!this.validatenull(this.text)) {
        return this.text[0];
      }
    },
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
      if (this.isArray || this.isString) {
        this.text.push(file[this.urlKey]);
      } else if (this.isPictureImg) {
        this.text.unshift(file[this.urlKey]);
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
    handleError(msg) {
      console.log(new Error(msg));
      this.$toast.fail(msg || "上传失败");
    },
    delete(file) {
      if (this.isArray || this.isString) {
        this.text.forEach((ele, index) => {
          if (ele === file.url) this.text.splice(index, 1);
        });
      } else {
        this.text.forEach((ele, index) => {
          if (ele[this.valueKey] === file.url) this.text.splice(index, 1);
        });
      }
    },
    show(data) {
      this.loading.close();
      this.handleSuccess(data);
    },
    hide(msg) {
      this.loading.close();
      this.handleError(msg);
    },
    httpRequest(config) {
      this.loading = this.$toast.loading({
        mask: true,
        message: this.loadText
      });

      let file = config.file;
      const accept = file.type;
      const filesize = file.size;
      let acceptList = Array.isArray(this.accept) ? this.accept : [this.accept];
      acceptList = this.validatenull(acceptList[0]) ? undefined : acceptList;
      this.file = config.file;
      if (!this.validatenull(acceptList) && !acceptList.includes(accept)) {
        this.hide("文件类型不符合");
        return;
      }
      if (!this.validatenull(filesize) && filesize > this.filesize) {
        this.hide("文件太大不符合");
        return;
      }

      const headers = { "Content-Type": "multipart/form-data" };
      //oss配置属性
      let oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        let url = this.action;
        param.append("file", file, file.name);
        const callack = () => {
          //七牛云oss存储
          if (this.isQiniuOss) {
            if (!window.CryptoJS) {
              packages.logs("CryptoJS");
              this.hide();
              return;
            }
            oss_config = this.$AVUE.qiniu;
            const token = getToken(oss_config.AK, oss_config.SK, {
              scope: oss_config.scope,
              deadline: new Date().getTime() + oss_config.deadline * 3600
            });
            param.append("token", token);
            if (window.location.protocol.includes("https")) {
              url = "https://up.qbox.me";
            } else {
              url = "http://up.qiniu.com/";
            }
          } else if (this.isAliOss) {
            if (!window.OSS) {
              packages.logs("AliOSS");
              this.hide();
              return;
            }
            oss_config = this.$AVUE.ali;
            client = getClient({
              region: oss_config.region,
              endpoint: oss_config.endpoint,
              accessKeyId: oss_config.accessKeyId,
              accessKeySecret: oss_config.accessKeySecret,
              bucket: oss_config.bucket
            });
          }
          (() => {
            if (this.isAliOss) {
              return client.put(file.name, file);
            } else {
              return this.$httpajax.post(url, param, { headers });
            }
          })()
            .then(res => {
              let list = {};
              if (this.isQiniuOss) {
                res.data.key = oss_config.url + res.data.key;
              }

              if (this.isAliOss) {
                list = getObjValue(res, this.resKey, "object");
              } else {
                list = getObjValue(res.data, this.resKey, "object");
              }
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
      };
      //是否开启水印
      if (!this.validatenull(this.canvasOption)) {
        detailImg(file, this.canvasOption).then(res => {
          file = res;
          done();
        });
      } else {
        done();
      }
    },
    setVal() {
      const result = this.isString ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    },
    setVal() {
      let result = "";
      if (this.isString) {
        result = this.text.join(",");
      } else if (this.isPictureImg) {
        result = this.text[0];
      } else {
        result = this.text;
      }
      this.$emit("input", result);
      this.$emit("change", result);
    },
    handleExceed(files, fileList) {
      this.$toast.error(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共上传了 ${files.length + fileList.length} 个文件`
      );
    },
    handlePictureCardPreview(file) {
      //判断是否为图片
      this.dialogImageUrl = file.url;
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)/.test(file.url)) {
        this.dialogImgType = false;
        window.open(this.dialogImageUrl);
        return;
      } else {
        this.dialogImgType = true;
        this.dialogVisible = true;
      }
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除该图片？`);
    }
  }
});
</script>

