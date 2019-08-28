export default class RecordVideo {

  /**
   * 构造函数
   *
   * @param  {Object}   videoObj 视频对象
   */
  constructor(videoObj) {
    this.video = videoObj;
    this.mediaRecorder = null;
    this.chunks = [];
  }

  /**
   * 初始化
   *
   * @return {Object} promise
   */
  init() {
    // 返回Promise对象
    // resolve 正常处理
    // reject 处理异常情况
    return new Promise((resovle, reject) => {
      navigator
        .mediaDevices
        .getUserMedia({
          audio: true,
          video: true
          // video: {
          //     width: this.videoWidth,
          //     height: this.videoHeight
          // }
        })
        // 返回一个媒体内容的流
        .then(stream => {
          // 检测是否支持 srcObject，该属性在新的浏览器支持
          if ('srcObject' in this.video) {
            this.video.srcObject = stream;
          } else {
            // 兼容旧的浏览器
            this.video.src = window.URL.createObjectURL(stream);
          }

          // 当视频的元数据已经加载时触发
          this.video.addEventListener('loadmetadata', () => {
            this.video.play();
          });
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.addEventListener('dataavailable', e => {
            this.chunks.push(e.data);
          });
          resovle();
        })
        // 异常抓取，包括用于禁用麦克风、摄像头
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 视频开始录制
   */
  startRecord() {
    if (this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start();
    }
  }

  /**
   * 视频结束录制
   */
  stopRecord() {
    if (this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }

  /**
   * 检测当前浏览器对否支持
   *
   * @return {boolean} 当前浏览器是否支持
   */
  isSupport() {
    const flag = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    if (flag) {
      return true;
    }
  }
}
