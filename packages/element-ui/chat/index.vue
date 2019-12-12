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
                    @click="detailImg($event)"></span>
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
          <div class="web__msg">
            <textarea v-model="msg"
                      rows="2"
                      placeholder="请输入..."
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
                                maxlength="50"
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
    <div class="web__dialog"
         v-if="imgBox"
         @click="imgBox=false">
      <span class="web__dialog-close">x</span>
      <el-scrollbar style="height:100%;">
        <img :src="imgSrc"
             style="display:block;margin:0 auto;width:50%;object-fit: cover;">
      </el-scrollbar>

    </div>
  </div>
</template>

<script>
import create from "core/create";
import { dateFtt } from 'utils/date'
export default create({
  name: "chat",
  props: {
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
  watch: {
    value: {
      handler () {
        this.msg = this.value;
      },
      immediate: true
    },
    msg: {
      handler () {
        this.$emit('input', this.msg);
      },
      immediate: true
    }
  },
  data () {
    return {
      visible: false,
      imgSrc: '',
      keys: "",
      imgBox: false,
      msg: '',
    }
  },
  computed: {
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
      const textObj = {
        date: dateFtt('yyyy-MM-dd hh:mm:ss', new Date()),
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
      //滚动条一直处于下方
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
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
      result = result.replace(/<img/g, '<br /><img width="100px" style="margin-top:20px;"');
      return result;
    },
    //处理图片
    detailImg (e) {
      if (e.target.nodeName === 'IMG') {
        this.imgSrc = e.target.currentSrc;
        this.imgBox = true;
      };
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


