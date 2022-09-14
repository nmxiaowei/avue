<template>
  <div :class="b()"
       :style="heightStyleName"
       @keyup.enter="handleSend">
    <audio ref="chatAudio">
      <source :src="audio[0]"
              type="audio/ogg">
      <source :src="audio[1]"
              type="audio/mpeg">
      <source :src="audio[2]"
              type="audio/wav">
    </audio>
    <div class="web__logo">
      <img :src="config.img"
           class="web__logo-img"
           alt="">
      <div class="web__logo-info">
        <p class="web__logo-name">{{config.name}}</p>
        <p class="web__logo-dept">{{config.dept}}</p>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="web__content">
      <div :style="widthStyleName">
        <div class="web__main"
             ref="main">
          <div class="web__main-item"
               v-for="(item,index) in list"
               :key="index"
               :class="{'web__main-item--mine':item.mine}">
            <div class="web__main-user">
              <img :src="item.img">
              <cite>
                {{item.name}}
                <i>{{item.date}}</i>
              </cite>
            </div>
            <div class="web__main-text">
              <div class="web__main-arrow"></div>
              <span v-html="handleDetail(item.text.text)"
                    ref="content"></span>
              <ul class=" web__main-list"
                  v-if="!validatenull(item.text.list)">
                <li @click="handleItemMsg(citem)"
                    v-for="(citem,cindex) in item.text.list"
                    :key="cindex">{{citem.text}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="web__footer"
             :style="widthStyleName">
          <div class="web__tools">
            <i class="el-icon-picture-outline"
               v-if="tools.img"
               @click="handleUpload('img')"></i>
            <i class="el-icon-video-camera"
               v-if="tools.video"
               @click="handleUpload('video')"></i>
            <i class="el-icon-folder-opened"
               v-if="tools.file"
               @click="handleUpload('file')"></i>
          </div>
          <div class="web__msg">
            <textarea v-model="msg"
                      rows="2"
                      :placeholder="placeholder"
                      class="web__msg-input"></textarea>
            <div class="web__msg-menu">
              <el-dropdown split-button
                           class="web__msg-submit"
                           type="primary"
                           size="mini"
                           @click="handleSend"
                           trigger="click">
                发送
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-popover placement="top"
                                width="160"
                                v-model="visible">
                      <el-input size="mini"
                                style="margin-bottom:10px"
                                :rows="3"
                                show-word-limit
                                maxlength="100"
                                placeholder="请输入快捷回复语"
                                v-model="keys"
                                type="textarea"></el-input>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini"
                                   type="text"
                                   @click="visible = false">取消</el-button>
                        <el-button type="primary"
                                   size="mini"
                                   @click="addKey">确定</el-button>
                      </div>
                      <el-button slot="reference"
                                 type="text"
                                 icon="el-icon-plus"></el-button>
                    </el-popover>

                  </el-dropdown-item>
                  <el-scrollbar style="height:100px">
                    <el-dropdown-item v-for="(item,index) in keylist"
                                      :key="index"
                                      @click.native="sendKey(item)">
                      <el-tooltip effect="dark"
                                  :content="item"
                                  placement="top">
                        <span> {{item.substr(0,10)}}{{item.length>10?'...':''}}</span>
                      </el-tooltip>

                    </el-dropdown-item>
                  </el-scrollbar>

                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
    <div v-if="upload.box">
      <el-dialog :title="upload.title"
                 :modal-append-to-body="$AVUE.modalAppendToBody"
                 :append-to-body="$AVUE.appendToBody"
                 :visible.sync="upload.box"
                 width="30%">
        <el-form ref="form"
                 :model="upload">
          <el-form-item prop="src"
                        :rules="[
      { required: true, message: '地址不能为空'},
    ]">
            <el-input size="mini"
                      style="margin-bottom:10px"
                      :rows="4"
                      show-word-limit
                      maxlength="100"
                      placeholder="请输入地址"
                      v-model="upload.src"
                      type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="upload.box=false"
                     size="small">取 消</el-button>
          <el-button type="primary"
                     @click="uploadSubmit"
                     size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div v-if="show">
      <el-dialog :visible.sync="show"
                 width="40%"
                 :modal-append-to-body="$AVUE.modalAppendToBody"
                 :append-to-body="$AVUE.appendToBody"
                 :before-close="handleClose"
                 class="web__dialog">
        <img :src="imgSrc"
             v-if="imgSrc"
             style="width:100%;object-fit: cover;">
        <video :src="videoSrc"
               v-if="videoSrc"
               style="width:100%;object-fit: cover;"
               controls="controls">
        </video>
        <audio :src="audioSrc"
               v-if="audioSrc"
               style="width:100%;object-fit: cover;"
               controls="controls">
        </audio>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import dayjs from 'dayjs'
export default create({
  name: "chat",
  data () {
    return {
      upload: {
        box: false,
        src: "",
        type: '',
        title: '',
      },
      visible: false,
      imgSrc: '',
      videoSrc: '',
      audioSrc: '',
      keys: "",
      show: false,
    }
  },
  props: {
    beforeOpen: Function,
    tools: {
      type: Object,
      default: () => {
        return {
          img: true,
          video: true,
          file: true
        }
      }
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    width: {
      type: [String, Number],
      default: 320
    },
    height: {
      type: [String, Number],
      default: 520
    },
    value: {
      type: String
    },
    notice: {
      type: Boolean,
      default: true
    },
    audio: {
      type: Array,
      default: () => {
        return [
          'https://www.helloweba.net/demo/notifysound/notify.ogg',
          'https://www.helloweba.net/demo/notifysound/notify.mp3',
          'https://www.helloweba.net/demo/notifysound/notify.wav'
        ]
      }
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    keylist: {
      type: Array,
      default: () => {
        return []
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    msg: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    heightStyleName () {
      return {
        height: this.setPx(this.height)
      }
    },
    widthStyleName () {
      return {
        width: this.setPx(this.width),
      }
    },
    msgActive () {
      return !this.validatenull(this.msg.replace(/[\r\n]/g, ""))
    }
  },
  methods: {
    uploadSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.upload.box = false;
          this.$emit('submit', this.getDetail(this.upload));
        }
      });
    },
    handleUpload (type) {
      this.upload.type = type;
      this.upload.src = '';
      if (type === 'img') {
        this.upload.title = "图片上传"
      } else if (type === 'video') {
        this.upload.title = "视频上传"
      } else if (type === 'file') {
        this.upload.title = "文件上传"
      }
      this.upload.box = true;
    },
    handleClose (done) {
      this.imgSrc = undefined;
      this.videoSrc = undefined;
      this.audioSrc = undefined;
      done();
    },
    addKey () {
      if (this.keys !== '') {
        this.$emit('keyadd', this.keys)
        this.keys = '';
      }
      this.visible = false

    },
    sendKey (key) {
      this.$emit('keysend', key)
    },
    getAudio () {
      this.$refs.chatAudio.play();
    },
    getNotification (text) {
      const safe = this;
      const NotificationInstance = Notification || window.Notification;
      if (!!NotificationInstance) {
        const permissionNow = NotificationInstance.permission;
        if (permissionNow === 'granted') {//允许通知
          CreatNotification();
        } else if (permissionNow === 'denied') {
          console.log('用户拒绝了你!!!');
        } else {
          setPermission();
        }
        function setPermission () {
          //请求获取通知权限
          NotificationInstance.requestPermission(function (PERMISSION) {
            if (PERMISSION === 'granted') {
              CreatNotification();
            } else {
              console.log('用户无情残忍的拒绝了你!!!');
            }
          });
        }
        function CreatNotification () {
          const n = new Notification(safe.config.name, {
            body: text,
            icon: safe.config.img
          });
          n.onshow = function () {
            safe.getAudio();
            setTimeout(() => {
              n.close();
            }, 2500);
          }
          n.onclick = function (e) {
            n.close();
          }
        }
      }
    },
    //mine为'我'的对话
    //text为内容
    pushMsg (params = {}) {
      const mine = params.mine === true ? true : false;
      const text = params.text || {};
      const date = params.date
      const textObj = {
        date: date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        text: (() => {
          if (typeof (text) != 'object') {
            return {
              text: text
            }
          }
          return text
        })(),
        mine: mine,
        img: mine ? this.config.myImg : this.config.img,
        name: mine ? this.config.myName : this.config.name,
      }
      this.list.push(textObj)
      setTimeout(() => {
        this.setScroll();
      }, 50)

    },
    setScroll (count) {
      //滚动条一直处于下方
      this.$nextTick(() => {
        this.$refs.main.scrollTop = count || this.$refs.main.scrollHeight
      })
    },
    //用户主动发送
    handleSend () {
      if (this.msgActive) {
        this.$emit('submit');
      }
    },
    //选择列表
    handleItemMsg (item) {
      this.$emit('submit', item.ask);
    },
    //处理排版
    handleDetail (html = '') {
      let result = html;
      setTimeout(() => {
        const list = this.$refs.content;
        list.forEach(ele => {
          for (let i = 0; i < ele.children.length; i++) {
            const child = ele.children[i];
            if (child.getAttribute('data-flag') != 0) {
              child.setAttribute('data-flag', 0)
              child.onclick = () => {
                this.handleEvent(child.dataset)
              };
              if (child.tagName === 'IMG') {
                child.className = 'web__msg--img'
                child.src = child.getAttribute('data-src')
              } else if (child.tagName === 'VIDEO') {
                child.className = 'web__msg--video'
                child.src = child.getAttribute('data-src')
              } else if (child.tagName === 'AUDIO') {
                child.className = 'web__msg--audio'
                child.controls = 'controls';
                child.src = child.getAttribute('data-src')
              } else if (child.tagName === 'FILE') {
                child.className = 'web__msg--file'
                child.innerHTML = `<h2>File</h2><span>${child.getAttribute('data-name')}</span>`
              } else if (child.tagName === 'MAP') {
                child.className = 'web__msg--file web__msg--map'
                child.innerHTML = `<h2>Map</h2><span>${child.getAttribute('data-longitude')} , ${child.getAttribute('data-latitude')}<br />${child.getAttribute('data-address')}</span>`
              }
              this.setScroll();
            }
          }
        });
      }, 0)
      return result;
    },
    getDetail (params = {}) {
      const { type, src, name, longitude, latitude, address } = params;
      if (type === 'img') {
        return `<img data-type="IMG" data-src="${src}"  />`
      } else if (type === 'video') {
        return `<video data-type="VIDEO"  data-src="${src}"></video>`
      } else if (type === 'audio') {
        return `<audio data-type="AUDIO"  data-src="${src}"></audio>`
      } else if (type === 'file') {
        return `<file data-type="FILE" data-name="${name}" data-src="${src}"></file>`
      } else if (type === 'map') {
        return `<map data-type="MAP" data-src="${src}" data-address="${address} "data-latitude="${latitude}" data-longitude="${longitude}"></map>`
      }
    },
    //处理事件
    handleEvent (params) {
      const callback = () => {
        if (params.type === 'IMG') {
          this.imgSrc = params.src;
          this.show = true;
        } else if (params.type === 'VIDEO') {
          this.videoSrc = params.src;
          this.show = true;
        } else if (params.type === 'AUDIO') {
          this.audioSrc = params.src;
          this.show = true;
        } else if (params.type === 'FILE') {
          window.open(params.src)
        }
      }
      if (typeof this.beforeOpen === 'function') {
        this.beforeOpen(params, callback)
      } else {
        callback();
      }

    },
    rootSendMsg (msg) {
      this.pushMsg({
        text: msg
      });
      if (this.notice) {
        this.getNotification(msg.text || msg);
      }
    }
  }
});
</script>

