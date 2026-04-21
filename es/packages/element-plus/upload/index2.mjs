/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import { isMediaType, getAsVal } from '../../../src/utils/util.mjs';
import { detailImg } from '../../../src/plugin/watermark/index.mjs';
import { getToken } from '../../../src/plugin/qiniu/index.mjs';
import { getClient } from '../../../src/plugin/ali/index.mjs';
import packages from '../../../src/core/packages.mjs';

function getFileUrl(home, uri = "") {
  return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/)
    ? uri
    : home + uri;
}
const FILE_STATUS_READY = "ready";
const FILE_STATUS_DONE = "done";
function isFileReady(file) {
  return file.status === FILE_STATUS_READY;
}
var script = create({
  name: "upload",
  mixins: [props(), event(), locale],
  data() {
    return {
      uploadCacheList: [],
      uploadList: [],
      res: "",
      menu: false,
      reload: Math.random(),
    };
  },
  props: {
    qiniu: Object,
    ali: Object,
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    paramsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    fileText: String,
    fileType: {
      type: String,
    },
    oss: {
      type: String,
    },
    limit: {
      type: Number,
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    accept: {
      type: [String, Array],
      default: "",
    },
    canvasOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cropperOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    fileSize: {
      type: Number,
    },
    dragFile: {
      type: Boolean,
      default: false,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    directory: {
      type: Boolean,
      default: false,
    },
    loadText: {
      type: String,
      default: "Loading...",
    },
    action: {
      type: String,
      default: "",
    },
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    httpRequest: Function,
  },
  computed: {
    listTypeText() {
      if (this.listType == "picture-img" || this.listType == "") {
        return "text";
      }
      return this.listType;
    },
    isObject() {
      let obj = this.text[0];
      return (
        typeof obj === "object" || this.dataType == "object" || this.isJson
      );
    },
    acceptList() {
      if (Array.isArray(this.accept)) {
        return this.accept.join(",");
      }
      return this.accept;
    },
    homeUrl() {
      return this.propsHttp.home || "";
    },
    fileName() {
      return this.propsHttp.fileName || "file";
    },
    isCosOss() {
      return this.oss === "cos";
    },
    isAliOss() {
      return this.oss === "ali";
    },
    isQiniuOss() {
      return this.oss === "qiniu";
    },
    isPictureImg() {
      return this.listType === "picture-img";
    },
    firstFile() {
      return this.fileList[0] || {};
    },
    fileList() {
      let list = [];
      const parseFile = (ele) => {
        let name, url, type;
        if (this.isObject) {
          name = ele[this.labelKey];
          url = ele[this.valueKey];
          type = ele[this.typeKey] || this.isMediaType(url);
        } else {
          name = ele.substring(ele.lastIndexOf("/") + 1);
          url = ele;
          type = this.isMediaType(url);
        }
        url = getFileUrl(this.homeUrl, url);
        return { name, url, type };
      };
      this.text.forEach((ele, index) => {
        if (ele) {
          const { name, url, type } = parseFile(ele);
          list.push({
            uid: index + "",
            status: FILE_STATUS_DONE,
            type: type,
            name: name,
            url: url,
          });
        }
      });
      return list.concat(this.uploadList);
    },
  },
  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  methods: {
    handleMouseover() {
      this.menu = true;
    },
    handleMouseout() {
      this.menu = false;
    },
    showProgress(file) {
      return isFileReady(file) && !this.oss;
    },
    isMediaType(url) {
      return isMediaType(url, this.fileType);
    },
    setSort() {
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      const el = this.$el.querySelectorAll(".avue-upload > ul")[0];
      window.Sortable.create(el, {
        animation: 100,
        onEnd: (evt) => {
          const targetRow = this.text.splice(evt.oldIndex, 1)[0];
          this.text.splice(evt.newIndex, 0, targetRow);

          this.reload = Math.random();
          this.$nextTick(() => this.setSort());
        },
      });
    },
    handleError(error) {
      if (error) this.uploadError && this.uploadError(error, this.column);
    },
    handleSuccess(file) {
      if (this.isObject) {
        const obj = {
          [this.labelKey]: file[this.nameKey],
          [this.valueKey]: file[this.urlKey],
          [this.typeKey]: file[this.fileTypeKey],
        };
        this.paramsList.forEach((ele) => (obj[ele.label] = file[ele.value]));
        this.text.push(obj);
      } else {
        this.text.push(file[this.urlKey]);
      }
    },
    handleRemove(file) {
      if (isFileReady(file)) {
        let index = this.uploadList.findIndex((ele) => ele.raw == file);
        this.uploadList.splice(index, 1);
      } else {
        this.beforeRemove(file).then(() => {
          this.text.forEach((ele, index) => {
            let url = this.isObject ? ele[this.valueKey] : ele;
            if (getFileUrl(this.homeUrl, url) === file.url) {
              this.text.splice(index, 1);
            }
          });
          this.menu = false;
        });
      }
    },
    handleFileChange(file, fileList) {
      fileList.pop();
      this.uploadCacheList.push(file);
    },
    httpUpload(config) {
      let { file } = config;
      let fileIndex = this.uploadCacheList.findIndex((ele) => ele.raw === file);
      let fileState = this.uploadCacheList[fileIndex] || {};
      const deleteUploadCacheFile = () => {
        const cacheIndex = this.uploadCacheList.findIndex(
          (ele) => ele.raw === file
        );
        const index = this.uploadList.findIndex((ele) => ele.raw === file);
        if (cacheIndex !== -1) this.uploadCacheList.splice(cacheIndex, 1);
        if (index !== -1) this.uploadList.splice(index, 1);
      };

      const show = (data) => {
        deleteUploadCacheFile();
        this.res = data || this.res;
        this.handleSuccess(this.res);
      };
      const hide = (msg) => {
        deleteUploadCacheFile();
        this.handleError(msg);
      };
      if (typeof this.httpRequest === "function") {
        deleteUploadCacheFile();
        this.httpRequest(config, this.column);
        return;
      }
      const fileSize = file.size / 1024;
      if (!this.validatenull(fileSize) && fileSize > this.fileSize) {
        deleteUploadCacheFile();
        this.handleSized(file, this.text);
        return;
      }
      const headers = {
        ...this.headers,
        "Content-Type": "multipart/form-data",
      };
      //oss配置属性
      let oss,
        oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        this.oss ? (fileState.loading = true) : (fileState.percentage = 0);
        let url = this.action;
        //附加属性
        for (let o in this.data) {
          param.append(o, this.data[o]);
        }
        let uploadFile;
        const handleUploadResult = (res) => {
          this.res = {};
          if (this.isQiniuOss) {
            let key = res.data.key;
            res.data.url = oss_config.url + key;
            res.data.name = key;
          }
          this.res = getAsVal(this.isAliOss ? res : res.data, this.resKey);
          if (typeof this.uploadAfter === "function") {
            this.uploadAfter(this.res, show, hide, this.column);
          } else {
            show();
          }
        };

        const handleUploadError = (error) => {
          hide(error);
        };

        const uploadToDefault = () => {
          let timer = null;
          this.$axios({
            url,
            method: "post",
            data: param,
            headers,
            onUploadProgress: (progressEvent) => {
              let complete =
                (progressEvent.loaded / progressEvent.total) * 100 || 0;
              if (complete >= 80) {
                if (timer) return;
                timer = setInterval(() => {
                  complete += (100 - complete) * 0.2;
                  if (fileState)
                    fileState.percentage = parseFloat(complete.toFixed(2));
                  if (complete > 99) {
                    timer && clearInterval(timer);
                  }
                }, 1000);
              } else {
                if (fileState)
                  fileState.percentage = parseFloat(complete.toFixed(2));
              }
            },
          })
            .then(handleUploadResult)
            .catch(handleUploadError);
        };

        const uploadToCos = () => {
          if (!window.COS) {
            packages.logs("COS");
            hide();
            return;
          }
          oss_config = this.cos || this.$AVUE.cos;
          oss = new COS({
            SecretId: oss_config.SecretId,
            SecretKey: oss_config.SecretKey,
          });

          oss.uploadFile(
            {
              Bucket: oss_config.Bucket,
              Region: oss_config.Region,
              Key: uploadFile.name,
              Body: uploadFile,
            },
            function (err, data) {
              if (err) {
                handleUploadError(err);
              } else {
                handleUploadResult({
                  data: {
                    name: data.ETag,
                    url: location.protocol + "//" + data.Location,
                  },
                });
              }
            }
          );
        };

        const uploadToQiniu = () => {
          if (!window.CryptoJS) {
            packages.logs("CryptoJS");
            hide();
            return;
          }
          oss_config = this.qiniu || this.$AVUE.qiniu;
          const token = getToken(oss_config.AK, oss_config.SK, {
            scope: oss_config.scope,
            deadline: new Date().getTime() + oss_config.deadline * 3600,
          });
          param.append("token", token);
          url = oss_config.bucket;
          uploadToDefault();
        };
        const uploadToAliOss = () => {
          if (!window.OSS) {
            packages.logs("AliOSS");
            hide();
            return;
          }
          oss_config = this.ali || this.$AVUE.ali;
          client = getClient(oss_config);

          client
            .put(uploadFile.name, uploadFile, {
              headers: this.headers,
            })
            .then(handleUploadResult)
            .catch(handleUploadError);
        };
        const callback = (newFile) => {
          fileIndex = this.uploadCacheList.findIndex((ele) => ele.raw === file);
          if (fileIndex !== -1) {
            let list = this.uploadCacheList.splice(fileIndex, 1);
            this.uploadList = this.uploadList.concat(list);
          }
          uploadFile = newFile || file;
          param.append(this.fileName, uploadFile);
          if (this.isCosOss) {
            uploadToCos();
          } else if (this.isQiniuOss) {
            uploadToQiniu();
          } else if (this.isAliOss) {
            uploadToAliOss();
          } else {
            uploadToDefault();
          }
        };
        if (typeof this.uploadBefore === "function") {
          this.uploadBefore(file, callback, hide, this.column);
        } else {
          callback();
        }
      };
      if (isMediaType(file.name) != "img") {
        done();
      } else {
        //处理水印图片
        const canvasDone = () => {
          if (!this.validatenull(this.canvasOption)) {
            detailImg(file, this.canvasOption).then((res) => {
              file = res;
              done();
            });
          } else {
            done();
          }
        };
        //处理图片剪裁
        const canvasCrop = () => {
          fileToBase64(file, (res) => {
            let option = Object.assign(this.cropperOption, {
              img: res,
              type: "file",
              callback: (res) => {
                file = res;
                canvasDone();
              },
              cancel: () => {
                if (fileState) this.uploadList.splice(fileIndex, 1);
              },
            });
            this.$ImageCropper(option);
          });
        };
        if (!this.validatenull(this.cropperOption)) {
          canvasCrop();
        } else {
          canvasDone();
        }
      }
    },
    handleSized(files, fileList) {
      this.uploadSized &&
        this.uploadSized(this.fileSize, files, fileList, this.column);
      this.handleError("size");
    },
    handleExceed(files, fileList) {
      this.uploadExceed &&
        this.uploadExceed(this.limit, files, fileList, this.column);
      this.handleError("exceed");
    },
    handlePreview(file) {
      if (isFileReady(file)) return;
      const callback = () => {
        const index = this.fileList.findIndex((ele) => ele.url === file.url);
        this.$ImagePreview(this.fileList, index);
      };
      if (typeof this.uploadPreview === "function") {
        this.uploadPreview(file, this.column, callback);
      } else {
        callback();
      }
    },
    beforeRemove(file) {
      if (typeof this.uploadDelete === "function") {
        return this.uploadDelete(file, this.column);
      } else {
        return Promise.resolve();
      }
    },
  },
});

export { script as default };
