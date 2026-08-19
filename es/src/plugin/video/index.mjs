/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
class RecordVideo {
    constructor(videoObj, options = {}) {
        this.video = videoObj;
        this.options = options;
        this.mediaRecorder = null;
        this.stream = null;
        this.chunks = [];
        this.objectUrl = null;
        this.destroyed = false;
        this.handleLoadedMetadata = () => {
            const playResult = this.video.play();
            if (playResult && typeof playResult.catch === 'function') {
                playResult.catch(() => undefined);
            }
        };
        this.handleDataAvailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);
            }
        };
    }
    init() {
        if (!this.isSupport()) {
            return Promise.reject(new Error('MediaDevices.getUserMedia or MediaRecorder is not supported'));
        }
        this.destroyed = false;
        return navigator.mediaDevices
            .getUserMedia(this.options.constraints || {
            audio: true,
            video: true,
        })
            .then((stream) => {
            if (this.destroyed) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            this.stream = stream;
            if ('srcObject' in this.video) {
                this.video.srcObject = stream;
            }
            else {
                this.objectUrl = window.URL.createObjectURL(stream);
                this.video.src = this.objectUrl;
            }
            this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
            const recorderOptions = this.getRecorderOptions();
            this.mediaRecorder = recorderOptions
                ? new MediaRecorder(stream, recorderOptions)
                : new MediaRecorder(stream);
            this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
        })
            .catch((error) => {
            this.destroy();
            throw error;
        });
    }
    startRecord() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            this.chunks = [];
            this.mediaRecorder.start();
            return true;
        }
        return false;
    }
    stopRecord() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            return true;
        }
        return false;
    }
    getBlob() {
        var _a, _b;
        if (!this.chunks.length)
            return null;
        const type = ((_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.mimeType) || ((_b = this.chunks[0]) === null || _b === void 0 ? void 0 : _b.type) || 'video/webm';
        return new Blob(this.chunks, { type });
    }
    captureFrame(type = 'image/png', quality) {
        if (this.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            return null;
        }
        const width = this.video.videoWidth || this.video.clientWidth;
        const height = this.video.videoHeight || this.video.clientHeight;
        if (!width || !height)
            return null;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (!context)
            return null;
        context.drawImage(this.video, 0, 0, width, height);
        return canvas.toDataURL(type, quality);
    }
    isSupport() {
        const flag = typeof navigator !== 'undefined' &&
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia &&
            typeof MediaRecorder !== 'undefined';
        if (flag) {
            return true;
        }
        return false;
    }
    getRecorderOptions() {
        const mimeType = this.options.mimeType;
        if (!mimeType ||
            typeof MediaRecorder === 'undefined' ||
            !MediaRecorder.isTypeSupported ||
            !MediaRecorder.isTypeSupported(mimeType)) {
            return undefined;
        }
        return { mimeType };
    }
    destroy() {
        this.destroyed = true;
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        if (this.mediaRecorder) {
            this.mediaRecorder.removeEventListener('dataavailable', this.handleDataAvailable);
            if (this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }
        }
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
        }
        this.video.pause();
        if ('srcObject' in this.video) {
            this.video.srcObject = null;
        }
        if (this.objectUrl) {
            window.URL.revokeObjectURL(this.objectUrl);
            this.video.removeAttribute('src');
        }
        this.mediaRecorder = null;
        this.stream = null;
        this.objectUrl = null;
        this.chunks = [];
    }
}

export { RecordVideo as default };
