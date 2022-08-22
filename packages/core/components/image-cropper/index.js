import Main from './index.vue';

export default function (ops = {}) {
  let MessageConstructor = window.Vue.extend(Main);
  let option = Object.assign({
    outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
    outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
    info: true,          //图片大小信息
    canScale: true,      //图片是否允许滚轮缩放
    autoCrop: true,      //是否默认生成截图框
    fixed: false,         //是否开启截图框宽高固定比例
    full: false,         //false按原比例裁切图片，不失真
    fixedBox: false,      //固定截图框大小，不允许改变
    canMove: true,      //上传图片是否可以移动
    canMoveBox: true,    //截图框能否拖动
    original: false,     //上传图片按照原始比例渲染
    centerBox: false,    //截图框是否被限制在图片里面
    height: true,        //是否按照设备的dpr 输出等比例图片
    infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
    enlarge: 1,          //图片根据截图框输出比例倍数
  }, ops)
  let instance = new MessageConstructor({
    data: {
      option
    }
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.show()
  instance.dom = instance.vm.$el;
  return instance.vm;
}