/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
class RecordVideo {
    constructor(videoObj) {
        this.video = videoObj;
        this.mediaRecorder = null;
        this.chunks = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices
                .getUserMedia({
                audio: true,
                video: true,
            })
                .then((stream) => {
                if ('srcObject' in this.video) {
                    this.video.srcObject = stream;
                }
                else {
                    this.video.src = window.URL.createObjectURL(stream);
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

export { RecordVideo as default };
