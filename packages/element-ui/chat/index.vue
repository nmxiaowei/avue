<template>
  <div :class="b()"
       :style="styleName"
       @keyup.enter="handleSend">
    <audio ref="chatAudio">
      <source src="https://www.helloweba.net/demo/notifysound/notify.ogg"
              type="audio/ogg">
      <source src="https://www.helloweba.net/demo/notifysound/notify.mp3"
              type="audio/mpeg">
      <source src="https://www.helloweba.net/demo/notifysound/notify.wav"
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
    </div>

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
    <div class="web__footer">
      <div class="web__msg">
        <textarea v-model="msg"
                  rows="2"
                  placeholder="请输入..."
                  class="web__msg-input"></textarea>
        <div class="web__msg-menu">
          <span class="web__msg-submit"
                :class="{'web__msg-submit--active':msgActive}"
                @click="handleSend">发送</span>
        </div>
      </div>
    </div>
    <div class="web__dialog"
         v-if="imgBox"
         @click="imgBox=false">
      <span class="web__dialog-close">x</span>
      <img :src="imgSrc">
    </div>
  </div>
</template>

<script>
const config = {
  name: '云集汇通自助客服',
  img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547542538742&di=33c9b3d1ad6bdfe87eb19e44c8d0da04&imgtype=0&src=http%3A%2F%2Fcyjmw.shengyilu.com%2Fskin%2Findex%2Fimages_four%2Fpic_fi_32.png	',
  myName: '我',
  myImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547542562834&di=4d469265c6847a8f29393fe1038c64c8&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2FhFB4FUPIIlJSIN5vlQwX2OGlW03Oic9SdtXoOAgMmNBYxfpibmxyG6C0rf7Yml1YKQKrLbet5C4ebpmzGOJZ8icEQ%2F640%3Fwx_fmt%3Djpeg	'
};
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
    config: {
      type: Object,
      default: () => {
        return {}
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
      imgSrc: '',
      imgBox: false,
      msg: '',
    }
  },
  computed: {
    styleName () {
      return {
        width: this.setPx(this.width),
        height: this.setPx(this.height)
      }
    },
    msgActive () {
      return !this.validatenull(this.msg)
    }
  },
  methods: {
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
        img: mine ? config.myImg : config.img,
        name: mine ? config.myName : config.name,
      }
      this.list.push(textObj)
      //滚动条一直处于下方
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })

    },
    //用户主动发送
    handleSend () {
      if (!this.msgActive) return
      this.$emit('submit');

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
        this.getNotification(msg.text);
      }
    }
  }
});
</script>


