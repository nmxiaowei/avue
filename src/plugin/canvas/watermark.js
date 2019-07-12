// const CONTAINERID = '_avue_markcontainer';

import { randomId } from 'utils/util';
class waterMark {
  constructor(opt = {}) {
    this.CONTAINERID = randomId();
    this.drawCanvas = this.drawCanvas.bind(this);
    this.parentObserver = this.parentObserver.bind(this);
    this.Repaint = this.Repaint.bind(this);
    this.isOberserve = false;
    this.init(opt);
    this.drawCanvas();
    this.parentObserver();
  }

  init(opt) {
    this.option = {};
    this.option.text = opt.text || 'avue商用通用无敌大水印';
    this.option.font = opt.font || '30px 黑体';
    this.option.canvasWidth = opt.canvasWidth || 500;
    this.option.canvasHeight = opt.canvasHeight || 200;
    this.option.textAlign = opt.textAlign || 'center';
    this.option.textStyle = opt.textStyle || 'rgba(100,100,100,0.15)';
    this.option.degree = opt.degree || -20;
  }

  drawCanvas() {
    this.isOberserve = true;
    let divContainer = document.createElement('div');
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    divContainer.id = this.CONTAINERID;

    canvas.width = this.option.canvasWidth;
    canvas.height = this.option.canvasHeight;
    context.font = this.option.font;
    context.textAlign = this.option.textAlign;
    context.fillStyle = this.option.textStyle;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(this.option.degree * Math.PI / 180);
    context.fillText(this.option.text, 0, 0);

    let backgroundUrl = canvas.toDataURL('image/png');
    this.styleStr = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:9999;
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${backgroundUrl}')`;
    divContainer.setAttribute('style', this.styleStr);
    document.body.appendChild(divContainer);
    this.wmObserver(divContainer);
    this.isOberserve = false;
  }

  wmObserver(divContainer) {
    let wmConf = { attributes: true, childList: true, characterData: true };
    let wmObserver = new MutationObserver((mo) => {
      if (!this.isOberserve) {
        let _obj = mo[0].target;
        _obj.setAttribute('style', this.styleStr);
        _obj.setAttribute('id', this.CONTAINERID);
        wmObserver.takeRecords();
      }
    });
    wmObserver.observe(divContainer, wmConf);
  }

  parentObserver() {
    let bodyObserver = new MutationObserver(() => {
      if (!this.isOberserve) {
        let __wm = document.querySelector(`#${this.CONTAINERID}`);
        if (!__wm) {
          this.drawCanvas();
        } else if (__wm.getAttribute('style') !== this.styleStr) {
          __wm.setAttribute('style', this.styleStr);
        }
      }
    });
    bodyObserver.observe(document.querySelector(`#${this.CONTAINERID}`).parentNode, { childList: true });
  }

  Repaint(opt = {}) {
    this.isOberserve = true;
    this.init(opt);
    let _wm = document.querySelector(`#${this.CONTAINERID}`);
    _wm.parentNode.removeChild(_wm);
    this.drawCanvas();
  }
}
export default waterMark;
