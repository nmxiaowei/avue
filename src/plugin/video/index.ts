export default class RecordVideo {
  video: HTMLMediaElement & { srcObject?: MediaStream | null };
  mediaRecorder: MediaRecorder | null;
  chunks: Blob[];

  constructor(videoObj: HTMLMediaElement & { srcObject?: MediaStream | null }) {
    this.video = videoObj;
    this.mediaRecorder = null;
    this.chunks = [];
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          if ('srcObject' in this.video) {
            this.video.srcObject = stream;
          } else {
            (this.video as any).src = window.URL.createObjectURL(stream as any);
          }

          this.video.addEventListener('loadmetadata', () => {
            this.video.play();
          });
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.addEventListener('dataavailable', (e) => {
            this.chunks.push(e.data);
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  startRecord() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start();
    }
  }

  stopRecord() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }

  isSupport() {
    const flag = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    if (flag) {
      return true;
    }
    return false;
  }
}
