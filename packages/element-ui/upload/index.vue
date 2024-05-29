<template>
  <div :class="b()">
    <el-upload :key="reload"
               ref="main"
               :class="[b({'list':listType=='picture-img','disabled':disabled}),'avue-upload--'+listType]"
               @click.native="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :accept="acceptList"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePreview"
               :limit="limit"
               :http-request="httpUpload"
               :readonly="readonly"
               :drag="dragFile"
               :show-file-list="isPictureImg?false:showFileList"
               :list-type="listType"
               :on-change="handleFileChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <div :class="b('avatar')"
           v-else-if="listType=='picture-img'">
        <el-progress type="circle"
                     @mouseover.native="handleMouseover"
                     :percentage="firstFile.percentage"
                     v-if="showProgress(firstFile)"></el-progress>
        <div v-else
             :element-loading-text="loadText"
             v-loading.lock="firstFile.loading">
          <template v-if="firstFile.url">
            <slot v-if="$scopedSlots.default"
                  :file="firstFile"></slot>
            <template v-else>
              <component v-if="firstFile.type"
                         :src="firstFile.url"
                         controls="controls"
                         :is="firstFile.type"
                         @mouseover="handleMouseover"
                         :class="b('avatar')"></component>
              <i v-else
                 @mouseover="handleMouseover"
                 :src="firstFile.url"
                 :class="b('avatar')"
                 class="el-icon-document"></i>
            </template>
          </template>
          <i v-else
             class="el-icon-plus"
             :class="b('avatar')"></i>
        </div>
        <div class="el-upload-list__item-actions"
             :class="b('menu')"
             v-if="menu"
             @mouseover="handleMouseover"
             @mouseout="handleMouseout"
             @click.stop="()=>{return false}">
          <i class="el-icon-zoom-in"
             @click.stop="handlePreview(firstFile)"></i>
          <i class="el-icon-delete"
             v-if="!disabled"
             @click.stop="handleRemove(firstFile)"></i>
        </div>
      </div>
      <template v-else-if="dragFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <em>{{fileText || t('upload.upload')}}</em>
        </div>
      </template>
      <template v-else>
        <slot name="button"
              :disabled="disabled"
              v-if="$scopedSlots.button"></slot>
        <el-button v-else
                   icon="el-icon-upload"
                   :disabled="disabled"
                   :size="size"
                   type="primary">{{fileText || t('upload.upload')}}</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip"
           v-html="tip"></div>
      <template slot="file"
                slot-scope="{file}">
        <span :element-loading-text="loadText"
              v-loading.lock="file.loading">
          <template v-if="listType==='picture-card'">
            <el-progress type="circle"
                         :percentage="file.percentage"
                         v-if="showProgress(file)"></el-progress>
            <template v-else>
              <slot :file="file"
                    v-if="$scopedSlots.default">
              </slot>
              <template v-else>
                <component class="el-upload-list__item-thumbnail"
                           v-if="file.type"
                           controls="controls"
                           :src="file.url"
                           ne
                           :is="file.type"></component>
                <i v-else
                   :class="b('avatar')"
                   :src="file.url"
                   class="el-icon-document"></i>
              </template>
            </template>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview">
                <i class="el-icon-zoom-in"
                   @click.stop="handlePreview(file)"></i>
              </span>
              <span class="el-upload-list__item-delete">
                <i class="el-icon-delete"
                   v-if="!disabled"
                   @click.stop="handleRemove(file)"></i>
              </span>
            </span>
          </template>
          <span v-else-if="listType==='picture'"
                @click.stop="handlePreview(file)">
            <slot :file="file"
                  v-if="$scopedSlots.default">
            </slot>
            <template v-else>
              <component v-if="file.type"
                         class="el-upload-list__item-thumbnail"
                         :src="file.url"
                         controls="controls"
                         :is="file.type"></component>
              <a class="el-upload-list__item-name">
                <i class="el-icon-document"></i>
                {{file.name}}
              </a>
            </template>
            <i class="el-icon-close"
               @click.stop="handleRemove(file)"></i>
            <el-progress :percentage="file.percentage"
                         :stroke-width="3"
                         v-if="showProgress(file)"></el-progress>
          </span>
          <span v-else
                @click.stop="handlePreview(file)">
            <slot :file="file"
                  v-if="$scopedSlots.default">
            </slot>
            <a v-else
               class="el-upload-list__item-name">
              <i class="el-icon-document"></i>
              {{file.name}}
            </a>
            <i class="el-icon-close"
               v-if="!disabled"
               @click.stop="handleRemove(file)"></i>
            <el-progress :percentage="file.percentage"
                         :stroke-width="3"
                         v-if="showProgress(file)"></el-progress>
          </span>
        </span>
      </template>

    </el-upload>
  </div>
</template>

<script>
import create from 'core/create';
import props from 'common/common/props.js';
import event from 'common/common/event.js';
import locale from 'core/locale';
import { getAsVal, isMediaType } from 'utils/util';
import { detailImg, fileToBase64 } from 'plugin/canvas/';
import { getToken } from 'plugin/qiniu/';
import { getClient } from 'plugin/ali/';
import packages from 'core/packages';
function getFileUrl (home, uri = '') {
  return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/) ? uri : home + uri;
};
const FILE_STATUS_READY = 'ready';
const FILE_STATUS_DONE = 'done';
function isFileReady (file) {
  return file.status === FILE_STATUS_READY;
}
export default create({
  name: 'upload',
  mixins: [props(), event(), locale],
  data () {
    return {
      uploadCacheList: [],
      uploadList: [],
      res: '',
      menu: false,
      reload: Math.random()
    };
  },
  props: {
    qiniu: Object,
    ali: Object,
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    paramsList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    fileText: String,
    fileType: {
      type: String
    },
    oss: {
      type: String
    },
    limit: {
      type: Number
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    accept: {
      type: [String, Array],
      default: ''
    },
    canvasOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    cropperOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fileSize: {
      type: Number
    },
    dragFile: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    loadText: {
      type: String,
      default: 'Loading...'
    },
    action: {
      type: String,
      default: ''
    },
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    httpRequest: Function
  },
  computed: {
    isObject () {
      let obj = this.text[0];
      return typeof (obj) === 'object' || this.dataType == 'object' || this.isJson;
    },
    acceptList () {
      if (Array.isArray(this.accept)) {
        return this.accept.join(',');
      }
      return this.accept;
    },
    homeUrl () {
      return this.propsHttp.home || '';
    },
    fileName () {
      return this.propsHttp.fileName || 'file';
    },
    isCosOss () {
      return this.oss === 'cos';
    },
    isAliOss () {
      return this.oss === 'ali';
    },
    isQiniuOss () {
      return this.oss === 'qiniu';
    },
    isPictureImg () {
      return this.listType === 'picture-img';
    },
    firstFile () {
      return this.fileList[0] || {};
    },
    fileList () {
      let list = [];
      const parseFile = (ele) => {
        let name, url, type;
        if (this.isObject) {
          name = ele[this.labelKey];
          url = ele[this.valueKey];
          type = ele[this.typeKey] || this.isMediaType(url);
        } else {
          name = ele.substring(ele.lastIndexOf('/') + 1);
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
            uid: index + '',
            status: FILE_STATUS_DONE,
            type: type,
            name: name,
            url: url
          });
        }
      });
      return list.concat(this.uploadList);
    }
  },
  mounted () {
    if (this.drag) {
      this.setSort();
    }
  },
  methods: {
    handleMouseover () {
      this.menu = true;
    },
    handleMouseout () {
      this.menu = false;
    },
    showProgress (file) {
      return isFileReady(file) && !this.oss;
    },
    isMediaType (url) {
      return isMediaType(url, this.fileType);
    },
    setSort () {
      if (!window.Sortable) {
        packages.logs('Sortable');
        return;
      }
      const el = this.$el.querySelectorAll('.avue-upload > ul')[0];
      window.Sortable.create(el, {
        animation: 100,
        onEnd: evt => {
          const targetRow = this.text.splice(evt.oldIndex, 1)[0];
          this.text.splice(evt.newIndex, 0, targetRow);

          this.reload = Math.random();
          this.$nextTick(() => this.setSort());
        }
      });
    },
    handleError (error) {
      if (error) this.uploadError && this.uploadError(error, this.column);
    },
    handleSuccess (file) {
      if (this.isObject) {
        const obj = {
          [this.labelKey]: file[this.nameKey],
          [this.valueKey]: file[this.urlKey],
          [this.typeKey]: file[this.fileTypeKey]
        };
        this.paramsList.forEach(ele => obj[ele.label] = file[ele.value]);
        this.text.push(obj);
      } else {
        this.text.push(file[this.urlKey]);
      }
    },
    handleRemove (file) {
      if (isFileReady(file)) {
        let index = this.uploadList.findIndex(ele => ele.raw == file);
        this.uploadList.splice(index, 1);
      } else {
        this.beforeRemove(file).then(() => {
          this.text.forEach((ele, index) => {
            let url = this.isObject ? ele[this.valueKey] : ele;
            if (getFileUrl(this.homeUrl, url) === file.url) {
              this.text.splice(index, 1);
            }
          });
        });
      }
    },
    handleFileChange (file, fileList) {
      fileList.pop();
      this.uploadCacheList.push(file);
    },
    httpUpload (config) {
      let { file } = config;
      let fileIndex = this.uploadCacheList.findIndex(ele => ele.raw === file);
      let fileState = this.uploadCacheList[fileIndex] || {};
      const deleteUploadCacheFile = () => {
        const cacheIndex = this.uploadCacheList.findIndex(ele => ele.raw === file);
        const index = this.uploadList.findIndex(ele => ele.raw === file);
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
      if (typeof this.httpRequest === 'function') {
        deleteUploadCacheFile();
        this.httpRequest(config);
        return;
      }
      const fileSize = file.size / 1024;
      if (!this.validatenull(fileSize) && fileSize > this.fileSize) {
        deleteUploadCacheFile();
        this.handleSized(file, this.text);
        return;
      }
      const headers = { ...this.headers, 'Content-Type': 'multipart/form-data' };
      // oss配置属性
      let oss, oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        this.oss ? fileState.loading = true : fileState.percentage = 0;
        let url = this.action;
        // 附加属性
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
          if (typeof this.uploadAfter === 'function') {
            this.uploadAfter(this.res, show, hide, this.column);
          } else {
            show();
          }
        };

        const handleUploadError = (error) => {
          hide(error);
        };

        const uploadToDefault = () => {
          this.$axios({
            url,
            method: 'post',
            data: param,
            headers,
            onUploadProgress: (progressEvent) => {
              let complete = progressEvent.loaded / progressEvent.total * 100 | 0;
              if (fileState) fileState.percentage = complete;
            }
          }).then(handleUploadResult).catch(handleUploadError);
        };

        const uploadToCos = () => {
          if (!window.COS) {
            packages.logs('COS');
            hide();
            return;
          }
          oss_config = this.cos || this.$AVUE.cos;
          oss = new COS({
            SecretId: oss_config.SecretId,
            SecretKey: oss_config.SecretKey
          });

          oss.uploadFile({
            Bucket: oss_config.Bucket,
            Region: oss_config.Region,
            Key: uploadFile.name,
            Body: uploadFile
          }, function (err, data) {
            if (err) {
              handleUploadError(err);
            } else {
              handleUploadResult({
                data: {
                  name: data.ETag,
                  url: location.protocol + '//' + data.Location
                }
              });
            }
          });
        };

        const uploadToQiniu = () => {
          if (!window.CryptoJS) {
            packages.logs('CryptoJS');
            hide();
            return;
          }
          oss_config = this.qiniu || this.$AVUE.qiniu;
          const token = getToken(oss_config.AK, oss_config.SK, {
            scope: oss_config.scope,
            deadline: new Date().getTime() + oss_config.deadline * 3600
          });
          param.append('token', token);
          url = oss_config.bucket;
          uploadToDefault();
        };
        const uploadToAliOss = () => {
          if (!window.OSS) {
            packages.logs('AliOSS');
            hide();
            return;
          }
          oss_config = this.ali || this.$AVUE.ali;
          client = getClient(oss_config);

          client.put(uploadFile.name, uploadFile, {
            headers: this.headers
          }).then(handleUploadResult).catch(handleUploadError);
        };
        const callback = (newFile) => {
          fileIndex = this.uploadCacheList.findIndex(ele => ele.raw === file);
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
        if (typeof this.uploadBefore === 'function') {
          this.uploadBefore(file, callback, hide, this.column);
        } else {
          callback();
        }
      };
      if (isMediaType(file.name) != 'img') {
        done();
      } else {
        // 处理水印图片
        const canvasDone = () => {
          if (!this.validatenull(this.canvasOption)) {
            detailImg(file, this.canvasOption).then(res => {
              file = res;
              done();
            });
          } else {
            done();
          }
        };
        // 处理图片剪裁
        const canvasCrop = () => {
          fileToBase64(file, (res) => {
            let option = Object.assign(this.cropperOption, {
              img: res,
              type: 'file',
              callback: res => {
                file = res;
                canvasDone();
              },
              cancel: () => {
                deleteUploadCacheFile()
              }
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
    handleSized (files, fileList) {
      this.uploadSized && this.uploadSized(this.fileSize, files, fileList, this.column);
      this.handleError('size');
    },
    handleExceed (files, fileList) {
      this.uploadExceed && this.uploadExceed(this.limit, files, fileList, this.column);
      this.handleError('exceed');
    },
    handlePreview (file) {
      if (isFileReady(file)) return;
      const callback = () => {
        const index = this.fileList.findIndex(ele => ele.url === file.url);
        this.$ImagePreview(this.fileList, index);
      };
      if (typeof this.uploadPreview === 'function') {
        this.uploadPreview(file, this.column, callback);
      } else {
        callback();
      }
    },
    beforeRemove (file) {
      if (typeof this.uploadDelete === 'function') {
        return this.uploadDelete(file, this.column);
      } else {
        return Promise.resolve();
      }
    }
  }
});
</script>
