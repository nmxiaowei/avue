<template>
  <div :class="b()"
       v-loading.lock="loading">
    <el-upload :class="b({'list':listType=='picture-img'})"
               @click.native="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePreview"
               :limit="limit"
               :http-request="httpRequest"
               :drag="drag"
               :readonly="readonly"
               :show-file-list="isPictureImg?false:showFileList"
               :list-type="listType"
               :on-change="handleChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <img v-if="imgUrl"
             :src="imgUrl"
             @mouseover="menu=disabled?false:true"
             :class="b('avatar')">
        <i v-else
           class="el-icon-plus"
           :class="b('icon')"></i>
        <div class="el-upload-list__item-actions"
             :class="b('menu')"
             v-if="menu"
             @mouseover="menu=true"
             @mouseout="menu=false"
             @click.stop="()=>{return false}">
          <i class="el-icon-zoom-in"
             @click.stop="handlePreview({url:imgUrl})"></i>
          <i class="el-icon-delete"
             @click.stop="handleDelete"></i>
        </div>
      </template>
      <template v-else-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog append-to-body
               :modal-append-to-body="false"
               :visible.sync="dialogVisible">
      <div class="avue-dialog">
        <img v-if="dialogImgType"
             width="100%"
             :src="dialogImageUrl"
             alt>
      </div>
    </el-dialog>
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
  data () {
    return {
      menu: false,
      loading: false,
      dialogImageUrl: "",
      dialogImgType: true,
      dialogVisible: false,
      text: [],
      file: {}
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {},
    onRemove: Function,
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
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    accept: {
      type: [String, Array],
      default: ""
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
    loadText: {
      type: String,
      default: "文件上传中,请稍等"
    },
    action: {
      type: String,
      default: ""
    },
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function
  },
  computed: {
    fileName () {
      return this.propsHttp.fileName || 'file'
    },
    isAliOss () {
      return this.oss === "ali";
    },
    isQiniuOss () {
      return this.oss === "qiniu";
    },
    isPictureImg () {
      return this.listType === "picture-img";
    },
    //单个头像图片
    imgUrl () {
      if (!this.validatenull(this.text)) {
        return this.text[0];
      }
    },
    fileList () {
      let list = [];
      const flag = this.isArray || this.isString;
      (this.text || []).forEach((ele, index) => {
        if (ele) {
          let name;
          //处理单个url链接取最后为label
          if (flag) {
            let i = ele.lastIndexOf('/');
            name = ele.substring(i + 1);
          }
          list.push({
            uid: index + '',
            status: 'done',
            name: flag ? name : ele[this.labelKey],
            url: flag ? ele : ele[this.valueKey]
          });
        }
      });
      return list;
    }
  },
  created () { },
  watch: {},
  mounted () { },
  methods: {
    handleClick () {
      if (typeof this.click === "function")
        this.click({ value: this.text, column: this.column });
    },
    handleChange (file, fileList) {
      fileList.splice(fileList.length - 1, 1);
      if (typeof this.change === "function")
        this.change({ value: this.text, column: this.column });
    },
    handleSuccess (file) {
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
      this.$message.success("上传成功");
      this.setVal();
    },
    handleRemove (file, fileList) {
      this.onRemove && this.onRemove(file, fileList);
      this.delete(file);
      this.$message.success("删除成功");
      this.setVal();
    },
    handleError (msg) {
      console.log(new Error(msg));
      this.$message.error(msg || "上传失败");
    },
    delete (file) {
      if (this.isArray || this.isString) {
        (this.text || []).forEach((ele, index) => {
          if (ele === file.url) this.text.splice(index, 1);
        });
      } else {
        (this.text || []).forEach((ele, index) => {
          if (ele[this.valueKey] === file.url) this.text.splice(index, 1);
        });
      }
    },
    show (data) {
      this.loading = false;
      this.handleSuccess(data);
    },
    hide (msg) {
      this.loading = false;
      this.handleError(msg);
    },
    httpRequest (config) {
      this.loading = true;
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

      const headers = Object.assign(this.headers, { "Content-Type": "multipart/form-data" });
      //oss配置属性
      let oss_config = {};
      let client = {};
      let param = new FormData();
      //附加属性
      for (let o in this.data) {
        param.append(o, this.data[o]);
      }
      const done = () => {
        let url = this.action;
        const callack = (newFile) => {
          const uploadfile = newFile || file;
          param.append(this.fileName, uploadfile);
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
            url = oss_config.bucket
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
              stsToken: oss_config.stsToken,
              accessKeyId: oss_config.accessKeyId,
              accessKeySecret: oss_config.accessKeySecret,
              bucket: oss_config.bucket
            });
          }
          (() => {
            if (this.isAliOss) {
              return client.put(uploadfile.name, uploadfile);
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
                    this.loading = false;
                  },
                  this.column
                );
              else this.show(list);
            })
            .catch(error => {
              if (typeof this.uploadAfter === "function")
                this.uploadAfter(error, this.hide, () => {
                  this.loading = false;
                }, this.column);
              else this.hide(error);
            });
        };
        if (typeof this.uploadBefore === "function")
          this.uploadBefore(this.file, callack, () => {
            this.loading = false;
          }, this.column);
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
    setVal () {
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
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
        files.length
        } 个文件，共上传了 ${files.length + fileList.length} 个文件`
      );
    },
    handlePreview (file) {
      if (this.disabled) return
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
    handleDelete () {
      this.beforeRemove().then(() => {
        this.text[0] = '';
        this.setVal();
      }).catch(() => {
      });
    },
    beforeRemove () {
      if (typeof this.uploadDelete === "function") {
        return this.uploadDelete(this.column);
      } else {
        return this.$confirm(`是否确定移除该选项？`);
      }
    }
  }
});
</script>