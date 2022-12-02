<template>
  <div :class="b()"
       v-loading.lock="loading">
    <el-upload :key="reload"
               :class="b({'list':listType=='picture-img','upload':disabled})"
               @click="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :accept="acceptList"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePreview"
               :limit="limit"
               :http-request="httpUpload"
               :drag="dragFile"
               :readonly="readonly"
               :show-file-list="isPictureImg?false:showFileList"
               :list-type="listTypeText"
               :on-change="handleFileChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <el-icon>
          <el-icon-plus />
        </el-icon>
      </template>
      <template v-else-if="listType=='picture-img'">
        <slot v-if="$slots.default"
              :file="{url:imgUrl}"></slot>
        <template v-else>
          <component v-if="isMediaType(imgUrl)"
                     :src="imgUrl"
                     :is="isMediaType(imgUrl)"
                     @mouseover="menu=true"
                     :class="b('avatar')"></component>
          <el-icon v-else-if="imgUrl"
                   @mouseover="menu=true"
                   :class="b('avatar')">
            <el-icon-document />
          </el-icon>
          <el-icon :class="b('icon')"
                   v-else>
            <el-icon-plus />
          </el-icon>
          <div class="el-upload-list__item-actions"
               :class="b('menu')"
               v-if="menu"
               @mouseover="menu=true"
               @mouseout="menu=false"
               @click.stop="()=>{return false}">
            <el-icon @click.stop="handlePreview({url:imgUrl})">
              <el-icon-zoom-in />
            </el-icon>
            <el-icon v-if="!disabled"
                     @click.stop="handleDelete(imgUrl)">
              <el-icon-delete />
            </el-icon>
          </div>
        </template>
      </template>
      <template v-else-if="dragFile">
        <el-icon>
          <el-icon-upload />
        </el-icon>
        <div class="el-upload__text">
          <em>{{fileText || t('upload.upload')}}</em>
        </div>
      </template>
      <template v-else>
        <el-button icon="el-icon-upload"
                   :size="size"
                   type="primary">{{fileText || t('upload.upload')}}</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip"
             v-html="tip"></div>
      </template>
      <template #file="{file}">
        <slot :file="file"
              v-if="$slots.default">
        </slot>
        <span v-else-if="listType==='picture-card'">
          <component class="el-upload-list__item-thumbnail"
                     v-if="isMediaType(file.url)"
                     :src="file.url"
                     :is="file.type"></component>
          <el-icon v-else
                   :class="b('avatar')">
            <el-icon-document />
          </el-icon>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <el-icon>
                <el-icon-zoom-in @click.stop="handlePreview(file)"></el-icon-zoom-in>
              </el-icon>
            </span>
            <span class="el-upload-list__item-delete"
                  v-if="!disabled">
              <el-icon>
                <el-icon-delete @click.stop="handleRemove(file)"></el-icon-delete>
              </el-icon>
            </span>
          </span>
        </span>
        <div v-else-if="listType==='picture'"
             style="display:flex;"
             @click.stop="handlePreview(file)">
          <component class="el-upload-list__item-thumbnail"
                     :src="file.url"
                     :is="file.type"></component>
          <div class="el-upload-list__item-info">
            <a class="el-upload-list__item-name">
              <span class="el-upload-list__item-file-name"> {{file.name}}</span>
            </a>
          </div>
          <el-icon class="el-icon--close">
            <el-icon-close @click.stop="handleRemove(file)"></el-icon-close>
          </el-icon>
        </div>
        <span v-else
              @click.stop="handlePreview(file)">
          <div class="el-upload-list__item-info">
            <a class="el-upload-list__item-name">
              <el-icon>
                <el-icon-document></el-icon-document>
              </el-icon>
              <span class="el-upload-list__item-file-name"> {{file.name}}</span>
            </a>
            <el-icon class="el-icon--close">
              <el-icon-close @click.stop="handleRemove(file)"></el-icon-close>
            </el-icon>
          </div>
        </span>
      </template>
    </el-upload>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { getAsVal, isMediaType } from "utils/util";
import { detailImg } from "plugin/watermark/";
import { getToken } from "plugin/qiniu/";
import { getClient } from "plugin/ali/";
import packages from "core/packages";
function getFileUrl (home, uri = '') {
  return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/) ? uri : home + uri
};
export default create({
  name: 'upload',
  mixins: [props(), event(), locale],
  data () {
    return {
      menu: false,
      reload: Math.random(),
      res: '',
      loading: false,
      file: {}
    }
  },
  props: {
    ali: Object,
    qiniu: Object,
    data: {
      type: Object,
      default: () => {
        return {}
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
      default: "Loading..."
    },
    action: {
      type: String,
      default: ""
    },
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    httpRequest: Function

  },
  computed: {
    listTypeText () {
      if (this.listType == 'picture-img' || this.listType == '') {
        return 'text'
      }
      return this.listType
    },
    isMultiple () {
      return this.isArray || this.isString || this.stringMode
    },
    acceptList () {
      if (Array.isArray(this.accept)) {
        return this.accept.join(',')
      }
      return this.accept
    },
    homeUrl () {
      return this.propsHttp.home || ''
    },
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
        return getFileUrl(this.homeUrl, this.text[0]);
      }
    },
    fileList () {
      let list = [];
      (this.text || []).forEach((ele, index) => {
        if (ele) {
          let name = this.isMultiple ? ele.substring(ele.lastIndexOf('/') + 1) : ele[this.labelKey]
          let url = this.isMultiple ? ele : ele[this.valueKey];
          url = getFileUrl(this.homeUrl, url);
          list.push({
            uid: index + '',
            status: 'done',
            type: this.isMediaType(url),
            name: name,
            url: url
          });
        }
      });
      return list;
    }
  },
  mounted () {
    if (this.drag) {
      this.setSort()
    }
  },
  methods: {
    isMediaType (url) {
      return isMediaType(url, this.fileType)
    },
    setSort () {
      if (!window.Sortable) {
        packages.logs('Sortable');
        return
      }
      const el = this.$el.querySelectorAll('.avue-upload > ul')[0]
      window.Sortable.create(el, {
        animation: 100,
        onEnd: evt => {
          const targetRow = this.text.splice(evt.oldIndex, 1)[0];
          this.text.splice(evt.newIndex, 0, targetRow)
          this.reload = Math.random();
          this.$nextTick(() => this.setSort())
        }
      })
    },
    handleSuccess (file) {
      if (this.isPictureImg) {
        this.text.splice(0, 1, file[this.urlKey])
        this.handleChange(this.text)
      } else if (this.isMultiple) {
        this.text.push(file[this.urlKey]);
      } else {
        let obj = {};
        obj[this.labelKey] = file[this.nameKey];
        obj[this.valueKey] = file[this.urlKey];
        this.text.push(obj);
      }
    },
    handleRemove (file, fileList) {
      this.beforeRemove(file).then(() => {
        this.delete(file);
      })
    },
    handleError (error) {
      this.uploadError && this.uploadError(error, this.column)
    },
    delete (file) {
      (this.text || []).forEach((ele, index) => {
        let url = this.isMultiple ? ele : ele[this.valueKey]
        if (getFileUrl(this.homeUrl, url) === file.url) {
          this.text.splice(index, 1);
        }
      });
    },
    show (data) {
      this.loading = false;
      this.handleSuccess(data || this.res);
    },
    hide (msg) {
      this.loading = false;
      this.handleError(msg);
    },
    handleFileChange (file, fileList) {
      fileList.splice(fileList.length - 1, 1);
    },
    httpUpload (config) {
      if (typeof this.httpRequest === "function") {
        this.httpRequest(config)
        return
      }
      this.loading = true;
      let file = config.file;
      const fileSize = file.size / 1024;
      this.file = config.file;
      if (!this.validatenull(fileSize) && fileSize > this.fileSize) {
        this.hide("文件太大不符合");
        return;
      }
      const headers = Object.assign(this.headers, { "Content-Type": "multipart/form-data" });
      //oss配置属性
      let oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        const callback = (newFile) => {
          let url = this.action;
          //附加属性
          for (let o in this.data) {
            param.append(o, this.data[o]);
          }
          const uploadfile = newFile || file;
          param.append(this.fileName, uploadfile);
          //七牛云oss存储
          if (this.isQiniuOss) {
            if (!window.CryptoJS) {
              packages.logs("CryptoJS");
              this.hide();
              return;
            }
            oss_config = this.qiniu || this.$AVUE.qiniu;
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
            oss_config = this.ali || this.$AVUE.ali;
            client = getClient(oss_config);
          }
          (() => {
            if (this.isAliOss) {
              return client.put(uploadfile.name, uploadfile, {
                headers: this.headers
              });
            } else {
              return this.$axios.post(url, param, { headers });
            }
          })()
            .then(res => {
              this.res = {};
              if (this.isQiniuOss) {
                res.data = {
                  url: oss_config.url + res.data.key,
                  name: res.data.hash
                }
              }
              if (this.isAliOss) {
                this.res = getAsVal(res, this.resKey);
              } else {
                this.res = getAsVal(res.data, this.resKey);
              }

              if (typeof this.uploadAfter === "function")
                this.uploadAfter(
                  this.res,
                  this.show,
                  () => {
                    this.loading = false;
                  },
                  this.column
                );
              else this.show(this.res);
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
          this.uploadBefore(this.file, callback, () => {
            this.loading = false;
          }, this.column);
        else callback();
      };
      if (isMediaType(this.file.name) != 'img') {
        done()
        return
      }
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
    handleExceed (files, fileList) {
      this.uploadExceed && this.uploadExceed(this.limit, files, fileList, this.column);
    },
    handlePreview (file) {
      const callback = () => {
        let index = this.fileList.findIndex(ele => {
          return ele.url === file.url;
        })
        this.$ImagePreview(this.fileList, index);
      }
      if (typeof this.uploadPreview === "function") {
        this.uploadPreview(file, this.column, callback);
      } else {
        callback();
      }
    },
    handleDelete (file) {
      this.beforeRemove(file).then(() => {
        this.text = [];
        this.menu = false;
      })
    },
    beforeRemove (file) {
      if (typeof this.uploadDelete === "function") {
        return this.uploadDelete(file, this.column);
      } else {
        return Promise.resolve()
      }
    }
  }
})
</script>